import * as sm from 'semver';
import { constants } from 'zlib';
import { resolve } from 'dns';
import { SemVer } from 'semver';


export default function parseNuGetReferences(script : string) : NuGetReference[]
{    
    let result :NuGetReference[] = [];
    let regexp = /^\s*#r\s*"nuget:\s*(.+)\s*,\s*(.*)"/img;    
    let myArray : RegExpExecArray;        
    while((myArray = regexp.exec(script)) !== null)
    {
        let reference = new NuGetReference();
        
        reference.id = myArray[1];
        reference.version = myArray[2];
        
        let test = sm.parse("1.2.3.4");

        result.push(reference);
    }       
    return result;
}

export class NuGetReference
{
    id : string;
    version : string;
    semver : SemVer;    
}

