export interface PackageQuery{
    searchTerm : string;    
    rootFolder : string; 
    includePreRelease : boolean;    
}
/**
 * 
 * 
 * @export
 * @interface PackageQueryResult
 */
export interface PackageQueryResult{
    /**
     * The identify of the package
     * 
     * @type {string}
     * @memberof PackageQueryResult
     */
    id : string;
    /**
     * The description of the package
     * 
     * @type {string}
     * @memberof PackageQueryResult
     */
    description : string;
    downloadCount : number;
    source : string;
    sourceUrl : string;    
    versions : string[];
}