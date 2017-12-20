import * as vscode from 'vscode';
import { ShellExecution, TextEdit, WorkspaceEdit } from 'vscode';
import {search, getVersions} from '../nuget';
import {EOL} from 'os';
import { sep } from 'path';

export async function installPackage() : Promise<void>{
    //Display a message box to the user
    let searchTerm = await vscode.window.showInputBox({placeHolder : 'Package search'});
    if (searchTerm == undefined)
    {
        return;
    }

    let packages = await search(searchTerm);
    if (packages.length == 0){
        await vscode.window.showInformationMessage("No package found");
        return;
    }


    let selectedPackage = await vscode.window.showQuickPick(packages);
    if (selectedPackage == undefined)
    {
        return;
    }

    let versions = await getVersions(selectedPackage);

    let selectedVersion = await vscode.window.showQuickPick(versions);
    if (selectedVersion == undefined)
    {
        return;
    }
    

    let inlineNuGetReference = `#r "nuget:${selectedPackage}, ${selectedVersion}"${EOL}`;
                    
    await vscode.window.activeTextEditor.edit(editBuilder => {
        editBuilder.insert(new vscode.Position(1,0),inlineNuGetReference);            
    });

    //Hack for now. Restarting OmniSharp too soon makes it 
    const delay = time => new Promise(res=>setTimeout(()=>res(),time));
    await vscode.window.activeTextEditor.document.save();
    await delay(500);
            
    
    await vscode.commands.executeCommand("o.restart");
}