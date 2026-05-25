import { useState } from "react";

import type { WorkflowBlock } from "#/packages/builder/builder-data.ts";

import { BlockLibrary } from "./block-library.tsx";
import { InspectorPanel } from "./inspector-panel.tsx";
import { WorkflowCanvas } from "./workflow-canvas.tsx";
import { WorkflowToolbar } from "./workflow-toolbar.tsx";
import { DashboardLayout } from "#/components/layout/dashboard-layout.tsx";

export function WorkflowBuilder() {
	const [selectedBlock, setSelectedBlock] = useState<WorkflowBlock>();

	return (
		<DashboardLayout>
			<main className="flex h-dvh min-h-[720px] overflow-hidden bg-[#111111] text-white">
			<BlockLibrary />
			<section className="flex min-w-0 flex-1 flex-col">
				<WorkflowToolbar />
				<WorkflowCanvas onSelectBlock={setSelectedBlock} />
			</section>
			<InspectorPanel selectedBlock={selectedBlock} />
		</main>
		</DashboardLayout>
	);
}
