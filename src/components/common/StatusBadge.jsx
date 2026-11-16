import React from 'react';
import {
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export default function StatusBadge({ status, type = 'order' }) {
  const s = (status || '').toLowerCase();

  const configs = {
    // Order / Delivery statuses
    confirmed: {
      label: 'Confirmed',
      classes: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: CheckCircle2
    },
    preparing: {
      label: 'Preparing',
      classes: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Clock
    },
    pickup_scheduled: {
      label: 'Pickup Scheduled',
      classes: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: Truck
    },
    picked_up: {
      label: 'Picked Up',
      classes: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: PackageCheck
    },
    in_transit: {
      label: 'In Transit',
      classes: 'bg-purple-100 text-purple-800 border-purple-200 animate-pulse',
      icon: Truck
    },
    delivered: {
      label: 'Delivered',
      classes: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: PackageCheck
    },
    completed: {
      label: 'Completed',
      classes: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold',
      icon: CheckCircle2
    },
    cancelled: {
      label: 'Cancelled',
      classes: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: XCircle
    },
    issue_reported: {
      label: 'Issue Reported',
      classes: 'bg-red-100 text-red-800 border-red-200',
      icon: AlertTriangle
    },

    // Offer statuses
    pending: {
      label: 'Pending',
      classes: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Clock
    },
    countered: {
      label: 'Countered',
      classes: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: RefreshCw
    },
    accepted: {
      label: 'Accepted',
      classes: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: CheckCircle2
    },
    rejected: {
      label: 'Rejected',
      classes: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: XCircle
    },

    // Verification
    verified: {
      label: 'Verified',
      classes: 'bg-emerald-50 text-emerald-700 border-emerald-300',
      icon: ShieldCheck
    },
    unverified: {
      label: 'Unverified',
      classes: 'bg-slate-100 text-slate-700 border-slate-200',
      icon: AlertTriangle
    },

    // Delivery jobs
    available: {
      label: 'Open for Bids',
      classes: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Truck
    },
    assigned: {
      label: 'Assigned',
      classes: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: CheckCircle2
    },

    // Product status
    active: {
      label: 'Active Listing',
      classes: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: CheckCircle2
    },
    paused: {
      label: 'Paused',
      classes: 'bg-slate-100 text-slate-700 border-slate-300',
      icon: Clock
    }
  };

  const config = configs[s] || {
    label: status,
    classes: 'bg-slate-100 text-slate-800 border-slate-200',
    icon: Clock
  };

  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.classes}`}>
      <Icon className="w-3 h-3 flex-shrink-0" />
      <span>{config.label}</span>
    </span>
  );
}
