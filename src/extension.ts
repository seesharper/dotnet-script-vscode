'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import * as vscode from 'vscode';

import { addTestScript } from './commands/addTestScript';
import { installPackage } from './commands/installPackage';
import { downloadAndInstall } from './download';
import { removeDirectory } from './fileutils';
import { Server } from './server';
import { Logger } from './logger';


let server : Server;
let logger  = new Logger("Extension");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

    const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    status.text = "dotnet-script";
    status.tooltip = "Running";
    status.show();        
    
    let serverPath = <string>vscode.workspace.getConfiguration("dotnet-script-server").get("path");    
    logger.logInfo(`Configured server path: ${serverPath}`);
    if (serverPath == null)
    {
        serverPath = join(context.extensionPath, "dotnet-script-server");
        if (existsSync(join(context.extensionPath, "firstTimeExperience")))
        {
            await removeDirectory(serverPath);
            await downloadAndInstall(serverPath);
            unlinkSync(join(context.extensionPath, "firstTimeExperience"));
        }
        
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