import type { NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";

import { Typography } from "#/components/typography/typography.tsx";
import { cn } from "#/lib/utils.ts";
import type { WorkflowBlock } from "#/packages/builder/builder-data.ts";
import {
	workflowBlockKind,
	workflowBlockTone,
} from "#/packages/builder/builder-data.ts";

type WorkflowNodeData = WorkflowBlock;

export type WorkflowNodeProps = NodeProps & {
	data: WorkflowNodeData;
};

export function WorkflowNode({ data, selected }: WorkflowNodeProps) {
	const tone = workflowBlockTone[data.kind];
	const Icon = data.icon;
	const hasTarget = data.kind !== workflowBlockKind.trigger;
	const hasSource = data.kind !== workflowBlockKind.action;

	return (
		<div
			className={cn(
				"min-h-[82px] w-[320px] overflow-hidden rounded-lg border bg-[#111111]/95 shadow-[0_22px_60px_rgba(0,0,0,0.35)]",
				selected && "ring-2 ring-[#2f80ff]",
			)}
			style={{
				backgroundColor: tone.glow,
				borderColor: tone.border,
			}}
		>
			{hasTarget ? (
				<Handle
					className="!size-3 !border-2 !border-white !bg-[#0a0b0d]"
					position={Position.Left}
					type="target"
				/>
			) : null}
			<div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
				<span
					className={cn(
						"grid size-5 place-items-center rounded-full",
						tone.icon,
					)}
				>
					<Icon className="size-3.5" />
				</span>
				<div className="min-w-0">
					<Typography className="text-[10px] text-white/55" variant="caption">
						{tone.label}
					</Typography>
					<Typography className="truncate text-white" variant="label">
						{data.title}
					</Typography>
				</div>
				{data.kind === workflowBlockKind.trigger ? (
					<span className="ml-auto size-1.5 rounded-full bg-[#19d15f]" />
				) : null}
			</div>
			<Typography className="px-4 py-3 text-white/65" variant="caption">
				{data.value}
			</Typography>
			{hasSource ? (
				<Handle
					className="!size-3 !border-2 !border-white !bg-[#2f80ff]"
					position={Position.Right}
					type="source"
				/>
			) : null}
		</div>
	);
}
