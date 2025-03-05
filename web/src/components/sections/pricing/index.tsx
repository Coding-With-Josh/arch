'use client';
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { PlanType } from "@prisma/client";
import { useEffect, useState } from "react";



const PADDLE_PRICE_IDS = {
    [PlanType.SILVER]: {
        monthly: 'pri_01jnhbmcvxz2mtqr1h2rrpdmzg', // Replace with your actual Paddle price IDs
        yearly: 'pri_02xxx'
    },
    [PlanType.GOLD]: {
        monthly: 'pri_01jnhbjyrq6c4hbnbf2nrnte6r',
        yearly: 'pri_04xxx'
    },
    [PlanType.TITANIUM]: {
        monthly: 'pri_01jnhbnq566dxj8m26203xdazd',
        yearly: 'pri_06xxx'
    }
};

const plans = [
    {
        name: "Free",
        price: 0,
        type: PlanType.FREE,
        description: "Perfect for getting started",
        features: [
            "1 Project",
            "Basic Templates",
            "Community Support",
            "Basic Analytics",
            "48-hour Support Response",
        ],
    },
    {
        name: "Silver",
        price: 25,
        type: PlanType.SILVER,
        description: "Great for serious developers",
        features: [
            "5 Projects",
            "Premium Templates",
            "Priority Support",
            "Advanced Analytics",
            "24-hour Support Response",
            "Custom Domains",
        ],
    },
    {
        name: "Gold",
        price: 60,
        type: PlanType.GOLD,
        description: "Perfect for growing teams",
        features: [
            "15 Projects",
            "All Templates",
            "Premium Support",
            "Team Analytics",
            "4-hour Support Response",
            "API Access",
            "Custom Branding",
        ],
    },
    {
        name: "Titanium",
        price: 250,
        type: PlanType.TITANIUM,
        popular: true,
        description: "For professional developers",
        features: [
            "Unlimited Projects",
            "Custom Templates",
            "24/7 Premium Support",
            "Advanced Team Analytics",
            "1-hour Support Response",
            "Advanced API Access",
            "White Labeling",
            "Custom Integrations",
        ],
    },
    {
        name: "Enterprise",
        price: "Custom",
        type: PlanType.ENTERPRISE,
        description: "For large organizations",
        features: [
            "Everything in Titanium",
            "Dedicated Support Team",
            "Custom SLA",
            "Enterprise Security",
            "Custom Contracts",
            "Training Sessions",
        ],
    },
    // {
    //     name: "Teams",
    //     price: 400,
    //     type: PlanType.TEAMS,
    //     description: "For larger teams",
    //     features: [
    //         "Everything in Titanium",
    //         "Team Collaboration Tools",
    //         "Advanced Team Management",
    //         "Team Training Sessions",
    //         "Priority Bug Fixes",
    //         "Custom Team Features",
    //     ],
    // },
];

export function PricingSection() {
    const [paddle, setPaddle] = useState<Paddle>();

    useEffect(() => {
        initializePaddle({
          environment: "sandbox",
          token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
        }).then((paddle) => setPaddle(paddle));
      }, []);

    const [isAnnual, setIsAnnual] = useState(true);
        const [isLoading, setIsLoading] = useState(false);

        const handleSubscription = async (plan: PlanType) => {
            if (!paddle) return alert("Paddle not initialized");
                try {
                        setIsLoading(true);
                        
                        // Don't process if it's free or enterprise plan
                        if (plan === PlanType.FREE || plan === PlanType.ENTERPRISE) {
                                return;
                        }

                        const priceId = PADDLE_PRICE_IDS[plan][isAnnual ? 'yearly' : 'monthly'];
                        
                        // Open Paddle checkout
                        await paddle.Checkout.open({
                                items: [{
                                        priceId: priceId,
                                        quantity: 1
                                }]
                        });

                } catch (error) {
                        console.error('Subscription error:', error);
                } finally {
                        setIsLoading(false);
                }
        };

    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-5xl">
                        Choose Your Plan
                    </h2>
                    <p className="mt-4 text-xl text-gray-400">
                        Select the perfect plan for your needs
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="mt-12 flex justify-center items-center space-x-4">
                    <span className={cn("text-lg", !isAnnual ? "text-white" : "text-gray-400")}>
                        Monthly
                    </span>
                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                            isAnnual ? "bg-blue-600" : "bg-gray-600"
                        )}
                    >
                        <span
                            className={cn(
                                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                isAnnual ? "translate-x-6" : "translate-x-1"
                            )}
                        />
                    </button>
                    <span className={cn("text-lg", isAnnual ? "text-white" : "text-gray-400")}>
                        Annual <span className="text-blue-500">(Save 20%)</span>
                    </span>
                </div>

                <div className="mt-24 space-y-12 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-y-0">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={cn(
                                "relative flex flex-col rounded-2xl border bg-zinc-900/50 backdrop-blur-sm p-8 shadow-lg",
                                plan.popular ? "border-blue-500" : "border-gray-800"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-blue-500 px-3 py-2 text-sm font-medium text-white text-center">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                                <p className="mt-4 text-gray-400">{plan.description}</p>
                                <p className="mt-8">
                                    <span className="text-5xl font-bold text-white">
                                        ${typeof plan.price === "number" ? 
                                            (isAnnual ? (plan.price * 0.8 * 12).toFixed(0) : plan.price) 
                                            : plan.price}
                                    </span>
                                    {typeof plan.price === "number" && (
                                        <span className="text-gray-400">/{isAnnual ? 'year' : 'month'}</span>
                                    )}
                                </p>
                            </div>

                            <ul className="mb-8 space-y-4 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-gray-400">
                                        <CheckIcon className="h-5 w-5 text-blue-500 mr-3" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button 
                className={cn(
                        "w-full",
                        plan.popular ? "bg-blue-500 hover:bg-blue-600" : "bg-zinc-800 hover:bg-zinc-700"
                )}
                onClick={() => handleSubscription(plan.type)}
                disabled={isLoading}
        >
                {isLoading ? "Loading..." : plan.type === PlanType.ENTERPRISE ? "Contact Sales" : "Get Started"}
        </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default PricingSection;