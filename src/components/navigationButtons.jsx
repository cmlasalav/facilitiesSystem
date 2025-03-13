"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User, Building2, Wrench } from "lucide-react";

export default function NavigationButtons({ currentView }) {
  const router = useRouter();

  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant={currentView === "employee" ? "default" : "outline"}
        onClick={() => router.push("/employee/dashboard")}
        className="flex items-center gap-2"
      >
        <User className="h-4 w-4" />
        Employee View
      </Button>
      <Button
        variant={currentView === "receptionist" ? "default" : "outline"}
        onClick={() => router.push("/receptionist/dashboard")}
        className="flex items-center gap-2"
      >
        <Building2 className="h-4 w-4" />
        Receptionist View
      </Button>
      <Button
        variant={currentView === "facilities" ? "default" : "outline"}
        onClick={() => router.push("/facilities/dashboard")}
        className="flex items-center gap-2"
      >
        <Wrench className="h-4 w-4" />
        Facilities View
      </Button>
    </div>
  );
}
