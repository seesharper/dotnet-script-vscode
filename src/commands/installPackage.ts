import * as vscode from 'vscode';
// import { ShellExecution, TextEdit, WorkspaceEdit } from 'vscode';
import { PackageQuery, PackageQueryResult } from '../nuget';
import { EOL } from 'os';
import { Server } from '../server';

export async function installPackage(server : Server) : Promise<void>{
             
    let searchTerm = await vscode.window.showInputBox({placeHolder : 'Package search'});
    if (searchTerm == undefined)
    {
        return;
    }   

    let packages = await search(searchTerm);
    if (packages.length == 0){
        await vscode.window.showInformationMessage("No package found");
        return;
    }
    
    let quickPickItems = packages.map(p => {
        let item : vscode.QuickPickItem = {label:p.id, description:p.description, detail : `Downloads: ${p.downloadCount} Source: ${p.sourceUrl}`};
        return item;
    });
    
    let selectedPackageItem = await vscode.window.showQuickPick(quickPickItems);
    if (selectedPackageItem == undefined){
        return;
    }
   
    let selectedPackage = packages.find(p => p.id == selectedPackageItem.label);
    
    let selectedVersion = await vscode.window.showQuickPick(selectedPackage.versions);
    if (selectedVersion == undefined)
    {
        return;
    }
    
    let inlineNuGetReference = `#r "nuget:${selectedPackage.id}, ${selectedVersion}"${EOL}`;
                    
    await vscode.window.activeTextEditor.edit(editBuilder => {
        editBuilder.insert(new vscode.Position(1,0),inlineNuGetReference);            
    });

    //Hack for now. Restarting OmniSharp too soon makes it  
    const delay = time => new Promise(res=>setTimeout(()=>res(),time));
    await vscode.window.activeTextEditor.document.save();
    await delay(500);
                
    await vscode.commands.executeCommand("o.restart");

    async function search(term: string) : Promise<PackageQueryResult[]>
    {
        let packageQuery : PackageQuery = {searchTerm : term,includePreRelease : true, rootFolder : vscode.workspace.rootPath};
        let response = await server.execute(packageQuery, "PackageQuery");        
        
        if (response.isSuccessful)
        {            
            return response.payLoad;            
        }
        
        let result : PackageQueryResult[] = [];
        return result;
    }
}