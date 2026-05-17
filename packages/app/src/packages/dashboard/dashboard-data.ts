export const automationStatus = {
	active: "Active",
	inactive: "Inactive",
} as const;

export const automations = [
	{
		id: "bitcoin-momentum-primary",
		name: "Bitcoin Momentum",
		status: automationStatus.active,
		lastTriggered: "2m ago",
		pnlImpact: "$1,247",
		enabled: true,
	},
	{
		id: "bitcoin-momentum-secondary",
		name: "Bitcoin Momentum",
		status: automationStatus.active,
		lastTriggered: "2m ago",
		pnlImpact: "$1,247",
		enabled: true,
	},
	{
		id: "ethereum-surge",
		name: "Ethereum Surge",
		status: automationStatus.active,
		lastTriggered: "5m ago",
		pnlImpact: "$2,500",
		enabled: true,
	},
	{
		id: "ripple-recovery",
		name: "Ripple Recovery",
		status: automationStatus.inactive,
		lastTriggered: "10m ago",
		pnlImpact: "$500",
		enabled: true,
	},
] as const;

export const recentAlerts = [
	{
		id: "bitcoin-momentum-alert-primary",
		asset: "Bitcoin",
		change: "+12% in 30m",
		strategy: "BTC Momentum",
		time: "9m ago",
	},
	{
		id: "bitcoin-momentum-alert-secondary",
		asset: "Bitcoin",
		change: "+12% in 30m",
		strategy: "BTC Momentum",
		time: "9m ago",
	},
] as const;
