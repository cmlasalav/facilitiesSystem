// Mock users data
import Logo from "../../public/Services.jpg";
export const users = [
  { id: "1", name: "John Doe", role: "employee" },
  { id: "2", name: "Jane Smith", role: "employee" },
  { id: "3", name: "Alice Johnson", role: "receptionist" },
  { id: "4", name: "Bob Brown", role: "facilities" },
];

// Mock reports data
export const reports = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "John Doe",
    description: "Broken air conditioner in meeting room A",
    status: "pending",
    createdAt: "2025-03-10T10:30:00Z",
    imageUrl: Logo,
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Jane Smith",
    description: "Flickering lights in the hallway",
    status: "received",
    createdAt: "2025-03-09T14:15:00Z",
    imageUrl: Logo,
  },
  {
    id: "3",
    employeeId: "1",
    employeeName: "John Doe",
    description: "Water leak in the kitchen",
    status: "resolved",
    createdAt: "2025-03-08T09:45:00Z",
    imageUrl: Logo,
    scheduledDate: "2025-03-09T11:00:00Z",
    comments: "Fixed the pipe and cleaned up the area.",
  },
];

// Helper functions to manipulate data
export function getReportsByEmployeeId(employeeId) {
  return reports.filter((report) => report.employeeId === employeeId);
}

export function getAllReports() {
  return [...reports];
}

export function updateReportStatus(reportId, status) {
  const reportIndex = reports.findIndex((report) => report.id === reportId);
  if (reportIndex !== -1) {
    // Create a new array with the updated report to ensure reactivity
    const updatedReport = {
      ...reports[reportIndex],
      status,
    };

    reports[reportIndex] = updatedReport;

    // In a real app, you would make an API call here
    console.log(`Report ${reportId} status updated to ${status}`);

    return updatedReport;
  }
  return undefined;
}

export function updateReportDetails(reportId, updates) {
  const reportIndex = reports.findIndex((report) => report.id === reportId);
  if (reportIndex !== -1) {
    reports[reportIndex] = {
      ...reports[reportIndex],
      ...updates,
    };
    return reports[reportIndex];
  }
  return undefined;
}

export function addReport(report) {
  const newReport = {
    ...report,
    id: (reports.length + 1).toString(),
  };
  reports.push(newReport);
  return newReport;
}
