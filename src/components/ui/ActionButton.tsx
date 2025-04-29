import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "outline";
	fullWidth?: boolean;
	className?: string;
}

const ActionButton = ({
	children,
	variant = "primary",
	fullWidth = false,
	className = "",
	...props
}: ActionButtonProps) => {
	return (
		<button
			className={cn(
				"rounded-full px-6 py-3 font-medium transition-all text-sm",
				{
					"bg-bayelsa-deep-blue text-white hover:bg-bayelsa-blue":
						variant === "primary",
					"border-2 border-bayelsa-deep-blue text-bayelsa-deep-blue hover:bg-bayelsa-deep-blue hover:text-white":
						variant === "outline",
					"w-full dark:bg-bayelsa-deep-blue dark:text-white": fullWidth,
				},
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export default ActionButton;
