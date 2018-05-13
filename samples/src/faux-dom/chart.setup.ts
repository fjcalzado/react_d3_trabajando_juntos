export interface ChartSetup {
  width: number;
  height: number;
  transitionDelay: number;
  dynamicInterval: number;
  noColor: string;
}

export const setup: ChartSetup = {
  width: 700,
  height: 450,
  transitionDelay: 500,
  dynamicInterval: 1000,
  noColor: "white",
}
