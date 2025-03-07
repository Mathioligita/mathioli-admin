// // import { createContext } from "react";

// // const userContext = createContext();

// // export default userContext;
// // context/userContext.tsx
// // src/app/ui/context/usecontext.tsx
// "use client"
// import React, { createContext, useState, useContext, ReactNode } from 'react';

// interface UserContextProps {
//     textColor: string;
//     fontFamily: string;
//     backgroundColor: string;
//     setTextColor: (color: string) => void;
//     setFontFamily: (font: string) => void;
//     setBackgroundColor: (color: string) => void;
// }

// const userContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [textColor, setTextColor] = useState<string>('black');
//     const [fontFamily, setFontFamily] = useState<string>('Arial');
//     const [backgroundColor, setBackgroundColor] = useState<string>('#151c2c');

//     return (
//         <userContext.Provider value={{ textColor, fontFamily, backgroundColor, setTextColor, setFontFamily, setBackgroundColor }}>
//             {children}
//         </userContext.Provider>
//     );
// };

// export const useUserContext = () => {
//     const context = useContext(userContext);
//     if (!context) {
//      Error('useUserContext must be used within a UserProvider');
//     }
//     return context;
// };
"use client";
import React, { createContext, useState, useContext } from "react";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [textColor, setTextColor] = useState("black");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [backgroundColor, setBackgroundColor] = useState("#151c2c");

  return (
    <userContext.Provider
      value={{
        textColor,
        fontFamily,
        backgroundColor,
        setTextColor,
        setFontFamily,
        setBackgroundColor,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
