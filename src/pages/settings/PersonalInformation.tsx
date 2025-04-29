
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const PersonalInformation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "DOUYE DIRI",
    email: "diri@bayelsa.gov.ng",
    phone: "+234 803 123 4567",
    address: "Government House, Yenagoa, Bayelsa State"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your personal information has been updated successfully.",
    });
  };

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link to="/settings" className="text-gray-600 dark:text-gray-300">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Personal Information</h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
                    <img 
                      src="/lovable-uploads/cb27d16d-8596-49eb-b3ea-d706965910fd.png" 
                      alt="Profile Picture" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-1"
                  >
                    <User size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={16} />
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={16} />
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full mt-6">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default PersonalInformation;
