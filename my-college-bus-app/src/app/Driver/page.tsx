"use client";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function DriverRegistrationPage() {
  const [driverName, setDriverName] = useState("")
  const [uniqueCode, setUniqueCode] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!driverName || !uniqueCode) {
      setError("Please fill in all fields")
      return
    }

    // Here you would typically make an API call to register the driver
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push("/login");
    } catch (err) {
      console.error(err); // Log the error
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Driver Registration</CardTitle>
          <CardDescription className="text-center">
            Register as a driver for the college bus transportation system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="driverName">Driver Name</Label>
              <Input 
                id="driverName" 
                type="text" 
                placeholder="Enter your full name"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uniqueCode">Unique Code</Label>
              <Input 
                id="uniqueCode" 
                type="text" 
                placeholder="Enter the unique code provided by the college"
                value={uniqueCode}
                onChange={(e) => setUniqueCode(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">Register as Driver</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={() => router.push("/college-registration")}>
              College Registration
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
  )
}