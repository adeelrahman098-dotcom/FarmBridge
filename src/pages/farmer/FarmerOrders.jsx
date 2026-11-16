import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT, formatDate } from '../../utils/formatters';
import OrderProgressTracker from '../../components/order/OrderProgressTracker';
import StatusBadge from '../../components/common/StatusBadge';
import InvoiceModal from '../../components/order/InvoiceModal';
import {
  PackageCheck,
  FileText,
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function FarmerOrders() {
  const { currentUser } = useAuth();
  const { orders, updateOrderStatus } = useMarketplace();

  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState(null);

  const myOrders = orders.filter(o => o.farmerId === currentUser.id);

  const handleAdvanceStatus = (orderId, currentStatus) => {
    if (currentStatus === 'confirmed') {
      updateOrderStatus(orderId, 'preparing', 'Produce harvested, washed, and boxed for carrier');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          Farmer Order Fulfillment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Track harvest preparation, pickup scheduling, highway transit, and buyer settlement.
        </p>
      </div>

      {myOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-200 p-12 text-center text-slate-500 text-xs">
          No orders received yet. Once you accept an offer, it will appear here.
        </div>
      ) : (
        <div className="space-y-6">
          {myOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm space-y-5"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cream-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-forest-950 text-base">Order #{order.id}</span>
                    <StatusBadge status={order.orderStatus} />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ordered on {formatDate(order.createdAt)} • Buyer: <strong className="text-slate-700">{order.buyerName}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveInvoiceOrder(order)}
                    className="px-3 py-1.5 border border-cream-300 hover:border-forest-600 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-forest-700" />
                    <span>View Invoice</span>
                  </button>
                </div>
              </div>

              {/* Visual Progress Timeline */}
              <OrderProgressTracker currentStatus={order.orderStatus} timeline={order.timeline} />

              {/* Order Info & Location Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-cream-50 p-4 rounded-2xl border border-cream-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Crop & Volume</span>
                  <p className="font-bold text-slate-900 text-sm">{order.productName}</p>
                  <p className="text-slate-600">
                    {order.quantity} {order.unit} @ {formatBDT(order.unitPrice)}/{order.unit}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Route Locations</span>
                  <div className="space-y-1 mt-1">
                    <p className="flex items-center gap-1 text-slate-700 truncate">
                      <MapPin className="w-3 h-3 text-leaf-600 flex-shrink-0" />
                      <span>Pickup: {order.pickupAddress}</span>
                    </p>
                    <p className="flex items-center gap-1 text-slate-700 truncate">
                      <MapPin className="w-3 h-3 text-amber-600 flex-shrink-0" />
                      <span>Drop: {order.deliveryAddress}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Payout Breakdown</span>
                  <div className="mt-1 space-y-0.5">
                    <p className="flex justify-between">
                      <span className="text-slate-500">Produce Value:</span>
                      <strong className="text-slate-900">{formatBDT(order.subtotal)}</strong>
                    </p>
                    <p className="flex justify-between text-[11px] text-slate-400">
                      <span>Platform Fee (3%):</span>
                      <span>- {formatBDT(Math.round(order.subtotal * 0.03))}</span>
                    </p>
                    <p className="flex justify-between font-extrabold text-forest-900 border-t border-cream-300 pt-1">
                      <span>Net Farmer Payout:</span>
                      <span>{formatBDT(order.subtotal - Math.round(order.subtotal * 0.03))}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-slate-400" />
                  <span>Logistics Task: {order.deliveryId || 'Generating...'}</span>
                </div>

                {order.orderStatus === 'confirmed' && (
                  <button
                    onClick={() => handleAdvanceStatus(order.id, order.orderStatus)}
                    className="px-4 py-2 bg-leaf-600 hover:bg-leaf-700 text-white rounded-xl text-xs font-bold transition shadow"
                  >
                    Mark as "Harvested & Packaged" (Ready for Carrier)
                  </button>
                )}

                {order.orderStatus === 'preparing' && (
                  <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                    Awaiting logistics carrier pickup at farm gate
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoice Modal */}
      {activeInvoiceOrder && (
        <InvoiceModal
          order={activeInvoiceOrder}
          onClose={() => setActiveInvoiceOrder(null)}
        />
      )}
    </div>
  );
}
