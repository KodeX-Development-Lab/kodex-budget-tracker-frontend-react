import React, { createContext, useContext, ReactNode, useState } from 'react';

interface PurchaseReturnsDetailData {
  id: string;
  // Add your detail data fields here
}

interface PurchaseReturnsDetailContextType {
  detailData: PurchaseReturnsDetailData | null;
  loading: boolean;
  error: string | null;
  fetchDetail: (id: string) => Promise<void>;
  updateDetail: (data: Partial<PurchaseReturnsDetailData>) => void;
  clearDetail: () => void;
}

const PurchaseReturnsDetailContext = createContext<PurchaseReturnsDetailContextType | undefined>(undefined);

interface PurchaseReturnsDetailProviderProps {
  children: ReactNode;
}

export const PurchaseReturnsDetailProvider: React.FC<PurchaseReturnsDetailProviderProps> = ({ children }) => {
  const [detailData, setDetailData] = useState<PurchaseReturnsDetailData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      // Add your API call here
      // const data = await fetchPurchaseReturnsDetail(id);
      // setDetailData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateDetail = (data: Partial<PurchaseReturnsDetailData>) => {
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
    <PurchaseReturnsDetailContext.Provider value={value}>
      {children}
    </PurchaseReturnsDetailContext.Provider>
  );
};

export const usePurchaseReturnsDetail = () => {
  const context = useContext(PurchaseReturnsDetailContext);
  if (context === undefined) {
    throw new Error('usePurchaseReturnsDetail must be used within a PurchaseReturnsDetailProvider');
  }
  return context;
};
