import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ApiContext = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user/getprofile`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                } ,
                withCredentials : true
            });
            console.log(response.data, "fetch profile ");
            setIsAuthenticated(true);
            setUser(response.data.user); 

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchProfile();
        }
    }, []);

    const value = {
        isAuthenticated,
        user 
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useApi = () => {
    const context = useContext(UserContext);
    return context;
}

export default ApiContext;