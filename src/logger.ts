import * as vscode from 'vscode';
let outputchannel = vscode.window.createOutputChannel("dotnet-script-server");

export class Logger{
    private category : string;
    
    constructor(category : string){
        this.category = category;
    }

    public logInfo(message : string): void{
        outputchannel.appendLine(`[Info]: ${this.category}`);
        outputchannel.appendLine(`        ${message}`);
    } 
}
