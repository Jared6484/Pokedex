import { symlinkSync } from "node:fs";
import { initState } from "./state.js";
import { startREPL } from "./repl.js";

function main(){
  const state = initState(200000);
  startREPL(state);
}

main();