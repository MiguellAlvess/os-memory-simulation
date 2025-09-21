import type { Process } from "../process/process.js"
import type { AllocationStrategy } from "./allocation-strategy.js"

export class BestFit implements AllocationStrategy {
  readonly name = "Best-Fit"

  allocate(memory: number[], process: Process): boolean {
    const requiredSize = process.size
    let bestHoleStartIndex = -1
    let bestHoleSize = Number.MAX_SAFE_INTEGER
    let currentIndex = 0
    while (currentIndex < memory.length) {
      if (memory[currentIndex] === 0) {
        let holeStartIndex = currentIndex
        let holeSize = 0

        while (currentIndex < memory.length && memory[currentIndex] === 0) {
          holeSize++
          currentIndex++
        }
        if (holeSize >= requiredSize && holeSize < bestHoleSize) {
          bestHoleSize = holeSize
          bestHoleStartIndex = holeStartIndex
        }
      }
      currentIndex++
    }
    if (bestHoleStartIndex !== -1) {
      for (
        let i = bestHoleStartIndex;
        i < bestHoleStartIndex + requiredSize;
        i++
      ) {
        memory[i] = process.id
      }
      return true
    }
    return false
  }
}
