import {IOracleConfig} from "../helpers/types";

export const MainetOracleConfig: IOracleConfig = {
  ExpirationPeriod: 1800,
  DeviationRate: 300,
};

export const TestnetOracleConfig: IOracleConfig = {
  ExpirationPeriod: 600,
  DeviationRate: 1000,
};
