import fs from "fs";
import {DB_PATH} from "../../../../helpers/hardhat-constants";

// eslint-disable-next-line
export const step_00 = async (_: boolean) => {
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
};
