import type { Process } from "../process/process.js"
import type { AllocationStrategy } from "./allocation-strategy.js"

export class NextFit implements AllocationStrategy {
  readonly name = "Next-Fit"

  allocate(
    memory: number[],
    process: Process,
    lastIndexRef?: { value: number },
  ): boolean {
    const requiredSize = process.size
    const totalMemorySize = memory.length
    const startIndex = lastIndexRef?.value ?? 0
    let currentIndex = startIndex
    let visitedCells = 0
    while (visitedCells < totalMemorySize) {
      if (currentIndex + requiredSize <= totalMemorySize) {
        let isFreeBlock = true
        for (let offset = 0; offset < requiredSize; offset++) {
          if (memory[currentIndex + offset] !== 0) {
            isFreeBlock = false
            break
          }
        }
        if (isFreeBlock) {
          for (let offset = 0; offset < requiredSize; offset++) {
            memory[currentIndex + offset] = process.id
          }
          if (lastIndexRef) {
            lastIndexRef.value = (currentIndex + requiredSize) % totalMemorySize
          }
          return true
        }
      }
      currentIndex = (currentIndex + 1) % totalMemorySize
      visitedCells++
    }
    return false
  }
}
