import React, { useState } from 'react';
import { FaShoppingCart, FaHeart, FaStar, FaChevronRight } from 'react-icons/fa';
import { useApi } from '../context/ApiContext';

const PhoneCard = () => {
    const [likedPhones, setLikedPhones] = useState({});
    const [showAll, setShowAll] = useState(false); // ⭐ NEW STATE

    const {phones} = useApi()

    const toggleLike = (phoneId) => {
        setLikedPhones(prev => ({
            ...prev,
            [phoneId]: !prev[phoneId]
        }));
    };

    // const phones = [
    //     {
    //         id: 1,
    //         brand: "Apple",
    //         name: "iPhone 15 Pro",
    //         price: 999,
    //         originalPrice: 1199,
    //         discount: 17,
    //         image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.8,
    //         storage: "128GB"
    //     },
    //     {
    //         id: 2,
    //         brand: "Samsung",
    //         name: "Galaxy S23 Ultra",
    //         price: 899,
    //         originalPrice: 1099,
    //         discount: 18,
    //         image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.7,
    //         storage: "256GB"
    //     },
    //     {
    //         id: 3,
    //         brand: "Google",
    //         name: "Pixel 8 Pro",
    //         price: 799,
    //         originalPrice: 899,
    //         discount: 11,
    //         image: "https://images.unsplash.com/photo-1695048133148-6f67bd727e71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.6,
    //         storage: "128GB"
    //     },
    //     {
    //         id: 4,
    //         brand: "OnePlus",
    //         name: "11 5G",
    //         price: 699,
    //         originalPrice: 799,
    //         discount: 13,
    //         image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.5,
    //         storage: "256GB"
    //     },
    //     {
    //         id: 5,
    //         brand: "Xiaomi",
    //         name: "13 Pro",
    //         price: 749,
    //         originalPrice: 849,
    //         discount: 12,
    //         image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.4,
    //         storage: "256GB"
    //     },
    //     {
    //         id: 6,
    //         brand: "Realme",
    //         name: "GT 2 Pro",
    //         price: 549,
    //         originalPrice: 649,
    //         discount: 15,
    //         image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.3,
    //         storage: "128GB"
    //     },
    //     {
    //         id: 7,
    //         brand: "Poco",
    //         name: "X5 Pro",
    //         price: 299,
    //         originalPrice: 349,
    //         discount: 14,
    //         image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.2,
    //         storage: "128GB"
    //     },
    //     {
    //         id: 8,
    //         brand: "Apple",
    //         name: "iPhone 14",
    //         price: 799,
    //         originalPrice: 999,
    //         discount: 20,
    //         image: "https://images.unsplash.com/photo-1663491338515-74b81be1d0a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.7,
    //         storage: "128GB"
    //     },
    //     {
    //         id: 9,
    //         brand: "Samsung",
    //         name: "Galaxy Z Flip5",
    //         price: 999,
    //         originalPrice: 1199,
    //         discount: 17,
    //         image: "https://images.unsplash.com/photo-1621330396173-e1095f1b0e1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.6,
    //         storage: "256GB"
    //     },
    //     {
    //         id: 10,
    //         brand: "Nothing",
    //         name: "Phone (2)",
    //         price: 599,
    //         originalPrice: 699,
    //         discount: 14,
    //         image: "https://images.unsplash.com/photo-1655720032677-ce9d76f5b77b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.4,
    //         storage: "256GB"
    //     },
    //     {
    //         id: 11,
    //         brand: "Realme",
    //         name: "Narzo 60 Pro",
    //         price: 249,
    //         originalPrice: 299,
    //         discount: 17,
    //         image: "https://images.unsplash.com/photo-1560672657-a0431178403f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.1,
    //         storage: "128GB"
    //     },
    //     {
    //         id: 12,
    //         brand: "Poco",
    //         name: "F5 Pro",
    //         price: 379,
    //         originalPrice: 449,
    //         discount: 16,
    //         image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.3,
    //         storage: "256GB"
    //     },
    //     {
    //         id: 13,
    //         brand: "Samsung",
    //         name: "Galaxy A54",
    //         price: 449,
    //         originalPrice: 499,
    //         discount: 10,
    //         image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.2,
    //         storage: "128GB"
    //     },
    //     {
    //         id: 14,
    //         brand: "Apple",
    //         name: "iPhone SE",
    //         price: 429,
    //         originalPrice: 479,
    //         discount: 10,
    //         image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.0,
    //         storage: "64GB"
    //     },
    //     {
    //         id: 15,
    //         brand: "Xiaomi",
    //         name: "Redmi Note 12",
    //         price: 199,
    //         originalPrice: 249,
    //         discount: 20,
    //         image: "https://images.unsplash.com/photo-1598327105740-820e04db502e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.1,
    //         storage: "128GB"
    //     },
    //     {
    //         id: 16,
    //         brand: "Realme",
    //         name: "C55",
    //         price: 179,
    //         originalPrice: 199,
    //         discount: 10,
    //         image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 3.9,
    //         storage: "128GB"
    //     },
    //     {
    //         id: 17,
    //         brand: "Poco",
    //         name: "M5s",
    //         price: 159,
    //         originalPrice: 179,
    //         discount: 11,
    //         image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 3.8,
    //         storage: "64GB"
    //     },
    //     {
    //         id: 18,
    //         brand: "Samsung",
    //         name: "Galaxy M34",
    //         price: 229,
    //         originalPrice: 279,
    //         discount: 18,
    //         image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.0,
    //         storage: "128GB"
    //     },
    //     {
    //         id: 19,
    //         brand: "Apple",
    //         name: "iPhone 13",
    //         price: 699,
    //         originalPrice: 799,
    //         discount: 13,
    //         image: "https://images.unsplash.com/photo-1632661674599-50156ac49d23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.5,
    //         storage: "128GB"
    //     },
    //     {
    //         id: 20,
    //         brand: "Google",
    //         name: "Pixel 7a",
    //         price: 499,
    //         originalPrice: 599,
    //         discount: 17,
    //         image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    //         rating: 4.3,
    //         storage: "128GB"
    //     }
    // ];

    // ⭐ Show only 5 if showAll is false
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

                    {visiblePhones.map((phone) => (
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
                                    <span className="text-lg font-bold text-gray-800">${phone.discountMrp}</span>
                                    <span className="text-sm text-gray-500 line-through">${phone.mpr}</span>
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
                    ))}

                </div>
            </div>
        </div>
    );
};

export default PhoneCard;
