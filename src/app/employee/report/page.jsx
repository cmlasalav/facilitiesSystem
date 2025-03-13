import CreateReportForm from "@/components/reportForm";

export default function CreateReportPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Create New Report</h1>
      <CreateReportForm />
    </div>
  );
}
