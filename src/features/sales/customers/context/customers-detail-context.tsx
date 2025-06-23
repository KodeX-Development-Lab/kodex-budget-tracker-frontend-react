import React, { createContext, useContext, ReactNode, useState } from 'react';

interface CustomersDetailData {
  id: string;
  // Add your detail data fields here
}

interface CustomersDetailContextType {
  detailData: CustomersDetailData | null;
  loading: boolean;
  error: string | null;
  fetchDetail: (id: string) => Promise<void>;
  updateDetail: (data: Partial<CustomersDetailData>) => void;
  clearDetail: () => void;
}

const CustomersDetailContext = createContext<CustomersDetailContextType | undefined>(undefined);

interface CustomersDetailProviderProps {
  children: ReactNode;
}

export const CustomersDetailProvider: React.FC<CustomersDetailProviderProps> = ({ children }) => {
  const [detailData, setDetailData] = useState<CustomersDetailData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      // Add your API call here
      // const data = await fetchCustomersDetail(id);
      // setDetailData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateDetail = (data: Partial<CustomersDetailData>) => {
    if (detailData) {
      setDetailData({ ...detailData, ...data });
    }
  };

  const clearDetail = () => {
    setDetailData(null);
    setError(null);
  };

  const value = {
    detailData,
    loading,
    error,
    fetchDetail,
    updateDetail,
    clearDetail,
  };

  return (
    <CustomersDetailContext.Provider value={value}>
      {children}
    </CustomersDetailContext.Provider>
  );
};

export const useCustomersDetail = () => {
  const context = useContext(CustomersDetailContext);
  if (context === undefined) {
    throw new Error('useCustomersDetail must be used within a CustomersDetailProvider');
  }
  return context;
};
