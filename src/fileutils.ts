import * as rm from 'rimraf';
import {stat} from 'fs';

export function removeDirectory(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        rm(path, error => {
            if (error == null) {
                resolve();
            }
            else {
                reject(error);
            }
        });
    });
}

export function isFile(path:string) : Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
        stat(path, (error, stats) => {
            if (error == null){            
                resolve(stats.isFile());
            }
            else{
                reject(error);
            }
        });
    });
}

