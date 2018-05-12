export interface ChartSetup {
  width: number;
  height: number;
  marginTopDown: number;
  marginLeft: number;
  marginRight: number;
  dataRangeMin: number;
  dataRangeMax: number;
  numSamples: number;
}

export const setup: ChartSetup = {
  width: 600,
  height: 450,
  marginTopDown: 20,
  marginLeft: 60,
  marginRight: 30,
  dataRangeMin: 1,  // 22 participants. From 1 to 22 positions.
  dataRangeMax: 22,
  numSamples: 61,   // 60 laps and the pole positions.
}
