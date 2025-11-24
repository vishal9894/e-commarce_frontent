import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ApiContext = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [activeAddress, setActiveAddress] = useState([]);
    const [phones, setPhones] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [wishlistCont, setWishlistCont] = useState([]);
    const [cardItems, setCardItems] = useState([]);
    const [cardItemsCount, setCardItemsCount] = useState([]);

    // PROFILE
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await axios.get(`${baseUrl}/user/getprofile`, {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                withCredentials: true
            });

            setIsAuthenticated(true);
            setUser(response.data.user);

        } catch {
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const updateProfile = async (formData) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(`${baseUrl}/user/update/${user._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` },
                withCredentials: true
            });

            toast.success("Profile updated successfully 🎉");
            return response.data;

        } catch (error) {
            toast.error("Profile update failed ❌");
            throw error;
        }
    };

    // ADDRESS
    const handleCreateAddress = async (newAddress) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${baseUrl}/user/add-address`, {
                fullName: newAddress.name,
                phoneNumber: newAddress.phone,
                address: newAddress.address,
                location: newAddress.locality,
                city: newAddress.city,
                state: newAddress.state,
                pincode: newAddress.pincode,
                landmark: newAddress.landmark,
                addressType: newAddress.type,
                isDefault: newAddress.isDefault
            }, {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                withCredentials: true
            });

            toast.success("Address added successfully 🏠");
            await handleGetAddress();
            await handleActiveAddress();
            return response.data;

        } catch (error) {
            toast.error("Failed to add address ❌");
            throw error;
        }
    };

    const handleGetAddress = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${baseUrl}/user/get-address`, {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                withCredentials: true
            });

            setAddresses(response.data.responseData);
        } catch {
            toast.error("Failed to fetch addresses ❌");
        }
    };

    const handleActiveAddress = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${baseUrl}/user/get-active-address`, {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                withCredentials: true
            });

            setActiveAddress(response.data.activeAddress);
        } catch {
            toast.error("Failed to fetch active address ❌");
        }
    };

    const handleDeleteAddress = async (paramID) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${baseUrl}/user/delete-address/${paramID}`, {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                withCredentials: true
            });

            await handleGetAddress();
            toast.info("Address deleted ✂️");

        } catch {
            toast.error("Failed to delete address ❌");
        }
    };


    // PRODUCTS
    const handleFetchProducts = async (category) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${baseUrl}/product/get-product/${category}`, {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                withCredentials: true
            });

            setPhones(response.data.product);
        } catch {
            toast.error("Failed to fetch products ❌");
        }
    };


    // WISHLIST
    const handleUpdateWishlist = async (id, newLikedState) => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`${baseUrl}/product/update-wishlist/${id}`, {
                wishlist: newLikedState
            }, {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                withCredentials: true
            });

            toast.success(newLikedState ? "Added to Wishlist ❤️" : "Removed from Wishlist 💔");
            await handlegetWishlist();

        } catch {
            toast.error("Wishlist update failed ❌");
        }
    };

    const handlegetWishlist = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${baseUrl}/product/get-wishlist`, {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                withCredentials: true
            });

            const data = response.data.response;
            setWishlist(data);
            setWishlistCont(data.length);

        } catch {
            toast.error("Failed to fetch wishlist ❌");
        }
    };


    // CART
    const handlegetaddcard = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${baseUrl}/product/get-addcard`, {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                withCredentials: true
            });

            const data = response.data.response;
            setCardItems(data);
            setCardItemsCount(data.length);

        } catch {
            toast.error("Failed to fetch cart ❌");
        }
    };


    // AUTO LOAD
    useEffect(() => {
        fetchProfile();
        handleActiveAddress();
        handlegetWishlist();
        handlegetaddcard();
    }, []);


    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setUser(null);
        toast.info("Logged out successfully 👋");
        window.location.reload();
    };


    const value = {
        isAuthenticated,
        user,
        handleLogout,
        updateProfile,
        handleCreateAddress,
        handleGetAddress,
        loading,
        addresses,
        activeAddress,
        handleDeleteAddress,
        phones,
        handleFetchProducts,
        handleUpdateWishlist,
        wishlist,
        wishlistCont,
        cardItems,
        cardItemsCount
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useApi = () => useContext(UserContext);
export default ApiContext;
