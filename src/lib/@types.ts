import type { Job } from "bullmq";

export type TJob = Job<{ count: number }, any, string>;
