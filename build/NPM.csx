#load "nuget:Dotnet.Build, 0.2.3"

using static FileUtils;

public static class NPM
{
    public static void Install(string projectFolder)
    {
        Command.Execute("cmd", "/c npm install", projectFolder);
    }
}