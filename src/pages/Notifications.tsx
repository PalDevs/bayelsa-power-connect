
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { AlertTriangle, CheckCircle, Calendar, Clock } from "lucide-react";

// Sample notification data
const initialNotifications = [
  {
    id: 1,
    type: "alert",
    title: "Low Power Units",
    message: "You have less than 20 kWh remaining. Please recharge soon.",
    date: "2025-04-28T10:30:00",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Recharge Successful",
    message: "Your recharge of 50 kWh was successful.",
    date: "2025-04-26T15:45:00",
    read: true,
  },
  {
    id: 3,
    type: "info",
    title: "Scheduled Maintenance",
    message: "There will be scheduled maintenance on April 30th from 10:00 AM to 2:00 PM.",
    date: "2025-04-25T09:15:00",
    read: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <MobileLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>

        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read ? "bg-white" : "bg-blue-50"
                } ${!notification.read && "border-bayelsa-power"}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex space-x-3">
                    {notification.type === "alert" ? (
                      <AlertTriangle className="text-yellow-500 h-5 w-5 mt-1" />
                    ) : notification.type === "success" ? (
                      <CheckCircle className="text-green-500 h-5 w-5 mt-1" />
                    ) : (
                      <Calendar className="text-blue-500 h-5 w-5 mt-1" />
                    )}
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center space-x-3 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(notification.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(notification.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-bayelsa-power"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Notifications;
