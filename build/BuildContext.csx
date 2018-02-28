#load "nuget:Dotnet.Build, 0.2.3"

using System.Runtime.CompilerServices;
using static FileUtils;

public class BuildContext
{
    public BuildContext(string owner, string projectName)
    {
        Root = FileUtils.GetScriptFolder();                        
        var artifactsFolder = CreateDirectory(Root, "Artifacts");                                
        GitHubArtifactsFolder = CreateDirectory(artifactsFolder,"GitHub");           
        PathToReleaseNotes = Path.Combine(GitHubArtifactsFolder,"ReleaseNotes.md");
        PathToProjectFolder = Path.Combine(Root, "..");
        PathToChangeLog = Path.Combine(PathToProjectFolder,"CHANGELOG.md");
        Owner = owner;
        ProjectName = projectName;
    }
    
    public string PathToGitHubReleaseAsset => Directory.GetFiles(GitHubArtifactsFolder, "*.vsix").Single();

    public string GitHubArtifactsFolder {get;} 
    
    public string Root {get;} 
            
    public string PathToProjectFolder {get;}

    public string PathToTestProjectFolder {get;}
        
    public string PathToReleaseNotes {get;}

    public string PathToChangeLog {get;}
    public string Owner { get; }
    public string ProjectName { get; }
}