import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";

const Welcome = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate("/dashboard");
		}, 3500); // Increased time slightly to allow animation to complete

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<MobileLayout hideNavigation>
			<div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
				{/* Top emblem with pulsing animation */}
				<div className="mb-8 animate-pulse">
					<img
						src="/lovable-uploads/d262bdb0-052e-43ec-9749-aafd007dd6d4.png"
						alt="Bayelsa State Emblem"
						className="w-36 h-36 drop-shadow-lg"
					/>
				</div>

				{/* Middle content with fade-in animation */}
				<div className="space-y-6 animate-fade-in">
					<h1 className="text-4xl font-bold text-bayelsa-deep-blue dark:text-bayelsa-teal tracking-wide">
						WELCOME TO
					</h1>

					<div className="relative">
						<div className="flex items-center justify-center space-x-1">
							<span className="text-5xl font-bold text-bayelsa-blue dark:text-white">
								B
							</span>

							{/* Power Tower Icon in the middle of "BAY POWER" */}
							<div className="w-8 h-16 relative">
								<svg
									width="32"
									height="59"
									viewBox="0 0 32 59"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M0.000334987 58.4531C-0.0253648 58.3177 1.43096 51.7984 3.23851 43.9638C7.38645 25.9871 9.70629 15.4846 9.71828 14.6387C9.72856 13.8279 9.84335 13.8367 5.46068 14.3309C3.74565 14.5244 2.26877 14.6826 2.17968 14.6826C1.96209 14.6826 1.97065 12.1731 2.18996 11.7123C2.33559 11.4098 3.06889 11.1724 6.56406 10.2984C11.5344 9.05679 10.8816 9.76903 11.961 4.41929C12.9153 -0.31317 12.6498 -0.00541044 15.7646 0.00865857C18.9531 0.0209689 18.6412 -0.336032 19.6744 4.49491C20.137 6.66506 20.5944 8.62065 20.6887 8.84224C20.8412 9.19572 21.3551 9.36631 25.0593 10.2966C30.1428 11.5734 29.7727 11.343 29.7727 13.2282C29.7727 14.7319 29.7727 14.7319 28.8732 14.6246C25.7669 14.257 22.2529 14.0953 22.1193 14.3151C21.9411 14.6105 24.1307 25.0339 25.7618 31.6534C27.1462 37.2739 32 58.3827 32 58.7837C32 58.993 31.7567 59.0158 30.5865 58.9138C28.6779 58.7468 28.5408 58.6342 28.1073 56.8633C27.7458 55.3948 27.7458 55.3948 25.8903 53.9299C23.2518 51.8512 16.4242 47.3931 15.876 47.3931C15.3757 47.3931 9.05523 51.4625 6.11346 53.6766C4.29905 55.0431 4.29905 55.0431 3.82789 56.7507C3.54348 57.7778 3.2248 58.5674 3.02606 58.7292C2.84444 58.8787 2.5429 59 2.35615 59C2.1694 59 1.57316 58.9314 1.03175 58.8488C0.421812 58.7538 0.0294614 58.6026 0.000334987 58.4531ZM26.7847 51.3939C26.8515 51.3201 24.3363 41.7532 24.2181 41.6336C24.0639 41.4753 18.631 44.9785 18.6807 45.2053C18.7029 45.3073 19.5699 46.0618 20.6064 46.8831C21.643 47.7026 23.3974 49.0638 24.5042 49.9061C25.611 50.7485 26.5688 51.4379 26.6322 51.4379C26.6938 51.4379 26.7641 51.4186 26.7847 51.3939ZM13.1535 45.1983C13.1535 44.9433 7.71541 41.4858 7.56121 41.6424C7.51495 41.6916 6.94785 43.8565 6.30364 46.4522C5.66114 49.0497 5.12659 51.1935 5.11802 51.2181C5.10774 51.2427 5.16942 51.262 5.25509 51.262C5.56348 51.262 13.1535 45.4357 13.1535 45.1983ZM15.7235 42.9965L21.3774 39.1275L16.0661 34.731L10.4122 39.1275L15.7235 42.9965ZM8.52753 36.8413L13.1535 32.093L10.5835 28.9275H10.0695L8.52753 36.8413ZM21.422 29.0137C21.2438 28.6883 18.6361 31.2331 18.6361 31.7325C18.6361 31.8521 19.6007 33.0497 20.7778 34.3951C22.0405 35.8371 22.9571 36.7516 23.0102 36.6215C23.1147 36.37 21.6755 29.4815 21.422 29.0137ZM15.5521 29.8068L20.0068 25.5861L16.0661 22.4206L11.6115 25.5861L15.5521 29.8068ZM15.9428 17.1447C16.0541 17.1447 16.8971 17.9115 17.8137 18.8506C18.7303 19.7879 19.5133 20.5213 19.5527 20.4773C19.7206 20.2891 18.1221 13.0067 17.8703 12.8185C17.5173 12.5529 15.6892 12.4035 14.5241 12.5459C13.5818 12.6602 13.5818 12.6602 12.7817 16.3533C12.3431 18.3845 11.9764 20.1449 11.9679 20.2663C11.961 20.3876 12.8057 19.7352 13.8474 18.8154C14.8874 17.8956 15.8314 17.1447 15.9428 17.1447ZM14.6955 8.87917H16.9228V7.82399L15.8948 3.95501L14.6955 8.87917Z"
										fill="#161616"
										className="fill-bayelsa-blue dark:fill-white"
									/>
								</svg>
							</div>

							<div className="flex items-center">
								<span className="text-5xl font-bold text-bayelsa-blue dark:text-white">
									Y
								</span>
								<span className="text-5xl font-bold text-bayelsa-blue dark:text-white ml-4">
									POWER
								</span>
							</div>
						</div>

						<p className="text-sm text-gray-500 mt-2 italic">
							Powering Bayelsa State
						</p>
					</div>
				</div>

				{/* Bottom text with slide-up animation */}
				<div
					className="absolute bottom-16 animate-fade-in"
					style={{ animationDelay: "1s" }}
				>
					<p className="text-bayelsa-gray text-sm">
						© 2025 Bayelsa State Government
					</p>
				</div>

				{/* Loading dots animation */}
				<div className="absolute bottom-8 flex space-x-2 animate-pulse">
					<div className="w-3 h-3 bg-bayelsa-teal rounded-full"></div>
					<div
						className="w-3 h-3 bg-bayelsa-teal rounded-full"
						style={{ animationDelay: "0.2s" }}
					></div>
					<div
						className="w-3 h-3 bg-bayelsa-teal rounded-full"
						style={{ animationDelay: "0.4s" }}
					></div>
				</div>
			</div>
		</MobileLayout>
	);
};

export default Welcome;
