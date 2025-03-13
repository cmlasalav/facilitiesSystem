import ReportCard from "./reportCards";

export default function ReportList({ reports, renderActions }) {
  if (reports.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No reports found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report}>
          {renderActions && renderActions(report)}
        </ReportCard>
      ))}
    </div>
  );
}
