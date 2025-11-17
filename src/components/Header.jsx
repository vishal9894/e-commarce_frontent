import React from 'react'
import { 
    BiMenuAltLeft, 
    BiSearch, 
    BiUser, 
    BiCart, 
    BiMap, 
    BiPackage, 
    BiTag,
    BiHeart,
    BiChevronDown
} from 'react-icons/bi'

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-blue-50 to-gray-50 shadow-sm border-b border-gray-200">
            {/* Top Bar */}
            <div className="bg-blue-100 text-blue-800 py-2 px-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm space-y-1 sm:space-y-0">
                    <div className="font-medium flex items-center">
                        <span className="text-blue-600">🎉</span>
                        <span className="ml-1 text-xs sm:text-sm">Welcome to Worldwide VishalMart</span>
                    </div>
                    <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
                        <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer transition-colors">
                            <BiMap className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm">Delivery to 404040</span>
                        </div>
                        <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer transition-colors">
                            <BiPackage className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm">Track your order</span>
                        </div>
                        <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer transition-colors">
                            <BiTag className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm">All offers</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                <div className="flex flex-col lg:flex-row items-center justify-between space-y-3 sm:space-y-4 lg:space-y-0">
                    {/* Left Section - Logo and Menu */}
                    <div className="flex items-center justify-between w-full lg:w-auto">
                        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                            <div className="flex items-center space-x-1 sm:space-x-2 text-blue-700 hover:text-blue-800 cursor-pointer transition-colors">
                                <BiMenuAltLeft className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                                <span className="font-bold text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                    VishalMart
                                </span>
                            </div>
                        </div>
                        
                        {/* Mobile Search Toggle - Hidden on desktop */}
                        <div className="lg:hidden flex items-center space-x-3">
                            <BiSearch className="w-5 h-5 text-gray-600" />
                            <BiCart className="w-5 h-5 text-gray-600 relative">
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                                    3
                                </span>
                            </BiCart>
                        </div>
                    </div>

                    {/* Center Section - Search Bar */}
                    <div className="w-full lg:flex-1 lg:max-w-2xl lg:mx-4 xl:mx-8">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search for products, brands and more..."
                                className="w-full px-3 sm:px-4 py-2 sm:py-2 lg:py-3 pl-9 sm:pl-10 lg:pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white text-gray-800 placeholder-gray-500 shadow-sm text-xs sm:text-sm lg:text-base"
                            />
                            <BiSearch className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                        </div>
                    </div>

                    {/* Right Section - User Actions */}
                    <div className="flex items-center justify-between w-full lg:w-auto space-x-2 sm:space-x-3 lg:space-x-4 xl:space-x-6">
                        {/* Login/Signup - Full text on medium+, icon only on small */}
                        <button className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 sm:px-3 lg:px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm text-xs sm:text-sm lg:text-base">
                            <BiUser className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                            <span className="hidden sm:inline">Login</span>
                            <BiChevronDown className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 hidden sm:block" />
                        </button>

                        {/* Wishlist - Text hidden on small screens */}
                        <div className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                            <BiHeart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                            <span className="text-xs lg:text-sm font-medium hidden md:block">Wishlist</span>
                        </div>

                        {/* Cart - Text hidden on small screens */}
                        <div className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors relative">
                            <BiCart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                            <span className="text-xs lg:text-sm font-medium hidden md:block">Cart</span>
                            <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                                3
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header