import type { Process } from "../process/process.js"
import type { AllocationStrategy } from "../strategies/allocation-strategy.js"

export class MemoryManager {
  private readonly memoryCells: number[]
  private readonly allocationStrategy: AllocationStrategy
  private readonly lastAllocatedIndexRef = { value: 0 }

  constructor(memorySize: number, strategy: AllocationStrategy) {
    this.memoryCells = new Array(memorySize).fill(0)
    this.allocationStrategy = strategy
  }

  allocate(process: Process): boolean {
    return this.allocationStrategy.allocate(
      this.memoryCells,
      process,
      this.lastAllocatedIndexRef,
    )
  }

  freeByPid(pid: number): boolean {
    let freed = false
    for (let i = 0; i < this.memoryCells.length; i++) {
      if (this.memoryCells[i] === pid) {
        this.memoryCells[i] = 0
        freed = true
      }
    }
    return freed
  }

  getAllocatedPids(): number[] {
    const seen = new Set<number>()
    for (const cell of this.memoryCells) {
      if (cell !== 0) seen.add(cell)
    }
    return [...seen]
  }

  print(): void {
    console.log("Memory:", this.memoryCells.join(" "))
  }
}
