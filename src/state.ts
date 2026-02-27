import { createInterface, type Interface } from "readline";
import { getCommands } from "./command.js";
import {PokeAPI, type Pokemon} from "./pokeapi.js";


export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;   //callback: (commands: Record<string, CLICommand>) => void;
};

export type State = {
  readline: Interface; 
  commands: Record<string, CLICommand>; // the commands registry
  pokeapi: PokeAPI;
  nextLocationURL: string | null;
  prevLocationURL: string | null;
  pokemon: string | null;  // I don't think I need this
  pokedex: Record<string, Pokemon>;
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
    pokemon: null,  // I don't think I need this
    pokedex: {},
  };
}
