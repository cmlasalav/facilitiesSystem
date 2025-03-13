"use client";

import { useState, useEffect } from "react";
import NavigationButtons from "@/components/navigationButtons";
import ReportList from "@/components/reportList";
import FacilitiesForm from "@/components/facilitiesForm";
import StateChanger from "@/components/stateChanger";
import { getAllReports } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export default function FacilitiesDashboard() {
  const [reports, setReports] = useState([]);

  const loadReports = () => {
    // In a real app, you would fetch data from an API
    // For this demo, we'll use the mock data
    const allReports = getAllReports();
    setReports([...allReports]);
  };

  useEffect(() => {
    loadReports();

    // Set up an interval to refresh reports periodically
    const interval = setInterval(loadReports, 2000);
    return () => clearInterval(interval);
  }, []);

  const renderActions = (report) => {
    // Facilities can add scheduled date and comments, and mark as resolved
    return (
      <Card className="w-full mt-4 border-[hsl(var(--border))]">
        <CardContent className="pt-4">
          {report.status !== "resolved" && (
            <>
              <div className="mb-4">
                <StateChanger
                  report={report}
                  allowedStates={["received", "resolved"]}
                />
              </div>
              <FacilitiesForm report={report} />
            </>
          )}
          {report.status === "resolved" && (
            <div className="text-green-600 font-medium">
              This report has been resolved.
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Facilities Dashboard</h1>
        <p className="text-gray-500">Manage and resolve facility reports</p>
      </div>

      <NavigationButtons currentView="facilities" />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Reports</h2>
        <ReportList reports={reports} renderActions={renderActions} />
      </div>
    </div>
  );
}
