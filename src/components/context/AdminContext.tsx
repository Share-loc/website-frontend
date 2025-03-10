import { getToken } from "@/const/func";
import { createContext, useContext, useEffect, useState } from "react";

interface AdminContextType {
  pendingItems: number;
  pendingReports: number;
  refreshItemsCounter: () => Promise<void>;
  refreshReportsCounter: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [pendingItems, setPendingItems] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);

  const fetchPendingItems = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/items/admin/all?status=waiting_for_approval`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const data = await response.json();
      setPendingItems(data.total);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des annonces en attente:",
        error
      );
    }
  };

  const fetchPendingReports = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/report?status=waiting_to_be_reviewed`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const data = await response.json();
      setPendingReports(data.total);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des signalements en attente:",
        error
      );
    }
  };

  useEffect(() => {
    fetchPendingItems();
    fetchPendingReports();
  }, []);

  const value = {
    pendingItems,
    pendingReports,
    refreshItemsCounter: fetchPendingItems,
    refreshReportsCounter: fetchPendingReports,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within a AdminProvider");
  }
  return context;
};
