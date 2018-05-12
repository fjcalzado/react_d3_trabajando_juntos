import * as d3 from "d3";
import { treeSetup } from "./tree.setup";

export interface Segment {
  level: number;
  points: number[][];
}

// Scales.
const radiusScale = d3.scalePow().exponent(2)
  .domain([0, treeSetup.totalLevels])
  .range([treeSetup.baseRadius, treeSetup.leafRadius]);

const angleScale = d3.scaleLinear()
  .domain([-2, 2])
  .range([treeSetup.minAngle, treeSetup.maxAngle]);

const gaussRandomGenerator = d3.randomNormal(0, 1);
const uniformRandomGenerator = d3.randomUniform(-2, 2);

// Generator.
export const generateTree = (): Segment[] => {
  const base = [0, -treeSetup.baseRadius];
  const trunkSegment = {level: 0, points: [[0,0],base]}
  const tree = [trunkSegment];
  processNode(1, base[0], base[1], -Math.PI / 2, tree);

  return tree;
};

// Each node generates 2 segments.
const processNode = (level: number, x0: number, y0: number, a0: number, tree: Segment[]): void => {
  if (level <= (treeSetup.totalLevels)) {
    const node = [x0, y0];  // Curren node.
    const r = getRandomRadius(level); // Radius based on level.

    // Left segment.
    const leftAngle = getRandomAngle() + a0;
    const leftNode = nextPolarToCartesian(x0, y0, r, leftAngle);
    tree.push({level, points:[node, leftNode]});
    processNode(level + 1, leftNode[0], leftNode[1], leftAngle, tree);

    // Right segment.
    const rightAngle = a0 - getRandomAngle();
    const rightNode = nextPolarToCartesian(x0, y0, r, rightAngle);
    tree.push({level, points:[node, rightNode]});
    processNode(level + 1, rightNode[0], rightNode[1], rightAngle, tree);
  }
}

const getRandomRadius = (level) => {
  return radiusScale(level);
}

const getRandomAngle = () => {
  return angleScale(uniformRandomGenerator());
}

const nextPolarToCartesian = (x0: number, y0: number, r: number, a: number) => ([
  x0 + (r * Math.cos(a)), // x
  y0 + (r * Math.sin(a)), // y
])
