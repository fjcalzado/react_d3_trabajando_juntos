export interface TreeSetup {
  totalLevels: number,
  baseRadius: number,
  leafRadius: number,
  minAngle: number,
  maxAngle: number,
}

export const treeSetup = {
  totalLevels: 10,
  baseRadius: 50,  // Largest radius, in the base.
  leafRadius: 10,  // Smallest radius, in the leaves.
  minAngle: Math.PI / 30, // Smallest angle (gaussian distribution).
  maxAngle: Math.PI / 5, // Largest angle (gaussian distribution).
  minThick: 1,
  maxThick: 11,
}
