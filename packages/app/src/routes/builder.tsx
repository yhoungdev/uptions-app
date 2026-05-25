import { createFileRoute } from "@tanstack/react-router";
import Builder from "@/pages/builder.tsx";

export const Route = createFileRoute("/builder")({ component: Builder });
