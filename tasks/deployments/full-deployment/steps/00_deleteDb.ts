import fs from "fs";

// define path to delete
const dbPath = process.env.DB_PATH ?? "./deployed-contracts.json";

export const step_00 = async () => {
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
};