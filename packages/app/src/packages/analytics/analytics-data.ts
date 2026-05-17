import { Activity, CircleDot, LineChart, Zap } from "lucide-react";

export const analyticsMetrics = [
	{
		label: "Total Return",
		value: "+12.8%",
		detail: "+$14,620",
		tone: "text-[#00d66f]",
		icon: LineChart,
	},
	{
		label: "Win Rate",
		value: "68.5%",
		detail: "142 wins / 207 total",
		tone: "text-[#2f80ff]",
		icon: CircleDot,
	},
	{
		label: "Total Trades",
		value: "207",
		detail: "29.6 per day avg",
		tone: "text-[#a855f7]",
		icon: Activity,
	},
	{
		label: "Automation Rate",
		value: "78%",
		detail: "162 automated / 207 total",
		tone: "text-[#ffb000]",
		icon: Zap,
	},
] as const;

export const portfolioMarkers = [
	{ label: "BTC Momentum", x: 24, y: 42, color: "#00d66f" },
	{ label: "ETH Mean Reversion", x: 41, y: 44, color: "#ff3b46" },
	{ label: "SOL Breakout", x: 75, y: 41, color: "#2f80ff" },
	{ label: "DOT Volatility", x: 92, y: 39, color: "#00d66f" },
] as const;

export const portfolioPath =
	"M 45 145 C 180 140 260 138 375 140 C 520 143 610 134 745 135 C 890 136 980 140 1125 132 C 1245 127 1360 130 1485 128";

export const workflowPerformance = [
	{
		name: "ETH Mean Reversion",
		trades: "35 trades",
		winRate: "72% win rate",
		average: "+3.2% avg",
		return: "+$2840",
		status: undefined,
		positive: true,
	},
	{
		name: "SOL Breakout",
		trades: "28 trades",
		winRate: "64% win rate",
		average: "+2.4% avg",
		return: "+$1960",
		status: undefined,
		positive: true,
	},
	{
		name: "DOT Volatility",
		trades: "51 trades",
		winRate: "58% win rate",
		average: "+1.8% avg",
		return: "+$1540",
		status: undefined,
		positive: true,
	},
	{
		name: "LINK Grid",
		trades: "23 trades",
		winRate: "48% win rate",
		average: "-0.8% avg",
		return: "$-240",
		status: "Error",
		positive: false,
	},
] as const;

export const dailyActivity = [
	{ day: "Mon", value: 8 },
	{ day: "Tue", value: 11 },
	{ day: "Wed", value: 14 },
	{ day: "Thu", value: 10 },
	{ day: "Fri", value: 12 },
	{ day: "Sat", value: 7 },
	{ day: "Sun", value: 5 },
] as const;

export const riskMetrics = [
	{
		label: "Volatility",
		value: "12.4%",
		target: "Target: 15%",
		status: "good",
		progress: 82,
		tone: "bg-[#2f80ff]",
	},
	{
		label: "Max Drawdown",
		value: "8.2%",
		target: "Target: 10%",
		status: "good",
		progress: 82,
		tone: "bg-[#2f80ff]",
	},
	{
		label: "Sharpe Ratio",
		value: "1.8%",
		target: "Target: 1.5%",
		status: "excellent",
		progress: 100,
		tone: "bg-[#00d66f]",
	},
	{
		label: "Position Concentration",
		value: "28%",
		target: "Target: 30%",
		status: "good",
		progress: 94,
		tone: "bg-[#2f80ff]",
	},
] as const;
