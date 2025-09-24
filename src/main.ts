import { ProcessGenerator } from "./process/process-generator.js"
import { MemoryManager } from "./memory/memory-manager.js"

import { FirstFit } from "./strategies/first-fit.js"
import { BestFit } from "./strategies/best-fit.js"
import { WorstFit } from "./strategies/worst-fit.js"
import { NextFit } from "./strategies/next-fit.js"
import { sleep } from "./utils/sleep.js"

async function simulate(strategyName: string, strategyInstance: any) {
  const manager = new MemoryManager(1000, strategyInstance)
  const generator = new ProcessGenerator()

  let generatedCount = 0
  let allocatedCount = 0
  let discardedCount = 0
  let processSizeSum = 0
  let occupancySumPercent = 0

  for (let second = 1; second <= 100; second++) {
    console.log(`\n[${strategyName}] Second ${second}`)
    for (let i = 0; i < 2; i++) {
      const proc = generator.generate()
      generatedCount++
      processSizeSum += proc.size

      const allocated = manager.allocate(proc)
      if (!allocated) {
        discardedCount++
        console.log(`Discarded (no space): ${proc}`)
        continue
      }
      allocatedCount++
      console.log(`Allocated: ${proc}`)
    }
    const removals = 1 + Math.floor(Math.random() * 2)
    const allocatedPids = manager.listAllocatedProcessIds()
    for (let i = 0; i < removals && allocatedPids.length > 0; i++) {
      const index = Math.floor(Math.random() * allocatedPids.length)
      const pid = allocatedPids.splice(index, 1)[0]
      manager.freeProcessById(pid)
      console.log(`Freed PID: ${pid}`)
    }
    occupancySumPercent += manager.getOccupancyPercentage()
    await sleep(1000)
  }

  const meanProcessSize = processSizeSum / generatedCount
  const meanOccupancyPercent = occupancySumPercent / 100
  const discardRatePercent = (discardedCount / generatedCount) * 100

  console.log(`\n=== ${strategyName} finished ===`)
  console.table([
    {
      generated: generatedCount,
      allocated: allocatedCount,
      discarded: discardedCount,
      meanProcessSize: Number(meanProcessSize.toFixed(2)),
      meanOccupancyPercent: `${meanOccupancyPercent.toFixed(2)}%`,
      discardRatePercent: `${discardRatePercent.toFixed(2)}%`,
    },
  ])
}

async function main() {
  await simulate("Best-Fit", new BestFit())
  await simulate("First-Fit", new FirstFit())
  await simulate("Worst-Fit", new WorstFit())
  await simulate("Next-Fit", new NextFit())
}

main().catch((err) => {
  console.error(err)
})
