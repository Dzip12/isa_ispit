"use client";

import {createContext, useContext, useEffect, useState} from "react";

const authContext = createContext();

const decodeToken = (token) => {
    try {
        const payload = token.split(".")[1];
        const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
        const paddedPayload = normalizedPayload.padEnd(normalizedPayload.length + (4 - normalizedPayload.length % 4) % 4, "=");

        return JSON.parse(atob(paddedPayload));
    } catch {
        return null;
    }
}

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const setAuthToken = (newToken, newRefreshToken) => {
        const decoded = decodeToken(newToken);

        localStorage.setItem("token", newToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        setToken(newToken);
        setUser(decoded);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setToken(null);
        setUser(null);
    }

    const hasRole = (roleName) => {
        return user?.roles?.some((role) => role.name === roleName);
    }

    useEffect(() => {
        const savedToken = localStorage.getItem("token");

        if (savedToken) {
            setToken(savedToken);
            setUser(decodeToken(savedToken));
        }
    }, []);

    return (
        <authContext.Provider value={{token, user, setAuthToken, logout, hasRole}}>
            {children}
        </authContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(authContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}

export {AuthProvider, useAuth};
