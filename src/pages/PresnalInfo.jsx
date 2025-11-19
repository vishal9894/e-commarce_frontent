import React, { useState } from 'react'
import { BiEdit, BiUser, BiMap, BiIdCard, BiGift, BiCreditCard, BiWallet, BiPlus, BiTrash } from 'react-icons/bi'

const PersonalInfo = () => {
    const [activeSection, setActiveSection] = useState('profile')
    const [isEditing, setIsEditing] = useState(false)
    const [isAddingAddress, setIsAddingAddress] = useState(false)
    
    const [userData, setUserData] = useState({
        firstName: 'Vishal',
        lastName: 'Kumar',
        gender: 'Male',
        email: 'vishalkumar662002@gmail.com',
        phone: '+917091804766'
    })

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            type: 'Home',
            name: 'Vishal Kumar',
            phone: '+917091804766',
            address: '123 Main Street, Apartment 4B',
            locality: 'Downtown',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
            landmark: 'Near Central Park',
            isDefault: true
        },
        {
            id: 2,
            type: 'Work',
            name: 'Vishal Kumar',
            phone: '+919876543210',
            address: '456 Business Park, Office No. 12',
            locality: 'MIDC',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400093',
            landmark: 'Opposite Tech Park',
            isDefault: false
        }
    ])

    const [newAddress, setNewAddress] = useState({
        type: 'Home',
        name: '',
        phone: '',
        address: '',
        locality: '',
        city: '',
        state: '',
        pincode: '',
        landmark: '',
        isDefault: false
    })

    const [formData, setFormData] = useState(userData)

    const handleSave = () => {
        setUserData(formData)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setFormData(userData)
        setIsEditing(false)
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleAddressInputChange = (field, value) => {
        setNewAddress(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleAddAddress = () => {
        if (newAddress.isDefault) {
            // Remove default from other addresses
            const updatedAddresses = addresses.map(addr => ({
                ...addr,
                isDefault: false
            }))
            setAddresses([...updatedAddresses, { ...newAddress, id: Date.now() }])
        } else {
            setAddresses([...addresses, { ...newAddress, id: Date.now() }])
        }
        
        setNewAddress({
            type: 'Home',
            name: '',
            phone: '',
            address: '',
            locality: '',
            city: '',
            state: '',
            pincode: '',
            landmark: '',
            isDefault: false
        })
        setIsAddingAddress(false)
    }

    const handleDeleteAddress = (id) => {
        setAddresses(addresses.filter(addr => addr.id !== id))
    }

    const setDefaultAddress = (id) => {
        const updatedAddresses = addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        }))
        setAddresses(updatedAddresses)
    }

    return (
        <div className=" bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            {/* Welcome Section */}
                            <div className="border-b border-gray-200 pb-4 mb-4">
                                <h1 className="text-lg font-semibold text-gray-900">Hello,</h1>
                                <h2 className="text-xl font-bold text-gray-900">Vishal Kumar</h2>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-1">
                                <div className="mb-2">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                        MY ORDERS
                                    </h3>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                        ACCOUNT SETTINGS
                                    </h3>
                                    <div className="space-y-1">
                                        <button
                                            onClick={() => setActiveSection('profile')}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                                activeSection === 'profile' 
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            Profile Information
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('address')}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                                activeSection === 'address' 
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            Manage Addresses
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('pan')}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                                activeSection === 'pan' 
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            PAN Card Information
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                        PAYMENTS
                                    </h3>
                                    <div className="space-y-1">
                                        <button className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                            Gift Cards
                                        </button>
                                        <button className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                            Saved UPI
                                        </button>
                                        <button className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                            Saved Cards
                                        </button>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {activeSection === 'profile' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                {/* Header */}
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                                        {!isEditing ? (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                                            >
                                                <BiEdit className="w-4 h-4" />
                                                <span>Edit</span>
                                            </button>
                                        ) : (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleSave}
                                                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Personal Information Form */}
                                <div className="p-6 space-y-6">
                                    {/* Name Section */}
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-4">
                                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <BiUser className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    {isEditing ? (
                                                        <div className="flex flex-col md:flex-row gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    First Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={formData.firstName}
                                                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Last Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={formData.lastName}
                                                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <h3 className="text-xl font-bold text-gray-900">
                                                                {userData.firstName} {userData.lastName}
                                                            </h3>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Gender Section */}
                                    <div className="border-t border-gray-200 pt-6">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Your Gender</h3>
                                        {isEditing ? (
                                            <div className="flex space-x-6">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="Male"
                                                        checked={formData.gender === 'Male'}
                                                        onChange={(e) => handleInputChange('gender', e.target.value)}
                                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="text-gray-700">Male</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="Female"
                                                        checked={formData.gender === 'Female'}
                                                        onChange={(e) => handleInputChange('gender', e.target.value)}
                                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="text-gray-700">Female</span>
                                                </label>
                                            </div>
                                        ) : (
                                            <p className="text-gray-700">{userData.gender}</p>
                                        )}
                                    </div>

                                    {/* Email Section */}
                                    <div className="border-t border-gray-200 pt-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-semibold text-gray-900">Email Address</h3>
                                            {!isEditing && (
                                                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-700">{userData.email}</p>
                                        )}
                                    </div>

                                    {/* Phone Section */}
                                    <div className="border-t border-gray-200 pt-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-semibold text-gray-900">Mobile Number</h3>
                                            {!isEditing && (
                                                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-700">{userData.phone}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'address' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                {/* Header */}
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-gray-900">Manage Addresses</h2>
                                        <button
                                            onClick={() => setIsAddingAddress(true)}
                                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            <BiPlus className="w-4 h-4" />
                                            <span>Add New Address</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Add New Address Form */}
                                    {isAddingAddress && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Address</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.name}
                                                        onChange={(e) => handleAddressInputChange('name', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        value={newAddress.phone}
                                                        onChange={(e) => handleAddressInputChange('phone', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.pincode}
                                                        onChange={(e) => handleAddressInputChange('pincode', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                                                    <select
                                                        value={newAddress.type}
                                                        onChange={(e) => handleAddressInputChange('type', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="Home">Home</option>
                                                        <option value="Work">Work</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Complete Address</label>
                                                    <textarea
                                                        value={newAddress.address}
                                                        onChange={(e) => handleAddressInputChange('address', e.target.value)}
                                                        rows="3"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Locality/Area</label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.locality}
                                                        onChange={(e) => handleAddressInputChange('locality', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.city}
                                                        onChange={(e) => handleAddressInputChange('city', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.state}
                                                        onChange={(e) => handleAddressInputChange('state', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.landmark}
                                                        onChange={(e) => handleAddressInputChange('landmark', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={newAddress.isDefault}
                                                            onChange={(e) => handleAddressInputChange('isDefault', e.target.checked)}
                                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-sm text-gray-700">Set as default address</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="flex space-x-3 mt-6">
                                                <button
                                                    onClick={handleAddAddress}
                                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                                >
                                                    Save Address
                                                </button>
                                                <button
                                                    onClick={() => setIsAddingAddress(false)}
                                                    className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Address List */}
                                    <div className="space-y-4">
                                        {addresses.map((address) => (
                                            <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                                                                {address.type}
                                                            </span>
                                                            {address.isDefault && (
                                                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                                                                    DEFAULT
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="font-medium text-gray-900">{address.name}</p>
                                                        <p className="text-gray-600">{address.phone}</p>
                                                        <p className="text-gray-600 mt-1">{address.address}</p>
                                                        <p className="text-gray-600">
                                                            {address.locality}, {address.city}, {address.state} - {address.pincode}
                                                        </p>
                                                        {address.landmark && (
                                                            <p className="text-gray-600">Landmark: {address.landmark}</p>
                                                        )}
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        {!address.isDefault && (
                                                            <button
                                                                onClick={() => setDefaultAddress(address.id)}
                                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                            >
                                                                Set as Default
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeleteAddress(address.id)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <BiTrash className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'pan' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">PAN Card Information</h2>
                                <p className="text-gray-600">PAN card management section coming soon...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo