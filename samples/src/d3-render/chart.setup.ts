export interface ChartSetup {
  width: number;
  height: number;
  dataRangeMin: number;
  dataRangeMax: number;
  barSeparation: number;
  transitionDelay: number;
}

export const setup: ChartSetup = {
  width: 600,
  height: 350,
  dataRangeMin: 0,
  dataRangeMax: 10,
  barSeparation: 0.05,
  transitionDelay: 750,
}
