export class GridItem {
  private intLevel: number;

  constructor(intStartingLevel: number) {
    this.intLevel = intStartingLevel;
  }

  public canMergeWithLevel(intLevel: number): boolean {
    return intLevel === this.intLevel;
  }

  public getLevel(): number {
    return this.intLevel;
  }

  public levelUp(): void {
    this.intLevel += 1;
  }
}
