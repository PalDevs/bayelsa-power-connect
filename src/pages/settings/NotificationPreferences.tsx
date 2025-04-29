
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Bell, Clock, AlertTriangle, Zap, CreditCard, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const NotificationPreferences = () => {
  const { toast } = useToast();
  
  const [preferences, setPreferences] = useState({
    outageAlerts: true,
    highUsage: true,
    paymentReminders: true,
    promotions: false,
    dailySummary: false,
    tips: true,
  });

  const [quietHours, setQuietHours] = useState({
    enabled: true,
    start: "22:00",
    end: "07:00"
  });

  const handleToggleChange = (key: keyof typeof preferences) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, [key]: !prev[key] };
      
      toast({
        description: `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} notifications ${newPreferences[key] ? 'enabled' : 'disabled'}.`,
      });
      
      return newPreferences;
    });
  };

  const handleQuietHoursToggle = () => {
    setQuietHours(prev => ({ ...prev, enabled: !prev.enabled }));
    
    toast({
      description: `Quiet hours ${!quietHours.enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link to="/settings" className="text-gray-600 dark:text-gray-300">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Notification Preferences</h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Bell className="text-primary" size={20} />
                <h2 className="text-lg font-medium">Alert Types</h2>
              </div>
              
              <p className="text-sm text-gray-500">Choose which notifications you'd like to receive</p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle size={18} className="text-red-500" />
                      <p className="font-medium">Outage Alerts</p>
                    </div>
                    <p className="text-sm text-gray-500 ml-7">Get notified about power outages in your area</p>
                  </div>
                  <Switch 
                    checked={preferences.outageAlerts} 
                    onCheckedChange={() => handleToggleChange('outageAlerts')}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Zap size={18} className="text-yellow-500" />
                      <p className="font-medium">High Usage Alerts</p>
                    </div>
                    <p className="text-sm text-gray-500 ml-7">Be alerted when your usage is higher than normal</p>
                  </div>
                  <Switch 
                    checked={preferences.highUsage} 
                    onCheckedChange={() => handleToggleChange('highUsage')}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <CreditCard size={18} className="text-green-500" />
                      <p className="font-medium">Payment Reminders</p>
                    </div>
                    <p className="text-sm text-gray-500 ml-7">Receive reminders when payments are due</p>
                  </div>
                  <Switch 
                    checked={preferences.paymentReminders} 
                    onCheckedChange={() => handleToggleChange('paymentReminders')}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Info size={18} className="text-blue-500" />
                      <p className="font-medium">Tips & Advice</p>
                    </div>
                    <p className="text-sm text-gray-500 ml-7">Energy saving tips and usage advice</p>
                  </div>
                  <Switch 
                    checked={preferences.tips} 
                    onCheckedChange={() => handleToggleChange('tips')}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">Promotional Offers</p>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <Switch 
                    checked={preferences.promotions} 
                    onCheckedChange={() => handleToggleChange('promotions')}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">Daily Usage Summary</p>
                  </div>
                  <Switch 
                    checked={preferences.dailySummary} 
                    onCheckedChange={() => handleToggleChange('dailySummary')}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="text-primary" size={20} />
                <h2 className="text-lg font-medium">Quiet Hours</h2>
              </div>
              
              <p className="text-sm text-gray-500">Set times when you don't want to receive notifications</p>
              
              <div className="flex items-center justify-between py-2">
                <p className="font-medium">Enable Quiet Hours</p>
                <Switch 
                  checked={quietHours.enabled} 
                  onCheckedChange={handleQuietHoursToggle}
                />
              </div>
              
              {quietHours.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Select 
                      defaultValue={quietHours.start}
                      onValueChange={(value) => setQuietHours(prev => ({ ...prev, start: value }))}
                    >
                      <SelectTrigger id="startTime">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={`start-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Select 
                      defaultValue={quietHours.end}
                      onValueChange={(value) => setQuietHours(prev => ({ ...prev, end: value }))}
                    >
                      <SelectTrigger id="endTime">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={`end-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              <div className="pt-2">
                <p className="text-sm text-gray-500">
                  {quietHours.enabled 
                    ? `You won't receive notifications between ${quietHours.start} and ${quietHours.end} unless it's an emergency alert.` 
                    : 'Quiet hours are currently disabled.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Notification Channels</h2>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p>Push Notifications</p>
                  <Badge variant="outline" className="text-green-600">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p>Email</p>
                  <Badge variant="outline" className="text-gray-600">Not Set Up</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p>SMS</p>
                  <Badge variant="outline" className="text-green-600">Active</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSavePreferences} className="w-full">
          Save Preferences
        </Button>
      </div>
    </MobileLayout>
  );
};

export default NotificationPreferences;
