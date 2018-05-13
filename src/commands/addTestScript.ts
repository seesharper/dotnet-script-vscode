import * as vscode from 'vscode';
import { Server } from '../server';
import { dirname } from 'path';
import {isFile} from '../fileutils';

export async function addTestScript(resourceUri : vscode.Uri, server : Server) : Promise<void>{    
    
    let workingFolder : string;

    if(await isFile(resourceUri.fsPath))
    {
        workingFolder = dirname(resourceUri.fsPath);
    }
    else
    {
        workingFolder = resourceUri.fsPath;
    }
    
    let command : CreateUnitTestCommand = {workingFolder : workingFolder};
    let response = await server.execute(command,"CreateUnitTestCommand");
    var pathToTestScript = response.payLoad;    
    var textDocument = await vscode.workspace.openTextDocument(pathToTestScript);
    vscode.window.showTextDocument(textDocument);
    const delay = time => new Promise(res=>setTimeout(()=>res(),time));
    await vscode.window.activeTextEditor.document.save();
    await delay(500);
                
    await vscode.commands.executeCommand("o.restart");
}

interface CreateUnitTestCommand{
    workingFolder : string;
}