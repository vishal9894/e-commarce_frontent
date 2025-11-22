import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ApiContext = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [activeAddress, setActiveAddress] = useState([])
    const [phones, setPhones] = useState([]);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await axios.get(`${baseUrl}/user/getprofile`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                withCredentials: true
            });

            console.log(response.data, "fetch profile ");
            setIsAuthenticated(true);
            setUser(response.data.user);

        } catch (error) {
            console.log("Profile fetch error:", error);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const updateProfile = async (formData) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(`${baseUrl}/user/update/${user._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
                withCredentials: true
            });

            console.log(response.data);
            return response.data; // Return the response data

        } catch (error) {
            console.log(error);
            throw error; // Throw error to handle in component
        }
    }

    const handleCreateAddress = async (newAddress) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await axios.post(`${baseUrl}/user/add-address`,
                {
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
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    withCredentials: true
                }
            );

            console.log("Address created:", response.data);

            // Refresh user data to get updated addresses
            await handleGetAddress();
            await handleActiveAddress();

            return response.data;

        } catch (error) {
            console.log("Address creation error:", error);
            throw error; // Re-throw to handle in component
        }
    };


    const handleGetAddress = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${baseUrl}/user/get-address`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                withCredentials: true
            })
            console.log(response.data.responseData);
            setAddresses(response.data.responseData)

        } catch (error) {
            console.log(error);

        }
    }



    const handleActiveAddress = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${baseUrl}/user/get-active-address`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                withCredentials: true
            })
            setActiveAddress(response.data.activeAddress)
            console.log(response.data);

        } catch (error) {
            console.log(error);

        }
    }

    const handleDeleteAddress = async (paramID) => {
        const token = localStorage.getItem("token");


        try {
            const response = await axios.delete(`${baseUrl}/user/delete-address/${paramID}`, {
                headers: {
                    "Content-Type": "applicaiton/json",
                    "Authorization": `Bearer ${token}`
                },
                withCredentials: true
            })
            await handleGetAddress();
            console.log(response.data);

        } catch (error) {
            console.log(error);

        }
    }


    // porducts

    const handleFetchProducts = async (category) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${baseUrl}/product/get-product/${category}`, {
                headers: {
                    "Content-Type": "applicaiton/json",
                    "Authorization": `Bearer ${token}`
                },
                withCredentials: true
            })
            console.log(response.data, "fethc porducts");
            setPhones(response.data.product)

        } catch (error) {
            console.log(error);

        }
    }


    const handleUpdateWishlist = async ({ id, likedPhones }) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(`${baseUrl}/product/update-wishlist/${id}`, {
                wishlist: likedPhones
            }, {
                headers: {
                    "Content-Type": "applicaiton/json",
                    "Authorization": `Bearer ${token}`
                },
                withCredentials: true

            })
            res.status(200).json({message : "fetch wishlist " , response})

        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        fetchProfile();
        handleActiveAddress();
    }, []);

    const handleLogout = async () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setUser(null);
        window.location.reload();
    }

    const value = {
        isAuthenticated,
        user,
        handleLogout,
        updateProfile,
        handleCreateAddress,
        handleGetAddress,
        loading,
        addresses, activeAddress,
        handleDeleteAddress,
        phones,
        handleFetchProducts
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useApi = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useApi must be used within an ApiContext");
    }
    return context;
}

export default ApiContext;