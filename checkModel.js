// This script checks if one or more Computer Models with a given name is the current computer.
// If the Model Name Matches, the script exits with code 0 - anything else will allow a package to be interrupted.
//
// Example usage:
// cscript checkModel.js "OptiPlex 745" "OptiPlex 755"
//
//
// WPKG Package Example to only continue install for 745 and 755 computer models - all others will stop
// ...
// 		<install cmd='cscript "\\server\WPKG\checkModel.js" "OptiPlex 745" "OptiPlex 755"' />
//		
//		<install cmd='"\\server\install\dell_driver.exe" /s' />
// ...
 
if(WScript.Arguments.count()>0) {
 
        var haveMatch;
 
        for (i=0; i<WScript.Arguments.length; i++) {
 
                var curarg = WScript.Arguments(i).toLowerCase();
 
				var wmi = GetObject("winmgmts:{impersonationLevel=Impersonate}\\\\.\\root\\cimv2");
				var query = "Select Model From Win32_ComputerSystem";
				e = new Enumerator(wmi.ExecQuery(query));
				var data = e.item();
				//WScript.Echo(curarg);
				//WScript.Echo("Model is " + data.Model);
				if (curarg == data.Model.toLowerCase()) { var haveMatch = true; } 
        }
 
        if (haveMatch == true) {
                WScript.Echo("Matches found");
        } else {
                WScript.Echo("No match found");
				WScript.Quit(1);
        }
 
} else {
 
        WScript.Echo ("You have to specify at least one computer model!");
        WScript.Quit(2);
}