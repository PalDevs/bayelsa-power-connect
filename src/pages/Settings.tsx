import MobileLayout from "@/components/layout/MobileLayout";
import { useTheme } from "@/components/ThemeProvider";
import {
	Moon,
	Sun,
	User,
	Lock,
	Bell,
	CreditCard,
	ChevronRight,
	LifeBuoy,
	HelpCircle,
	LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const Settings = () => {
	const { theme, setTheme } = useTheme();
	const [userData] = useState({
		name: "DOUYE DIRI",
	});

	return (
		<MobileLayout>
			<div className="space-y-6">
				<h1 className="text-2xl font-bold mb-6">Settings</h1>

				{/* Profile Section */}
				<div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
					<Avatar className="w-16 h-16 rounded-full object-cover border-2 border-bayelsa-teal">
						{/* <AvatarImage
							src={userData.avatar || ""}
							alt="Organization logo"
						/> */}
						<AvatarFallback className="bg-secondary text-bayelsa-teal text-3xl">
							{userData.name.substring(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div>
						<h2 className="text-xl font-medium">DOUYE DIRI</h2>
						<p className="text-gray-600 dark:text-gray-300">
							diri@bayelsa.gov.ng
						</p>
					</div>
				</div>

				{/* Settings Options */}
				<div className="space-y-1">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 pl-1">
						Account
					</h3>

					<Link
						to="/settings/personal"
						className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
					>
						<div className="flex items-center space-x-3">
							<User
								size={20}
								className="text-gray-600 dark:text-gray-300"
							/>
							<span>Personal Information</span>
						</div>
						<ChevronRight size={18} className="text-gray-400" />
					</Link>

					<Link
						to="/settings/security"
						className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
					>
						<div className="flex items-center space-x-3">
							<Lock
								size={20}
								className="text-gray-600 dark:text-gray-300"
							/>
							<span>Security</span>
						</div>
						<ChevronRight size={18} className="text-gray-400" />
					</Link>

					<Link
						to="/settings/notifications"
						className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
					>
						<div className="flex items-center space-x-3">
							<Bell
								size={20}
								className="text-gray-600 dark:text-gray-300"
							/>
							<span>Notification Preferences</span>
						</div>
						<div className="flex items-center">
							<Badge variant="secondary" className="mr-2">
								3 New
							</Badge>
							<ChevronRight size={18} className="text-gray-400" />
						</div>
					</Link>

					<Link
						to="/settings/payment"
						className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
					>
						<div className="flex items-center space-x-3">
							<CreditCard
								size={20}
								className="text-gray-600 dark:text-gray-300"
							/>
							<span>Payment Methods</span>
						</div>
						<ChevronRight size={18} className="text-gray-400" />
					</Link>
				</div>

				{/* Additional sections */}
				<div className="space-y-1">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 pl-1">
						Preferences
					</h3>

					{/* Theme Toggle */}
					<div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								{theme === "light" ? (
									<Sun
										size={20}
										className="text-yellow-500"
									/>
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
									onChange={() =>
										setTheme(
											theme === "light" ? "dark" : "light"
										)
									}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
							</label>
						</div>
					</div>

					{/* Support Section */}
					<button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
						<div className="flex items-center space-x-3">
							<HelpCircle
								size={20}
								className="text-gray-600 dark:text-gray-300"
							/>
							<span>Help & FAQ</span>
						</div>
						<ChevronRight size={18} className="text-gray-400" />
					</button>

					<button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
						<div className="flex items-center space-x-3">
							<LifeBuoy
								size={20}
								className="text-gray-600 dark:text-gray-300"
							/>
							<span>Contact Support</span>
						</div>
						<ChevronRight size={18} className="text-gray-400" />
					</button>
				</div>

				{/* App Info */}
				<div className="text-center space-y-4 text-gray-500 text-sm pt-4">
					<button className="flex items-center justify-center space-x-2 mx-auto text-red-500 hover:text-red-600">
						<LogOut size={18} />
						<span>Sign Out</span>
					</button>

					<div>
						<p>Bayelsa Power Connect</p>
						<p>Version 1.0.0</p>
					</div>
				</div>
			</div>
		</MobileLayout>
	);
};

export default Settings;
