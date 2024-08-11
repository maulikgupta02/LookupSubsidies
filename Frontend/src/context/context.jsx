import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [objectid,setObjectid]=useState("");
  return (
    <AppContext.Provider value={{ objectid,setObjectid}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);