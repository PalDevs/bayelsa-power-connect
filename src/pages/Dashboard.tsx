
import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Clock, Calendar, AlertTriangle } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PowerCard from "@/components/ui/PowerCard";
import ActionButton from "@/components/ui/ActionButton";

const Dashboard = () => {
  // Sample user data - in a real app, this would come from an API
  const [userData] = useState({
    name: "DOUYE DIRI",
    powerUnits: 145.7,
    daysLeft: 20,
    lastRecharge: "14/02/2025",
    unreadNotifications: 1,
    avatar: "/lovable-uploads/cb27d16d-8596-49eb-b3ea-d706965910fd.png"
  });

  return (
    <MobileLayout>
      <div className="space-y-6 pb-4">
        {/* User Header */}
        <div className="flex items-center space-x-3 py-2">
          <img 
            src={userData.avatar} 
            alt="User Profile" 
            className="w-12 h-12 rounded-full object-cover border-2 border-bayelsa-teal"
          />
          <h1 className="text-xl font-bold">{userData.name}</h1>
        </div>

        {/* Power Units Card */}
        <PowerCard>
          <h2 className="text-xl font-medium mb-2">Available power units</h2>
          <div className="flex items-center space-x-2 mb-3">
            <Zap size={28} className="text-bayelsa-teal" />
            <span className="text-4xl font-bold">{userData.powerUnits}KWh</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <Clock size={20} />
            <span className="text-lg">{userData.daysLeft} days left</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={20} />
            <span className="text-lg">Last recharge: {userData.lastRecharge}</span>
          </div>
        </PowerCard>

        {/* Notifications */}
        <div className="bg-gradient-to-r from-green-200 to-blue-200 rounded-full p-3 flex items-center justify-center space-x-2 text-black">
          <AlertTriangle size={20} />
          <span className="font-medium">{userData.unreadNotifications} unread notification</span>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Link to="/recharge">
            <ActionButton fullWidth>Recharge</ActionButton>
          </Link>
          <Link to="/report-outage">
            <ActionButton variant="outline" fullWidth>
              Report Outage
            </ActionButton>
          </Link>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Dashboard;
