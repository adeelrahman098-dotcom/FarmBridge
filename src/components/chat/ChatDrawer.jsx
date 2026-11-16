import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { formatRelativeTime } from '../../utils/formatters';
import { Send, X, MessageSquare, User } from 'lucide-react';

export default function ChatDrawer({ recipient, product, onClose }) {
  const { conversations, sendMessage } = useMarketplace();
  const { currentUser } = useAuth();
  const [inputText, setInputText] = useState('');

  if (!recipient) return null;

  // Find conversation
  const conv = conversations.find(c =>
    c.participants.includes(currentUser.id) &&
    c.participants.includes(recipient.id) &&
    (!product || c.productId === product.id)
  );

  const messages = conv ? conv.messages : [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage({
      recipientId: recipient.id,
      productId: product?.id,
      text: inputText
    });
    setInputText('');
  };

  return (
    <div className="fixed bottom-0 right-4 sm:right-8 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-t-3xl shadow-2xl border border-cream-200 flex flex-col h-[520px] overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="bg-forest-900 text-white p-3.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={recipient.avatar}
            alt={recipient.name}
            className="w-8 h-8 rounded-full object-cover border border-forest-600"
          />
          <div>
            <h4 className="text-sm font-bold truncate max-w-[200px]">{recipient.name}</h4>
            <p className="text-[10px] text-leaf-400 capitalize">
              {recipient.role} • {recipient.profile?.district || 'Bangladesh'}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-forest-800 rounded-lg text-white/80 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Product Banner (if applicable) */}
      {product && (
        <div className="bg-cream-100 px-4 py-2 border-b border-cream-200 flex items-center gap-2 text-xs">
          <img src={product.images?.[0]} alt="" className="w-7 h-7 rounded object-cover" />
          <div className="truncate flex-1">
            <span className="font-bold text-slate-800 block truncate">{product.name}</span>
            <span className="text-[10px] text-slate-500">৳{product.price}/{product.unit}</span>
          </div>
        </div>
      )}

      {/* Message List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-cream-50/50">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Start a discussion with {recipient.name} regarding produce availability, delivery time, or terms.</p>
          </div>
        ) : (
          messages.map(msg => {
            const isMe = msg.senderId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                    isMe
                      ? 'bg-forest-900 text-white rounded-br-xs'
                      : 'bg-white border border-cream-300 text-slate-800 shadow-xs rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {formatRelativeTime(msg.timestamp)}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-cream-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message ${recipient.name}...`}
          className="flex-1 text-xs bg-cream-50 border border-cream-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-leaf-500 focus:outline-none"
        />
        <button
          type="submit"
          className="p-2.5 bg-leaf-600 hover:bg-leaf-700 text-white rounded-xl shadow-sm transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
