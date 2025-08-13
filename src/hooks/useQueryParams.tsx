import { useCallback, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useQueryParams = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useState<Record<string, string>>({});
  // Initialize params from URL on first render
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialParams = Object.fromEntries(searchParams.entries());
    setParams(initialParams);
  }, [location.search]);

  const updateParams = useCallback(
    (newParams: Record<string, string | string[] | undefined>) => {
      setParams((prev) => {
        // Handle array values by converting them to comma-separated strings
        const processedParams = Object.entries(newParams).reduce(
          (acc, [key, value]) => {
            if (Array.isArray(value)) {
              acc[key] = value.join(',');
            } else if (value !== undefined && value !== '') {
              acc[key] = value;
            } else {
              delete acc[key];
            }
            return acc;
          },
          { ...prev }
        );

        // Filter out undefined/empty values
        const cleanParams = Object.fromEntries(
          Object.entries(processedParams).filter(
            ([_, v]) => v !== undefined && v !== ''
          )
        );

        navigate(`?${new URLSearchParams(cleanParams).toString()}`, {
          replace: true,
        });

        return processedParams;
      });
    },
    [navigate]
  );
  // Helper function to get array values from comma-separated strings
  const getArrayParam = useCallback(
    (key: string): string[] => {
      const value = params[key];
      if (!value) return [];
      return value.split(',');
    },
    [params]
  );

  return {
    params,
    updateParams,
    getArrayParam,
  };
};

export default useQueryParams;
