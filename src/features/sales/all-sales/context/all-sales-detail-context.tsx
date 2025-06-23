import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AllSalesDetailData {
  id: string;
  // Add your detail data fields here
}

interface AllSalesDetailContextType {
  detailData: AllSalesDetailData | null;
  loading: boolean;
  error: string | null;
  fetchDetail: (id: string) => Promise<void>;
  updateDetail: (data: Partial<AllSalesDetailData>) => void;
  clearDetail: () => void;
}

const AllSalesDetailContext = createContext<AllSalesDetailContextType | undefined>(undefined);

interface AllSalesDetailProviderProps {
  children: ReactNode;
}

export const AllSalesDetailProvider: React.FC<AllSalesDetailProviderProps> = ({ children }) => {
  const [detailData, setDetailData] = useState<AllSalesDetailData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      // Add your API call here
      // const data = await fetchAllSalesDetail(id);
      // setDetailData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateDetail = (data: Partial<AllSalesDetailData>) => {
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
    <AllSalesDetailContext.Provider value={value}>
      {children}
    </AllSalesDetailContext.Provider>
  );
};

export const useAllSalesDetail = () => {
  const context = useContext(AllSalesDetailContext);
  if (context === undefined) {
    throw new Error('useAllSalesDetail must be used within a AllSalesDetailProvider');
  }
  return context;
};
