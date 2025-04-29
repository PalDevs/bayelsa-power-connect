
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { 
  AlertTriangle, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Filter, 
  Bell, 
  Trash2, 
  InfoIcon,
  BellOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample notification data
const initialNotifications = [
  {
    id: 1,
    type: "alert",
    title: "Low Power Units",
    message: "You have less than 20 kWh remaining. Please recharge soon.",
    date: "2025-04-28T10:30:00",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "success",
    title: "Recharge Successful",
    message: "Your recharge of 50 kWh was successful.",
    date: "2025-04-26T15:45:00",
    read: true,
    priority: "medium",
  },
  {
    id: 3,
    type: "info",
    title: "Scheduled Maintenance",
    message: "There will be scheduled maintenance on April 30th from 10:00 AM to 2:00 PM.",
    date: "2025-04-25T09:15:00",
    read: true,
    priority: "low",
  },
  {
    id: 4,
    type: "alert",
    title: "Outage Detected",
    message: "We've detected an outage in your area. Our team is working to restore service.",
    date: "2025-04-24T18:20:00",
    read: false,
    priority: "high",
  },
  {
    id: 5,
    type: "info",
    title: "New Feature Available",
    message: "You can now monitor your daily usage patterns in the Usage tab.",
    date: "2025-04-22T14:10:00",
    read: false,
    priority: "medium",
  },
];

type NotificationType = "all" | "alerts" | "info" | "success";
type SortOption = "newest" | "oldest" | "unread" | "priority";

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState<NotificationType>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const { toast } = useToast();

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "Your notifications have been updated",
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "Notifications cleared",
      description: "All notifications have been removed",
      variant: "destructive",
    });
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

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m ago`;
    } else {
      return "Just now";
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    return notification.type === activeTab;
  });

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "unread") {
      return a.read === b.read ? 0 : a.read ? 1 : -1;
    } else if (sortBy === "priority") {
      const priorityOrder: Record<string, number> = {
        high: 0,
        medium: 1,
        low: 2,
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="text-yellow-500 h-5 w-5 mt-1 shrink-0" />;
      case "success":
        return <CheckCircle className="text-green-500 h-5 w-5 mt-1 shrink-0" />;
      case "info":
      default:
        return <InfoIcon className="text-blue-500 h-5 w-5 mt-1 shrink-0" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <MobileLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="text-xs"
            >
              Mark all read
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy("newest")}>
                  Newest first
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                  Oldest first
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("unread")}>
                  Unread first
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("priority")}>
                  By priority
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger 
              value="all" 
              onClick={() => setActiveTab("all")}
              className="text-xs"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="alerts" 
              onClick={() => setActiveTab("alerts")}
              className="text-xs"
            >
              Alerts
            </TabsTrigger>
            <TabsTrigger 
              value="info" 
              onClick={() => setActiveTab("info")}
              className="text-xs"
            >
              Info
            </TabsTrigger>
            <TabsTrigger 
              value="success" 
              onClick={() => setActiveTab("success")}
              className="text-xs"
            >
              Success
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {renderNotificationsList(sortedNotifications)}
          </TabsContent>
          <TabsContent value="alerts" className="mt-0">
            {renderNotificationsList(sortedNotifications)}
          </TabsContent>
          <TabsContent value="info" className="mt-0">
            {renderNotificationsList(sortedNotifications)}
          </TabsContent>
          <TabsContent value="success" className="mt-0">
            {renderNotificationsList(sortedNotifications)}
          </TabsContent>
        </Tabs>

        {notifications.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              className="text-destructive border-destructive hover:bg-destructive/10"
              onClick={clearAllNotifications}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Notifications
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );

  function renderNotificationsList(notifications: typeof initialNotifications) {
    if (notifications.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BellOff className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg">No notifications</h3>
          <p className="text-muted-foreground mt-1">
            You don't have any notifications at the moment
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`transition-all duration-200 hover:shadow-md ${
              notification.read ? "bg-card" : "bg-blue-50 dark:bg-blue-900/20"
            } border-l-4 ${
              notification.type === "alert"
                ? "border-l-yellow-500"
                : notification.type === "success"
                ? "border-l-green-500"
                : "border-l-blue-500"
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{notification.title}</h3>
                      {!notification.read && (
                        <Badge variant="default" className="bg-blue-500 text-[0.65rem] px-1.5 py-0">NEW</Badge>
                      )}
                      {notification.priority === "high" && (
                        <Badge variant="destructive" className="text-[0.65rem] px-1.5 py-0">URGENT</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{notification.message}</p>
                    <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(notification.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(notification.date)}</span>
                      </div>
                      <span className="font-medium text-xs">
                        {getRelativeTime(notification.date)}
                      </span>
                    </div>
                  </div>
                </div>
                {!notification.read && (
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
};

export default Notifications;
