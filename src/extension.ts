'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ShellExecution, TextEdit, WorkspaceEdit } from 'vscode';
import { start } from 'repl';
import {EOL} from 'os';
import { sep, join } from 'path';
import { installPackage } from './commands/installPackage';
import { addTestScript } from './commands/addTestScript';
import {ChildProcess, exec, execSync, spawn, SpawnOptions} from 'child_process';
import {Request} from './messaging/request';
import { Server } from './server';

import {downloadAndInstall} from './download';
let server : Server;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

    const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    status.text = "dotnet-script";
    status.tooltip = "Running";
    status.show();        

    let serverPath = <string>vscode.workspace.getConfiguration("dotnet-script-server").get("path");    
    if (serverPath == null)
    {
        serverPath = join(context.extensionPath, "dotnet-script-server");
        await downloadAndInstall(serverPath);    
    }
            
    server = new Server();
    server.start(serverPath);       
           
    let installPackageSubscription = vscode.commands.registerCommand('extension.dotnetScriptInstallPackage', async () => {
        await installPackage(server);
    });
    
    let addTestScriptSubscription = vscode.commands.registerCommand('extension.dotnetScriptAddTestScript', async (resourceUri) => {
        await addTestScript(resourceUri, server);        
    });
    
    context.subscriptions.push(installPackageSubscription);    
}

// this method is called when your extension is deactivated
export function deactivate() {
    
}