import { useState } from "react";
import { Link } from "react-router-dom";
import {
	Zap,
	Clock,
	Calendar,
	AlertTriangle,
	PieChart,
	TrendingUp,
	TrendingDown,
} from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PowerCard from "@/components/ui/PowerCard";
import ActionButton from "@/components/ui/ActionButton";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart as ReChartPie, Pie, Cell } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
	// Sample user data - in a real app, this would come from an API
	const [userData] = useState({
		name: "DOUYE DIRI",
		powerUnits: 145.7,
		daysLeft: 20,
		lastRecharge: "14/02/2025",
		unreadNotifications: 1,
		avatar: "/lovable-uploads/cb27d16d-8596-49eb-b3ea-d706965910fd.png",
		dailyAverage: 7.3,
		totalAllocation: 200,
		usagePercentage: 27,
		dailyUsage: [
			{ name: "Mon", value: 6.2 },
			{ name: "Tue", value: 7.1 },
			{ name: "Wed", value: 8.4 },
			{ name: "Thu", value: 5.9 },
			{ name: "Fri", value: 7.8 },
			{ name: "Sat", value: 9.2 },
			{ name: "Sun", value: 6.5 },
		],
		usageTrend: "down", // 'up' or 'down'
	});

	// Colors for the pie chart
	const COLORS = ["#47B8B8", "#F1F0FB"];

	// Data for the usage pie chart
	const usageData = [
		{ name: "Used", value: userData.powerUnits },
		{
			name: "Remaining",
			value: userData.totalAllocation - userData.powerUnits,
		},
	];

	return (
		<MobileLayout>
			<div className="space-y-5 pb-4">
				{/* User Header with avatar and greeting */}
				<div className="flex items-center space-x-3 py-3">
					<Avatar className="w-12 h-12 rounded-full object-cover border-2 border-bayelsa-teal">
						{/* <AvatarImage
							src={userData.avatar || ""}
							alt="Organization logo"
						/> */}
						<AvatarFallback className="bg-secondary text-bayelsa-teal text-2xl">
							{userData.name.substring(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="text-sm text-bayelsa-gray">
							Welcome back,
						</p>
						<h1 className="text-xl font-bold">{userData.name}</h1>
					</div>
				</div>

				{/* Power Units Card - Enhanced */}
				<PowerCard className="relative overflow-hidden">
					<div className="flex justify-between items-start mb-4">
						<h2 className="text-xl font-medium">
							Available power units
						</h2>
						<div className="flex items-center px-2 py-1 bg-white/20 rounded-md">
							{userData.usageTrend === "down" ? (
								<TrendingDown
									size={16}
									className="text-green-400 mr-1"
								/>
							) : (
								<TrendingUp
									size={16}
									className="text-red-400 mr-1"
								/>
							)}
							<span className="text-xs">
								{userData.dailyAverage} kWh/day
							</span>
						</div>
					</div>

					<div className="flex items-center space-x-2 mb-4">
						<Zap size={28} className="text-bayelsa-teal" />
						<span className="text-4xl font-bold">
							{userData.powerUnits}KWh
						</span>
					</div>

					<div className="relative mb-2">
						<Progress
							value={userData.usagePercentage}
							className="h-2 bg-white/30"
						/>
						<div className="flex justify-between mt-1 text-xs">
							<span>0 kWh</span>
							<span>{userData.totalAllocation} kWh</span>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-2 mt-4">
						<div className="flex items-center space-x-2 bg-white/10 p-2 rounded-lg">
							<Clock size={18} />
							<span className="text-sm">
								{userData.daysLeft} days left
							</span>
						</div>
						<div className="flex items-center space-x-2 bg-white/10 p-2 rounded-lg">
							<Calendar size={18} />
							<span className="text-sm">
								Last: {userData.lastRecharge}
							</span>
						</div>
					</div>
				</PowerCard>

				{/* Usage Visualization */}
				<Card className="bg-white shadow-md">
					<CardContent className="pt-4">
						<div className="flex justify-between items-center mb-2">
							<h3 className="font-bold text-bayelsa-deep-blue">
								Usage Overview
							</h3>
							<Link
								to="/usage"
								className="text-sm text-bayelsa-teal"
							>
								See details
							</Link>
						</div>
						<div className="grid grid-cols-2 gap-4">
							{/* Pie Chart showing usage */}
							<div className="flex flex-col items-center">
								<p className="text-xs text-bayelsa-gray mb-2">
									Power Units
								</p>
								<ChartContainer
									config={{
										used: { color: "#47B8B8" },
										remaining: { color: "#F1F0FB" },
									}}
									className="h-24 w-full"
								>
									<ReChartPie
										data={usageData}
										innerRadius={35}
										outerRadius={45}
									>
										<Pie
											data={usageData}
											innerRadius={35}
											outerRadius={45}
											paddingAngle={5}
											dataKey="value"
										>
											{usageData.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={
														COLORS[
															index %
																COLORS.length
														]
													}
												/>
											))}
										</Pie>
									</ReChartPie>
								</ChartContainer>
								<div className="text-center mt-2">
									<p className="text-xs text-bayelsa-gray">
										{userData.usagePercentage}% used
									</p>
								</div>
							</div>
							{/* Daily average usage */}
							<div className="flex flex-col justify-center">
								<div className="mb-2">
									<p className="text-xs text-bayelsa-gray">
										Daily Average
									</p>
									<p className="font-bold text-xl">
										{userData.dailyAverage} kWh
									</p>
								</div>
								<div>
									<p className="text-xs text-bayelsa-gray">
										Estimated Duration
									</p>
									<p className="font-bold text-xl">
										{userData.daysLeft} days
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Notifications */}
				<div className="bg-gradient-to-r from-green-200 to-blue-200 rounded-xl p-3 flex items-center justify-between shadow-md text-black">
					<div className="flex items-center space-x-2">
						<AlertTriangle size={20} />
						<span className="font-medium">
							{userData.unreadNotifications} unread notification
						</span>
					</div>
					<Link
						to="/notifications"
						className="text-xs bg-white/50 px-2 py-1 rounded-full"
					>
						View
					</Link>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 gap-4 mt-6 min-[400px]:grid-cols-2">
					<Link to="/recharge">
						<ActionButton
							fullWidth
							className="flex items-center justify-center space-x-2 border-2 border-bayelsa-deep-blue"
						>
							<Zap size={18} />
							<span>Recharge</span>
						</ActionButton>
					</Link>
					<Link to="/report-outage">
						<ActionButton
							variant="outline"
							fullWidth
							className="flex items-center justify-center space-x-2"
						>
							<AlertTriangle size={18} />
							<span>Report Outage</span>
						</ActionButton>
					</Link>
				</div>
			</div>
		</MobileLayout>
	);
};

export default Dashboard;
