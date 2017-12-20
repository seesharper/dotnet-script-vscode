'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ShellExecution, TextEdit, WorkspaceEdit } from 'vscode';
import { start } from 'repl';
import {search, getVersions} from './nuget'
import {EOL} from 'os'
import { sep } from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    status.text = "dotnet-script";
    status.show();
        
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let installPackage = vscode.commands.registerCommand('extension.dotnetScriptInstallPackage', async () => {
        
        
        //Display a message box to the user
        var searchTerm = await vscode.window.showInputBox({placeHolder : 'Package search'});
        if (searchTerm == undefined)
        {
            return;
        }

        var packages = await search(searchTerm);
        if (packages.length == 0){
            await vscode.window.showInformationMessage("No package found");
            return;
        }


        var selectedPackage = await vscode.window.showQuickPick(packages);
        if (selectedPackage == undefined)
        {
            return;
        }

        var versions = await getVersions(selectedPackage);

        var selectedVersion = await vscode.window.showQuickPick(versions);
        if (selectedVersion == undefined)
        {
            return;
        }


        var inlineNuGetReference = `#r "nuget:${selectedPackage}, ${selectedVersion}"${EOL}`;
                        
        await vscode.window.activeTextEditor.edit(editBuilder => {
            editBuilder.insert(new vscode.Position(1,0),inlineNuGetReference);            
        });

        //Hack for now. Restarting OmniSharp too soon makes it 
        const delay = time => new Promise(res=>setTimeout(()=>res(),time));
        await vscode.window.activeTextEditor.document.save();
        await delay(500);
                
        
        await vscode.commands.executeCommand("o.restart");
        

        
                
       
        // vscode.workspace.createFileSystemWatcher("*.csx").onDidCreate()
    });
     
    context.subscriptions.push(installPackage);
}

// this method is called when your extension is deactivated
export function deactivate() {
}