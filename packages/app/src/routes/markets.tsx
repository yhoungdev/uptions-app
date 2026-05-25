import { createFileRoute } from "@tanstack/react-router";
import Markets from "@/pages/markets.tsx";

export const Route = createFileRoute("/markets")({ component: Markets });
