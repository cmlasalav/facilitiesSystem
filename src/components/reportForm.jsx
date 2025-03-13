"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addReport } from "@/lib/data";
import { useRouter } from "next/navigation";
import Logo from "../../public/Services.jpg";

export default function CreateReportForm() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Create a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, you would upload the image to a server
    // For this demo, we'll just use a placeholder
    const newReport = {
      employeeId: "1", // Hardcoded for demo
      employeeName: "John Doe", // Hardcoded for demo
      description,
      status: "pending",
      createdAt: new Date().toISOString(),
      imageUrl: imagePreview || Logo,
    };

    addReport(newReport);
    setIsSubmitting(false);

    // Reset form and redirect
    setDescription("");
    setImage(null);
    setImagePreview(null);

    router.push("/employee/dashboard");
    router.refresh();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Report</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-32"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              Upload Image
            </label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
          </div>

          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Image Preview</p>
              <div className="relative h-48 w-full rounded-md overflow-hidden border">
                <img
                  src={imagePreview || Logo}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/employee/dashboard")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
