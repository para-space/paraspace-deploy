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

export const getAdapter = (file: string): any =>
  file === ":memory:" ? new MemoryAdapter() : new FileAdapter(file);
