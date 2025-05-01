import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
import MobileLayout from "@/components/layout/MobileLayout";

const WelcomeOnboarding = () => {
	const navigate = useNavigate();

	return (
		<MobileLayout hideNavigation>
			<div className="flex flex-col items-center justify-between min-h-screen p-6 bg-white dark:bg-gray-900 animate-fade-in">
				{/* Top Logo */}
				<div className="w-full pt-12"></div>

				{/* Middle Content */}
				<div className="w-full flex flex-col items-center space-y-8">
					<div className="relative flex flex-col items-center">
						<div className="w-28 flex items-center justify-center mb-6">
							<img
								src="/paddle.svg"
								alt="Power Icon"
								className="w-full"
							/>
						</div>

						<h1 className="text-3xl font-bold text-bayelsa-blue dark:text-white mb-2 text-center">
							All you need for Electricity
						</h1>
						<p className="text-gray-500 dark:text-gray-400 text-center max-w-xs">
							Pay bills and track your usage easily with BAY
							POWER!
						</p>
					</div>
				</div>

				{/* Bottom Buttons */}
				<div className="w-full space-y-4 mb-8">
					<ActionButton
						fullWidth
						className="py-4 flex justify-center "
						onClick={() => navigate("/onboarding/signup")}
					>
						Open a New Account
						<ArrowRight className="ml-2" size={18} />
					</ActionButton>

					<ActionButton
						variant="outline"
						fullWidth
						className="py-4"
						onClick={() => navigate("/onboarding/login")}
					>
						Already have an account? Login
					</ActionButton>
				</div>
			</div>
		</MobileLayout>
	);
};

export default WelcomeOnboarding;
