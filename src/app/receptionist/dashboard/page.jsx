"use client";

import { useState, useEffect } from "react";
import NavigationButtons from "@/components/navigationButtons";
import ReportList from "@/components/reportList";
import StateChanger from "@/components/stateChanger";
import { getAllReports } from "@/lib/data";

export default function ReceptionistDashboard() {
  const [reports, setReports] = useState([]);

  // Add a function to refresh reports
  const refreshReports = () => {
    const allReports = getAllReports();
    setReports([...allReports]); // Create a new array to trigger re-render
  };

  useEffect(() => {
    refreshReports();

    // Set up an interval to refresh reports periodically
    const interval = setInterval(refreshReports, 2000);
    return () => clearInterval(interval);
  }, []);

  const renderActions = (report) => {
    // Receptionist can change status to received or resolved
    return (
      <StateChanger report={report} allowedStates={["received", "resolved"]} />
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Receptionist Dashboard</h1>
        <p className="text-gray-500">Manage all facility reports</p>
      </div>

      <NavigationButtons currentView="receptionist" />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Reports</h2>
        <ReportList reports={reports} renderActions={renderActions} />
      </div>
    </div>
  );
}
