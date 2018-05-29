import * as vscode from 'vscode';
import {get, RequestOptions} from 'https';
import {join} from 'path';
import {createWriteStream,mkdirSync,existsSync} from 'fs';
import * as extract from 'extract-zip';
import * as download from 'download';


export async function downloadAndInstall(serverPath : string) : Promise<void> {                
    if (existsSync(serverPath)){
        return;
    }    
    mkdirSync(serverPath);
    let serverZipPath = join(serverPath, "dotnetscriptserver.zip");
    let url = "https://github.com/seesharper/dotnet-script-server/releases/download/0.1.0-beta3/Dotnet.Script.Server.0.1.0-beta3.zip";
    
    await download(url,serverPath, { extract:true });
    
    console.log("Done");
}