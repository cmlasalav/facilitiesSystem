"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import NavigationButtons from "@/components/navigationButtons";
import ReportList from "@/components/reportList";
import { getReportsByEmployeeId } from "@/lib/data";
import { useRouter } from "next/navigation";

export default function EmployeeDashboard() {
  const [reports, setReports] = useState([]);
  const router = useRouter();

  const loadReports = () => {
    // In a real app, you would fetch data from an API
    // For this demo, we'll use the mock data
    const employeeReports = getReportsByEmployeeId("1"); // Hardcoded for demo
    setReports(employeeReports);
  };

  useEffect(() => {
    loadReports();

    // Set up an interval to refresh reports periodically
    const interval = setInterval(loadReports, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Employee Dashboard</h1>
          <p className="text-gray-500">View and manage your facility reports</p>
        </div>
        <Button
          onClick={() => router.push("/employee/report")}
          className="mt-4 md:mt-0 flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Create New Report
        </Button>
      </div>

      <NavigationButtons currentView="employee" />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Reports</h2>
        <ReportList reports={reports} />
      </div>
    </div>
  );
}
