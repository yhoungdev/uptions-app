import {
	Clock3,
	DollarSign,
	Search,
	ShoppingCart,
	TrendingUp,
	Zap,
} from "lucide-react";

export const workflowBlockKind = {
	trigger: "trigger",
	condition: "condition",
	action: "action",
} as const;

export type WorkflowBlockKind =
	(typeof workflowBlockKind)[keyof typeof workflowBlockKind];

export const workflowBlockTone = {
	[workflowBlockKind.trigger]: {
		border: "#ff5a1f",
		glow: "rgba(255, 90, 31, 0.14)",
		icon: "bg-[#ff5a1f] text-white",
		label: "TRIGGER",
	},
	[workflowBlockKind.condition]: {
		border: "#8b5cf6",
		glow: "rgba(139, 92, 246, 0.14)",
		icon: "bg-[#8b5cf6] text-white",
		label: "CONDITION",
	},
	[workflowBlockKind.action]: {
		border: "#10b981",
		glow: "rgba(16, 185, 129, 0.12)",
		icon: "bg-[#10b981] text-white",
		label: "ACTION",
	},
} as const;

export const workflowBlocks = [
	{
		id: "price-change",
		kind: workflowBlockKind.trigger,
		title: "Price Change",
		description: "When price moves by %",
		value: "BTC > 5%",
		icon: Zap,
	},
	{
		id: "volume-spike",
		kind: workflowBlockKind.trigger,
		title: "Volume Spike",
		description: "Volume exceeds threshold",
		value: "Volume > 20%",
		icon: Zap,
	},
	{
		id: "time-trigger",
		kind: workflowBlockKind.trigger,
		title: "Time Trigger",
		description: "At specific time",
		value: "Every 1 hour",
		icon: Clock3,
	},
	{
		id: "price-above",
		kind: workflowBlockKind.condition,
		title: "Price Above",
		description: "If price > value",
		value: "$95,000",
		icon: TrendingUp,
	},
	{
		id: "price-below",
		kind: workflowBlockKind.condition,
		title: "Price Below",
		description: "If price < value",
		value: "$88,000",
		icon: TrendingUp,
	},
	{
		id: "position-size",
		kind: workflowBlockKind.condition,
		title: "Position Size",
		description: "Position meets criteria",
		value: "$1,000 max",
		icon: DollarSign,
	},
	{
		id: "buy",
		kind: workflowBlockKind.action,
		title: "Buy",
		description: "Execute buy order",
		value: "Execute buy order",
		icon: ShoppingCart,
	},
	{
		id: "sell",
		kind: workflowBlockKind.action,
		title: "Sell",
		description: "Execute sell order",
		value: "Execute sell order",
		icon: ShoppingCart,
	},
	{
		id: "alert",
		kind: workflowBlockKind.action,
		title: "Alert",
		description: "Send notification",
		value: "Send notification",
		icon: Search,
	},
] as const;

export type WorkflowBlock = (typeof workflowBlocks)[number];

export const workflowBlockGroups = [
	{
		title: "TRIGGERS",
		kind: workflowBlockKind.trigger,
		blocks: workflowBlocks.filter(
			(block) => block.kind === workflowBlockKind.trigger,
		),
	},
	{
		title: "CONDITIONS",
		kind: workflowBlockKind.condition,
		blocks: workflowBlocks.filter(
			(block) => block.kind === workflowBlockKind.condition,
		),
	},
	{
		title: "ACTIONS",
		kind: workflowBlockKind.action,
		blocks: workflowBlocks.filter(
			(block) => block.kind === workflowBlockKind.action,
		),
	},
] as const;

export const initialWorkflowNodes = [
	{
		id: "node-price-change",
		type: "workflowBlock",
		position: { x: 180, y: 210 },
		data: workflowBlocks[0],
	},
	{
		id: "node-price-above",
		type: "workflowBlock",
		position: { x: 420, y: 330 },
		data: workflowBlocks[3],
	},
	{
		id: "node-buy",
		type: "workflowBlock",
		position: { x: 680, y: 460 },
		data: workflowBlocks[6],
	},
] as const;

export const initialWorkflowEdges = [
	{
		id: "edge-trigger-condition",
		source: "node-price-change",
		target: "node-price-above",
		type: "smoothstep",
		style: { stroke: "#ff5a1f", strokeWidth: 2 },
	},
	{
		id: "edge-condition-action",
		source: "node-price-above",
		target: "node-buy",
		type: "smoothstep",
		style: { stroke: "#ff5a1f", strokeWidth: 2 },
	},
] as const;
