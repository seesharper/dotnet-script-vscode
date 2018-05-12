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
}

interface CreateUnitTestCommand{
    workingFolder : string;
}