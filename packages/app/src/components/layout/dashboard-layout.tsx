import type { ReactNode } from "react";

import DashboardHeader from "#/components/headers/dashboard-header";
import { cn } from "#/lib/utils.ts";

type DashboardLayoutProps = {
	children: ReactNode;
	className?: string;
	contentClassName?: string;
};

export function DashboardLayout({
	children,
	className,
	contentClassName,
}: DashboardLayoutProps) {
	return (
		<main
			className={cn(
				"min-h-screen bg-[var(--dashboard-bg)] text-[var(--app-fg)]",
				className,
			)}
		>
			<DashboardHeader />
			<div
				className={cn(
					"mx-auto grid w-full max-w-[1500px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-8 lg:py-14",
					contentClassName,
				)}
			>
				{children}
			</div>
		</main>
	);
}
