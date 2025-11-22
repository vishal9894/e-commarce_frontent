import React, { useState } from 'react'
import { BiHeart, BiTrash, BiCart, BiStar, BiCheck, BiShare } from 'react-icons/bi'

const WishListCard = () => {
  const [isLoved, setIsLoved] = useState(true)
  
  const product = {
    id: 1,
    name: 'Samsung 55.88 cm Full HD LED Monitor with IPS Panel',
    price: 6799,
    originalPrice: 13700,
    discount: 50,
    rating: 4.4,
    reviews: '2,273 Ratings & 226 Reviews',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/in/ls22c310eawxxl/gallery/in-s3-series-ls22c310eawxxl-532683782?$650_519_PNG$',
    inStock: true,
    delivery: 'Free delivery Tomorrow',
    offers: ['Bank Offer', 'Exchange Offer']
  }

  const handleRemove = () => {
    setIsLoved(false)
  }

  const handleAddToCart = () => {
    // Add to cart logic
    console.log('Added to cart')
  }

  if (!isLoved) return null

  return (
    <div className=" max-w-7xl mx-auto my-12  p-6 mb-6 border border-gray-600">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Product Image Section */}
        <div className="lg:w-1/4 relative">
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 h-64 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain transform hover:scale-105 transition-transform duration-300"
            />
            
            {/* Discount Badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                {product.discount}% OFF
              </span>
            </div>

            {/* Love Button */}
            <button 
              onClick={handleRemove}
              className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-red-50 hover:text-red-500"
            >
              <BiHeart className={`w-5 h-5 ${isLoved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="lg:w-2/4 flex flex-col">
          {/* Product Name */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-blue-600 cursor-pointer transition-colors line-clamp-2">
            {product.name}
          </h2>

          {/* Rating Section */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <span className="text-green-700 font-bold text-sm">{product.rating}</span>
              <BiStar className="w-4 h-4 text-green-600 fill-current" />
            </div>
            <span className="text-gray-600 text-sm font-medium">{product.reviews}</span>
          </div>

          {/* Features */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <BiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 text-sm">IPS Panel | Full HD Resolution</span>
            </div>
            <div className="flex items-center gap-2">
              <BiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 text-sm">250 nits | 5ms Response Time</span>
            </div>
            <div className="flex items-center gap-2">
              <BiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 text-sm">3 Years Warranty</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="flex items-center gap-2 text-green-600 font-medium mb-4">
            <BiCheck className="w-5 h-5" />
            <span>{product.delivery}</span>
          </div>

          {/* Offers */}
          <div className="flex flex-wrap gap-2">
            {product.offers.map((offer, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                {offer}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Actions Section */}
        <div className="lg:w-1/4 lg:border-l lg:border-gray-200 lg:pl-6 flex flex-col justify-between">
          
          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            </div>
            <p className="text-green-600 font-semibold text-sm">You save ₹{(product.originalPrice - product.price).toLocaleString()}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <BiCart className="w-5 h-5" />
              ADD TO CART
            </button>
            
            <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2">
              <BiShare className="w-4 h-4" />
              SHARE
            </button>

            <button
              onClick={handleRemove}
              className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <BiTrash className="w-4 h-4" />
              Remove from Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishListCard