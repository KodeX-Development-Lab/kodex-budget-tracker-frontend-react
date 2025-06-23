import React, { createContext, useContext, ReactNode, useState } from 'react';

interface SaleReturnsDetailData {
  id: string;
  // Add your detail data fields here
}

interface SaleReturnsDetailContextType {
  detailData: SaleReturnsDetailData | null;
  loading: boolean;
  error: string | null;
  fetchDetail: (id: string) => Promise<void>;
  updateDetail: (data: Partial<SaleReturnsDetailData>) => void;
  clearDetail: () => void;
}

const SaleReturnsDetailContext = createContext<SaleReturnsDetailContextType | undefined>(undefined);

interface SaleReturnsDetailProviderProps {
  children: ReactNode;
}

export const SaleReturnsDetailProvider: React.FC<SaleReturnsDetailProviderProps> = ({ children }) => {
  const [detailData, setDetailData] = useState<SaleReturnsDetailData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      // Add your API call here
      // const data = await fetchSaleReturnsDetail(id);
      // setDetailData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateDetail = (data: Partial<SaleReturnsDetailData>) => {
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
    <SaleReturnsDetailContext.Provider value={value}>
      {children}
    </SaleReturnsDetailContext.Provider>
  );
};

export const useSaleReturnsDetail = () => {
  const context = useContext(SaleReturnsDetailContext);
  if (context === undefined) {
    throw new Error('useSaleReturnsDetail must be used within a SaleReturnsDetailProvider');
  }
  return context;
};
