export const BANGLADESH_DISTRICTS = [
  'Bogura',
  'Rajshahi',
  'Rangpur',
  'Dinajpur',
  'Jashore',
  'Khulna',
  'Dhaka',
  'Gazipur',
  'Mymensingh',
  'Cumilla',
  'Chattogram',
  'Sylhet',
  'Barishal',
  'Pabna',
  'Natore',
  'Faridpur'
];

export const PRODUCE_CATEGORIES = [
  { id: 'all', label: 'All Categories', icon: 'LayoutGrid' },
  { id: 'vegetables', label: 'Vegetables', icon: 'Carrot' },
  { id: 'fruits', label: 'Fruits', icon: 'Apple' },
  { id: 'grains', label: 'Grains & Cereals', icon: 'Wheat' },
  { id: 'spices', label: 'Spices & Herbs', icon: 'Flame' },
  { id: 'dairy_poultry', label: 'Dairy & Poultry', icon: 'Egg' },
  { id: 'cash_crops', label: 'Cash Crops & Oils', icon: 'Sprout' }
];

export const QUANTITY_UNITS = [
  { value: 'kg', label: 'Kilogram (kg)' },
  { value: 'maund', label: 'Maund (40 kg / মণ)' },
  { value: 'sack', label: 'Sack (বস্তা - 50 kg)' },
  { value: 'crate', label: 'Crate (ক্যারেট)' },
  { value: 'piece', label: 'Piece (পিস)' },
  { value: 'dozen', label: 'Dozen (ডজন)' },
  { value: 'liter', label: 'Liter (লিটার)' }
];

export const ORDER_STATUS_STEPS = [
  { key: 'confirmed', label: 'Order Confirmed', description: 'Offer accepted by farmer & buyer' },
  { key: 'preparing', label: 'Preparing Pickup', description: 'Harvesting & sorting produce' },
  { key: 'pickup_scheduled', label: 'Pickup Scheduled', description: 'Transport assigned' },
  { key: 'picked_up', label: 'Picked Up', description: 'Cargo loaded onto vehicle' },
  { key: 'in_transit', label: 'In Transit', description: 'On the road to destination' },
  { key: 'delivered', label: 'Delivered', description: 'Reached buyer dropoff point' },
  { key: 'completed', label: 'Completed', description: 'Inspected and confirmed by buyer' }
];

export const ROLES = {
  FARMER: 'farmer',
  BUYER: 'buyer',
  TRANSPORT: 'transport',
  ADMIN: 'admin'
};
