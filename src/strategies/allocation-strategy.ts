import type { Process } from "../process/process.js"

export interface AllocationStrategy {
  readonly name: Algorithm | string
  allocate(
    memory: number[],
    process: Process,
    lastIndexRef?: { value: number },
  ): boolean
}

export type Algorithm = "Worst-Fit" | "Best-Fit" | "First-Fit" | "Next-Fit"
