export interface ChartSetup {
  width: number;
  height: number;
  dataMin: number;
  dataMax: number;
}

export const defaultChartSetup: ChartSetup = {
  width: 600,
  height: 350,
  dataMin: 0,
  dataMax: 100,
}
