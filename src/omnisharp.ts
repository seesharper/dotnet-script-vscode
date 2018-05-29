import * as vscode from 'vscode';
import { Logger } from './logger';

let logger  = new Logger("OmniSharp");
export async function restartOmniSharp() : Promise<void>{
    //Hack for now. We need to wait a "little" before starting OmniSharp.
    //A direct restart kills intellisense.  
    logger.logInfo("Restarting OmniSharp");
    const delay = time => new Promise(res=>setTimeout(()=>res(),time)); 
    await delay(500);                
    await vscode.commands.executeCommand("o.restart");
    logger.logInfo("OmniSharp restarted");
}