export interface ChartSetup {
  width: number;
  height: number;
  barSeparation: number;
  transitionDelay: number;
}

export const defaultChartSetup: ChartSetup = {
  width: 600,
  height: 350,
  barSeparation: 0.05,
  transitionDelay: 750,
}
