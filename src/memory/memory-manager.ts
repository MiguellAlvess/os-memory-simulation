import type { Process } from "../process/process.js"
import type { AllocationStrategy } from "../strategies/allocation-strategy.js"

const FREE = 0

export class MemoryManager {
  private readonly memory: number[]
  private readonly strategy: AllocationStrategy
  private readonly nextFitCursorRef = { value: 0 }

  constructor(memorySize: number, strategy: AllocationStrategy) {
    this.memory = new Array(memorySize).fill(FREE)
    this.strategy = strategy
  }

  allocate(process: Process): boolean {
    return this.strategy.allocate(this.memory, process, this.nextFitCursorRef)
  }

  freeProcessById(processId: number): boolean {
    let freedAny = false
    for (let i = 0; i < this.memory.length; i++) {
      if (this.memory[i] === processId) {
        this.memory[i] = FREE
        freedAny = true
      }
    }
    return freedAny
  }

  listAllocatedProcessIds(): number[] {
    const ids = new Set<number>()
    for (const cell of this.memory) {
      if (cell !== FREE) ids.add(cell)
    }
    return [...ids]
  }

  getOccupancyPercentage(): number {
    const usedCellsCount = this.memory.reduce(
      (sum, cell) => sum + (cell !== FREE ? 1 : 0),
      0,
    )
    return (usedCellsCount / this.memory.length) * 100
  }

  print(): void {
    console.log("Memory:", this.memory.join(" "))
  }
}
