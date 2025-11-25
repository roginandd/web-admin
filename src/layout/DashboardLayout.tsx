import Sidebar from "../components/Sidebar";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashBoardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex  overflow-hidden overflow-y-hidden w- ">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
