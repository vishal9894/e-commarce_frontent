import React, { useState, useRef, useEffect } from "react";
import {
  BiMenuAltLeft,
  BiSearch,
  BiUser,
  BiCart,
  BiMap,
  BiPackage,
  BiTag,
  BiHeart,
  BiChevronDown,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useApi } from "../context/ApiContext";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { handleLogout, activeAddress, user, wishlistCont, cardItemsCount } = useApi();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md border-b border-gray-200 w-full sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-100 text-blue-800 py-2 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-1 font-medium">
            🎉 <span>Welcome to Worldwide VishalMart</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
              <BiMap className="w-4 h-4" />
              <span>Deliver to {activeAddress?.address || "your address"}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
              <BiPackage className="w-4 h-4" />
              <span>Track Order</span>
            </div>
            <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
              <BiTag className="w-4 h-4" />
              <span>Offers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Menu + Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <BiMenuAltLeft className="w-6 h-6 text-blue-700 sm:w-7 sm:h-7" />
          <span className="font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            VishalMart
          </span>
        </Link>

        {/* Search */}
        <div className="hidden sm:flex flex-1 mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 text-sm bg-gray-50"
            />
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg shadow hover:brightness-110 text-sm"
            >
              <BiUser />
              <span className="hidden sm:block">
                {user?.firstname ? user.firstname : "Login"}
              </span>
              <BiChevronDown className="hidden sm:block" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl border rounded-lg py-2 z-50 animate-fadeIn">
                <Link to="/precnal_info">
                  <button className="flex w-full items-center gap-2 px-4 py-3 hover:bg-blue-50 text-sm text-gray-700">
                    <BiUser className="text-blue-600" /> Profile Info
                  </button>
                </Link>

                <Link to="/order_details">
                  <button className="flex w-full items-center gap-2 px-4 py-3 hover:bg-blue-50 text-sm text-gray-700">
                    <BiPackage className="text-blue-600" /> Delivery / Tracking
                  </button>
                </Link>

                <div className="border-t my-1" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-3 hover:bg-red-50 text-sm text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link to="/wish_list">
            <div className="relative flex items-center hover:text-blue-600 cursor-pointer">
              <BiHeart className="w-6 h-6" />
              <span className="hidden md:block ml-1 text-sm font-medium">Wishlist</span>
              {wishlistCont > 0 && (
                <span className="absolute -top-1 left-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCont}
                </span>
              )}
            </div>
          </Link>

          {/* Cart */}
          <Link to="/card_items">
            <div className="relative flex items-center hover:text-blue-600 cursor-pointer">
              <BiCart className="w-6 h-6" />
              <span className="hidden md:block ml-1 text-sm font-medium">Cart</span>
              {cardItemsCount > 0 && (
                <span className="absolute -top-1 left-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cardItemsCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Search (below icons) */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 pl-10 border rounded-lg bg-gray-50 text-sm"
          />
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;
