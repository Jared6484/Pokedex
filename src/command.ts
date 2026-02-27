import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { mapCommand } from "./command_map.js";
import { mapBackCommand } from "./command_map_back.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand>{
  return{
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Next page of list",
      callback: mapCommand,
    },
    mapb: {
      name:"mapb",
      description: "Previous page of list",
      callback: mapBackCommand,
    },
    explore: {
      name: "explore",
      description: "Get list of Pokemon in the area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Catch a pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Prints name, height, stats, and types",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Lists all pokemon that have been caught",
      callback: commandPokedex,
    }
  };
}
