import React from 'react'
import { BiSearch, BiChevronRight } from 'react-icons/bi'

const OrderedProduct = () => {
    // Sample orders data
    const orders = [
        {
            id: 1,
            productName: "Vaseline Intensive Care Deep Moisture No...",
            price: "£264",
            status: "Delivered",
            deliveryDate: "Dec 17, 2024",
            image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop"
        },
        {
            id: 2,
            productName: "Bouti Drift+ Bluetooth Calling, 1.85” HD...",
            price: "£1,112",
            color: "Black Coffee",
            size: "1.85",
            status: "Delivered",
            deliveryDate: "Dec 08, 2024",
            image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop"
        },
        {
            id: 3,
            productName: "SURYAVIVA Photon 28 BK Toughened 2 Cast ...",
            price: "£1,153",
            status: "Delivered",
            deliveryDate: "Aug 16, 2024",
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=100&h=100&fit=crop"
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <nav className="flex text-sm text-gray-600">
                        <a href="#" className="hover:text-gray-900">Home</a>
                        <BiChevronRight className="w-4 h-4 mx-2 mt-0.5" />
                        <a href="#" className="hover:text-gray-900">My Account</a>
                        <BiChevronRight className="w-4 h-4 mx-2 mt-0.5" />
                        <span className="text-gray-900 font-medium">My Orders</span>
                    </nav>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
                            
                            {/* Order Status */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">ORDER STATUS</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-3">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded" />
                                        <span className="text-sm text-gray-700">On the way</span>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded" />
                                        <span className="text-sm text-gray-700">Delivered</span>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded" />
                                        <span className="text-sm text-gray-700">Cancelled</span>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded" />
                                        <span className="text-sm text-gray-700">Returned</span>
                                    </label>
                                </div>
                            </div>

                            {/* Order Time */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">ORDER TIME</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-3">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded" />
                                        <span className="text-sm text-gray-700">Last 30 days</span>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded" />
                                        <span className="text-sm text-gray-700">2024</span>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded" />
                                        <span className="text-sm text-gray-700">2023</span>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded" />
                                        <span className="text-sm text-gray-700">Older</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {/* Search Bar */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Search your orders here"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                        </div>

                        {/* Orders List */}
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                    {/* Order Header */}
                                    <div className="border-b border-gray-200 px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-sm text-gray-600">Delivered on {order.deliveryDate}</span>
                                                <p className="text-sm text-green-600 font-medium">Your item has been delivered</p>
                                            </div>
                                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                Rate & Review Product
                                            </button>
                                        </div>
                                    </div>

                                    {/* Order Details */}
                                    <div className="p-6">
                                        <div className="flex items-start space-x-4">
                                            {/* Product Image */}
                                            <div className="flex-shrink-0">
                                                <img 
                                                    src={order.image} 
                                                    alt={order.productName}
                                                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                                />
                                            </div>
                                            
                                            {/* Product Info */}
                                            <div className="flex-1">
                                                <h3 className="text-lg font-medium text-gray-900 mb-1">
                                                    {order.productName}
                                                </h3>
                                                <p className="text-xl font-semibold text-gray-900 mb-2">
                                                    {order.price}
                                                </p>
                                                
                                                {/* Product Variants */}
                                                {order.color && order.size && (
                                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                        <span>Color: {order.color}</span>
                                                        <span>Size: {order.size}</span>
                                                    </div>
                                                )}
                                                
                                                {/* Special indicators for third product */}
                                                {order.id === 3 && (
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        <span className="text-red-600 text-sm font-medium">▼</span>
                                                        <span className="text-gray-500 text-sm">◎</span>
                                                        <span className="text-gray-600 text-sm">36</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col space-y-2">
                                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                                                    View Details
                                                </button>
                                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                                                    Buy Again
                                                </button>
                                                {order.status === "Delivered" && (
                                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                                                        Return
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center mt-8">
                            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                Load More Orders
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderedProduct