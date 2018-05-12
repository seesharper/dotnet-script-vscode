import {ChildProcess,spawn} from 'child_process';
import { Request, Response } from './messaging/request';
import {ReadLine, createInterface} from 'readline';
import {join} from 'path';
import { Logger } from './logger';


type ResponseCallBack = (response : Response) => void;

type RejectCallBack = () => string;

export class Server
{
    private _serverProcess : ChildProcess;
    
    private static _nextRequestId : number = 1;
    
    private _readLine : ReadLine;

    private _waiting: Map<number, ResponseCallBack> = new Map<number, ResponseCallBack>();

    private _logger : Logger;

    constructor(){
        this._logger = new Logger("Server");
    }

    start(folder : string) : void
    {                
        this._logger.logInfo(`Starting server from ${folder}`);
        
        let path = join(folder,"Dotnet.Script.Server.Stdio.dll");
        this._serverProcess = spawn("dotnet", [path]);
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