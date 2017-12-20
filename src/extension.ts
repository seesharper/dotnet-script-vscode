'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ShellExecution, TextEdit, WorkspaceEdit } from 'vscode';
import { start } from 'repl';
import {search, getVersions} from './nuget';
import {EOL} from 'os';
import { sep } from 'path';
import { installPackage } from './commands/installPackage';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    status.text = "dotnet-script";
    status.show();
           
    let installPackageSubscription = vscode.commands.registerCommand('extension.dotnetScriptInstallPackage', async () => {
        
        await installPackage();
    });
     
    context.subscriptions.push(installPackageSubscription);
}

// this method is called when your extension is deactivated
export function deactivate() {
}