import React from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { formatRelativeTime } from '../../utils/formatters';
import { Bell, CheckCheck, HandCoins, Truck, PackageCheck, AlertCircle } from 'lucide-react';

export default function NotificationsPage() {
  const { currentUser } = useAuth();
  const { userNotifications, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
            Notifications Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time operational alerts for offers, counterproposals, and shipment milestones.
          </p>
        </div>

        {userNotifications.length > 0 && (
          <button
            onClick={() => markAllAsRead(currentUser.id)}
            className="text-xs font-bold text-leaf-700 hover:text-leaf-800 flex items-center gap-1 transition"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {userNotifications.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-200 p-12 text-center text-slate-400 text-xs">
          <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No notifications yet. You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {userNotifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-4 rounded-2xl border transition flex items-start gap-3.5 cursor-pointer ${
                notif.isRead
                  ? 'bg-white border-cream-200 text-slate-700'
                  : 'bg-leaf-50/70 border-leaf-200 text-forest-950 shadow-xs'
              }`}
            >
              <div className={`p-2 rounded-xl mt-0.5 flex-shrink-0 ${
                notif.isRead ? 'bg-cream-100 text-slate-500' : 'bg-leaf-200 text-forest-800'
              }`}>
                {notif.type?.includes('offer') ? (
                  <HandCoins className="w-4 h-4" />
                ) : notif.type?.includes('job') || notif.type?.includes('order') ? (
                  <Truck className="w-4 h-4" />
                ) : (
                  <Bell className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className={`text-xs sm:text-sm font-bold ${notif.isRead ? 'text-slate-800' : 'text-forest-950 font-extrabold'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                    {formatRelativeTime(notif.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                {notif.link && (
                  <Link
                    to={notif.link}
                    className="inline-block mt-2 text-[11px] font-bold text-leaf-700 hover:underline"
                  >
                    View details →
                  </Link>
                )}
              </div>

              {!notif.isRead && (
                <span className="w-2.5 h-2.5 rounded-full bg-leaf-600 flex-shrink-0 mt-1.5"></span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
