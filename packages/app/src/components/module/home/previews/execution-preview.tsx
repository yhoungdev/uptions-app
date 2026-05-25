import { Activity } from "lucide-react";

import { cn } from "@/lib/utils.ts";
import { executionItems } from "@/packages/home/homepage-data.ts";

export function ExecutionPreview() {
	return (
		<div className="flex items-center justify-center md:min-h-[500px]">
			<div className="w-full max-w-[540px] rounded-[48px] border border-black/5 bg-app-inverse px-9 py-10">
				<div className="border border-black/10 bg-app-surface p-6">
					<div className="flex items-center justify-between border-b border-black/[0.06] pb-5">
						<div>
							<p className="text-sm font-semibold text-app-muted-fg">
								Strategy status
							</p>
							<h3 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-black">
								Protected execution
							</h3>
						</div>
						<span className="grid size-11 place-items-center bg-primary text-primary-foreground">
							<Activity className="size-5" />
						</span>
					</div>

					<div className="mt-6 grid gap-4">
						{executionItems.map((item) => {
							const Icon = item.icon;

							return (
								<div
									className="flex items-center justify-between border border-black/[0.06] bg-app-inverse p-4"
									key={item.label}
								>
									<div className="flex items-center gap-3">
										<span
											className={cn(
												"grid size-10 place-items-center  border",
												item.tone,
											)}
										>
											<Icon className="size-5" />
										</span>
										<p className="text-sm font-bold text-black">{item.label}</p>
									</div>
									<p className="text-sm font-semibold text-app-muted-fg">
										{item.value}
									</p>
								</div>
							);
						})}
					</div>

					<div className="mt-6 h-2 overflow-hidden  bg-black/5">
						<div className="h-full w-[82%]  bg-primary" />
					</div>
				</div>
			</div>
		</div>
	);
}
