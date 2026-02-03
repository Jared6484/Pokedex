import { createInterface, type Interface } from "readline";
import { getCommands } from "./command.js";
import {PokeAPI} from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;   //callback: (commands: Record<string, CLICommand>) => void;
};

export type State = {
  readline: Interface; 
  commands: Record<string, CLICommand>; // the commands registry
  pokeapi: PokeAPI;
  nextLocationURL: string | null;
  prevLocationURL: string | null;
};

export function initState(cacheInterval: number): State {
    const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex >',
  });
  return {
    readline: rl,
    commands: getCommands(),
    pokeapi: new PokeAPI(cacheInterval),
    nextLocationURL: null, 
    prevLocationURL: null,
  };
}
