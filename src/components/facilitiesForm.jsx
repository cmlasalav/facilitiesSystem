"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { updateReportDetails } from "@/lib/data";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function FacilitiesForm({ report }) {
  const [scheduledDate, setScheduledDate] = useState(
    report.scheduledDate?.split("T")[0] || ""
  );
  const [comments, setComments] = useState(report.comments || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Update the report with scheduled date and comments
      updateReportDetails(report.id, {
        status: "resolved",
        scheduledDate: scheduledDate
          ? new Date(scheduledDate).toISOString()
          : undefined,
        comments,
      });

      // Force a refresh to update all components
      router.refresh();
    } catch (error) {
      console.error("Failed to update report:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="scheduledDate" className="text-sm font-medium">
          Scheduled Date
        </label>
        <Input
          id="scheduledDate"
          type="date"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="comments" className="text-sm font-medium">
          Comments
        </label>
        <Textarea
          id="comments"
          placeholder="Add your comments..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="min-h-24"
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? (
            "Updating..."
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Resolved with Details
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
