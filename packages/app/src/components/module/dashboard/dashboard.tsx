import { DashboardLayout } from "#/components/layout/dashboard-layout.tsx";
import { AlertsSection } from "#/components/module/dashboard/alerts-section.tsx";
import { AutomationSection } from "#/components/module/dashboard/automation-section.tsx";

export function Dashboard() {
	return (
		<DashboardLayout>
			<AutomationSection />
			<AlertsSection />
		</DashboardLayout>
	);
}
