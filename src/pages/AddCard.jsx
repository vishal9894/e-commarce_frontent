import React, { useEffect, useState } from 'react'
import { BiHeart, BiTrash, BiCart, BiStar, BiCheck, BiShare } from 'react-icons/bi'
import { useApi } from '../context/ApiContext'
import { FaHeart } from 'react-icons/fa'

const AddCard = () => {
  const { cardItems , cardItemsCount } = useApi()

 

  const handleRemove = (id) => {
    // remove from wishlist api logic here
    console.log("Removed", id)
  }

  const handleAddToCart = (id) => {
    console.log("Add to cart", id)
  }

  return (
    <div className="max-w-7xl mx-auto my-12 space-y-6">
      {cardItems && cardItems.length > 0 ? (
        cardItems.map((item) => (
          <div key={item._id} className="p-6 border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Image */}
              <div className="lg:w-1/4 relative">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 h-64 flex items-center justify-center">
                  <img
                    src={`http://localhost:3000/uploads/${item.image}`}
                    alt={item.brand}
                    className="w-full h-48 object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
                {item.offers > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                    {item.offers}% OFF
                  </div>
                )}

                {/* Heart / Remove */}
                <button
                  onClick={() => handleRemove(item._id)}
                  className="absolute top-5 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <FaHeart className="w-5 h-5 fill-red-500" />
                </button>
              </div>

              {/* Details */}
              <div className="lg:w-2/4 flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition cursor-pointer">
                  {item.brand}
                </h2>
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition cursor-pointer">
                  {item.category}
                </h2>

                {/* Rating */}
                {item.rating && (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                      <span className="font-semibold text-green-700 text-sm">{item.rating}</span>
                      <BiStar className="w-4 h-4 fill-green-600" />
                    </div>
                    <span className="text-gray-600 text-sm">{item.reviews} Ratings</span>
                  </div>
                )}

                {/* Static Feature example */}
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex gap-2 items-center"><BiCheck className="text-green-500" /> Return Available</div>
                  <div className="flex gap-2 items-center"><BiCheck className="text-green-500" /> Fast Delivery</div>
                </div>
              </div>

              {/* Price & Buttons */}
              <div className="lg:w-1/4 flex flex-col justify-between border-t lg:border-l lg:border-t-0 border-gray-200 pt-4 lg:pt-0 lg:pl-6">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">₹{item.price?.toLocaleString()}</span>
                    {item.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${Math.round(item.price * (1 + item.discount / 100))}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  >
                    Buy Now
                  </button>

                  <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-gray-400 transition">
                    <BiShare className="w-4 h-4" /> SHARE
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                  >
                    <BiTrash className="w-4 h-4" /> Remove from Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-lg font-semibold text-gray-600">No items in wishlist</p>
      )}
    </div>
  )
}

export default AddCard
