"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type RegistrationType = "select" | "college" | "driver" | "student";

export default function RegistrationPage() {
  const [registrationType, setRegistrationType] = useState<RegistrationType>("select");
  const [formData, setFormData] = useState({
    collegeName: "",
    driverName: "",
    uniqueCode: "",
    studentName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation logic
    if (registrationType === "college" && (!formData.collegeName || !formData.password)) {
      setError("Please fill in all fields");
      return;
    }
    if (registrationType === "driver" && (!formData.driverName || !formData.uniqueCode)) {
      setError("Please fill in all fields");
      return;
    }
    if (registrationType === "student" && (!formData.studentName || !formData.email || !formData.phoneNumber || !formData.password || !formData.confirmPassword)) {
      setError("Please fill in all fields");
      return;
    }
    if (registrationType === "student" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Simulating an API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push("/login");
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  const renderForm = () => {
    switch (registrationType) {
      case "college":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="collegeName">College Name</Label>
              <Input
                id="collegeName"
                name="collegeName"
                type="text"
                placeholder="Enter college name"
                value={formData.collegeName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        );
      case "driver":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="driverName"> <p> Driver Name </p></Label>
              <Input
                id="driverName"
                name="driverName"
                type="text"
                placeholder="Enter driver's name"
                value={formData.driverName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uniqueCode">Unique Code</Label>
              <Input
                id="uniqueCode"
                name="uniqueCode"
                type="text"
                placeholder="Enter unique code provided by college"
                value={formData.uniqueCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        );
      case "student":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                name="studentName"
                type="text"
                placeholder="Enter your full name"
                value={formData.studentName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Choose your registration type and enter your details
          </CardDescription>
        </CardHeader>
        <CardContent>
          {registrationType === "select" ? (
            <div className="space-y-4">
              <Button onClick={() => setRegistrationType("college")} className="w-full">College Registration</Button>
              <Button onClick={() => setRegistrationType("driver")} className="w-full">Driver Registration</Button>
              <Button onClick={() => setRegistrationType("student")} className="w-full">Student Registration</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderForm()}
              {error && (
                <Alert message="Error" type="error">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">Register</Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {registrationType !== "select" && (
            <Button variant="outline" onClick={() => setRegistrationType("select")}>Back</Button>
          )}
          <Button variant="link" onClick={() => router.push("/login")}>
            Already have an account? Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
