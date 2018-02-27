import * as vscode from 'vscode';

export class Logger{
    private outputchannel : vscode.OutputChannel;
    
    constructor(){
        this.outputchannel = vscode.window.createOutputChannel("dotnet-script-server");
    }

    public writeLine(message : string) : void {
        this.outputchannel.appendLine(message);
    }
}