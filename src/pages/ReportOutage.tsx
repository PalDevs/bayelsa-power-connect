
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import ActionButton from "@/components/ui/ActionButton";
import { useToast } from "@/hooks/use-toast";

const ReportOutage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // This would connect to an API in a real app
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Outage Report Submitted",
        description: "Your report has been received. We'll look into it as soon as possible.",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <MobileLayout hideNavigation>
      <div>
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 mr-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Report Outage</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bayelsa-blue"
              placeholder="Enter your location"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Outage Details
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bayelsa-blue h-32"
              placeholder="Please describe the outage (e.g., complete blackout, flickering lights, etc.)"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Outage Type
            </label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bayelsa-blue bg-white"
              required
            >
              <option value="">Select outage type</option>
              <option value="complete">Complete Power Loss</option>
              <option value="partial">Partial Power</option>
              <option value="fluctuating">Fluctuating Power</option>
              <option value="low-voltage">Low Voltage</option>
              <option value="scheduled">Scheduled Maintenance</option>
            </select>
          </div>

          <ActionButton 
            type="submit" 
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </ActionButton>
        </form>
      </div>
    </MobileLayout>
  );
};

export default ReportOutage;
