'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Clock, LogOut } from "lucide-react"

export default function StudentDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [studentInfo, setStudentInfo] = useState({
    id: '',
    name: '',
    busId: '',
  })
  const [busLocation, setBusLocation] = useState({ lat: 0, lng: 0 })
  const [estimatedArrival, setEstimatedArrival] = useState('')
  const [absenceReason, setAbsenceReason] = useState('')
  const [absenceDuration, setAbsenceDuration] = useState(1)
  const [lateMinutes, setLateMinutes] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState({ show: false, title: '', message: '' })

  const showNotification = (title: string, message: string) => {
    setNotification({ show: true, title, message })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsLoggedIn(true)
      setStudentInfo(prev => ({ ...prev, name: 'John Doe' }))
      showNotification("Welcome", "Successfully logged in to your dashboard.")
    } catch (error) {
      showNotification("Error", "Failed to log in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setStudentInfo({ id: '', name: '', busId: '' })
    showNotification("Logged Out", "Successfully logged out from your account.")
  }

  const handleBusSelection = (busId: string) => {
    setStudentInfo(prev => ({ ...prev, busId }))
    simulateBusMovement()
    showNotification("Bus Selected", `Now tracking Bus ${busId}`)
  }

  const simulateBusMovement = () => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setBusLocation(prev => ({
        lat: 40 + Math.sin(i * 0.1) * 0.001,
        lng: -74 + Math.cos(i * 0.1) * 0.001
      }))
      setEstimatedArrival(`${Math.max(0, 15 - i)} minutes`)
      if (i >= 15) clearInterval(interval)
    }, 1000)
  }

  const reportAbsence = () => {
    if (!absenceReason) {
      showNotification("Error", "Please provide a reason for absence")
      return
    }
    
    showNotification("Absence Reported", `Absence reported for ${absenceDuration} days. The route will be updated.`)
    setAbsenceReason('')
    setAbsenceDuration(1)
  }

  const reportLate = () => {
    showNotification("Late Arrival Reported", `You've reported that you'll be ${lateMinutes} minutes late. Driver notified.`)
    setLateMinutes(5)
  }

  return (
    <>
      {notification.show && (
        <Dialog open={true} onOpenChange={(open) => !open && setNotification(prev => ({ ...prev, show: false }))}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{notification.title}</DialogTitle>
              <DialogDescription>{notification.message}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setNotification(prev => ({ ...prev, show: false }))}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {!isLoggedIn ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Student Login</CardTitle>
              <CardDescription>Enter your student ID to access the bus tracking system</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={studentInfo.id}
                    onChange={(e) => setStudentInfo(prev => ({ ...prev, id: e.target.value }))}
                    required
                    placeholder="Enter your student ID"
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Student Dashboard</CardTitle>
                <CardDescription>Track your bus, report absences, and view updates</CardDescription>
              </div>
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bus">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="bus">Bus Tracking</TabsTrigger>
                  <TabsTrigger value="absence">Report Absence</TabsTrigger>
                  <TabsTrigger value="late">Running Late</TabsTrigger>
                </TabsList>
                <div className="mt-4 space-y-4">
                  <TabsContent value="bus">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bus-select">Select Your Bus</Label>
                        <Select onValueChange={handleBusSelection} defaultValue={studentInfo.busId || undefined}>
                          <SelectTrigger id="bus-select" className="w-full">
                            <SelectValue placeholder="Select a bus" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Bus 1</SelectItem>
                            <SelectItem value="2">Bus 2</SelectItem>
                            <SelectItem value="3">Bus 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {studentInfo.busId && (
                        <Card>
                          <CardHeader>
                            <CardTitle>Live Bus Tracking</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 bg-secondary p-3 rounded-lg">
                              <MapPin className="text-blue-500" />
                              <span>Location: {busLocation.lat.toFixed(4)}, {busLocation.lng.toFixed(4)}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-secondary p-3 rounded-lg">
                              <Clock className="text-green-500" />
                              <span>ETA: {estimatedArrival}</span>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="absence">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="absence-reason">Reason for Absence</Label>
                        <Input
                          id="absence-reason"
                          value={absenceReason}
                          onChange={(e) => setAbsenceReason(e.target.value)}
                          placeholder="e.g., Sick, Family emergency"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="absence-duration">Duration (days)</Label>
                        <Input
                          id="absence-duration"
                          type="number"
                          min="1"
                          value={absenceDuration}
                          onChange={(e) => setAbsenceDuration(parseInt(e.target.value))}
                        />
                      </div>
                      <Button onClick={reportAbsence} className="w-full">Report Absence</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="late">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="late-minutes">Minutes Late</Label>
                        <Input
                          id="late-minutes"
                          type="number"
                          min="5"
                          step="5"
                          value={lateMinutes}
                          onChange={(e) => setLateMinutes(parseInt(e.target.value))}
                        />
                      </div>
                      <Button onClick={reportLate} className="w-full">Report Late Arrival</Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center space-x-2">
                <div>
                  <p className="text-sm font-medium">{studentInfo.name || 'Student'}</p>
                  <p className="text-xs text-muted-foreground">ID: {studentInfo.id}</p>
                </div>
              </div>
              {studentInfo.busId && (
                <div className="flex items-center space-x-2">
                  <MapPin className="text-blue-500" />
                  <span className="text-sm">Bus {studentInfo.busId} Selected</span>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}