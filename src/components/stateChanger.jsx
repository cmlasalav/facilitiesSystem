"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateReportStatus } from "@/lib/data";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function StateChanger({ report, allowedStates }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(report.status);
  const router = useRouter();

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);

    try {
      // Update the report status
      const updatedReport = updateReportStatus(report.id, newStatus);

      if (updatedReport) {
        // Update local state to show immediate feedback
        setCurrentStatus(newStatus);
        // Force a refresh to update all components
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const statusConfig = {
    pending: {
      label: "En espera",
      icon: Clock,
      variant: "outline",
      color: "text-yellow-600",
    },
    received: {
      label: "Recibido",
      icon: AlertCircle,
      variant: "outline",
      color: "text-blue-600",
    },
    resolved: {
      label: "Solucionado",
      icon: CheckCircle,
      variant: "outline",
      color: "text-green-600",
    },
  };

  return (
    <div className="flex flex-wrap gap-2">
      {allowedStates.map((status) => {
        const config = statusConfig[status];
        const isActive = currentStatus === status;
        const Icon = config.icon;

        return (
          <Button
            key={status}
            variant={isActive ? "default" : "outline"}
            size="sm"
            disabled={isUpdating || isActive}
            onClick={() => handleStatusChange(status)}
            className={`transition-all ${isActive ? "" : config.color}`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {config.label}
          </Button>
        );
      })}
    </div>
  );
}
