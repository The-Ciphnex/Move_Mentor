'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

export default function CollegeRegistration() {
  const [step, setStep] = useState(0)
  const [collegeInfo, setCollegeInfo] = useState({ name: '', numberOfRoutes: 0 })
  const [routes, setRoutes] = useState<Array<{ busCount: number }>>([])
  const [buses, setBuses] = useState<Array<Array<{ numberPlate: string, insuranceDoc: File | null }>>>([])
  const [generatedIds, setGeneratedIds] = useState<string[]>([])

  const steps = ['College Information', 'Bus Routes', 'Bus Details', 'Confirmation']

  const handleCollegeInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRoutes(Array(collegeInfo.numberOfRoutes).fill({ busCount: 0 }))
    setStep(1)
  }

  const handleRoutesSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBuses(routes.map(route => Array(route.busCount).fill({ numberPlate: '', insuranceDoc: null })))
    setStep(2)
  }

  const handleBusDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ids = buses.flat().map(() => Math.random().toString(36).substr(2, 9))
    setGeneratedIds(ids)
    setStep(3)
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={handleCollegeInfoSubmit} className="space-y-4">
            <div>
              <Label htmlFor="collegeName">College Name</Label>
              <Input
                id="collegeName"
                value={collegeInfo.name}
                onChange={(e) => setCollegeInfo({ ...collegeInfo, name: e.target.value })}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="numberOfRoutes">Number of Bus Routes</Label>
              <Input
                id="numberOfRoutes"
                type="number"
                min="1"
                value={collegeInfo.numberOfRoutes}
                onChange={(e) => setCollegeInfo({ ...collegeInfo, numberOfRoutes: parseInt(e.target.value) })}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">Next</Button>
          </form>
        )
      case 1:
        return (
          <form onSubmit={handleRoutesSubmit} className="space-y-4">
            {routes.map((route, index) => (
              <div key={index}>
                <Label htmlFor={`route${index}`}>Number of Buses for Route {index + 1}</Label>
                <Input
                  id={`route${index}`}
                  type="number"
                  min="1"
                  value={route.busCount}
                  onChange={(e) => {
                    const newRoutes = [...routes]
                    newRoutes[index].busCount = parseInt(e.target.value)
                    setRoutes(newRoutes)
                  }}
                  required
                  className="mt-1"
                />
              </div>
            ))}
            <Button type="submit" className="w-full">Next</Button>
          </form>
        )
      case 2:
        return (
          <form onSubmit={handleBusDetailsSubmit} className="space-y-6">
            {buses.map((route, routeIndex) => (
              <div key={routeIndex} className="space-y-4">
                <h3 className="text-lg font-semibold">Route {routeIndex + 1}</h3>
                {route.map((bus, busIndex) => (
                  <Card key={busIndex} className="p-4">
                    <h4 className="text-md font-medium mb-2">Bus {busIndex + 1}</h4>
                    <div className="space-y-2">
                      <Label htmlFor={`numberPlate-${routeIndex}-${busIndex}`}>Number Plate</Label>
                      <Input
                        id={`numberPlate-${routeIndex}-${busIndex}`}
                        value={bus.numberPlate}
                        onChange={(e) => {
                          const newBuses = [...buses]
                          newBuses[routeIndex][busIndex].numberPlate = e.target.value
                          setBuses(newBuses)
                        }}
                        required
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`insurance-${routeIndex}-${busIndex}`}>Insurance Document</Label>
                      <Input
                        id={`insurance-${routeIndex}-${busIndex}`}
                        type="file"
                        onChange={(e) => {
                          const newBuses = [...buses]
                          newBuses[routeIndex][busIndex].insuranceDoc = e.target.files?.[0] || null
                          setBuses(newBuses)
                        }}
                        required
                      />
                    </div>
                  </Card>
                ))}
              </div>
            ))}
            <Button type="submit" className="w-full">Generate IDs</Button>
          </form>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Generated Bus IDs</h3>
            <ul className="space-y-2">
              {generatedIds.map((id, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle2 className="text-green-500 h-5 w-5" />
                  <span>Bus {index + 1}: <span className="font-mono bg-gray-100 p-1 rounded">{id}</span></span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600">
              Please provide these IDs to the respective bus drivers for login.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">College Bus Registration</CardTitle>
          <CardDescription className="text-center">Register your college and bus routes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
              {steps.map((stepName, index) => (
                <li key={index} className={`flex items-center ${step >= index ? 'text-primary' : 'text-gray-500'}`}>
                  {step > index ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className={`w-5 h-5 ${step === index ? 'text-primary' : ''}`} />
                  )}
                  <span className={`hidden sm:inline-flex sm:ml-2 ${step === index ? 'font-semibold' : ''}`}>
                    {stepName}
                  </span>
                  {index < steps.length - 1 && (
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 sm:ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7"></path>
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-8">{renderStep()}</div>
        </CardContent>
        <CardFooter>
          {step > 0 && step < 3 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="w-full mt-4">
              Back
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}