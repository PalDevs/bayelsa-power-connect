import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Zap,
	Clock,
	Calendar,
	AlertTriangle,
	PieChart,
	TrendingUp,
	TrendingDown,
	BellDot,
	Wallet,
	ChevronRight,
	Eye,
	EyeOff,
	Receipt,
} from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PowerCard from "@/components/ui/PowerCard";
import ActionButton from "@/components/ui/ActionButton";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart as ReChartPie, Pie, Cell } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Dashboard = () => {
	const navigate = useNavigate();
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
		walletBalance: "******", // Hidden by default
		transactions: [
			{
				date: "2025-05-01",
				time: "1:52 pm",
				units: 500,
				amount: 250,
				type: "recharge",
			},
			{ date: "2025-04-12", units: 1000, amount: 500, type: "recharge" },
			{ date: "2025-03-24", units: 1200, amount: 500, type: "recharge" },
			{ date: "2025-03-11", units: 200, amount: 100, type: "recharge" },
			{ date: "2025-01-28", units: 400, amount: 200, type: "recharge" },
		],
		walletFunding: [
			{
				date: "2025-05-01",
				time: "1:52 pm",
				account: "JOHN DOE 234***5678 A45",
				amount: 2000,
			},
			{
				date: "2025-04-12",
				account: "JOHN DOE 234***5678 A45",
				amount: 500,
			},
			{
				date: "2025-03-24",
				account: "JOHN DOE 234***5678 A45",
				amount: 500,
			},
			{
				date: "2025-03-11",
				account: "JOHN DOE 234***5678 A45",
				amount: 1000,
			},
			{
				date: "2025-01-28",
				account: "JOHN DOE 234***5678 A45",
				amount: 20000,
			},
		],
	});

	const [showWalletBalance, setShowWalletBalance] = useState(false);
	const [showTransactions, setShowTransactions] = useState(false);
	const [activeTransactionTab, setActiveTransactionTab] = useState<
		"recharge" | "funding"
	>("recharge");

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

	const toggleWalletBalance = () => {
		setShowWalletBalance(!showWalletBalance);
	};

	const toggleTransactions = () => {
		setShowTransactions(!showTransactions);
	};

	return (
		<MobileLayout>
			<div className="space-y-5 pb-20">
				{/* User Header with avatar, greeting, and notification bell */}
				<div className="flex items-center justify-between py-3">
					<div className="flex items-center space-x-3">
						<Avatar className="w-12 h-12 rounded-full object-cover border-2 border-bayelsa-teal">
							<AvatarFallback className="bg-secondary text-bayelsa-teal text-2xl">
								{userData.name.substring(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-sm text-bayelsa-gray">
								Welcome back,
							</p>
							<h1 className="text-xl font-bold">
								{userData.name}
							</h1>
						</div>
					</div>
					<div className="relative">
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full"
							onClick={() => navigate("/notifications")}
						>
							<BellDot size={24} />
							{userData.unreadNotifications > 0 && (
								<span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
									{userData.unreadNotifications}
								</span>
							)}
						</Button>
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

				{/* Wallet Card */}
				<Card className="bg-bayelsa-deep-blue text-white shadow-md">
					<CardContent className="p-4">
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-2">
								<Wallet
									size={24}
									className="text-bayelsa-teal"
								/>
								<h3 className="font-bold text-lg">
									Wallet Balance
								</h3>
								<Button
									variant="ghost"
									size="icon"
									className="h-6 w-6 rounded-full text-bayelsa-teal p-1"
									onClick={toggleWalletBalance}
								>
									{showWalletBalance ? (
										<EyeOff size={16} />
									) : (
										<Eye size={16} />
									)}
								</Button>
							</div>
							<Button
								size="sm"
								variant="secondary"
								className="bg-white text-bayelsa-deep-blue hover:bg-gray-100"
								onClick={() => navigate("/recharge")}
							>
								Add Funds
							</Button>
						</div>
						<div className="mt-2">
							<p className="text-3xl font-bold">
								{showWalletBalance ? "₦45,000.00" : "******"}
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Quick Recharge */}
				<div>
					<Link to="/recharge">
						<ActionButton
							fullWidth
							className="flex items-center justify-center space-x-2"
						>
							<Zap size={18} />
							<span>Recharge</span>
						</ActionButton>
					</Link>
				</div>

				{/* Buy Again Section */}
				<div className="mt-4">
					<div className="flex justify-between items-center mb-3">
						<h3 className="font-bold text-bayelsa-deep-blue">
							Buy Again
						</h3>
						<Button
							variant="ghost"
							size="sm"
							className="p-0 h-auto"
							onClick={toggleTransactions}
						>
							{showTransactions ? (
								<EyeOff size={16} />
							) : (
								<Eye size={16} />
							)}
						</Button>
					</div>

					<div className="space-y-3">
						<Card className="border border-gray-200 hover:shadow-md transition-all">
							<Link
								to="/recharge"
								className="flex items-center justify-between p-4"
							>
								<div>
									<span className="text-lg">200 Units</span> /{" "}
									<span className="text-gray-500">
										₦6,500.00
									</span>
								</div>
								<ChevronRight
									size={20}
									className="text-gray-400"
								/>
							</Link>
						</Card>
						<Card className="border border-gray-200 hover:shadow-md transition-all">
							<Link
								to="/recharge"
								className="flex items-center justify-between p-4"
							>
								<div>
									<span className="text-lg">1,000 Units</span>{" "}
									/{" "}
									<span className="text-gray-500">
										₦32,000.00
									</span>
								</div>
								<ChevronRight
									size={20}
									className="text-gray-400"
								/>
							</Link>
						</Card>
						<Card className="border border-gray-200 hover:shadow-md transition-all">
							<Link
								to="/recharge"
								className="flex items-center justify-between p-4"
							>
								<div>
									<span className="text-lg">50 Units</span> /{" "}
									<span className="text-gray-500">
										₦1,600.00
									</span>
								</div>
								<ChevronRight
									size={20}
									className="text-gray-400"
								/>
							</Link>
						</Card>
					</div>
				</div>

				{/* Transaction History (Toggle) */}
				{showTransactions && (
					<div className="mt-4">
						<Card>
							<CardContent className="p-4">
								<div className="flex justify-between items-center mb-3">
									<h3 className="font-bold text-bayelsa-deep-blue">
										Transaction History
									</h3>
									<Link
										to="/transactions"
										className="text-sm text-bayelsa-teal"
									>
										See All
									</Link>
								</div>

								<Tabs
									defaultValue="recharge"
									onValueChange={(value) =>
										setActiveTransactionTab(
											value as "recharge" | "funding"
										)
									}
								>
									<TabsList className="grid w-full grid-cols-2 mb-4">
										<TabsTrigger value="recharge">
											Recharge
										</TabsTrigger>
										<TabsTrigger value="funding">
											Wallet Funding
										</TabsTrigger>
									</TabsList>

									<TabsContent value="recharge">
										{userData.transactions.length > 0 ? (
											<div className="space-y-3 max-h-64 overflow-y-auto">
												{userData.transactions
													.slice(0, 3)
													.map(
														(
															transaction,
															index
														) => (
															<div
																key={index}
																className="border-b pb-2 last:border-0"
															>
																<div className="flex justify-between items-start">
																	<div>
																		<p className="text-sm font-medium">
																			{transaction.time
																				? transaction.time
																				: new Date(
																						transaction.date
																				  ).toLocaleDateString()}
																		</p>
																		<p className="text-sm text-gray-500">
																			{
																				transaction.units
																			}{" "}
																			Units
																		</p>
																	</div>
																	<p className="font-bold">
																		₦
																		{transaction.amount.toFixed(
																			2
																		)}
																	</p>
																</div>
															</div>
														)
													)}
											</div>
										) : (
											<div className="text-center py-6">
												<div className="text-gray-300 mb-2">
													<Receipt
														size={48}
														className="mx-auto"
													/>
												</div>
												<p className="text-gray-500">
													No Recharge Yet
												</p>
											</div>
										)}
									</TabsContent>

									<TabsContent value="funding">
										{userData.walletFunding.length > 0 ? (
											<div className="space-y-3 max-h-64 overflow-y-auto">
												{userData.walletFunding
													.slice(0, 3)
													.map((funding, index) => (
														<div
															key={index}
															className="border-b pb-2 last:border-0"
														>
															<div className="flex justify-between items-start">
																<div>
																	<p className="text-sm font-medium">
																		{funding.time
																			? funding.time
																			: new Date(
																					funding.date
																			  ).toLocaleDateString()}
																	</p>
																	<p className="text-sm text-gray-500 truncate max-w-[200px]">
																		{
																			funding.account
																		}
																	</p>
																</div>
																<p className="font-bold">
																	₦
																	{funding.amount.toFixed(
																		2
																	)}
																</p>
															</div>
														</div>
													))}
											</div>
										) : (
											<div className="text-center py-6">
												<div className="text-gray-300 mb-2">
													<Receipt
														size={48}
														className="mx-auto"
													/>
												</div>
												<p className="text-gray-500">
													No Funds Transfer Yet
												</p>
											</div>
										)}
									</TabsContent>
								</Tabs>
							</CardContent>
						</Card>
					</div>
				)}

				{/* Usage Overview Card - unchanged */}
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
			</div>
		</MobileLayout>
	);
};

export default Dashboard;
