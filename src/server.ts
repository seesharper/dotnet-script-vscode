import {ChildProcess,spawn} from 'child_process';
import { Request, Response } from './messaging/request';
import {ReadLine, createInterface} from 'readline';

type ResponseCallBack = (response : Response) => void;

type RejectCallBack = () => string;

export class Server
{
    private _serverProcess : ChildProcess;
    
    private static _nextRequestId : number = 1;
    
    private _readLine : ReadLine;

    private _waiting: Map<number, ResponseCallBack> = new Map<number, ResponseCallBack>();

    
    start() : void
    {
        this._serverProcess = spawn("dotnet", ["C:/Github/Dotnet.Script.Server/src/Dotnet.Script.Server.Stdio/bin/Debug/netcoreapp2.0/Dotnet.Script.Server.Stdio.dll"]);
        this._readLine = createInterface({
            input: this._serverProcess.stdout,
            output: this._serverProcess.stdin,
            terminal: false
        });
        this._readLine.on("line", line => this.processLine(line));
    }
    
    
    private processLine(line : string){
        let response : Response = JSON.parse(line);
        this._waiting.get(response.id)(response);
    }
    
    public execute(requestPayLoad : any, name : string) : Promise<Response>{
        let requestId = Server._nextRequestId++;
        let request : Request = {id : requestId, type : name , payLoad : requestPayLoad};                
        this.writeRequest(request);        
        return new Promise<Response>((resolve, reject) => this._waiting.set(requestId,resolve));
    }

    private writeRequest<TRequestPayload>(request : Request){
        let json = JSON.stringify(request);
        this._serverProcess.stdin.write(json + '\n');
    }

}