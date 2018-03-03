import * as vscode from 'vscode';
import { Server } from '../server';
import { dirname } from 'path';

export async function addTestScript(resourceUri : vscode.Uri, server : Server) : Promise<void>{    
    let workingFolder = dirname(resourceUri.fsPath);
    let command : CreateUnitTestCommand = {workingFolder : workingFolder};
    let response = await server.execute(command,"CreateUnitTestCommand");
}

interface CreateUnitTestCommand{
    workingFolder : string;
}