import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatBDT } from '../../utils/formatters';
import { BANGLADESH_DISTRICTS, PRODUCE_CATEGORIES, QUANTITY_UNITS } from '../../utils/constants';
import StatusBadge from '../../components/common/StatusBadge';
import {
  Plus,
  Edit2,
  Trash2,
  Pause,
  Play,
  Layers,
  X,
  CheckCircle2,
  Upload,
  AlertCircle
} from 'lucide-react';

export default function FarmerProducts() {
  const { currentUser } = useAuth();
  const { products, addProduct, updateProduct, toggleProductStatus, deleteProduct } = useMarketplace();
  const [searchParams, setSearchParams] = useSearchParams();

  const myProducts = products.filter(p => p.farmerId === currentUser.id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('vegetables');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(40);
  const [unit, setUnit] = useState('kg');
  const [quantity, setQuantity] = useState(1000);
  const [minOrderQuantity, setMinOrderQuantity] = useState(50);
  const [harvestDate, setHarvestDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [availabilityDate, setAvailabilityDate] = useState('Immediate');
  const [district, setDistrict] = useState(currentUser.profile?.district || 'Bogura');
  const [address, setAddress] = useState(currentUser.profile?.address || 'Farm Field Gate');
  const [imageUrl, setImageUrl] = useState('');

  // Check URL query action=new
  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      openCreateModal();
      setSearchParams({});
    }
  }, [searchParams]);

  const openCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setCategory('vegetables');
    setDescription('');
    setPrice(40);
    setUnit('kg');
    setQuantity(1000);
    setMinOrderQuantity(50);
    setHarvestDate(new Date().toISOString().split('T')[0]);
    setAvailabilityDate('Immediate');
    setDistrict(currentUser.profile?.district || 'Bogura');
    setAddress(currentUser.profile?.address || 'Farm Field Gate');
    setImageUrl('https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80');
    setIsModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setName(prod.name);
    setCategory(prod.category);
    setDescription(prod.description);
    setPrice(prod.price);
    setUnit(prod.unit);
    setQuantity(prod.quantity);
    setMinOrderQuantity(prod.minOrderQuantity);
    setHarvestDate(prod.harvestDate || new Date().toISOString().split('T')[0]);
    setAvailabilityDate(prod.availabilityDate || 'Immediate');
    setDistrict(prod.district);
    setAddress(prod.address);
    setImageUrl(prod.images?.[0] || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      category,
      description,
      price: Number(price),
      unit,
      quantity: Number(quantity),
      minOrderQuantity: Number(minOrderQuantity),
      harvestDate,
      availabilityDate,
      district,
      address,
      images: [imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80']
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct(data);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
            My Harvest & Produce Inventory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your agricultural listings, adjust prices, and update stock levels.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-leaf-600 hover:bg-leaf-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Harvest</span>
        </button>
      </div>

      {/* Product List Table / Grid */}
      {myProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-200 p-12 text-center space-y-4">
          <Layers className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-bold text-base text-forest-900">No produce listed yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Create your first crop listing to begin receiving direct offers from buyers in Dhaka and across Bangladesh.
          </p>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 bg-leaf-600 text-white rounded-xl text-xs font-bold"
          >
            Create Produce Listing
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-cream-100/70 text-slate-600 font-bold uppercase tracking-wider border-b border-cream-200">
                <tr>
                  <th className="py-3.5 px-4">Produce Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Stock Quantity</th>
                  <th className="py-3.5 px-4">Unit Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100 font-medium">
                {myProducts.map(prod => (
                  <tr key={prod.id} className="hover:bg-cream-50/60 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images?.[0]}
                          alt={prod.name}
                          className="w-12 h-12 rounded-xl object-cover border border-cream-200"
                        />
                        <div>
                          <h4 className="font-bold text-forest-950 text-xs sm:text-sm">{prod.name}</h4>
                          <p className="text-[11px] text-slate-400">Min order: {prod.minOrderQuantity} {prod.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 capitalize text-slate-700">
                      {prod.category.replace('_', ' ')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900">{prod.quantity.toLocaleString()}</span> {prod.unit}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-forest-900">{formatBDT(prod.price)}</span>
                      <span className="text-[10px] text-slate-400">/{prod.unit}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={prod.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => toggleProductStatus(prod.id)}
                          className="p-1.5 rounded-lg border border-cream-300 hover:bg-cream-100 text-slate-600"
                          title={prod.status === 'active' ? 'Pause Listing' : 'Resume Listing'}
                        >
                          {prod.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-1.5 rounded-lg border border-cream-300 hover:bg-cream-100 text-slate-600"
                          title="Edit Listing"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this product listing?')) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 rounded-lg border border-cream-300 hover:bg-rose-50 text-rose-600"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-cream-200 max-h-[90vh] flex flex-col">
            <div className="bg-forest-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingProduct ? 'Edit Produce Listing' : 'Add New Produce Listing'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Produce Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bogura Red Diamond Potatoes (আলু)"
                  className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                  >
                    {PRODUCE_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Unit of Measurement</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                  >
                    {QUANTITY_UNITS.map(u => (
                      <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Price per Unit (৳)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Available Quantity</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Min Order Qty</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={minOrderQuantity}
                    onChange={(e) => setMinOrderQuantity(e.target.value)}
                    className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description & Quality Standards</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe cultivation methods, grading sizes, pesticide levels..."
                  className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Harvest / Available Date</label>
                  <input
                    type="date"
                    required
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">District</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                  >
                    {BANGLADESH_DISTRICTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pickup Address / Farm Gate</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Specific depot or village road for logistics carrier"
                  className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Product Photo URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs border border-cream-300 rounded-xl p-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-leaf-600 hover:bg-leaf-700 text-white rounded-xl text-xs font-bold shadow transition"
                >
                  {editingProduct ? 'Save Updates' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
