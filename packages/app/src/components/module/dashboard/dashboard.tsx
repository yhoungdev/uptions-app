import { DashboardLayout } from "#/components/layout/dashboard-layout.tsx";
import { AlertsSection } from "#/components/module/dashboard/alerts-section.tsx";
import { AutomationSection } from "#/components/module/dashboard/automation-section.tsx";

export function Dashboard() {
	return (
		<DashboardLayout contentClassName="grid gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-8 lg:py-14">
			<AutomationSection />
			<AlertsSection />
		</DashboardLayout>
	);
}
