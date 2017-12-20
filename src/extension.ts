'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ShellExecution } from 'vscode';
import { start } from 'repl';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    status.text = "dotnet-script";
    status.show();
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
        console.log('Congratulations, your extension "dotnet-script" is now active!');
    
    var shellExecution = new vscode.ShellExecution("echo hello world");
        vscode.commands.registerCommand("dotnet script init",() => {
            return shellExecution;
        });

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.dotnetScriptInstallPackage', () => {
        // The code you place here will be executed every time your command is executed
        
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello TEST!');
        


        
    

        
        
        
        
        var test = vscode.workspace.rootPath;
        // vscode.workspace.createFileSystemWatcher("*.csx").onDidCreate()
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}