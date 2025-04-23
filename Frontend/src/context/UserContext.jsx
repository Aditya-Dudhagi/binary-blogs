import { createContext, useEffect, useState } from "react";


/* This creates a React Context.
Think of this as a global variable — we’ll use it to share the user state with any component. */
export const UserContext = createContext();


export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // On first load, check localStorage for token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ email: payload.email, id: payload.id });
    }
  }, []);
    
    const login = (token) => {
        localStorage.setItem("token", token)
        const payload = JSON.parse(atob(token.split(".")[1]))
        setUser({email: payload.email, id: payload.id})
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}