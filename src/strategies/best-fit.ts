import type { Process } from "../process/process.js"
import type { AllocationStrategy } from "./allocation-strategy.js"

export class BestFit implements AllocationStrategy {
  readonly name = "Best-Fit"

  allocate(memory: number[], process: Process): boolean {
    const requiredSize = process.size
    let bestHoleStartIndex = -1
    let bestHoleSize = Number.MAX_SAFE_INTEGER
    let index = 0
    while (index < memory.length) {
      if (memory[index] !== 0) {
        index++
        continue
      }
      const holeStartIndex = index
      let holeSize = 0
      while (index < memory.length && memory[index] === 0) {
        holeSize++
        index++
      }
      if (holeSize >= requiredSize && holeSize < bestHoleSize) {
        bestHoleSize = holeSize
        bestHoleStartIndex = holeStartIndex
      }
    }
    if (bestHoleStartIndex === -1) return false
    for (
      let i = bestHoleStartIndex;
      i < bestHoleStartIndex + requiredSize;
      i++
    ) {
      memory[i] = process.id
    }
    return true
  }
}
