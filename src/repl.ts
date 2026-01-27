import type { State } from "./state.js";

export function cleanInput(input: string): string[]{
    const wordList = input.toLowerCase().trim().split(" ").filter(word => word !== "");;

    return wordList;
};

export function startREPL(state: State): void {
  state.readline.prompt();

  state.readline.on("line", async (input) =>
  {
    const clnInput = cleanInput(input);

    if(!clnInput){
      state.readline.prompt();
      return;
    }

    const commandName = clnInput[0];
    const command = state.commands[commandName];

    if(command){
        try{
            //const command = commands[clnInput[0]];
            await command.callback(state);
        } catch (err){
            console.error("Command error:", err);
        } 
    }
    else {
        console.log("Unkown command");
    }
    
    //console.log(`Your command was: ${clnInput[0]}`);
    state.readline.prompt();
  });
}




