#load "nuget:Dotnet.Build, 0.2.3"

using static FileUtils;
public static class ExtensionManager
{
    static ExtensionManager()
    {
        Command.Execute("cmd", "/c npm install -g vsce");
    }
    
    public static void Package(string projectFolder, string outputFolder)
    {                        
        var vsixFiles = Directory.GetFiles(projectFolder, "*.vsix");
        foreach(var file in vsixFiles)
        {
            File.Delete(file);
        }
        
        Command.Execute("cmd", $"/c vsce package", projectFolder);
        var vsixFile = Directory.GetFiles(projectFolder, "*.vsix").Single();
        File.Copy(vsixFile, Path.Combine(outputFolder, Path.GetFileName(vsixFile)), true);
    }    
}