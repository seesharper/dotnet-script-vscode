export interface Request
{
    id : number;
    type : string;    
    payLoad : any;       
}

export interface Response
{
    id : number;
    type : string;
    payLoad : any;
    isSuccessful : boolean;
}