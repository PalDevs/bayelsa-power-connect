
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, PlusCircle, CreditCard, Trash2, Check, Info as InfoIcon } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const PaymentMethods = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [isAddingCard, setIsAddingCard] = useState(false);
	const [cards, setCards] = useState([
		{
			id: "1",
			type: "visa",
			last4: "4242",
			expMonth: 12,
			expYear: 2024,
			name: "John Doe",
			isDefault: true,
		},
		{
			id: "2",
			type: "mastercard",
			last4: "5555",
			expMonth: 10,
			expYear: 2025,
			name: "John Doe",
			isDefault: false,
		},
	]);

	const [newCard, setNewCard] = useState({
		cardNumber: "",
		cardName: "",
		expMonth: "",
		expYear: "",
		cvv: "",
		isDefault: false,
	});

	const handleRemoveCard = (cardId: string) => {
		setCards(cards.filter((card) => card.id !== cardId));
		toast({
			title: "Card Removed",
			description: "Your payment method has been removed successfully.",
		});
	};

	const handleSetDefault = (cardId: string) => {
		setCards(
			cards.map((card) => ({
				...card,
				isDefault: card.id === cardId,
			}))
		);
		toast({
			title: "Default Card Updated",
			description: "Your default payment method has been updated.",
		});
	};

	const handleAddCard = () => {
		// Simple validation
		if (
			!newCard.cardNumber ||
			!newCard.cardName ||
			!newCard.expMonth ||
			!newCard.expYear ||
			!newCard.cvv
		) {
			toast({
				title: "Invalid Card Details",
				description: "Please fill in all card details correctly.",
				variant: "destructive",
			});
			return;
		}

		// Add new card
		const last4 = newCard.cardNumber.slice(-4);
		const cardType =
			newCard.cardNumber.startsWith("4")
				? "visa"
				: newCard.cardNumber.startsWith("5")
				? "mastercard"
				: "card";

		const newCardObj = {
			id: Date.now().toString(),
			type: cardType,
			last4,
			expMonth: parseInt(newCard.expMonth),
			expYear: parseInt(newCard.expYear),
			name: newCard.cardName,
			isDefault: newCard.isDefault || cards.length === 0,
		};

		setCards([...cards, newCardObj]);

		// Reset form
		setNewCard({
			cardNumber: "",
			cardName: "",
			expMonth: "",
			expYear: "",
			cvv: "",
			isDefault: false,
		});

		setIsAddingCard(false);
		toast({
			title: "Card Added",
			description: "Your new payment method has been added successfully.",
		});
	};

	const getCardIcon = (type: string) => {
		switch (type) {
			case "visa":
				return "💳 Visa";
			case "mastercard":
				return "💳 Mastercard";
			default:
				return "💳 Card";
		}
	};

	const currentYear = new Date().getFullYear();
	const years = Array.from(
		{ length: 10 },
		(_, i) => currentYear + i
	).toString();
	const months = Array.from({ length: 12 }, (_, i) => i + 1).toString();

	return (
		<MobileLayout>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<button
						onClick={() => navigate("/settings")}
						className="flex items-center text-sm font-medium text-gray-500"
					>
						<ChevronLeft className="mr-1 h-4 w-4" />
						Back to Settings
					</button>
				</div>

				<div>
					<h1 className="text-2xl font-bold">Payment Methods</h1>
					<p className="text-sm text-gray-500 mt-1">
						Manage your payment methods
					</p>
				</div>

				{cards.length === 0 ? (
					<Card className="bg-gray-50 border-dashed border-2 border-gray-200">
						<CardContent className="pt-6 text-center">
							<div className="flex flex-col items-center justify-center space-y-3 py-6">
								<CreditCard className="h-12 w-12 text-gray-400" />
								<div>
									<p className="font-medium text-gray-600">
										No payment methods
									</p>
									<p className="text-sm text-gray-500">
										Add a card to pay for electricity
									</p>
								</div>
								<Button
									onClick={() => setIsAddingCard(true)}
									className="mt-2"
								>
									Add Payment Method
								</Button>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="space-y-4">
						{cards.map((card) => (
							<Card key={card.id}>
								<CardContent className="p-0">
									<div className="flex items-center justify-between p-4">
										<div className="flex items-center space-x-4">
											<div className="h-10 w-14 bg-gradient-to-r from-indigo-500 to-blue-500 rounded flex items-center justify-center text-white font-bold">
												{getCardIcon(card.type)}
											</div>
											<div>
												<p className="font-medium">
													•••• •••• ••••{" "}
													{card.last4}
												</p>
												<p className="text-sm text-gray-500">
													Expires {card.expMonth}/
													{card.expYear}
												</p>
											</div>
										</div>
										{card.isDefault && (
											<span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
												<Check className="h-3 w-3 mr-1" />
												Default
											</span>
										)}
									</div>
									<div className="border-t p-4 flex justify-between">
										{!card.isDefault && (
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													handleSetDefault(card.id)
												}
											>
												Set as Default
											</Button>
										)}
										{card.isDefault && (
											<Button
												variant="outline"
												size="sm"
												disabled
												className="opacity-50 cursor-not-allowed"
											>
												Default Card
											</Button>
										)}
										<Button
											variant="ghost"
											size="sm"
											className="text-red-600 hover:text-red-700 hover:bg-red-50"
											onClick={() =>
												handleRemoveCard(card.id)
											}
										>
											<Trash2 className="h-4 w-4 mr-1" />
											Remove
										</Button>
									</div>
								</CardContent>
							</Card>
						))}

						<Button
							onClick={() => setIsAddingCard(true)}
							className="w-full mt-4"
							variant="outline"
						>
							<PlusCircle className="mr-2 h-4 w-4" />
							Add New Card
						</Button>
					</div>
				)}

				{/* Card Security Information */}
				<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm flex items-start space-x-3">
					<InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
					<div>
						<p className="font-medium text-blue-800 dark:text-blue-300">
							Secure Payment Process
						</p>
						<p className="text-blue-700 dark:text-blue-400 mt-1">
							Your card information is securely stored and
							encrypted. We use industry-standard security
							practices to protect your data.
						</p>
					</div>
				</div>

				{/* Add Payment Method Dialog */}
				<Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
					<DialogContent className="max-w-md">
						<DialogHeader>
							<DialogTitle>Add Payment Method</DialogTitle>
							<DialogDescription>
								Add a new card for electricity payments.
							</DialogDescription>
						</DialogHeader>

						<ScrollArea className="max-h-[60vh]">
							<div className="space-y-4 p-1">
								<div className="space-y-2">
									<label className="text-sm font-medium">
										Card Number
									</label>
									<Input
										placeholder="1234 5678 9012 3456"
										value={newCard.cardNumber}
										onChange={(e) =>
											setNewCard({
												...newCard,
												cardNumber: e.target.value,
											})
										}
										maxLength={16}
									/>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium">
										Cardholder Name
									</label>
									<Input
										placeholder="John Doe"
										value={newCard.cardName}
										onChange={(e) =>
											setNewCard({
												...newCard,
												cardName: e.target.value,
											})
										}
									/>
								</div>

								<div className="grid grid-cols-3 gap-4">
									<div className="space-y-2">
										<label className="text-sm font-medium">
											Month
										</label>
										<Select
											value={newCard.expMonth}
											onValueChange={(value) =>
												setNewCard({
													...newCard,
													expMonth: value,
												})
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="MM" />
											</SelectTrigger>
											<SelectContent>
												{Array.from(
													{ length: 12 },
													(_, i) => i + 1
												).map((month) => (
													<SelectItem
														key={month}
														value={
															month.toString()
														}
													>
														{month
															.toString()
															.padStart(2, "0")}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<label className="text-sm font-medium">
											Year
										</label>
										<Select
											value={newCard.expYear}
											onValueChange={(value) =>
												setNewCard({
													...newCard,
													expYear: value,
												})
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="YY" />
											</SelectTrigger>
											<SelectContent>
												{Array.from(
													{ length: 10 },
													(_, i) =>
														currentYear + i
												).map((year) => (
													<SelectItem
														key={year}
														value={year.toString()}
													>
														{year}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<label className="text-sm font-medium">
											CVV
										</label>
										<Input
											placeholder="123"
											value={newCard.cvv}
											onChange={(e) =>
												setNewCard({
													...newCard,
													cvv: e.target.value,
												})
											}
											maxLength={4}
										/>
									</div>
								</div>

								<div className="flex items-center space-x-2 pt-2">
									<input
										type="checkbox"
										id="default-card"
										className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
										checked={newCard.isDefault}
										onChange={(e) =>
											setNewCard({
												...newCard,
												isDefault: e.target.checked,
											})
										}
									/>
									<label
										htmlFor="default-card"
										className="text-sm font-medium"
									>
										Set as default payment method
									</label>
								</div>
							</div>
						</ScrollArea>

						<DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsAddingCard(false)}
							>
								Cancel
							</Button>
							<Button type="submit" onClick={handleAddCard}>
								Add Card
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</MobileLayout>
	);
};

export default PaymentMethods;
