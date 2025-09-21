export class Process {
  constructor(
    public readonly id: number,
    public readonly size: number,
  ) {}

  toString(): string {
    return `Process ${this.id} (${this.size}KB)`
  }
}
