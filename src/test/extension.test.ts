//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../extension';
import {PackageQuery, PackageQueryResult } from '../nuget';
import  parseReferences  from '../parsing/scriptParser';
import {EOL} from 'os';
import { Server } from '../server';

// // Defines a Mocha test suite to group tests of similar kind together
// suite("NuGet Tests", () => {   
//     test("ShouldFindKnownPackage", async () => {
//         let result = await search("AutoMapper");
//         assert.notEqual(result.indexOf("AutoMapper"),-1);
//     });

//     test("ShouldReturnEmptyListForUnknownPackage", async () => {
//         let result = await search("UnknownPackage");        
//         assert.ok(result.length == 0);
//     });

//     test("ShouldGetPackageVersion", async () => {
//         let result = await getVersions("AutoMapper");
//         assert.notEqual(result.indexOf("6.2.2"), -1);
//     });
// });

// Defines a Mocha test suite to group tests of similar kind together
suite("Script Parser Tests", () => {   
    test("ShouldResolveSinglePackage", async () => {
        let result = await parseReferences(`#r "nuget:Package, 1.2.3"`);
        assert.ok(result.find(r => r.id == 'Package') != null);
    });
    
    test("ShouldResolveMultiplePackages", async () => {
        let code = '#r "nuget:Package, 1.2.3"';
        code = code + `${EOL}` + '#r "nuget:AnotherPackage, 1.2.3"';
        
        let result = await parseReferences(code);
        assert.ok(result.find(r => r.id == 'Package') != null);
        assert.ok(result.find(r => r.id == 'AnotherPackage') != null);        
    });    
});

// suite("Server Tests", () => {
//     test("ShouldHandlePackageQuery", async () => {                
        
//         let server : Server = new Server();
//         await server.start();
//         let packageQuery : PackageQuery = { rootFolder:vscode.workspace.rootPath, searchTerm:"LightInject", includePreRelease:true };
//         let response = await server.execute(packageQuery, "PackageQuery");
//         let packageQueryResults : PackageQueryResult[] = response.PayLoad;
        
//     }).timeout(5000);
// });