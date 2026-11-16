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
  CheckCircle2,
  AlertTriangle,
  Phone
} from 'lucide-react';

export default function BuyerOrders() {
  const { currentUser } = useAuth();
  const { orders, deliveries, updateOrderStatus, submitComplaint } = useMarketplace();

  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState(null);
  const [complaintModalOrder, setComplaintModalOrder] = useState(null);
  const [complaintCategory, setComplaintCategory] = useState('Quality Mismatch');
  const [complaintDesc, setComplaintDesc] = useState('');

  const myOrders = orders.filter(o => o.buyerId === currentUser.id);

  const handleMarkCompleted = (orderId) => {
    if (window.confirm('Confirm inspection passed and mark order as Completed? This authorizes settlement to the farmer.')) {
      updateOrderStatus(orderId, 'completed', 'Goods inspected and confirmed by buyer at dropoff point');
    }
  };

  const handleSendComplaint = (e) => {
    e.preventDefault();
    if (complaintModalOrder) {
      submitComplaint({
        relatedOrderId: complaintModalOrder.id,
        category: complaintCategory,
        description: complaintDesc
      });
      updateOrderStatus(complaintModalOrder.id, 'issue_reported', `Issue reported: ${complaintCategory}`);
      setComplaintModalOrder(null);
      setComplaintDesc('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          My Wholesale Shipments & Tracking
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor your agricultural produce shipments live from farm gate to your facility.
        </p>
      </div>

      {myOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-200 p-12 text-center text-slate-500 text-xs">
          No active or past orders yet. Browse the marketplace to place offers!
        </div>
      ) : (
        <div className="space-y-6">
          {myOrders.map(order => {
            const delivery = deliveries.find(d => d.orderId === order.id);
            const isDelivered = order.orderStatus === 'delivered';
            const isCompleted = order.orderStatus === 'completed';

            return (
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
                      Placed on {formatDate(order.createdAt)} • Farmer: <strong className="text-slate-800">{order.farmerName}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveInvoiceOrder(order)}
                      className="px-3 py-1.5 border border-cream-300 hover:border-forest-600 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition"
                    >
                      <FileText className="w-3.5 h-3.5 text-forest-700" />
                      <span>Invoice</span>
                    </button>

                    {!['completed', 'cancelled'].includes(order.orderStatus) && (
                      <button
                        onClick={() => setComplaintModalOrder(order)}
                        className="px-3 py-1.5 border border-cream-300 hover:border-rose-400 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-1 transition"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Report Issue</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Tracker */}
                <OrderProgressTracker currentStatus={order.orderStatus} timeline={order.timeline} />

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-cream-50 p-4 rounded-2xl border border-cream-200 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Produce Cargo</span>
                    <p className="font-bold text-slate-900 text-sm">{order.productName}</p>
                    <p className="text-slate-600">
                      {order.quantity} {order.unit} @ {formatBDT(order.unitPrice)}/{order.unit}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Logistics Partner</span>
                    {delivery && delivery.driverName ? (
                      <div className="mt-1 space-y-0.5">
                        <p className="font-bold text-slate-800">{delivery.driverName}</p>
                        <p className="text-[11px] text-slate-500">{delivery.vehicle}</p>
                        {delivery.driverPhone && (
                          <p className="text-[11px] text-leaf-700 font-semibold flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {delivery.driverPhone}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-slate-500 mt-1 italic">Logistics carrier matching in progress...</p>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Payable</span>
                    <div className="mt-1 space-y-0.5">
                      <p className="flex justify-between">
                        <span className="text-slate-500">Subtotal:</span>
                        <span>{formatBDT(order.subtotal)}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-slate-500">Delivery:</span>
                        <span>{formatBDT(order.deliveryFee)}</span>
                      </p>
                      <p className="flex justify-between font-extrabold text-forest-950 border-t border-cream-300 pt-1">
                        <span>Total Payable:</span>
                        <span>{formatBDT(order.total)}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-leaf-600" />
                    <span>Dropoff: {order.deliveryAddress}</span>
                  </div>

                  {isDelivered && (
                    <button
                      onClick={() => handleMarkCompleted(order.id)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Quality & Release Settlement</span>
                    </button>
                  )}

                  {isCompleted && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Order Completed & Inspected
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Invoice Modal */}
      {activeInvoiceOrder && (
        <InvoiceModal
          order={activeInvoiceOrder}
          onClose={() => setActiveInvoiceOrder(null)}
        />
      )}

      {/* Complaint Modal */}
      {complaintModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-forest-950 text-base">Report Issue on Order #{complaintModalOrder.id}</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Issue Category</label>
              <select
                value={complaintCategory}
                onChange={(e) => setComplaintCategory(e.target.value)}
                className="w-full text-xs border border-cream-300 rounded-xl p-2.5"
              >
                <option value="Quality Mismatch">Quality Mismatch / Produce Damage</option>
                <option value="Transit Delay">Severe Transit Delay</option>
                <option value="Quantity Shortage">Quantity Weight Shortage</option>
                <option value="Carrier Dispute">Carrier / Driver Dispute</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Details & Description</label>
              <textarea
                rows={3}
                required
                value={complaintDesc}
                onChange={(e) => setComplaintDesc(e.target.value)}
                placeholder="Explain the problem clearly for platform administration mediation..."
                className="w-full text-xs border border-cream-300 rounded-xl p-2.5"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setComplaintModalOrder(null)}
                className="px-3 py-1.5 text-xs text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendComplaint}
                className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700"
              >
                Submit Dispute
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
