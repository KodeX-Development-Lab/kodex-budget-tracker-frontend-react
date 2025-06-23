import React, { createContext, useContext, ReactNode } from 'react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';

interface AllSalesFormData {
  // Add your form fields here
}

interface AllSalesFormContextType {
  // Add additional form context properties here
}

const AllSalesFormContext = createContext<AllSalesFormContextType | undefined>(undefined);

interface AllSalesFormProviderProps {
  children: ReactNode;
}

export const AllSalesFormProvider: React.FC<AllSalesFormProviderProps> = ({ children }) => {
  const methods = useForm<AllSalesFormData>();
  
  // Add your form context logic here
  
  return (
    <FormProvider {...methods}>
      <AllSalesFormContext.Provider value={{}}>
        {children}
      </AllSalesFormContext.Provider>
    </FormProvider>
  );
};

export const useAllSalesForm = () => {
  const context = useContext(AllSalesFormContext);
  if (context === undefined) {
    throw new Error('useAllSalesForm must be used within a AllSalesFormProvider');
  }
  return context;
};
