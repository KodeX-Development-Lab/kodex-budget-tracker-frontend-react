import React, { createContext, useContext, ReactNode } from 'react';

interface AllSalesContextType {
  // Add your context properties here
}

const AllSalesContext = createContext<AllSalesContextType | undefined>(undefined);

interface AllSalesProviderProps {
  children: ReactNode;
}

export const AllSalesProvider: React.FC<AllSalesProviderProps> = ({ children }) => {
  // Add your context logic here
  
  return (
    <AllSalesContext.Provider value={{}}>
      {children}
    </AllSalesContext.Provider>
  );
};

export const useAllSales = () => {
  const context = useContext(AllSalesContext);
  if (context === undefined) {
    throw new Error('useAllSales must be used within a AllSalesProvider');
  }
  return context;
};
