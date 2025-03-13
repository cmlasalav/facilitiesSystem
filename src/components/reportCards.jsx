import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function ReportCard({ report, children }) {
  const statusConfig = {
    pending: {
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      label: "En espera",
      icon: Clock,
    },
    received: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      label: "Recibido",
      icon: AlertCircle,
    },
    resolved: {
      color: "bg-green-100 text-green-800 border-green-200",
      label: "Solucionado",
      icon: CheckCircle,
    },
  };

  const config = statusConfig[report.status];
  const StatusIcon = config.icon;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">
            {report.description}
          </CardTitle>
          <Badge className={config.color}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>
        <div className="text-sm text-gray-500">
          Reported by: {report.employeeName}
        </div>
        <div className="text-sm text-gray-500">
          Created: {formatDate(report.createdAt)}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {report.imageUrl && (
          <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden">
            <Image
              src={report.imageUrl || "/placeholder.svg"}
              alt="Report image"
              fill
              className="object-cover"
            />
          </div>
        )}

        {report.scheduledDate && (
          <div className="mt-2">
            <span className="font-medium">Scheduled date:</span>{" "}
            {formatDate(report.scheduledDate)}
          </div>
        )}

        {report.comments && (
          <div className="mt-2">
            <span className="font-medium">Comments:</span>
            <p className="text-gray-700 mt-1">{report.comments}</p>
          </div>
        )}
      </CardContent>
      {children && <CardFooter>{children}</CardFooter>}
    </Card>
  );
}
