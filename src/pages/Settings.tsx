
import MobileLayout from "@/components/layout/MobileLayout";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, User, Lock, Bell, CreditCard } from "lucide-react";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <MobileLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Profile Section */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <img 
            src="/lovable-uploads/cb27d16d-8596-49eb-b3ea-d706965910fd.png" 
            alt="User Profile" 
            className="w-16 h-16 rounded-full object-cover border-2 border-bayelsa-teal"
          />
          <div>
            <h2 className="text-xl font-medium">DOUYE DIRI</h2>
            <p className="text-gray-600 dark:text-gray-300">diri@bayelsa.gov.ng</p>
          </div>
        </div>

        {/* Settings Options */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 pl-1">Account</h3>
          
          <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center space-x-3">
              <User size={20} className="text-gray-600 dark:text-gray-300" />
              <span>Personal Information</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center space-x-3">
              <Lock size={20} className="text-gray-600 dark:text-gray-300" />
              <span>Security</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center space-x-3">
              <Bell size={20} className="text-gray-600 dark:text-gray-300" />
              <span>Notification Preferences</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center space-x-3">
              <CreditCard size={20} className="text-gray-600 dark:text-gray-300" />
              <span>Payment Methods</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {theme === "light" ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-blue-400" />
              )}
              <span>Dark Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "light" ? "dark" : "light")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center text-gray-500 text-sm pt-4">
          <p>Bayelsa Power Connect</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Settings;
