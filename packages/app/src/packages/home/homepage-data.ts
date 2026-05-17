import {
	Activity,
	Bell,
	Bot,
	CircleDollarSign,
	CirclePlay,
	LockKeyhole,
	ShieldCheck,
	Sparkles,
	TrendingUp,
	Zap,
} from "lucide-react";

export const homepageNavigationItems = [
	{ label: "Product", href: "#product" },
	{ label: "Dashboard", href: "/dashboard" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Documentation", href: "#documentation" },
] as const;

export const strategySteps = [
	{
		id: 1,
		title: "Build strategies visually",
		description:
			"Drag and drop triggers, conditions, and actions without code.",
	},
	{
		id: 2,
		title: "Get Smart Alerts",
		description: "Real time notifications when your conditions are met",
	},
	{
		id: 3,
		title: "Execute safely with automation",
		description: "Test in simulation, then run live with risk controls.",
	},
] as const;

export const alertItems = [
	{
		title: "Market Surge Detected",
		description: "Ethereum ETF Approval jumped +14% in volume",
		time: "1h ago",
		icon: Zap,
		tone: "blue",
		active: true,
	},
	{
		title: "Automation Executed Successfully",
		description: "Dip Buyer purchased $50 YES in US Election",
		time: "1h ago",
		icon: Bot,
		tone: "green",
	},
	{
		title: "Risk Guardrail Triggered",
		description: "Weekly exposure limit reached for Politics",
		time: "1h ago",
		icon: ShieldCheck,
		tone: "orange",
	},
	{
		title: "Simulation Result Available",
		description: "Election Night Profit Locker would have closed",
		time: "1h ago",
		icon: Sparkles,
		tone: "violet",
	},
	{
		title: "Performance Insight",
		description: "Your automations outperformed manual trades",
		time: "1h ago",
		icon: TrendingUp,
		tone: "slate",
	},
] as const;

export const builderNodes = [
	{
		label: "Start",
		x: "8%",
		y: "39%",
		className: "w-[54px]",
		icon: Activity,
		iconClassName: "bg-[#9fc94b] text-white",
	},
	{
		eyebrow: "Price Change",
		label: "Trigger when BTC hits $72,000",
		x: "28%",
		y: "34%",
		className: "w-[230px]",
		icon: CircleDollarSign,
		iconClassName: "bg-[#2563eb] text-white",
	},
	{
		eyebrow: "Trigger",
		label: "Select the event that starts Uptions",
		x: "53%",
		y: "52%",
		className: "w-[250px] border-[#ff5a1f]/75 bg-white",
		icon: Bell,
		iconClassName: "bg-[#ff5a1f] text-white",
	},
] as const;

export const executionItems = [
	{
		label: "Simulation Passed",
		value: "+18.4%",
		icon: CirclePlay,
		tone: "border-emerald-200 bg-emerald-50 text-emerald-600",
	},
	{
		label: "Risk Guard Enabled",
		value: "$250 max",
		icon: LockKeyhole,
		tone: "border-orange-200 bg-orange-50 text-orange-600",
	},
	{
		label: "Live Automation",
		value: "Ready",
		icon: Zap,
		tone: "border-blue-200 bg-blue-50 text-blue-600",
	},
] as const;
