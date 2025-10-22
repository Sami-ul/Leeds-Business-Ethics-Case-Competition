'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function DemoPage() {
  const [reportOpen, setReportOpen] = useState(false);

  // Mock product data from the case study
  const product = {
    name: "Organic Whole Milk",
    brand: "Happy Farms",
    size: "1 Gallon",
    currentPrice: 2.99,
    originalPrice: 3.39,
    aiAdjusted: true,
    category: "Dairy",
    sku: "MK-00482",
    expiresIn: "2 days"
  };

  // Mock price history data (last 7 days) - showing discount as expiration approaches
  const priceHistory = [
    { day: 'Mon', price: 3.39 },
    { day: 'Tue', price: 3.39 },
    { day: 'Wed', price: 3.35 },
    { day: 'Thu', price: 3.29 },
    { day: 'Fri', price: 3.15 },
    { day: 'Sat', price: 3.05 },
    { day: 'Today', price: 2.99 },
  ];

  const maxPrice = 3.50;
  const minPrice = 2.80;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <motion.header 
        className="bg-white border-b border-gray-200 p-4 sticky top-0 z-50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">ShelfSense</h1>
              <p className="text-xs text-gray-500">Powered by Helios AI</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-4 pb-24">
        {/* Product Card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 mt-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Product Image Placeholder */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-2">🥛</div>
              <p className="text-sm text-gray-600 font-medium">{product.brand}</p>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h2>
            <p className="text-gray-500 mb-4">{product.size}</p>

            {/* Price Section */}
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Current Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">${product.currentPrice}</span>
                  {product.aiAdjusted && (
                    <motion.span 
                      className="text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-full font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      AI Optimized
                    </motion.span>
                  )}
                </div>
              </div>
            </div>

            {/* Why This Price */}
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-500">✨</span>
                Why this price?
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Discounted: Expires in {product.expiresIn} (reduce waste)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Price reduced automatically as expiration approaches</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Still above minimum floor: ${minPrice.toFixed(2)}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Price History Chart */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📊</span>
            7-Day Price History
          </h3>
          
          <div className="relative">
            <svg width="100%" height="350" viewBox="0 0 700 350" preserveAspectRatio="xMidYMid meet">
              {/* Grid lines */}
              <line x1="50" y1="20" x2="650" y2="20" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="50" y1="100" x2="650" y2="100" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="50" y1="180" x2="650" y2="180" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="50" y1="260" x2="650" y2="260" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Y-axis labels */}
              <text x="40" y="28" textAnchor="end" fontSize="16" fill="#9ca3af" fontWeight="500">${maxPrice.toFixed(2)}</text>
              <text x="40" y="108" textAnchor="end" fontSize="16" fill="#9ca3af" fontWeight="500">${(minPrice + (maxPrice - minPrice) * 0.66).toFixed(2)}</text>
              <text x="40" y="188" textAnchor="end" fontSize="16" fill="#9ca3af" fontWeight="500">${(minPrice + (maxPrice - minPrice) * 0.33).toFixed(2)}</text>
              <text x="40" y="268" textAnchor="end" fontSize="16" fill="#9ca3af" fontWeight="500">${minPrice.toFixed(2)}</text>
              
              {/* Line path */}
              <motion.path
                d={`M ${priceHistory.map((day, i) => {
                  const x = 80 + (i * 85);
                  const pricePercent = (day.price - minPrice) / (maxPrice - minPrice);
                  const y = 260 - (pricePercent * 240);
                  return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
                }).join(' ')}`}
                stroke="url(#lineGradient)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              
              {/* Data points */}
              {priceHistory.map((day, i) => {
                const x = 80 + (i * 85);
                const pricePercent = (day.price - minPrice) / (maxPrice - minPrice);
                const y = 260 - (pricePercent * 240);
                return (
                  <g key={i}>
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="10"
                      fill="#8b5cf6"
                      stroke="white"
                      strokeWidth="4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                      className="cursor-pointer"
                    />
                    <text x={x} y="305" textAnchor="middle" fontSize="15" fill="#6b7280" fontWeight="600">
                      {day.day}
                    </text>
                    <motion.text 
                      x={x} 
                      y={y - 22} 
                      textAnchor="middle" 
                      fontSize="15" 
                      fill="#1f2937"
                      fontWeight="700"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      ${day.price.toFixed(2)}
                    </motion.text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Price ceiling: ${maxPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span>Price floor: ${minPrice.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Transparency Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🔍</span>
            Product Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Category</span>
              <span className="font-medium text-gray-900">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">SKU</span>
              <span className="font-medium text-gray-900 font-mono">{product.sku}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Base Price</span>
              <span className="font-medium text-gray-900">${product.originalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">AI Discount</span>
              <span className="font-medium text-green-600">-${(product.originalPrice - product.currentPrice).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Expires In</span>
              <span className="font-medium text-orange-600">{product.expiresIn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Updated</span>
              <span className="font-medium text-gray-900">2 hours ago</span>
            </div>
          </div>
        </motion.div>

        {/* Report Concern Button */}
        <motion.button
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setReportOpen(true)}
        >
          <span>🚨</span>
          Report a Pricing Concern
        </motion.button>

        {/* Team Info */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-sm font-semibold text-gray-900">Team 10</p>
          <p className="text-xs text-gray-500">Sami-ul Ahmed, Rohith Gokulakrishnan, Sohan Bekkam, Kedar Manoj</p>
        </motion.div>
      </div>

      {/* Report Modal */}
      {reportOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/50 flex items-end z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setReportOpen(false)}
        >
          <motion.div 
            className="bg-white w-full rounded-t-3xl p-6 max-w-md mx-auto"
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Report a Concern</h3>
            <p className="text-gray-600 mb-6">Help us maintain fair pricing. Your feedback goes directly to our ethics team.</p>
            
            <div className="space-y-4 mb-6">
              <button className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-colors">
                <p className="font-semibold text-gray-900">Price seems too high</p>
                <p className="text-sm text-gray-500">Compared to other stores or products</p>
              </button>
              <button className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-colors">
                <p className="font-semibold text-gray-900">Sudden price change</p>
                <p className="text-sm text-gray-500">Large unexpected increase</p>
              </button>
              <button className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-colors">
                <p className="font-semibold text-gray-900">Other concern</p>
                <p className="text-sm text-gray-500">Describe your issue</p>
              </button>
            </div>

            <button 
              className="w-full py-3 text-gray-600 font-medium"
              onClick={() => setReportOpen(false)}
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
