import fs from "fs";
import rawBRE from "hardhat";

// define path to delete
const dbPath = "./deployed-contracts.json";

export const step_00 = async () => {
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
};

async function main() {
  await rawBRE.run("set-DRE");

  await step_00();
  console.log("----------------- step 00 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
