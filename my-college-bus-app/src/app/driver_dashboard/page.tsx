"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar} from "@/components/ui/avatar";
import { Bell, MapPin} from "lucide-react";

export default function DriverDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [driverInfo, setDriverInfo] = useState({
    id: '',
    routeNumber: '',
    name: '',
    phone: '',
    email: '',
    avatar: '',
  });
  const [isLocationSharing, setIsLocationSharing] = useState(false);
  const [sharingDuration, setSharingDuration] = useState(30);
  const [notifications] = useState([
    { id: 1, student: 'vanitha', message: 'Will be absent tomorrow' },
    { id: 2, student: 'hem', message: 'Will be late by 15 minutes' },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', driverInfo);
  };

  const handleLocationSharing = () => {
    setIsLocationSharing(!isLocationSharing);
    if (!isLocationSharing) {
      console.log('Started sharing location for', sharingDuration, 'minutes');
    } else {
      console.log('Stopped sharing location');
    }
  };

  useEffect(() => {
    if (isLocationSharing) {
      const timer = setTimeout(() => {
        setIsLocationSharing(false);
        console.log('Location sharing stopped after', sharingDuration, 'minutes');
      }, sharingDuration * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [isLocationSharing, sharingDuration]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Driver Login</CardTitle>
            <CardDescription>Enter your route number and unique ID to login</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="routeNumber">Route Number</Label>
                <Input
                  id="routeNumber"
                  value={driverInfo.routeNumber}
                  onChange={(e) => setDriverInfo({ ...driverInfo, routeNumber: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="driverId">Driver ID</Label>
                <Input
                  id="driverId"
                  value={driverInfo.id}
                  onChange={(e) => setDriverInfo({ ...driverInfo, id: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Driver Dashboard</CardTitle>
          <CardDescription>Manage your profile, location sharing, and view notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={driverInfo.name}
                    onChange={(e) => setDriverInfo({ ...driverInfo, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={driverInfo.phone}
                    onChange={(e) => setDriverInfo({ ...driverInfo, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={driverInfo.email}
                    onChange={(e) => setDriverInfo({ ...driverInfo, email: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </TabsContent>
            <TabsContent value="location">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="location-sharing"
                    checked={isLocationSharing}
                    onChange={handleLocationSharing}
                  />
                  <Label htmlFor="location-sharing">Share Live Location</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sharing-duration">Sharing Duration (minutes)</Label>
                  <Input
                    id="sharing-duration"
                    type="number"
                    min="1"
                    value={sharingDuration}
                    onChange={(e) => setSharingDuration(parseInt(e.target.value))}
                    disabled={isLocationSharing}
                  />
                </div>
                {isLocationSharing && (
                  <p className="text-sm text-muted-foreground">
                    Your location is being shared. It will automatically stop after {sharingDuration} minutes.
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="notifications">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card key={notification.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{notification.student}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{notification.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
          <Avatar src={driverInfo.avatar} alt="Driver" />
            <div>
              <p className="text-sm font-medium">{driverInfo.name || 'Driver'}</p>
              <p className="text-xs text-muted-foreground">Route {driverInfo.routeNumber}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {isLocationSharing && <MapPin className="text-green-500" />}
            {notifications.length > 0 && <Bell className="text-yellow-500" />}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}