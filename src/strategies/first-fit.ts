import type { Process } from "../process/process.js"
import type { AllocationStrategy } from "./allocation-strategy.js"

export class FirstFit implements AllocationStrategy {
  readonly name = "First-Fit"

  allocate(memory: number[], process: Process): boolean {
    const requiredSize = process.size
    for (let i = 0; i <= memory.length - requiredSize; i++) {
      let free = true
      for (let j = 0; j < requiredSize; j++) {
        if (memory[i + j] !== 0) {
          free = false
          break
        }
      }
      if (free) {
        for (let j = 0; j < requiredSize; j++) memory[i + j] = process.id
        return true
      }
    }
    return false
  }
}
