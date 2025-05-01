import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

// Pages
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Usage from "./pages/Usage";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import PersonalInformation from "./pages/settings/PersonalInformation";
import Security from "./pages/settings/Security";
import NotificationPreferences from "./pages/settings/NotificationPreferences";
import PaymentMethods from "./pages/settings/PaymentMethods";
import Recharge from "./pages/Recharge";
import ReportOutage from "./pages/ReportOutage";
import NotFound from "./pages/NotFound";

// Onboarding Pages
import OnboardingPage from "./pages/onboarding/Onboarding";
import WelcomeOnboarding from "./pages/onboarding/Welcome";
import LoginPage from "./pages/onboarding/Login";
import SignupPage from "./pages/onboarding/Signup";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<ThemeProvider defaultTheme="light">
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Navigate to="/welcome" />} />
						<Route path="/welcome" element={<Welcome />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/usage" element={<Usage />} />
						<Route
							path="/notifications"
							element={<Notifications />}
						/>
						<Route path="/settings" element={<Settings />} />
						<Route
							path="/settings/personal"
							element={<PersonalInformation />}
						/>
						<Route
							path="/settings/security"
							element={<Security />}
						/>
						<Route
							path="/settings/notifications"
							element={<NotificationPreferences />}
						/>
						<Route
							path="/settings/payment"
							element={<PaymentMethods />}
						/>
						<Route path="/recharge" element={<Recharge />} />
						<Route
							path="/report-outage"
							element={<ReportOutage />}
						/>

						{/* Onboarding Routes */}
						<Route
							path="/onboarding"
							element={<OnboardingPage />}
						/>
						<Route
							path="/onboarding/welcome"
							element={<WelcomeOnboarding />}
						/>
						<Route
							path="/onboarding/login"
							element={<LoginPage />}
						/>
						<Route
							path="/onboarding/signup"
							element={<SignupPage />}
						/>

						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</TooltipProvider>
		</ThemeProvider>
	</QueryClientProvider>
);

export default App;
