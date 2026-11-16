import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatRelativeTime } from '../../utils/formatters';
import { MessageSquare, Send, User, MapPin } from 'lucide-react';

export default function MessagesPage() {
  const { currentUser, users } = useAuth();
  const { conversations, sendMessage, products } = useMarketplace();

  // Find conversations user is part of
  const myConversations = conversations.filter(c => c.participants.includes(currentUser.id));

  const [activeConvId, setActiveConvId] = useState(myConversations[0]?.id || null);
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId);

  // Other participant in active conv
  const otherUserId = activeConv?.participants.find(id => id !== currentUser.id);
  const otherUser = users.find(u => u.id === otherUserId);
  const product = products.find(p => p.id === activeConv?.productId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !otherUserId) return;

    sendMessage({
      recipientId: otherUserId,
      productId: activeConv?.productId,
      text: inputText.trim()
    });
    setInputText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          Messages & Consultations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Direct communication channel with farmers, buyers, and transport logistics.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[600px]">
        {/* Conversations Sidebar */}
        <div className="border-r border-cream-200 overflow-y-auto bg-cream-50/50">
          <div className="p-4 border-b border-cream-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Threads ({myConversations.length})
            </span>
          </div>

          {myConversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No conversations started yet. Message a farmer from any product page.
            </div>
          ) : (
            <div className="divide-y divide-cream-100">
              {myConversations.map(conv => {
                const partnerId = conv.participants.find(id => id !== currentUser.id);
                const partner = users.find(u => u.id === partnerId);
                const lastMsg = conv.messages[conv.messages.length - 1];
                const isActive = conv.id === activeConvId;

                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full text-left p-4 transition flex items-start gap-3 ${
                      isActive ? 'bg-forest-900 text-white' : 'hover:bg-cream-100 text-slate-800'
                    }`}
                  >
                    <img
                      src={partner?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border border-cream-300 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-forest-950'}`}>
                          {partner?.name || 'Contact'}
                        </h4>
                        <span className={`text-[10px] ${isActive ? 'text-forest-200' : 'text-slate-400'}`}>
                          {formatRelativeTime(lastMsg?.timestamp)}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-leaf-300' : 'text-forest-700 font-medium'}`}>
                        {conv.productName}
                      </p>
                      <p className={`text-xs truncate mt-1 ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                        {lastMsg?.text}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Chat Thread */}
        <div className="md:col-span-2 flex flex-col h-full bg-white">
          {activeConv && otherUser ? (
            <>
              {/* Thread Header */}
              <div className="p-4 border-b border-cream-200 flex items-center justify-between bg-cream-50/70">
                <div className="flex items-center gap-3">
                  <img
                    src={otherUser.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-forest-200"
                  />
                  <div>
                    <h3 className="font-bold text-forest-950 text-sm">{otherUser.name}</h3>
                    <p className="text-xs text-slate-500 capitalize">
                      {otherUser.role} • {otherUser.profile?.district || 'Bangladesh'}
                    </p>
                  </div>
                </div>

                {product && (
                  <div className="hidden sm:block text-right">
                    <span className="text-xs font-bold text-forest-900 block truncate max-w-[200px]">
                      {product.name}
                    </span>
                    <span className="text-[11px] text-leaf-700 font-semibold">৳{product.price}/{product.unit}</span>
                  </div>
                )}
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-3 bg-cream-50/30">
                {activeConv.messages.map(msg => {
                  const isMe = msg.senderId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                          isMe
                            ? 'bg-forest-900 text-white rounded-br-xs'
                            : 'bg-white border border-cream-200 text-slate-800 shadow-xs rounded-bl-xs'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {formatRelativeTime(msg.timestamp)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-4 border-t border-cream-200 flex items-center gap-3 bg-white">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Reply to ${otherUser.name}...`}
                  className="flex-1 text-xs bg-cream-50 border border-cream-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-leaf-600 hover:bg-leaf-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <MessageSquare className="w-12 h-12 mb-2 opacity-50" />
              <p className="text-xs">Select a conversation thread on the left to view messages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
