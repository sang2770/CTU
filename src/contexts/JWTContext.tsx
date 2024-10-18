import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { setSession } from '../utils/jwt';
import { useTranslation } from 'react-i18next';
import { loginAuth } from '../services/authentication-services';

export interface AuthContextType {
    login: (loginRequest: any) => Promise<any>;
    logout: () => void;
    isAuthenticated: () => boolean;
}

export const AuthContext = createContext<AuthContextType>({
    login: async () => { },
    logout: () => { },
    isAuthenticated: () => true,
});


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const [accessToken, setAccesstoken] = useState<any>(localStorage.getItem('accessToken'))
    const [dataUser, setDataUser] = useState<any>(localStorage.getItem('_authenticatedUser'))

    useEffect(() => {
        const init = async () => {
            try {
                // const { pathname } = window.location
                const token = localStorage.getItem('accessToken')
                const data = JSON.parse(localStorage.getItem('_authenticatedUser'))

                setAccesstoken(token)
                setDataUser(data)

                if (accessToken) setSession(accessToken, JSON.stringify(data))
                // else if (pathname !== '/login') logout();
            } catch (error) {
                console.error(error);
            }
        }
        init()
    }, []);

    const login = async (loginRequest: any) => {
        try {
            const response = await loginAuth(loginRequest)
            setDataUser(response.data?.data)
            setAccesstoken(response.data.accessToken)
            if (response.status === 200 && response.data?.data?.accessToken && response.data?.data) {
                setSession(response.data?.data?.accessToken, JSON.stringify(response.data?.data))
                navigate(`/dashboard`)
                return { success: true,message:"Thành công" }
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: t("Lỗi khi gọi api đến server") }
        }
    };

    const logout = () => {
        setSession(null, null);
        localStorage.removeItem('accessToken');
        navigate("/login")
    };

    const isAuthenticated = () => {
        return accessToken !== null;
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                isAuthenticated,
            }}>
            {children}
        </AuthContext.Provider>
    )
};
