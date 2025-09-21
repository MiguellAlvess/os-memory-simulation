import type { Process } from "../process/process.js"
import type { AllocationStrategy } from "./allocation-strategy.js"

export class WorstFit implements AllocationStrategy {
  readonly name = "Worst-Fit"

  allocate(memory: number[], process: Process): boolean {
    const requiredSize = process.size
    let largestHoleStartIndex = -1
    let largestHoleSize = -1

    let currentIndex = 0
    while (currentIndex < memory.length) {
      if (memory[currentIndex] === 0) {
        let holeStartIndex = currentIndex
        let holeSize = 0

        while (currentIndex < memory.length && memory[currentIndex] === 0) {
          holeSize++
          currentIndex++
        }

        if (holeSize >= requiredSize && holeSize > largestHoleSize) {
          largestHoleSize = holeSize
          largestHoleStartIndex = holeStartIndex
        }
      }
      currentIndex++
    }
    if (largestHoleStartIndex !== -1) {
      for (
        let i = largestHoleStartIndex;
        i < largestHoleStartIndex + requiredSize;
        i++
      ) {
        memory[i] = process.id
      }
      return true
    }
    return false
  }
}
