import fs from "fs";

// define path to delete
const dbPath = process.env.DB_PATH ?? "./deployed-contracts.json";

// eslint-disable-next-line
export const step_00 = async (_: boolean) => {
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
};
