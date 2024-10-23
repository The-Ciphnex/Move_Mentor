'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, AlertTriangle, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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
  const [isLate, setIsLate] = useState(false)
  const [lateMinutes, setLateMinutes] = useState(5)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate the student's credentials here
    setIsLoggedIn(true)
  }

  const handleBusSelection = (busId: string) => {
    setStudentInfo({ ...studentInfo, busId })
    // In a real app, you would fetch the bus details and start tracking its location
    simulateBusMovement()
  }

  const simulateBusMovement = () => {
    // This is a simplified simulation. In a real app, you'd use real-time data.
    let i = 0
    const interval = setInterval(() => {
      i++
      setBusLocation({ lat: 40 + i * 0.001, lng: -74 - i * 0.001 })
      setEstimatedArrival(`${15 - i} minutes`)
      if (i >= 15) clearInterval(interval)
    }, 1000)
  }

  const reportAbsence = () => {
    // In a real app, you would send this data to your backend
    console.log(`Absence reported for ${absenceDuration} days. Reason: ${absenceReason}`)
    // Here you would also update the route for other students
    alert("Your absence has been reported. The route will be updated for other students.")
  }

  const reportLate = () => {
    // In a real app, you would send this data to your backend
    console.log(`Student will be ${lateMinutes} minutes late`)
    // Here you would also update the route for the driver
    alert(`You've reported that you'll be ${lateMinutes} minutes late. The driver will be notified.`)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Student Login</CardTitle>
            <CardDescription>Enter your student ID to login</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={studentInfo.id}
                  onChange={(e) => setStudentInfo({ ...studentInfo, id: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Student Dashboard</CardTitle>
          <CardDescription>Track your bus, report absences, and view updates</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bus">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bus">Bus Tracking</TabsTrigger>
              <TabsTrigger value="absence">Report Absence</TabsTrigger>
              <TabsTrigger value="late">Running Late</TabsTrigger>
            </TabsList>
            <TabsContent value="bus">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bus-select">Select Your Bus</Label>
                  <Select onValueChange={handleBusSelection}>
                    <SelectTrigger id="bus-select">
                      <SelectValue placeholder="Select a bus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bus1">Bus 1</SelectItem>
                      <SelectItem value="bus2">Bus 2</SelectItem>
                      <SelectItem value="bus3">Bus 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {studentInfo.busId && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Bus Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <MapPin className="text-blue-500" />
                        <span>Lat: {busLocation.lat.toFixed(4)}, Lng: {busLocation.lng.toFixed(4)}</span>
                      </div>
                      <div className="mt-2 flex items-center space-x-2">
                        <Clock className="text-green-500" />
                        <span>Estimated arrival: {estimatedArrival}</span>
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
                <Button onClick={reportAbsence}>Report Absence</Button>
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
                <Button onClick={reportLate}>Report Late Arrival</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
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
  )
}