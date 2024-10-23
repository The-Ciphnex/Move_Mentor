import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Bell, UserCircle, LogOut } from "lucide-react"

export default function CollegeBusApp() {
  const [currentView, setCurrentView] = useState("main")
  const [userType, setUserType] = useState("")

  const MainView = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>College Bus Transportation</CardTitle>
          <CardDescription>Choose your login type</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={() => { setCurrentView("login"); setUserType("college") }}>College Login</Button>
          <Button onClick={() => { setCurrentView("login"); setUserType("driver") }}>Driver Login</Button>
          <Button onClick={() => { setCurrentView("login"); setUserType("student") }}>Student Login</Button>
        </CardContent>
      </Card>
    </div>
  )

  const LoginView = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{userType.charAt(0).toUpperCase() + userType.slice(1)} Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="id">ID</Label>
                <Input id="id" placeholder="Enter your ID" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentView("main")}>Back</Button>
          <Button onClick={() => setCurrentView(userType + "Dashboard")}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )

  const CollegeDashboard = () => (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">College Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Register New Bus</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="routeNumber">Route Number</Label>
              <Input id="routeNumber" placeholder="Enter route number" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="busNumber">Bus Number Plate</Label>
              <Input id="busNumber" placeholder="Enter bus number plate" />
            </div>
            <Button>Register Bus</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )

  const DriverDashboard = () => (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Driver Dashboard</h1>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="location">Live Location</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Driver Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                <Button>Update Profile</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Live Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-primary" />
                <span className="ml-2">Map Placeholder</span>
              </div>
              <Button className="mt-4">Toggle Live Location</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Student A will be absent tomorrow</li>
                <li>Student B will be late to the stop</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  const StudentDashboard = () => (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <Tabs defaultValue="location">
        <TabsList>
          <TabsTrigger value="location">Bus Location</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>
        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Live Bus Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-primary" />
                <span className="ml-2">Map Placeholder</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="updates">
          <Card>
            <CardHeader>
              <CardTitle>Provide Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="absence">Report Absence</Label>
                  <Input id="absence" type="date" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="late">Report Late Arrival</Label>
                  <Input id="late" type="time" />
                </div>
                <Button>Submit Update</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">College Bus App</h1>
          {currentView !== "main" && (
            <div className="flex items-center space-x-4">
              <UserCircle className="w-6 h-6" />
              <Button variant="outline" onClick={() => setCurrentView("main")}>
              <LogOut className="w-4 h-4 mr-2" />Logout</Button>

            </div>
          )}
        </div>
      </header>
      {currentView === "main" && <MainView />}
      {currentView === "login" && <LoginView />}
      {currentView === "collegeDashboard" && <CollegeDashboard />}
      {currentView === "driverDashboard" && <DriverDashboard />}
      {currentView === "studentDashboard" && <StudentDashboard />}
    </div>
  )
}