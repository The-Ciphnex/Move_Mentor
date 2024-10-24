"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function CollegeRegistrationPage() {
  const [collegeName, setCollegeName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!collegeName || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Sending a POST request to the API route we created for registering a college
      const res = await fetch("/api/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "college", // We're registering a college
          name: collegeName,
          email: "college@example.com", // You can add email input if needed
          otherDetails: {
            password: password, // Any additional fields can go here
          },
        }),
      });

      if (res.ok) {
        router.push("/login"); // Redirect to login upon successful registration
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">College Registration</CardTitle>
          <CardDescription className="text-center">
            Register your college for the bus transportation system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="collegeName">College Name</Label>
              <Input 
                id="collegeName" 
                type="text" 
                placeholder="Enter college name"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">Register College</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={() => router.push("/driver-registration")}>
              Driver Registration
            </Button>
            <Button variant="outline" onClick={() => router.push("/student-registration")}>
              Student Registration
            </Button>
          </div>
          <div className="text-center">
            <Button variant="link" onClick={() => router.push("/login")}>
              Already have an account? Login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
