import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_OFFERS,
  INITIAL_ORDERS,
  INITIAL_DELIVERIES,
  INITIAL_CONVERSATIONS,
  INITIAL_COMPLAINTS
} from '../data/seedData';
import { useNotifications } from './NotificationContext';
import { useAuth } from './AuthContext';

const MarketplaceContext = createContext();

export function MarketplaceProvider({ children }) {
  const { currentUser } = useAuth();
  const { addNotification } = useNotifications();

  // Products state
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('farmbridge_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Offers state
  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem('farmbridge_offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('farmbridge_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Deliveries state
  const [deliveries, setDeliveries] = useState(() => {
    const saved = localStorage.getItem('farmbridge_deliveries');
    return saved ? JSON.parse(saved) : INITIAL_DELIVERIES;
  });

  // Conversations state
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('farmbridge_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  // Complaints state
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('farmbridge_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  // Saved / Bookmarked Product IDs
  const [savedProductIds, setSavedProductIds] = useState(() => {
    const saved = localStorage.getItem('farmbridge_saved_products');
    return saved ? JSON.parse(saved) : ['prod_1', 'prod_4', 'prod_9'];
  });

  // Admin configurable commission rate
  const [commissionRate, setCommissionRate] = useState(() => {
    const saved = localStorage.getItem('farmbridge_commission_rate');
    return saved ? parseFloat(saved) : 0.03; // default 3%
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('farmbridge_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('farmbridge_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('farmbridge_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('farmbridge_deliveries', JSON.stringify(deliveries));
  }, [deliveries]);

  useEffect(() => {
    localStorage.setItem('farmbridge_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('farmbridge_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('farmbridge_saved_products', JSON.stringify(savedProductIds));
  }, [savedProductIds]);

  useEffect(() => {
    localStorage.setItem('farmbridge_commission_rate', commissionRate.toString());
  }, [commissionRate]);

  // --- PRODUCT ACTIONS ---
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: `prod_${Date.now()}`,
      farmerId: currentUser.id,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (productId, updates) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updates } : p));
  };

  const toggleProductStatus = (productId) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, status: p.status === 'active' ? 'paused' : 'active' };
      }
      return p;
    }));
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const toggleSaveProduct = (productId) => {
    setSavedProductIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // --- OFFER & NEGOTIATION ACTIONS ---
  const createOffer = ({ productId, quantity, offeredUnitPrice, requestedDeliveryDate, note }) => {
    const product = products.find(p => p.id === productId);
    if (!product) return null;

    const newOffer = {
      id: `offer_${Date.now()}`,
      productId,
      farmerId: product.farmerId,
      buyerId: currentUser.id,
      quantity: Number(quantity),
      unit: product.unit,
      offeredUnitPrice: Number(offeredUnitPrice),
      originalListingPrice: product.price,
      requestedDeliveryDate,
      note,
      status: 'pending',
      history: [
        {
          byRole: 'buyer',
          byName: currentUser.name,
          price: Number(offeredUnitPrice),
          quantity: Number(quantity),
          note,
          timestamp: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString()
    };

    setOffers(prev => [newOffer, ...prev]);

    // Send notification to farmer
    addNotification({
      userId: product.farmerId,
      type: 'offer_received',
      title: 'New Offer Received!',
      message: `${currentUser.name} offered ৳${offeredUnitPrice}/${product.unit} for ${quantity} ${product.unit} of ${product.name}.`,
      link: '/farmer/offers'
    });

    return newOffer;
  };

  const counterOffer = (offerId, { counterPrice, counterQuantity, counterNote, byRole = 'farmer' }) => {
    let updatedOffer = null;
    setOffers(prev => prev.map(offer => {
      if (offer.id === offerId) {
        const product = products.find(p => p.id === offer.productId);
        updatedOffer = {
          ...offer,
          counterUnitPrice: Number(counterPrice),
          quantity: counterQuantity ? Number(counterQuantity) : offer.quantity,
          counterNote: counterNote || '',
          status: 'countered',
          history: [
            ...offer.history,
            {
              byRole,
              byName: currentUser.name,
              price: Number(counterPrice),
              quantity: counterQuantity ? Number(counterQuantity) : offer.quantity,
              note: counterNote,
              timestamp: new Date().toISOString()
            }
          ]
        };

        // Notify other party
        const targetUserId = byRole === 'farmer' ? offer.buyerId : offer.farmerId;
        addNotification({
          userId: targetUserId,
          type: 'counteroffer_received',
          title: `Counteroffer from ${currentUser.name}`,
          message: `Revised terms: ৳${counterPrice}/${offer.unit} for ${offer.quantity} ${offer.unit} (${product?.name || 'produce'}).`,
          link: byRole === 'farmer' ? '/buyer/offers' : '/farmer/offers'
        });

        return updatedOffer;
      }
      return offer;
    }));

    return updatedOffer;
  };

  const acceptOffer = (offerId) => {
    let acceptedOffer = null;
    let newOrder = null;

    setOffers(prev => prev.map(offer => {
      if (offer.id === offerId) {
        acceptedOffer = {
          ...offer,
          status: 'accepted',
          history: [
            ...offer.history,
            {
              byRole: currentUser.role,
              byName: currentUser.name,
              price: offer.counterUnitPrice || offer.offeredUnitPrice,
              quantity: offer.quantity,
              note: `Offer officially accepted by ${currentUser.name}. Order generated automatically.`,
              timestamp: new Date().toISOString()
            }
          ]
        };
        return acceptedOffer;
      }
      return offer;
    }));

    if (acceptedOffer) {
      const product = products.find(p => p.id === acceptedOffer.productId);
      const effectivePrice = acceptedOffer.counterUnitPrice || acceptedOffer.offeredUnitPrice;
      const subtotal = effectivePrice * acceptedOffer.quantity;
      const estimatedDelivery = 3500;
      const orderId = `ord_${Date.now()}`;
      const deliveryId = `del_${Date.now()}`;

      newOrder = {
        id: orderId,
        offerId: acceptedOffer.id,
        productId: product?.id,
        productName: product?.name || 'Produce',
        farmerId: acceptedOffer.farmerId,
        farmerName: product ? 'Farmer' : 'Supplier',
        buyerId: acceptedOffer.buyerId,
        buyerName: currentUser.name,
        quantity: acceptedOffer.quantity,
        unit: acceptedOffer.unit,
        unitPrice: effectivePrice,
        subtotal: subtotal,
        deliveryFee: estimatedDelivery,
        total: subtotal + estimatedDelivery,
        orderStatus: 'confirmed',
        paymentStatus: 'pending',
        pickupAddress: product?.address || 'Farm gate',
        deliveryAddress: 'Buyer warehouse address',
        deliveryId: deliveryId,
        timeline: [
          {
            status: 'confirmed',
            label: 'Order Confirmed',
            time: 'Just now',
            note: 'Agreement finalized between farmer and buyer'
          }
        ],
        createdAt: new Date().toISOString()
      };

      // Create matching delivery job
      const newDelivery = {
        id: deliveryId,
        orderId: orderId,
        transportPartnerId: null,
        driverName: null,
        vehicle: null,
        pickupAddress: newOrder.pickupAddress,
        dropoffAddress: newOrder.deliveryAddress,
        pickupDate: acceptedOffer.requestedDeliveryDate || 'Tomorrow',
        cargoDescription: `${newOrder.quantity} ${newOrder.unit} ${newOrder.productName}`,
        fee: estimatedDelivery,
        status: 'available',
        instructions: 'Call farmer before arrival; secure perishable load.'
      };

      setOrders(prev => [newOrder, ...prev]);
      setDeliveries(prev => [newDelivery, ...prev]);

      // Notify parties
      addNotification({
        userId: acceptedOffer.farmerId,
        type: 'order_status',
        title: 'Order Confirmed! 🎉',
        message: `Order #${orderId} created for ${newOrder.productName}. Please begin packaging.`,
        link: '/farmer/orders'
      });
      addNotification({
        userId: acceptedOffer.buyerId,
        type: 'order_status',
        title: 'Order Confirmed! 🎉',
        message: `Your order #${orderId} has been confirmed. Track fulfillment in your orders tab.`,
        link: '/buyer/orders'
      });
    }

    return newOrder;
  };

  const rejectOffer = (offerId, reason) => {
    setOffers(prev => prev.map(offer => {
      if (offer.id === offerId) {
        const updated = {
          ...offer,
          status: 'rejected',
          rejectionReason: reason || 'Not feasible at requested terms',
          history: [
            ...offer.history,
            {
              byRole: currentUser.role,
              byName: currentUser.name,
              price: offer.offeredUnitPrice,
              quantity: offer.quantity,
              note: `Offer rejected: ${reason || 'Terms not acceptable'}`,
              timestamp: new Date().toISOString()
            }
          ]
        };

        const targetUser = currentUser.id === offer.farmerId ? offer.buyerId : offer.farmerId;
        addNotification({
          userId: targetUser,
          type: 'offer_rejected',
          title: 'Offer Declined',
          message: `${currentUser.name} declined the offer: ${reason || 'Terms not acceptable'}.`,
          link: '/buyer/offers'
        });

        return updated;
      }
      return offer;
    }));
  };

  // --- ORDER LIFECYCLE ---
  const updateOrderStatus = (orderId, newStatus, note = '') => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const stepLabels = {
          confirmed: 'Order Confirmed',
          preparing: 'Produce Harvested & Packaged',
          pickup_scheduled: 'Pickup Scheduled with Logistics',
          picked_up: 'Goods Picked Up',
          in_transit: 'In Transit',
          delivered: 'Delivered to Destination',
          completed: 'Inspection Passed & Completed',
          cancelled: 'Order Cancelled',
          issue_reported: 'Issue Reported'
        };

        const updatedTimeline = [
          ...order.timeline,
          {
            status: newStatus,
            label: stepLabels[newStatus] || newStatus,
            time: 'Just now',
            note: note || `Updated by ${currentUser.name}`
          }
        ];

        // Also reflect delivery status if applicable
        if (['picked_up', 'in_transit', 'delivered'].includes(newStatus) && order.deliveryId) {
          setDeliveries(dels => dels.map(d => d.id === order.deliveryId ? { ...d, status: newStatus } : d));
        }

        // Notify both farmer and buyer
        const otherParty = currentUser.id === order.farmerId ? order.buyerId : order.farmerId;
        addNotification({
          userId: otherParty,
          type: 'order_status',
          title: `Order Status: ${stepLabels[newStatus]}`,
          message: `Order #${order.id} updated: ${note || stepLabels[newStatus]}`,
          link: currentUser.role === 'farmer' ? '/buyer/orders' : '/farmer/orders'
        });

        return {
          ...order,
          orderStatus: newStatus,
          paymentStatus: newStatus === 'completed' ? 'paid' : order.paymentStatus,
          timeline: updatedTimeline
        };
      }
      return order;
    }));
  };

  // --- TRANSPORT / DELIVERY ACTIONS ---
  const claimDeliveryJob = (deliveryId, transportUser) => {
    setDeliveries(prev => prev.map(del => {
      if (del.id === deliveryId) {
        const updated = {
          ...del,
          transportPartnerId: transportUser.id,
          driverName: transportUser.name,
          driverPhone: transportUser.phone,
          vehicle: transportUser.profile?.vehicleType || 'Truck',
          status: 'pickup_scheduled'
        };

        // Also sync order timeline
        if (del.orderId) {
          updateOrderStatus(del.orderId, 'pickup_scheduled', `Transport accepted by ${transportUser.name}`);
        }

        return updated;
      }
      return del;
    }));
  };

  const advanceDeliveryStatus = (deliveryId, nextStatus, note = '') => {
    setDeliveries(prev => prev.map(del => {
      if (del.id === deliveryId) {
        if (del.orderId) {
          updateOrderStatus(del.orderId, nextStatus, note || `Carrier update: ${nextStatus}`);
        }
        return { ...del, status: nextStatus };
      }
      return del;
    }));
  };

  // --- MESSAGING ---
  const sendMessage = ({ recipientId, productId, text }) => {
    if (!text || !text.trim()) return;

    const existingConv = conversations.find(c =>
      c.participants.includes(currentUser.id) &&
      c.participants.includes(recipientId) &&
      (!productId || c.productId === productId)
    );

    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: text.trim(),
      timestamp: new Date().toISOString()
    };

    if (existingConv) {
      setConversations(prev => prev.map(c =>
        c.id === existingConv.id
          ? { ...c, messages: [...c.messages, newMessage], updatedAt: new Date().toISOString() }
          : c
      ));
    } else {
      const product = products.find(p => p.id === productId);
      const newConv = {
        id: `conv_${Date.now()}`,
        productId: productId || null,
        productName: product?.name || 'Direct Consultation',
        participants: [currentUser.id, recipientId],
        messages: [newMessage],
        updatedAt: new Date().toISOString()
      };
      setConversations(prev => [newConv, ...prev]);
    }

    addNotification({
      userId: recipientId,
      type: 'new_message',
      title: `Message from ${currentUser.name}`,
      message: text.length > 60 ? `${text.substring(0, 60)}...` : text,
      link: '/messages'
    });
  };

  // --- COMPLAINTS ---
  const submitComplaint = ({ relatedOrderId, category, description }) => {
    const newComp = {
      id: `comp_${Date.now()}`,
      submittedBy: currentUser.id,
      submitterName: currentUser.name,
      relatedOrderId: relatedOrderId || null,
      category,
      description,
      status: 'pending',
      resolutionNote: null,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setComplaints(prev => [newComp, ...prev]);
    return newComp;
  };

  const resolveComplaint = (complaintId, resolutionNote) => {
    setComplaints(prev => prev.map(c =>
      c.id === complaintId
        ? { ...c, status: 'resolved', resolutionNote }
        : c
    ));
  };

  // --- ADMIN SETTINGS ---
  const updateCommission = (newRate) => {
    setCommissionRate(newRate);
  };

  const resetAllData = () => {
    localStorage.removeItem('farmbridge_products');
    localStorage.removeItem('farmbridge_offers');
    localStorage.removeItem('farmbridge_orders');
    localStorage.removeItem('farmbridge_deliveries');
    localStorage.removeItem('farmbridge_conversations');
    localStorage.removeItem('farmbridge_notifications');
    localStorage.removeItem('farmbridge_complaints');
    localStorage.removeItem('farmbridge_users');
    localStorage.removeItem('farmbridge_saved_products');
    localStorage.removeItem('farmbridge_commission_rate');
    window.location.reload();
  };

  return (
    <MarketplaceContext.Provider value={{
      products,
      offers,
      orders,
      deliveries,
      conversations,
      complaints,
      savedProductIds,
      commissionRate,
      addProduct,
      updateProduct,
      toggleProductStatus,
      deleteProduct,
      toggleSaveProduct,
      createOffer,
      counterOffer,
      acceptOffer,
      rejectOffer,
      updateOrderStatus,
      claimDeliveryJob,
      advanceDeliveryStatus,
      sendMessage,
      submitComplaint,
      resolveComplaint,
      updateCommission,
      resetAllData
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  return useContext(MarketplaceContext);
}
