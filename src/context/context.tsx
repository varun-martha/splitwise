import React, { createContext, ReactNode, useState } from "react";

type User = {
    username: string,
    email: string,
    mobileNumber: string
}

interface GlobalContextType {
    isLogin : boolean;
    setIsLoggedIn: (status: boolean) => void;
    user: User,
    setUser: (user: User) => void
}

const initalState: GlobalContextType = {
    isLogin: false,
    setIsLoggedIn: () => {},
    user: {
        username: '',
        email: '',
        mobileNumber: '',
    },
    setUser: () => {}
}

export const GlobalContext = createContext<GlobalContextType>(initalState);

interface GlobalProviderType {
    children: ReactNode
}

const GlobalProvider: React.FC<GlobalProviderType> = ({children}) => {

        const [isLogin, setIsLoggedIn] = useState(false);
        const [user, setUser] = useState<User>({
            username: '',
            email: '',
            mobileNumber: '',
        });

        const value = {
            isLogin, setIsLoggedIn, user, setUser
        }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;