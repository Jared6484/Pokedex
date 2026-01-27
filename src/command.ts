import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { mapCommand } from "./command_map.js";
import { mapBackCommand } from "./command_map_back.js";

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
    }
  };
}
