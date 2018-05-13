export interface ChartSetup {
  width: number;
  height: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  lifeExpectancyMin: number;
  lifeExpectancyMax: number;
  purchasingPowerMin: number;
  purchasingPowerMax: number;
}

export const setup: ChartSetup = {
  width: 750,
  height: 450,
  marginLeft: 50,
  marginRight: 10,
  marginTop: 40,
  marginBottom: 50,
  lifeExpectancyMin: 39,
  lifeExpectancyMax: 90,
  purchasingPowerMin: 200,
  purchasingPowerMax: 70000,
}
