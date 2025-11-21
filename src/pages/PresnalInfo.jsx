import React, { useState, useEffect } from 'react'
import { BiEdit, BiUser, BiMap, BiIdCard, BiGift, BiCreditCard, BiWallet, BiPlus, BiTrash, BiCamera } from 'react-icons/bi'
import { useApi } from '../context/ApiContext'

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const PersonalInfo = () => {
    const [activeSection, setActiveSection] = useState('profile')
    const [isEditing, setIsEditing] = useState(false)
    const [isAddingAddress, setIsAddingAddress] = useState(false)
    const [avatarError, setAvatarError] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)

    const { user, handleCreateAddress, handleGetAddress, addresses, updateProfile, handleDeleteAddress } = useApi();

    // Initialize userData with actual user data from context
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phone: '',
        profileAvatar: ""
    })

    const [newAddress, setNewAddress] = useState({
        addressType: 'Home',
        fullName: '',
        phoneNumber: '',
        address: '',
        location: '',
        city: '',
        state: '',
        pincode: '',
        landmark: '',
        isDefault: false
    })

    const [formData, setFormData] = useState(userData)

    // Update userData when user context changes
    useEffect(() => {
        if (user) {
            const updatedUserData = {
                firstName: user.firstname || user.firstName || user.name?.split(' ')[0] || '',
                lastName: user.lastname || user.lastName || user.name?.split(' ')[1] || '',
                gender: user.gender || '',
                email: user.email || '',
                phone: user.mobilenumber || user.phone || user.phoneNumber || '',
                profileAvatar: user.avatar,
            };

            setUserData(updatedUserData);
            setFormData(updatedUserData);
            
            // Reset avatar preview when user data loads
            setAvatarPreview(null);
            setAvatarError(false);
        }
    }, [user]);

    // Get avatar URL with fallback
    const getAvatarUrl = () => {
        if (user?.avatar && !avatarError) {
            // Check if it's a full URL or relative path
            if (user.avatar.startsWith('http')) {
                return `http://localhost:3000${user.avatar}`;
            } else {
                // If it's a relative path from backend, construct the full URL
                return `http://localhost:3000${user.avatar}`;
            }
        }
        return null;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }

            // Validate file size (5MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size should be less than 10MB');
                return;
            }

            setSelectedFile(file);
            setAvatarError(false);
            
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
        }
    };

    const handleSave = async () => {
        // Basic validation
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            alert('Please fill in both first name and last name');
            return;
        }

        if (!formData.phone.trim()) {
            alert('Please provide a mobile number');
            return;
        }

        try {
            setUploading(true);
            setSaveSuccess(false);

            const formDataToSend = new FormData();
            formDataToSend.append('firstname', formData.firstName.trim());
            formDataToSend.append('lastname', formData.lastName.trim());
            formDataToSend.append('gender', formData.gender);
            formDataToSend.append('mobilenumber', formData.phone.trim());

            // If a new avatar file is selected, append it with the correct field name "avatar"
            if (selectedFile) {
                formDataToSend.append('avatar', selectedFile);
            }

            console.log('Sending form data with:', {
                firstname: formData.firstName,
                lastname: formData.lastName,
                gender: formData.gender,
                mobilenumber: formData.phone,
                hasFile: !!selectedFile,
                fileName: selectedFile?.name
            });

            // Call the updateProfile function with FormData
            const result = await updateProfile(formDataToSend);

            if (result) {
                // Update local state with new data
                const updatedUserData = {
                    ...userData,
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    gender: formData.gender,
                    phone: formData.phone.trim(),
                    profileAvatar: result.user?.avatar || userData.profileAvatar
                };

                setUserData(updatedUserData);
                setFormData(updatedUserData);
                
                // Clean up the preview URL
                if (avatarPreview) {
                    URL.revokeObjectURL(avatarPreview);
                }
                setAvatarPreview(null);
                setAvatarError(false);
                setSelectedFile(null);
                
                // Only exit editing mode after everything is done
                setIsEditing(false);
                setSaveSuccess(true);
                
                console.log('Profile updated successfully');
                
                // Show success message temporarily
                setTimeout(() => setSaveSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
            // Don't exit editing mode on error
        } finally {
            setUploading(false);
        }
    }

    const handleCancel = () => {
        setFormData(userData);
        setIsEditing(false);
        setSelectedFile(null);
        
        // Clean up the preview URL
        if (avatarPreview) {
            URL.revokeObjectURL(avatarPreview);
        }
        setAvatarPreview(null);
        setAvatarError(false);
        setSaveSuccess(false);
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const handleAddressInputChange = (field, value) => {
        setNewAddress(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const handleAddAddress = async () => {
        // Validate address form
        if (!newAddress.fullName.trim() || !newAddress.phoneNumber.trim() || 
            !newAddress.address.trim() || !newAddress.pincode.trim() || 
            !newAddress.city.trim() || !newAddress.state.trim()) {
            alert('Please fill in all required address fields');
            return;
        }

        try {
            await handleCreateAddress(newAddress);
            // Refresh addresses list
            await handleGetAddress();
            
            setNewAddress({
                addressType: 'Home',
                fullName: '',
                phoneNumber: '',
                address: '',
                location: '',
                city: '',
                state: '',
                pincode: '',
                landmark: '',
                isDefault: false
            });
            setIsAddingAddress(false);
        } catch (error) {
            console.error('Error adding address:', error);
            alert('Failed to add address. Please try again.');
        }
    }

    const clickhandleDeleteAddress = async (addressId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                await handleDeleteAddress(addressId);
                // Refresh addresses after deletion
                await handleGetAddress();
            } catch (error) {
                console.error('Error deleting address:', error);
                alert('Failed to delete address. Please try again.');
            }
        }
    }

    const setDefaultAddress = (id) => {
        console.log('Setting default address:', id);
        // Implement set default address functionality
    }

    // Get user's display name
    const getUserDisplayName = () => {
        if (user?.firstname && user?.lastname) {
            return `${user.firstname} ${user.lastname}`;
        }
        if (user?.firstName && user?.lastName) {
            return `${user.firstName} ${user.lastName}`;
        }
        if (user?.name) {
            return user.name;
        }
        return 'User';
    }

    // Clean up object URLs on component unmount
    useEffect(() => {
        return () => {
            if (avatarPreview) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    useEffect(() => {
        handleGetAddress()
    }, [])

    return (
        <div className="bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Success Message */}
                {saveSuccess && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                        Profile updated successfully!
                    </div>
                )}
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            {/* Welcome Section */}
                            <div className="border-b border-gray-200 pb-4 mb-4">
                                <h1 className="text-lg font-semibold text-gray-900">Hello,</h1>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {getUserDisplayName()}
                                </h2>
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
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === 'profile'
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            Profile Information
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('address')}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === 'address'
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            Manage Addresses
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('pan')}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === 'pan'
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
                                                disabled={uploading}
                                                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <BiEdit className="w-4 h-4" />
                                                <span>{uploading ? 'Saving...' : 'Edit'}</span>
                                            </button>
                                        ) : (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleSave}
                                                    disabled={uploading}
                                                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {uploading ? 'Saving...' : 'Save'}
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    disabled={uploading}
                                                    className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Personal Information Form */}
                                <div className="p-6 space-y-6">
                                    {/* Avatar Section */}
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-4">
                                                <div className="relative">
                                                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-300">
                                                        {/* Show preview if file is selected */}
                                                        {avatarPreview ? (
                                                            <img
                                                                src={avatarPreview}
                                                                alt="Profile preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : 
                                                        /* Show existing avatar if available */
                                                        getAvatarUrl() ? (
                                                            <img
                                                                src={getAvatarUrl()}
                                                                alt="Profile"
                                                                className="w-full h-full object-cover"
                                                                onError={() => setAvatarError(true)}
                                                            />
                                                        ) : (
                                                            /* Fallback to icon */
                                                            <BiUser className="w-8 h-8 text-blue-600" />
                                                        )}
                                                    </div>
                                                    {isEditing && (
                                                        <label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                                            <BiCamera className="w-4 h-4" />
                                                            <input
                                                                id="avatar-upload"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleFileChange}
                                                                className="hidden"
                                                                disabled={uploading}
                                                                name="avatar"
                                                            />
                                                        </label>
                                                    )}
                                                    {uploading && (
                                                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    {isEditing ? (
                                                        <div className="flex flex-col md:flex-row gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    First Name *
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={formData.firstName}
                                                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                                                    disabled={uploading}
                                                                    placeholder="Enter first name"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Last Name *
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={formData.lastName}
                                                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                                                    disabled={uploading}
                                                                    placeholder="Enter last name"
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <h3 className="text-xl font-bold text-gray-900">
                                                                {userData.firstName} {userData.lastName}
                                                            </h3>
                                                            <p className="text-gray-600">{userData.email}</p>
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
                                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                                                        disabled={uploading}
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
                                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                                                        disabled={uploading}
                                                    />
                                                    <span className="text-gray-700">Female</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value=""
                                                        checked={!formData.gender || formData.gender === ''}
                                                        onChange={(e) => handleInputChange('gender', e.target.value)}
                                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                                                        disabled={uploading}
                                                    />
                                                    <span className="text-gray-700">Prefer not to say</span>
                                                </label>
                                            </div>
                                        ) : (
                                            <p className="text-gray-700">{userData.gender || 'Not specified'}</p>
                                        )}
                                    </div>

                                    {/* Email Section */}
                                    <div className="border-t border-gray-200 pt-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-semibold text-gray-900">Email Address</h3>
                                        </div>
                                        <p className="text-gray-700">{userData.email}</p>
                                    </div>

                                    {/* Phone Section */}
                                    <div className="border-t border-gray-200 pt-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-semibold text-gray-900">Mobile Number *</h3>
                                        </div>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                                disabled={uploading}
                                                placeholder="Enter mobile number"
                                            />
                                        ) : (
                                            <p className="text-gray-700">{userData.phone || 'Not provided'}</p>
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
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.fullName}
                                                        onChange={(e) => handleAddressInputChange('fullName', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Enter full name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                                    <input
                                                        type="tel"
                                                        value={newAddress.phoneNumber}
                                                        onChange={(e) => handleAddressInputChange('phoneNumber', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.pincode}
                                                        onChange={(e) => handleAddressInputChange('pincode', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Enter pincode"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                                                    <select
                                                        value={newAddress.addressType}
                                                        onChange={(e) => handleAddressInputChange('addressType', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="Home">Home</option>
                                                        <option value="Work">Work</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Complete Address *</label>
                                                    <textarea
                                                        value={newAddress.address}
                                                        onChange={(e) => handleAddressInputChange('address', e.target.value)}
                                                        rows="3"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                                        placeholder="Enter complete address"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.city}
                                                        onChange={(e) => handleAddressInputChange('city', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Enter city"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.state}
                                                        onChange={(e) => handleAddressInputChange('state', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Enter state"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.landmark}
                                                        onChange={(e) => handleAddressInputChange('landmark', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Enter landmark (optional)"
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
                                        {addresses && addresses.length > 0 ? (
                                            addresses.map((address) => (
                                                <div key={address._id} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-3 mb-2">
                                                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                                                                    {address.addressType}
                                                                </span>
                                                                {address.isDefault && (
                                                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                                                                        DEFAULT
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="font-medium text-gray-900">{address.fullName}</p>
                                                            <p className="text-gray-600">{address.phoneNumber}</p>
                                                            <p className="text-gray-600 mt-1">{address.address}</p>
                                                            <p className="text-gray-600">
                                                                {address.city}, {address.state} - {address.pincode}
                                                            </p>
                                                            {address.landmark && (
                                                                <p className="text-gray-600">Landmark: {address.landmark}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            {!address.isDefault && (
                                                                <button
                                                                    onClick={() => setDefaultAddress(address._id)}
                                                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                                >
                                                                    Set as Default
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => clickhandleDeleteAddress(address._id)}
                                                                className="text-red-600 hover:text-red-700 p-1"
                                                                title="Delete address"
                                                            >
                                                                <BiTrash className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
                                                <BiMap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-500">No addresses found. Add your first address!</p>
                                            </div>
                                        )}
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