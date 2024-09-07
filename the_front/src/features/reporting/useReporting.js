import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const STORAGE_KEY = "reportingDateRange";

export function useReporting(queryKey, fetchFunction) {
  const [dateRange, setDateRange] = useState(() => {
    // eslint-disable-next-line no-undef
    const savedDateRange = localStorage.getItem(STORAGE_KEY);
    if (savedDateRange) {
      return JSON.parse(savedDateRange);
    }
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    return {
      startDate: formattedToday,
      endDate: formattedToday,
    };
  });

  useEffect(() => {
    // eslint-disable-next-line no-undef
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dateRange));
  }, [dateRange]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [queryKey, dateRange],
    queryFn: () => fetchFunction(dateRange.startDate, dateRange.endDate),
    enabled: !!dateRange.startDate && !!dateRange.endDate,
    staleTime: 30 * 60 * 1000, // This will keep the data fresh indefinitely
  });

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      refetch();
    }
  }, [dateRange, refetch]);

  const handleFilter = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  return { data, isLoading, error, dateRange, handleFilter };
}
