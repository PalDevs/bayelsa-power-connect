
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock, Fingerprint, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const Security = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Your new password and confirmation don't match.",
        variant: "destructive"
      });
      return;
    }
    
    // Password validation would go here in a real app
    
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully."
    });
    
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const toggleBiometric = () => {
    setBiometricEnabled(!biometricEnabled);
    toast({
      description: `Biometric authentication ${biometricEnabled ? 'disabled' : 'enabled'}.`
    });
  };

  const toggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      description: `Two-factor authentication ${twoFactorEnabled ? 'disabled' : 'enabled'}.`
    });
  };

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link to="/settings" className="text-gray-600 dark:text-gray-300">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Security</h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <h2 className="text-lg font-medium mb-2">Change Password</h2>
              
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="rounded text-blue-600"
                />
                <Label htmlFor="showPassword" className="text-sm cursor-pointer">Show password</Label>
              </div>
              
              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-medium">Security Options</h2>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Fingerprint className="text-gray-600" />
                <div>
                  <p className="font-medium">Biometric Authentication</p>
                  <p className="text-sm text-gray-500">Unlock app with fingerprint or face ID</p>
                </div>
              </div>
              <Switch checked={biometricEnabled} onCheckedChange={toggleBiometric} />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Shield className="text-gray-600" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Two-Factor Authentication</p>
                    <Badge variant="secondary" className="text-xs">Recommended</Badge>
                  </div>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={toggle2FA} />
            </div>
            
            <div className="mt-4 bg-orange-50 dark:bg-orange-900/20 p-3 rounded-md flex items-center space-x-2">
              <AlertTriangle className="text-orange-500" size={20} />
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Last login: Yesterday, 15:42 from Yenagoa, NG
              </p>
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">
          Sign Out From All Devices
        </Button>
      </div>
    </MobileLayout>
  );
};

export default Security;
