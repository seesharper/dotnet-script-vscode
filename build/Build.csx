#! "netcoreapp2.0"
#load "nuget:github-changelog, 0.1.2"
#load "nuget:Dotnet.Build, 0.2.3"
#load "./ExtensionManager.csx"
#load "./BuildContext.csx"
#load "NPM.csx"

using static FileUtils;
using static ChangeLog;
using static ReleaseManagement;

var context = new BuildContext("seesharper", "dotnet-script-vscode");

NPM.Install(context.PathToProjectFolder);

ExtensionManager.Package(context.PathToProjectFolder, context.GitHubArtifactsFolder);
if (BuildEnvironment.IsSecure)
{
    await GenerateChangeLog();
    await GenerateReleaseNotes();
    if (Git.Default.IsTagCommit())
    {
        var releaseManager = ReleaseManagerFor(context.Owner, context.ProjectName, BuildEnvironment.GitHubAccessToken);        
        var assets = new ReleaseAsset[]{new ZipReleaseAsset(context.PathToGitHubReleaseAsset)};
        await releaseManager.CreateRelease(Git.Default.GetLatestTag(),context.PathToReleaseNotes, assets);
    }
}

async Task GenerateChangeLog()
{
    var changeLogGenerator = ChangeLogFrom(context.Owner, context.ProjectName, BuildEnvironment.GitHubAccessToken);
    if (!Git.Default.IsTagCommit())
    {
        changeLogGenerator = changeLogGenerator.IncludeUnreleased();
    }
    await changeLogGenerator.Generate(context.PathToChangeLog);
}

async Task GenerateReleaseNotes()
{
    var changeLogGenerator = ChangeLogFrom(context.Owner, context.ProjectName, BuildEnvironment.GitHubAccessToken).SinceLatestTag();
    if (!Git.Default.IsTagCommit())
    {
        changeLogGenerator = changeLogGenerator.IncludeUnreleased();
    }
    await changeLogGenerator.Generate(context.PathToReleaseNotes);
}
