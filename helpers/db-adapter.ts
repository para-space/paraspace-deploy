import {default as FileAdapter} from "lowdb/adapters/FileSync";

class MemoryAdapter {
  state: any;
  read() {
    return this.state;
  }
  write(state: any) {
    this.state = state;
  }
}

export const getAdapter = (network: string): any =>
  network === "hardhat"
    ? new MemoryAdapter()
    : new FileAdapter("./deployed-contracts.json");
