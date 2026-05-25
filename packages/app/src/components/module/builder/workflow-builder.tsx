import { useState } from "react";
import { DashboardLayout } from "#/components/layout/dashboard-layout.tsx";
import type { WorkflowBlock } from "#/packages/builder/builder-data.ts";
import { BlockLibrary } from "./block-library.tsx";
import { InspectorPanel } from "./inspector-panel.tsx";
import { WorkflowCanvas } from "./workflow-canvas.tsx";
import { WorkflowToolbar } from "./workflow-toolbar.tsx";

export function WorkflowBuilder() {
	const [selectedBlock, setSelectedBlock] = useState<WorkflowBlock>();

	return (
		<DashboardLayout contentClassName="p-0">
			<div className="flex h-[calc(100dvh-4rem)] min-h-[720px] w-full overflow-hidden bg-[#111111] text-white">
				<BlockLibrary />
				<section className="flex min-w-0 flex-1 flex-col">
					<WorkflowToolbar />
					<WorkflowCanvas onSelectBlock={setSelectedBlock} />
				</section>
				<InspectorPanel selectedBlock={selectedBlock} />
			</div>
		</DashboardLayout>
	);
}
