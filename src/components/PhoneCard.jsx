import React, { useState } from 'react';
import { FaShoppingCart, FaHeart, FaStar, FaChevronRight } from 'react-icons/fa';
import { useApi } from '../context/ApiContext';

const PhoneCard = () => {
    const [likedPhones, setLikedPhones] = useState({});
    const [showAll, setShowAll] = useState(false); // ⭐ NEW STATE

    const { phones } = useApi()

    const toggleLike = (phoneId) => {
        setLikedPhones(prev => ({
            ...prev,
            [phoneId]: !prev[phoneId]
        }));
    };
    const visiblePhones = showAll ? phones : phones.slice(0, 5);

    return (
        <div className=" bg-gray-50 py-8 px-4">

            {/* HEADER */}
            <div className="mt-10 px-2 flex items-center justify-between w-full">
                <h2 className="text-xl font-semibold text-gray-800 underline underline-offset-4">
                    Grab the best deal on <span className="text-blue-600">SmartPhones</span>
                </h2>

                {/* ⭐ View All / Hide Button */}
                <button
                    onClick={() => setShowAll(prev => !prev)}
                    className="text-blue-700 font-medium flex items-center gap-2 hover:underline"
                >
                    {showAll ? "Hide" : "View All"}
                    <FaChevronRight />
                </button>
            </div>

            {/* PHONE GRID */}
            <div className="max-w-7xl mx-auto mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                        lg:grid-cols-4 xl:grid-cols-5 gap-6">

                    {visiblePhones.length > 0 ? (
                        visiblePhones.map((phone) => (
                            <div
                                key={phone.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg 
                     transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                            >

                                {/* IMAGE */}
                                <div className="relative p-4 bg-gray-50">
                                    <img
                                        src={phone.image}
                                        alt={phone.name}
                                        className="w-full h-32 object-fill rounded-md"
                                    />

                                    {/* Discount */}
                                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                                        {phone.offers}% OFF
                                    </div>

                                    {/* Like Button */}
                                    <button
                                        onClick={() => toggleLike(phone.id)}
                                        className={`absolute top-2 right-2 p-1.5 rounded-full ${likedPhones[phone.id]
                                            ? "bg-red-500 text-white"
                                            : "bg-white/90 text-gray-600 hover:bg-white"
                                            }`}
                                    >
                                        <FaHeart className="w-3 h-3" />
                                    </button>

                                    {/* Brand */}
                                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                        {phone.brand}
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="p-3">
                                    <h3 className="text-sm font-semibold text-gray-800 truncate mb-1">
                                        {phone.productName}
                                    </h3>

                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1">
                                            <FaStar className="w-3 h-3 text-yellow-400" />
                                            <span className="text-xs font-semibold text-gray-800">{phone.rating}</span>
                                        </div>

                                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                            {phone.storage}
                                        </span>
                                    </div>

                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span className="text-lg font-bold text-gray-800">${phone.price}</span>
                                        <span className="text-sm text-gray-500 line-through">${phone.discount}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
                                            <FaShoppingCart className="w-3 h-3" />
                                            Add
                                        </button>
                                        <button className="flex-1 bg-gray-900 hover:bg-black text-white py-2 px-3 rounded-lg text-sm font-medium">
                                            Buy
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="text-center  text-gray-500 py-8">
                            No phones found
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PhoneCard;
