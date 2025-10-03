const dotnetQuestions = {
  problems: [
    {
      id: 1,
      title: "Fix the Bug in LogEntry",
      description: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
 
/*
We are writing software to analyze logs for toll booths on a highway. This highway is a divided highway with limited access; the only way on to or off of the highway is through a toll booth.
 
There are three types of toll booths:
* ENTRY (E in the diagram) toll booths, where a car goes through a booth as it enters the highway.
* EXIT (X in the diagram) toll booths, where a car goes through a booth as it exits the highway.
* MAINROAD (M in the diagram), which have sensors that record a license plate as a car drives through at full speed.
 
 
        Exit Booth                         Entry Booth
            |                                   |
            X                                   E
             \\                                 /
---<------------<---------M---------<-----------<---------<----
                                         (West-bound side)
 
===============================================================
 
                                         (East-bound side)
------>--------->---------M--------->--------->--------->------
             /                                 \\
            E                                   X
            |                                   |
        Entry Booth                         Exit Booth
*/
 
/*
For our first task:
1:1) Read through and understand the code and comments below. Feel free to run the code and tests.
1:2) The tests are not passing due to a bug in the code. Make the necessary changes to LogEntry to fix the bug.
`,
 
      // STARTER: Judge0-friendly, self-contained, compiles — but has the original bug:
      starterCode: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
 
public class LogEntry
{
    // NOTE: this is intentionally the buggy (original) version: Timestamp stored as string
    public string Timestamp { get; private set; }
    public string LicensePlate { get; private set; }
    public string BoothType { get; private set; }
    public int Location { get; private set; }
    public string Direction { get; private set; }
 
    public LogEntry(string logLine)
    {
        // use char overload for compatibility
        string[] tokens = logLine.Split(' ');
        Timestamp = tokens[0]; // bug: should be numeric in tests
        LicensePlate = tokens[1];
        BoothType = tokens[3];
        Location = int.Parse(tokens[2].Substring(0, tokens[2].Length - 1));
        char directionLetter = tokens[2][tokens[2].Length - 1];
        if (directionLetter == 'E') Direction = "EAST";
        else if (directionLetter == 'W') Direction = "WEST";
        else Debug.Assert(false, "Invalid direction");
    }
 
    public override string ToString()
    {
        return string.Format("<LogEntry timestamp: {0}  license: {1}  location: {2}  direction: {3}  booth type: {4}>",
            Timestamp, LicensePlate, Location, Direction, BoothType);
    }
}
 
public class LogFile : List<LogEntry>
{
    public LogFile(StringReader sr)
    {
        string line;
        while ((line = sr.ReadLine()) != null)
        {
            LogEntry logEntry = new LogEntry(line.Trim());
            Add(logEntry);
        }
    }
}
 
public class Solution
{
    // simple assert helper that throws on failure so Judge0 shows a runtime error when tests fail
    private static void AssertEqual(object actual, object expected, string name)
    {
        if (!object.Equals(actual, expected))
        {
            Console.WriteLine(\"TEST FAILED: {0}\\nExpected: {1} ({2})\\nActual:   {3} ({4})\",
                name, expected, expected?.GetType(), actual, actual?.GetType());
            throw new Exception(\"Test failed: \" + name);
        }
        else
        {
            Console.WriteLine(\"OK: {0}\", name);
        }
    }
 
    public static void TestLogEntry()
    {
        // in-memory test lines (no external file) so this runs on Judge0
        string logLine = \"44776.619 KTB918 310E MAINROAD\";
        LogEntry logEntry = new LogEntry(logLine);
        // THESE ASSERTIONS MATCH THE ORIGINAL PROBLEM — the first check will fail here because Timestamp is string
        AssertEqual(logEntry.Timestamp, 44776.619, \"Timestamp\");
        AssertEqual(logEntry.LicensePlate, \"KTB918\", \"LicensePlate\");
        AssertEqual(logEntry.Location, 310, \"Location\");
        AssertEqual(logEntry.Direction, \"EAST\", \"Direction\");
        AssertEqual(logEntry.BoothType, \"MAINROAD\", \"BoothType\");
 
        logLine = \"52160.132 ABC123 400W ENTRY\";
        logEntry = new LogEntry(logLine);
        AssertEqual(logEntry.Timestamp, 52160.132, \"Timestamp2\");
        AssertEqual(logEntry.LicensePlate, \"ABC123\", \"LicensePlate2\");
        AssertEqual(logEntry.Location, 400, \"Location2\");
        AssertEqual(logEntry.Direction, \"WEST\", \"Direction2\");
        AssertEqual(logEntry.BoothType, \"ENTRY\", \"BoothType2\");
    }
 
    public static void Main()
    {
        // Running the tests; starter is expected to fail on the timestamp assert
        TestLogEntry();
        Console.WriteLine(\"All tests passed.\");
    }
}`,
      hints: [
        "Check the data type of `Timestamp`. Tests compare numbers, not strings.",
        "Use `double.Parse` (or Convert.ToDouble) to extract timestamp from tokens if Timestamp should be numeric.",
        "Remove nullable reference syntax (e.g. `string?`) and avoid reading external files — Judge0 runs code in a sandbox with no extra files."
      ],
 
      // SOLUTION: Judge0-ready, self-contained, fixes Timestamp to double so tests pass
      solution: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
 
public class LogEntry
{
    // Fixed: Timestamp is numeric
    public double Timestamp { get; private set; }
    public string LicensePlate { get; private set; }
    public string BoothType { get; private set; }
    public int Location { get; private set; }
    public string Direction { get; private set; }
 
    public LogEntry(string logLine)
    {
        string[] tokens = logLine.Split(' ');
        Timestamp = double.Parse(tokens[0]);
        LicensePlate = tokens[1];
        BoothType = tokens[3];
        Location = int.Parse(tokens[2].Substring(0, tokens[2].Length - 1));
        char directionLetter = tokens[2][tokens[2].Length - 1];
        if (directionLetter == 'E') Direction = "EAST";
        else if (directionLetter == 'W') Direction = "WEST";
        else Debug.Assert(false, \"Invalid direction\");
    }
 
    public override string ToString()
    {
        return string.Format(\"<LogEntry timestamp: {0}  license: {1}  location: {2}  direction: {3}  booth type: {4}>\",
            Timestamp, LicensePlate, Location, Direction, BoothType);
    }
}
 
public class LogFile : List<LogEntry>
{
    public LogFile(StringReader sr)
    {
        string line;
        while ((line = sr.ReadLine()) != null)
        {
            LogEntry logEntry = new LogEntry(line.Trim());
            Add(logEntry);
        }
    }
}
 
public class Solution
{
    private static void AssertEqual(object actual, object expected, string name)
    {
        if (!object.Equals(actual, expected))
        {
            Console.WriteLine(\"TEST FAILED: {0}\\nExpected: {1} ({2})\\nActual:   {3} ({4})\",
                name, expected, expected?.GetType(), actual, actual?.GetType());
            throw new Exception(\"Test failed: \" + name);
        }
        else
        {
            Console.WriteLine(\"OK: {0}\", name);
        }
    }
 
    public static void TestLogEntry()
    {
        string logLine = \"44776.619 KTB918 310E MAINROAD\";
        LogEntry logEntry = new LogEntry(logLine);
        AssertEqual(logEntry.Timestamp, 44776.619, \"Timestamp\");
        AssertEqual(logEntry.LicensePlate, \"KTB918\", \"LicensePlate\");
        AssertEqual(logEntry.Location, 310, \"Location\");
        AssertEqual(logEntry.Direction, \"EAST\", \"Direction\");
        AssertEqual(logEntry.BoothType, \"MAINROAD\", \"BoothType\");
 
        logLine = \"52160.132 ABC123 400W ENTRY\";
        logEntry = new LogEntry(logLine);
        AssertEqual(logEntry.Timestamp, 52160.132, \"Timestamp2\");
        AssertEqual(logEntry.LicensePlate, \"ABC123\", \"LicensePlate2\");
        AssertEqual(logEntry.Location, 400, \"Location2\");
        AssertEqual(logEntry.Direction, \"WEST\", \"Direction2\");
        AssertEqual(logEntry.BoothType, \"ENTRY\", \"BoothType2\");
    }
 
    public static void Main()
    {
        TestLogEntry();
        Console.WriteLine(\"All tests passed.\");
    }
}`
    },
    {
      id: 4,
      title: "Fix the Bug in LogEntry (File + Timestamp)",
      description: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
 
/*
We are writing software to analyze logs for toll booths on a highway. This highway is a divided highway with limited access; the only way on to or off of the highway is through a toll booth.
 
There are three types of toll booths:
* ENTRY (E in the diagram) toll booths, where a car goes through a booth as it enters the highway.
* EXIT (X in the diagram) toll booths, where a car goes through a booth as it exits the highway.
* MAINROAD (M in the diagram), which have sensors that record a license plate as a car drives through at full speed.
 
(ASCII diagram omitted)
 
For this task:
1-1) Read through and understand the code and comments below. Feel free to run the code and tests.
1-2) The tests are not passing due to a bug in the code. Make the necessary changes to LogEntry to fix the bug.
`,
 
      starterCode: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
 
public class LogEntry
{
    // BUG: Timestamp stored as string
    public string Timestamp { get; private set; }
    public string LicensePlate { get; private set; }
    public string BoothType { get; private set; }
    public int Location { get; private set; }
    public string Direction { get; private set; }
 
    public LogEntry(string logLine)
    {
        string[] tokens = logLine.Split(' ');
        Timestamp = tokens[0]; // bug: should be numeric
        LicensePlate = tokens[1];
        BoothType = tokens[3];
        Location = int.Parse(tokens[2].Substring(0, tokens[2].Length - 1));
        char directionLetter = tokens[2][tokens[2].Length - 1];
        if (directionLetter == 'E') Direction = "EAST";
        else if (directionLetter == 'W') Direction = "WEST";
        else Debug.Assert(false, "Invalid direction");
    }
 
    public override string ToString()
    {
        return string.Format("<LogEntry timestamp: {0}  license: {1}  location: {2}  direction: {3}  booth type: {4}>",
            Timestamp, LicensePlate, Location, Direction, BoothType);
    }
}
 
public class LogFile : List<LogEntry>
{
    // reads lines into LogEntry objects
    public LogFile(StringReader sr)
    {
        string line;
        while ((line = sr.ReadLine()) != null)
        {
            LogEntry logEntry = new LogEntry(line.Trim());
            Add(logEntry);
        }
    }
}
 
public class Solution
{
    private static void AssertEqual(object actual, object expected, string name)
    {
        if (!object.Equals(actual, expected))
        {
            Console.WriteLine("TEST FAILED: {0}\\nExpected: {1}\\nActual:   {2}", name, expected, actual);
            throw new Exception("Test failed: " + name);
        }
        else
        {
            Console.WriteLine("OK: {0}", name);
        }
    }
 
    public static void TestLogEntry()
    {
        string logLine = "44776.619 KTB918 310E MAINROAD";
        LogEntry logEntry = new LogEntry(logLine);
        // this will fail (string vs double)
        AssertEqual(logEntry.Timestamp, 44776.619, "Timestamp");
        AssertEqual(logEntry.LicensePlate, "KTB918", "LicensePlate");
        AssertEqual(logEntry.Location, 310, "Location");
        AssertEqual(logEntry.Direction, "EAST", "Direction");
        AssertEqual(logEntry.BoothType, "MAINROAD", "BoothType");
 
        logLine = "52160.132 ABC123 400W ENTRY";
        logEntry = new LogEntry(logLine);
        AssertEqual(logEntry.Timestamp, 52160.132, "Timestamp2");
        AssertEqual(logEntry.LicensePlate, "ABC123", "LicensePlate2");
        AssertEqual(logEntry.Location, 400, "Location2");
        AssertEqual(logEntry.Direction, "WEST", "Direction2");
        AssertEqual(logEntry.BoothType, "ENTRY", "BoothType2");
    }
 
    public static void TestLogFile()
    {
        string sample = @"44776.619 KTB918 310E MAINROAD
52160.132 ABC123 400W ENTRY
34400.409 SXY288 210E ENTRY";
        LogFile logFile = new LogFile(new StringReader(sample));
        AssertEqual(logFile.Count, 3, "LogFile Count");
        foreach (LogEntry e in logFile)
        {
            if (e == null) throw new Exception("LogEntry is null");
        }
    }
 
    public static void Main()
    {
        TestLogFile();
        TestLogEntry();
        Console.WriteLine("All tests passed.");
    }
}`,
 
      hints: [
        "The bug is in the type of `Timestamp` — tests expect a number, not a string.",
        "Replace the `string` with `double` and parse using `double.Parse`.",
        "Judge0 cannot access external files — replace file input with `StringReader` and in-memory strings for tests."
      ],
 
      solution: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
 
public class LogEntry
{
    // FIX: Timestamp as double
    public double Timestamp { get; private set; }
    public string LicensePlate { get; private set; }
    public string BoothType { get; private set; }
    public int Location { get; private set; }
    public string Direction { get; private set; }
 
    public LogEntry(string logLine)
    {
        string[] tokens = logLine.Split(' ');
        Timestamp = double.Parse(tokens[0]);
        LicensePlate = tokens[1];
        BoothType = tokens[3];
        Location = int.Parse(tokens[2].Substring(0, tokens[2].Length - 1));
        char directionLetter = tokens[2][tokens[2].Length - 1];
        if (directionLetter == 'E') Direction = "EAST";
        else if (directionLetter == 'W') Direction = "WEST";
        else Debug.Assert(false, "Invalid direction");
    }
 
    public override string ToString()
    {
        return string.Format("<LogEntry timestamp: {0}  license: {1}  location: {2}  direction: {3}  booth type: {4}>",
            Timestamp, LicensePlate, Location, Direction, BoothType);
    }
}
 
public class LogFile : List<LogEntry>
{
    public LogFile(StringReader sr)
    {
        string line;
        while ((line = sr.ReadLine()) != null)
        {
            LogEntry logEntry = new LogEntry(line.Trim());
            Add(logEntry);
        }
    }
}
 
public class Solution
{
    private static void AssertEqual(object actual, object expected, string name)
    {
        if (!object.Equals(actual, expected))
        {
            Console.WriteLine("TEST FAILED: {0}\\nExpected: {1}\\nActual:   {2}", name, expected, actual);
            throw new Exception("Test failed: " + name);
        }
        else
        {
            Console.WriteLine("OK: {0}", name);
        }
    }
 
    public static void TestLogEntry()
    {
        string logLine = "44776.619 KTB918 310E MAINROAD";
        LogEntry logEntry = new LogEntry(logLine);
        AssertEqual(logEntry.Timestamp, 44776.619, "Timestamp");
        AssertEqual(logEntry.LicensePlate, "KTB918", "LicensePlate");
        AssertEqual(logEntry.Location, 310, "Location");
        AssertEqual(logEntry.Direction, "EAST", "Direction");
        AssertEqual(logEntry.BoothType, "MAINROAD", "BoothType");
 
        logLine = "52160.132 ABC123 400W ENTRY";
        logEntry = new LogEntry(logLine);
        AssertEqual(logEntry.Timestamp, 52160.132, "Timestamp2");
        AssertEqual(logEntry.LicensePlate, "ABC123", "LicensePlate2");
        AssertEqual(logEntry.Location, 400, "Location2");
        AssertEqual(logEntry.Direction, "WEST", "Direction2");
        AssertEqual(logEntry.BoothType, "ENTRY", "BoothType2");
    }
 
    public static void TestLogFile()
    {
        string sample = @"44776.619 KTB918 310E MAINROAD
52160.132 ABC123 400W ENTRY
34400.409 SXY288 210E ENTRY";
        LogFile logFile = new LogFile(new StringReader(sample));
        AssertEqual(logFile.Count, 3, "LogFile Count");
        foreach (LogEntry e in logFile)
        {
            if (e == null) throw new Exception("LogEntry is null");
        }
    }
 
    public static void Main()
    {
        TestLogFile();
        TestLogEntry();
        Console.WriteLine("All tests passed.");
    }
}`
    },
    {
  id: 5,
  title: "Count Complete Journeys in Toll Log",
  description: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
 
/*
We are writing software to analyze logs for toll booths on a highway. This highway is a divided highway with limited access; the only way on to or off of the highway is through a toll booth.
 
There are three types of toll booths:
* ENTRY (E in the diagram) toll booths, where a car goes through a booth as it enters the highway.
* EXIT (X in the diagram) toll booths, where a car goes through a booth as it exits the highway.
* MAINROAD (M in the diagram), which have sensors that record a license plate as a car drives through at full speed.
 
(ASCII diagram omitted)
 
We are interested in how many people are using the highway, and so we would like to count how many complete journeys are taken in the log file.
 
A complete journey consists of:
* A driver entering the highway through an ENTRY toll booth.
* The driver passing through some number of MAINROAD toll booths (possibly 0).
* The driver exiting the highway through an EXIT toll booth.
 
For example, the following excerpt of log lines contains complete journeys for the cars with JOX304 and THX138:
 
90750.191 JOX304 250E ENTRY
91081.684 JOX304 260E MAINROAD
91082.101 THX138 110E ENTRY
91483.251 JOX304 270E MAINROAD
91873.920 THX138 120E MAINROAD
91874.493 JOX304 280E EXIT
91982.102 THX138 290E EXIT
 
You may assume that the log only contains complete journeys, and there are no missing entries.
 
Task:
2-1) Write a function in LogFile named CountJourneys() that returns how many complete journeys there are in the given LogFile.
`,
 
  starterCode: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
 
public class LogEntry
{
    public double Timestamp { get; private set; }
    public string LicensePlate { get; private set; }
    public string BoothType { get; private set; }
    public int Location { get; private set; }
    public string Direction { get; private set; }
 
    public LogEntry(string logLine)
    {
        string[] tokens = logLine.Split(' ');
        Timestamp = double.Parse(tokens[0]);
        LicensePlate = tokens[1];
        BoothType = tokens[3];
        Location = int.Parse(tokens[2].Substring(0, tokens[2].Length - 1));
        char directionLetter = tokens[2][tokens[2].Length - 1];
        if (directionLetter == 'E') Direction = "EAST";
        else if (directionLetter == 'W') Direction = "WEST";
        else Debug.Assert(false, "Invalid direction");
    }
 
    public override string ToString()
    {
        return string.Format("<LogEntry timestamp: {0} license: {1} location: {2} direction: {3} booth type: {4}>",
            Timestamp, LicensePlate, Location, Direction, BoothType);
    }
}
 
public class LogFile : List<LogEntry>
{
    public LogFile(StringReader sr)
    {
        string line;
        while ((line = sr.ReadLine()) != null)
        {
            LogEntry logEntry = new LogEntry(line.Trim());
            Add(logEntry);
        }
    }
 
    // TODO: implement CountJourneys()
    public int CountJourneys()
    {
        throw new NotImplementedException();
    }
}
 
public class Solution
{
    private static void AssertEqual(object actual, object expected, string name)
    {
        if (!object.Equals(actual, expected))
        {
            Console.WriteLine("TEST FAILED: {0}\\nExpected: {1}\\nActual:   {2}", name, expected, actual);
            throw new Exception("Test failed: " + name);
        }
        else
        {
            Console.WriteLine("OK: {0}", name);
        }
    }
 
    public static void TestLogEntry()
    {
        string logLine = "44776.619 KTB918 310E MAINROAD";
        LogEntry logEntry = new LogEntry(logLine);
        AssertEqual(logEntry.Timestamp, 44776.619, "Timestamp");
        AssertEqual(logEntry.LicensePlate, "KTB918", "LicensePlate");
        AssertEqual(logEntry.Location, 310, "Location");
        AssertEqual(logEntry.Direction, "EAST", "Direction");
        AssertEqual(logEntry.BoothType, "MAINROAD", "BoothType");
 
        logLine = "52160.132 ABC123 400W ENTRY";
        logEntry = new LogEntry(logLine);
        AssertEqual(logEntry.Timestamp, 52160.132, "Timestamp2");
        AssertEqual(logEntry.LicensePlate, "ABC123", "LicensePlate2");
        AssertEqual(logEntry.Location, 400, "Location2");
        AssertEqual(logEntry.Direction, "WEST", "Direction2");
        AssertEqual(logEntry.BoothType, "ENTRY", "BoothType2");
    }
 
    public static void TestCountJourneys()
    {
        string sample = @"90750.191 JOX304 250E ENTRY
91081.684 JOX304 260E MAINROAD
91082.101 THX138 110E ENTRY
91483.251 JOX304 270E MAINROAD
91873.920 THX138 120E MAINROAD
91874.493 JOX304 280E EXIT
91982.102 THX138 290E EXIT";
 
        LogFile logFile = new LogFile(new StringReader(sample));
        AssertEqual(logFile.CountJourneys(), 2, "CountJourneys");
    }
 
    public static void Main()
    {
        TestLogEntry();
        // Uncomment once CountJourneys is implemented
        // TestCountJourneys();
        Console.WriteLine("All tests passed.");
    }
}`,
 
  hints: [
    "Think about grouping logs by `LicensePlate`.",
    "A complete journey has both an ENTRY and an EXIT (MAINROAD logs are optional).",
    "For each driver, count min(entryCount, exitCount) to determine full journeys."
  ],
 
  solution: `public int CountJourneys()
{
    int totalJourneys = 0;
    var groupedLogs = this.GroupBy(o => o.LicensePlate);
    foreach (var entry in groupedLogs)
    {
        int entryCount = entry.Count(c => c.BoothType == "ENTRY");
        int exitCount = entry.Count(c => c.BoothType == "EXIT");
        totalJourneys += Math.Min(entryCount, exitCount);
    }
    return totalJourneys;
}`
    },
    {
  id: 6,
  title: "Count Complete Journeys in LogFile",
  description: `We are writing software to analyze logs for toll booths on a highway. This highway is a divided highway with limited access; the only way on to or off of the highway is through a toll booth.
 
There are three types of toll booths:
* ENTRY (E in the diagram) toll booths, where a car goes through a booth as it enters the highway.
* EXIT (X in the diagram) toll booths, where a car goes through a booth as it exits the highway.
* MAINROAD (M in the diagram), which have sensors that record a license plate as a car drives through at full speed.
 
We are interested in how many people are using the highway, and so we would like to count how many complete journeys are taken in the log file.
 
A complete journey consists of:
* A driver entering the highway through an ENTRY toll booth.
* The driver passing through some number of MAINROAD toll booths (possibly 0).
* The driver exiting the highway through an EXIT toll booth.
 
For example, the following excerpt of log lines contains complete journeys for the cars with JOX304 and THX138:
 
90750.191 JOX304 250E ENTRY
91081.684 JOX304 260E MAINROAD
91082.101 THX138 110E ENTRY
91483.251 JOX304 270E MAINROAD
91873.920 THX138 120E MAINROAD
91874.493 JOX304 280E EXIT
91982.102 THX138 290E EXIT
 
You may assume that the log only contains complete journeys, and there are no missing entries.
 
Task:
2-1) Write a function in LogFile named CountJourneys() that returns how many complete journeys there are in the given LogFile.`,
 
  starterCode: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
 
public class LogEntry
{
    public double Timestamp { get; private set; }
    public string LicensePlate { get; private set; }
    public string BoothType { get; private set; }
    public int Location { get; private set; }
    public string Direction { get; private set; }
 
    public LogEntry(string logLine)
    {
        string[] tokens = logLine.Split(" ");
        // BUG: Timestamp parsing was missing originally, should use double.Parse
        Timestamp = double.Parse(tokens[0]);
        LicensePlate = tokens[1];
        BoothType = tokens[3];
        Location = int.Parse(tokens[2].Substring(0, tokens[2].Length - 1));
        char directionLetter = tokens[2][tokens[2].Length - 1];
        if (directionLetter == 'E') Direction = "EAST";
        else if (directionLetter == 'W') Direction = "WEST";
        else Debug.Assert(false, "Invalid direction");
    }
 
    public override string ToString()
    {
        return string.Format("<LogEntry timestamp: {0}  license: {1}  location: {2}  direction: {3}  booth type: {4}>",
            Timestamp, LicensePlate, Location, Direction, BoothType);
    }
}
 
public class LogFile : List<LogEntry>
{
    public LogFile(StringReader sr)
    {
        string line;
        while ((line = sr.ReadLine()) != null)
        {
            LogEntry logEntry = new LogEntry(line.Trim());
            Add(logEntry);
        }
    }
 
    // TODO: Implement CountJourneys() to return number of complete journeys
    public int CountJourneys()
    {
        throw new NotImplementedException();
    }
}
 
public class Solution
{
    private static void AssertEqual(object actual, object expected, string name)
    {
        if (!object.Equals(actual, expected))
        {
            Console.WriteLine("TEST FAILED: {0}\\nExpected: {1}\\nActual:   {2}", name, expected, actual);
            throw new Exception("Test failed: " + name);
        }
        else
        {
            Console.WriteLine("OK: {0}", name);
        }
    }
 
    public static void TestCountJourneys()
    {
        string sample = @"90750.191 JOX304 250E ENTRY
91081.684 JOX304 260E MAINROAD
91082.101 THX138 110E ENTRY
91483.251 JOX304 270E MAINROAD
91873.920 THX138 120E MAINROAD
91874.493 JOX304 280E EXIT
91982.102 THX138 290E EXIT";
       
        LogFile logFile = new LogFile(new StringReader(sample));
        AssertEqual(logFile.CountJourneys(), 2, "CountJourneys");
    }
 
    public static void Main()
    {
        TestCountJourneys();
        Console.WriteLine("All tests passed.");
    }
}`,
 
  hints: [
    "Make sure `Timestamp` is parsed correctly as a `double`.",
    "Track cars by license plate — they must ENTER before they EXIT.",
    "A complete journey ends only when an EXIT is encountered after an ENTRY."
  ],
 
  solution: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
 
public class LogEntry
{
    public double Timestamp { get; private set; }
    public string LicensePlate { get; private set; }
    public string BoothType { get; private set; }
    public int Location { get; private set; }
    public string Direction { get; private set; }
 
    public LogEntry(string logLine)
    {
        string[] tokens = logLine.Split(" ");
        Timestamp = double.Parse(tokens[0]);
        LicensePlate = tokens[1];
        BoothType = tokens[3];
        Location = int.Parse(tokens[2].Substring(0, tokens[2].Length - 1));
        char directionLetter = tokens[2][tokens[2].Length - 1];
        if (directionLetter == 'E') Direction = "EAST";
        else if (directionLetter == 'W') Direction = "WEST";
        else Debug.Assert(false, "Invalid direction");
    }
 
    public override string ToString()
    {
        return string.Format("<LogEntry timestamp: {0}  license: {1}  location: {2}  direction: {3}  booth type: {4}>",
            Timestamp, LicensePlate, Location, Direction, BoothType);
    }
}
 
public class LogFile : List<LogEntry>
{
    public LogFile(StringReader sr)
    {
        string line;
        while ((line = sr.ReadLine()) != null)
        {
            LogEntry logEntry = new LogEntry(line.Trim());
            Add(logEntry);
        }
    }
 
    public int CountJourneys()
    {
        int completeJourney = 0;
        HashSet<string> active = new HashSet<string>();
 
        foreach (var entry in this)
        {
            if (entry.BoothType == "ENTRY")
            {
                active.Add(entry.LicensePlate);
            }
            else if (entry.BoothType == "EXIT" && active.Contains(entry.LicensePlate))
            {
                completeJourney++;
                active.Remove(entry.LicensePlate);
            }
        }
        return completeJourney;
    }
}
 
public class Solution
{
    private static void AssertEqual(object actual, object expected, string name)
    {
        if (!object.Equals(actual, expected))
        {
            Console.WriteLine("TEST FAILED: {0}\\nExpected: {1}\\nActual:   {2}", name, expected, actual);
            throw new Exception("Test failed: " + name);
        }
        else
        {
            Console.WriteLine("OK: {0}", name);
        }
    }
 
    public static void TestCountJourneys()
    {
        string sample = @"90750.191 JOX304 250E ENTRY
91081.684 JOX304 260E MAINROAD
91082.101 THX138 110E ENTRY
91483.251 JOX304 270E MAINROAD
91873.920 THX138 120E MAINROAD
91874.493 JOX304 280E EXIT
91982.102 THX138 290E EXIT";
       
        LogFile logFile = new LogFile(new StringReader(sample));
        AssertEqual(logFile.CountJourneys(), 2, "CountJourneys");
    }
 
    public static void Main()
    {
        TestCountJourneys();
        Console.WriteLine("All tests passed.");
    }
}`
    },
    {
  id: 8,
  title: "Stock Trading Data Management",
  description: `We are developing a stock trading data management software that tracks the prices of different stocks over time and provides useful statistics.
 
The program includes three classes:
* Stock — represents data about a specific stock.
* PriceRecord — holds information about a single price record for a stock.
* StockCollection — manages a collection of price records for a particular stock and provides methods to retrieve useful statistics about the stock's prices.
 
Tasks:
1. Read through and understand the code.
2. The test for StockCollection is not passing due to a bug in the code. Make the necessary changes to StockCollection to fix the bug.`,
  starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
 
public class Stock
{
    public string Symbol { get; set; }
    public string Name { get; set; }
 
    public Stock(string symbol, string name)
    {
        Symbol = symbol;
        Name = name;
    }
 
    public override string ToString()
    {
        return Name;
    }
}
 
public class PriceRecord
{
    public Stock Stock { get; set; }
    public int Price { get; set; }
    public string Date { get; set; }
 
    public PriceRecord(Stock stock, int price, string date)
    {
        Stock = stock;
        Price = price;
        Date = date;
    }
 
    public override string ToString()
    {
        return $"Stock: {Stock} Price: {Price} date: {Date}";
    }
}
 
public class StockCollection
{
    public List<PriceRecord> PriceRecords { get; set; }
    public Stock Stock { get; set; }
 
    public StockCollection(Stock stock)
    {
        PriceRecords = new List<PriceRecord>();
        Stock = stock;
    }
 
    public int GetNumPriceRecords()
    {
        return PriceRecords.Count;
    }
 
    public void AddPriceRecord(PriceRecord priceRecord)
    {
        if (!priceRecord.Stock.Equals(Stock))
            throw new ArgumentException("PriceRecord's Stock is not the same as the StockCollection's");
 
        PriceRecords.Add(priceRecord);
    }
 
    // BUG: These methods throw exceptions if PriceRecords is empty
    public int? GetMaxPrice()
    {
        return PriceRecords.Max(priceRecord => priceRecord.Price);
    }
 
    public int? GetMinPrice()
    {
        return PriceRecords.Min(priceRecord => priceRecord.Price);
    }
 
    public double? GetAvgPrice()
    {
        return PriceRecords.Average(priceRecord => priceRecord.Price);
    }
}
 
public class Solution
{
    public static void Main(String[] args) {
        TestPriceRecord();
        TestStockCollection();
    }
   
    public static void TestPriceRecord()
    {
        Console.WriteLine("Running TestPriceRecord");
        Stock TestStock = new Stock("AAPL", "Apple Inc.");
        PriceRecord TestPriceRecord = new PriceRecord(TestStock, 100, "2023-07-01");
        Console.WriteLine(TestPriceRecord.ToString());
        Debug.Assert(TestPriceRecord.Stock == TestStock);
        Debug.Assert(TestPriceRecord.Price == 100);
        Debug.Assert(TestPriceRecord.Date == "2023-07-01");
    }
   
    public static StockCollection MakeStockCollection(Stock Stock, List<Tuple<int, string>> PriceData)
    {
        StockCollection StockCollection = new StockCollection(Stock);
        foreach (Tuple<int, string> PriceRecordData in PriceData)
        {
            PriceRecord PriceRecord = new PriceRecord(Stock, PriceRecordData.Item1, PriceRecordData.Item2);
            StockCollection.AddPriceRecord(PriceRecord);
        }
        return StockCollection;
    }
   
    public static void TestStockCollection()
    {
        Console.WriteLine("Running TestStockCollection");
        Stock TestStock = new Stock("AAPL", "Apple Inc.");
        StockCollection StockCollection = new StockCollection(TestStock);
        Debug.Assert(StockCollection.GetNumPriceRecords() == 0);
        Debug.Assert(StockCollection.GetMaxPrice() == null);
        Debug.Assert(StockCollection.GetMinPrice() == null);
        Debug.Assert(StockCollection.GetAvgPrice() == null);
 
        List<Tuple<int, string>> PriceData = new List<Tuple<int, string>>
        {
            new Tuple<int, string>(110, "2023-06-29"),
            new Tuple<int, string>(112, "2023-07-01"),
            new Tuple<int, string>(90, "2023-06-28"),
            new Tuple<int, string>(105, "2023-07-06")
        };
        TestStock = new Stock("AAPL", "Apple Inc.");
        StockCollection = MakeStockCollection(TestStock, PriceData);
        Debug.Assert(StockCollection.GetNumPriceRecords() == PriceData.Count);
        Debug.Assert(StockCollection.GetMaxPrice() == 112);
        Debug.Assert(StockCollection.GetMinPrice() == 90);
        Debug.Assert(Math.Abs((decimal)StockCollection.GetAvgPrice().GetValueOrDefault() - 104.25m) < 0.1m);
    }
}`,
  solution: `// In the solution, the bug was that Max, Min, and Average LINQ methods threw exceptions when the list was empty.
// Fixed by checking if PriceRecords.Count == 0 and returning null instead.
 
public int? GetMaxPrice()
{
    return PriceRecords.Count == 0 ? (int?)null : PriceRecords.Max(priceRecord => priceRecord.Price);
}
 
public int? GetMinPrice()
{
    return PriceRecords.Count == 0 ? (int?)null : PriceRecords.Min(priceRecord => priceRecord.Price);
}
 
public double? GetAvgPrice()
{
    return PriceRecords.Count == 0 ? (double?)null : PriceRecords.Average(priceRecord => priceRecord.Price);
}`,
  hints: [
    "Check what happens when PriceRecords is empty in Max/Min/Average.",
    "Use conditional checks before applying LINQ methods.",
    "Remember that methods should return null if no data is available."
  ]
    },
    {
  id: 13,
  title: "Castle Treasure Room Filter",
  description: `You are with your friends in a castle, where there are multiple rooms named after flowers. Some of the rooms contain treasures - we call them the treasure rooms.  
 
Each room contains a single instruction that tells you which room to go to next.
 
Instructions and treasure rooms:
 
instructions_1 = [
    ["jasmin", "tulip"],
    ["lily", "tulip"],
    ["tulip", "tulip"],
    ["rose", "rose"],
    ["violet", "rose"],
    ["sunflower", "violet"],
    ["daisy", "violet"],
    ["iris", "violet"]
]
 
treasure_rooms_1 = ["lily", "tulip", "violet", "rose"]
 
instructions_2 = [
    ["jasmin", "tulip"],
    ["lily", "tulip"],
    ["tulip", "violet"],
    ["violet", "violet"]      
]
 
treasure_rooms_2 = ["lily", "jasmin", "violet"]  
treasure_rooms_3 = ["violet"]
 
Write a function filter_rooms(instructions, treasureRooms) that returns a list of rooms satisfying:
1. At least two *other* rooms have instructions pointing to this room.
2. This room's instruction immediately points to a treasure room.
 
Examples:
- filter_rooms(instructions_1, treasure_rooms_1) => ["tulip", "violet"]
- filter_rooms(instructions_1, treasure_rooms_2) => []
- filter_rooms(instructions_2, treasure_rooms_3) => ["tulip"]`,
 
  starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
 
public class Solution
{
    public static List<string> filter_rooms(string[][] instructions, string[] treasureRooms)
    {
        // BUG: counting self-references in source list
        HashSet<string> treasure = new HashSet<string>(treasureRooms);
        Dictionary<string, List<string>> source = new Dictionary<string, List<string>>();
        Dictionary<string, string> nextRooms = new Dictionary<string,string>();
 
        foreach(var inst in instructions)
        {
            string src = inst[0], dst = inst[1];
            if(!source.ContainsKey(dst))
            {
                source[dst] = new List<string>();
            }
            // BUG: adding self references
            source[dst].Add(src);
            nextRooms[src] = dst;
        }
 
        List<string> result = new List<string>();
        foreach(var room in source.Keys)
        {
            if(source[room].Count >= 2)
            {
                string nextTresRoom = nextRooms.ContainsKey(room) ? nextRooms[room] : null;
                if(nextTresRoom != null && treasure.Contains(nextTresRoom))
                {
                    result.Add(room);
                }
            }
        }
        return result;
    }
 
    public static void Main()
    {
        string[][] instructions_1 = new string[][] {
            new string[] {"jasmin", "tulip"},
            new string[] {"lily", "tulip"},
            new string[] {"tulip", "tulip"},
            new string[] {"rose", "rose"},
            new string[] {"violet", "rose"},
            new string[] {"sunflower", "violet"},
            new string[] {"daisy", "violet"},
            new string[] {"iris", "violet"}
        };
        string[] treasure_rooms_1 = new string[] {"lily", "tulip", "violet", "rose"};
 
        var res = filter_rooms(instructions_1, treasure_rooms_1);
        Console.WriteLine(string.Join(", ", res)); // BUG: may include "tulip" incorrectly
    }
}`,
 
  solution: `using System;
using System.Collections.Generic;
using System.Linq;
 
public class Solution
{
    public static List<string> filter_rooms(string[][] instructions, string[] treasureRooms)
    {
        HashSet<string> treasure = new HashSet<string>(treasureRooms);
        Dictionary<string, List<string>> source = new Dictionary<string, List<string>>();
        Dictionary<string, string> nextRooms = new Dictionary<string,string>();
 
        foreach(var inst in instructions)
        {
            string src = inst[0], dst = inst[1];
            if(!source.ContainsKey(dst))
            {
                source[dst] = new List<string>();
            }
            // FIX: exclude self references when counting
            if(src != dst)
                source[dst].Add(src);
 
            nextRooms[src] = dst;
        }
 
        List<string> result = new List<string>();
        foreach(var room in source.Keys)
        {
            if(source[room].Count >= 2)
            {
                string nextTresRoom = nextRooms.ContainsKey(room) ? nextRooms[room] : null;
                if(nextTresRoom != null && treasure.Contains(nextTresRoom))
                {
                    result.Add(room);
                }
            }
        }
        return result;
    }
 
    public static void Main()
    {
        string[][] instructions_1 = new string[][] {
            new string[] {"jasmin", "tulip"},
            new string[] {"lily", "tulip"},
            new string[] {"tulip", "tulip"},
            new string[] {"rose", "rose"},
            new string[] {"violet", "rose"},
            new string[] {"sunflower", "violet"},
            new string[] {"daisy", "violet"},
            new string[] {"iris", "violet"}
        };
        string[][] instructions_2 = new string[][] {
            new string[] {"jasmin", "tulip"},
            new string[] {"lily", "tulip"},
            new string[] {"tulip", "violet"},
            new string[] {"violet", "violet"}
        };
 
        string[] treasure_rooms_1 = new string[] {"lily", "tulip", "violet", "rose"};
        string[] treasure_rooms_2 = new string[] {"lily", "jasmin", "violet"};  
        string[] treasure_rooms_3 = new string[] {"violet"};
 
        Console.WriteLine(string.Join(", ", filter_rooms(instructions_1, treasure_rooms_1))); // tulip, violet
        Console.WriteLine(string.Join(", ", filter_rooms(instructions_1, treasure_rooms_2))); //
        Console.WriteLine(string.Join(", ", filter_rooms(instructions_2, treasure_rooms_3))); // tulip
    }
}`,
 
  hints: [
    "Only count *other* rooms pointing to a room; ignore self references.",
    "Use dictionaries to map destinations to sources and sources to next rooms.",
    "Check that the room’s instruction leads to a treasure room before adding to result."
  ]
    }
  ],
  refactor: [
    {
    "id": 101,
    "title": "Refactor Nested Loops for Intersection",
    "description": "You are given a function that calculates the intersection of two lists of integers. The current implementation uses nested loops and has O(n*m) time complexity. Refactor it to improve readability and efficiency using built-in C# data structures.",
    "starterCode": "public List<int> FindIntersection(List<int> list1, List<int> list2) {\n    List<int> result = new List<int>();\n    foreach(var a in list1) {\n        foreach(var b in list2) {\n            if(a == b && !result.Contains(a)) {\n                result.Add(a);\n            }\n        }\n    }\n    return result;\n}",
    "solution": "public List<int> FindIntersection(List<int> list1, List<int> list2) {\n    HashSet<int> set1 = new HashSet<int>(list1);\n    HashSet<int> resultSet = new HashSet<int>();\n    foreach(var b in list2) {\n        if(set1.Contains(b)) resultSet.Add(b);\n    }\n    return resultSet.ToList();\n}",
    "hints": [
      "Use HashSet for faster lookups.",
      "Avoid duplicate checks using the HashSet.",
      "Time complexity should be O(n + m) instead of O(n*m)."
    ]
  },
  {
    "id": 102,
    "title": "Refactor Conditional Logic for Discounts",
    "description": "The following code determines the discount for a customer. It is correct but hard to read. Refactor it to improve readability without changing behavior.",
    "starterCode": "public double CalculateDiscount(int age, bool isMember) {\n    if(age < 18) {\n        if(isMember) {\n            return 0.2;\n        } else {\n            return 0.1;\n        }\n    } else {\n        if(isMember) {\n            return 0.15;\n        } else {\n            return 0.0;\n        }\n    }\n}",
    "solution": "public double CalculateDiscount(int age, bool isMember) {\n    if(age < 18) return isMember ? 0.2 : 0.1;\n    return isMember ? 0.15 : 0.0;\n}",
    "hints": [
      "Consider using ternary operators for simple conditionals.",
      "Group conditions logically for clarity.",
      "Avoid deeply nested if-else blocks."
    ]
  },
  {
    "id": 103,
    "title": "Refactor Repeated Code in Username Validation",
    "description": "The following function validates a list of usernames. It repeats similar checks multiple times. Refactor to reduce code duplication.",
    "starterCode": "public List<string> ValidateUsernames(List<string> usernames) {\n    List<string> valid = new List<string>();\n    foreach(var name in usernames) {\n        if(name.Length >= 5) {\n            if(name.Length <= 10) {\n                if(!name.Contains(\" \")) {\n                    valid.Add(name);\n                }\n            }\n        }\n    }\n    return valid;\n}",
    "solution": "public List<string> ValidateUsernames(List<string> usernames) {\n    List<string> valid = new List<string>();\n    foreach(var name in usernames) {\n        if(name.Length >= 5 && name.Length <= 10 && !name.Contains(\" \")) {\n            valid.Add(name);\n        }\n    }\n    return valid;\n}",
    "hints": [
      "Combine conditions using logical AND (&&).",
      "Consider extracting a helper method for clarity.",
      "Avoid deeply nested if-statements."
    ]
},
  ],
 unitTests: [
  {
    "id": 201,
    "title": "Unit Test Calculator Methods",
    "description": "You have a simple Calculator class. Write unit tests to verify its Add and Divide methods, including edge cases like division by zero.",
    "starterCode": "using System;\n\npublic class Calculator {\n    public int Add(int a, int b) => a + b;\n    public int Divide(int a, int b) => a / b;\n}",
    "solution": "// Example NUnit tests\n[TestFixture]\npublic class CalculatorTests {\n    [Test]\n    public void TestAdd() {\n        Calculator calc = new Calculator();\n        Assert.AreEqual(5, calc.Add(2,3));\n        Assert.AreEqual(-1, calc.Add(-2,1));\n    }\n\n    [Test]\n    public void TestDivide() {\n        Calculator calc = new Calculator();\n        Assert.AreEqual(2, calc.Divide(4,2));\n        Assert.Throws<DivideByZeroException>(() => calc.Divide(5,0));\n    }\n}",
    "hints": [
      "Use Assert.Throws for exception testing.",
      "Test both positive and negative numbers.",
      "Cover edge cases explicitly."
    ]
  },
  {
    "id": 202,
    "title": "Unit Test Email Validation",
    "description": "Write unit tests for a function IsValidEmail(string email) that validates emails. Cover valid emails, invalid emails, and empty or null input.",
    "starterCode": "using System;\n\npublic class EmailValidator {\n    public bool IsValidEmail(string email) {\n        return email != null && email.Contains(\"@\") && email.Contains(\".\");\n    }\n}",
    "solution": "// Example NUnit tests\n[TestFixture]\npublic class EmailTests {\n    [Test]\n    [TestCase(\"user@example.com\", ExpectedResult = true)]\n    [TestCase(\"userexample.com\", ExpectedResult = false)]\n    [TestCase(\"\", ExpectedResult = false)]\n    [TestCase(null, ExpectedResult = false)]\n    public bool TestIsValidEmail(string email) {\n        EmailValidator validator = new EmailValidator();\n        return validator.IsValidEmail(email);\n    }\n}",
    "hints": [
      "Use parameterized tests for multiple cases.",
      "Consider null or empty input.",
      "Cover edge cases like missing '@' or '.'"
    ]
  },
  {
    "id": 203,
    "title": "Unit Test Shopping Cart Total",
    "description": "Write unit tests to verify the GetTotal method of a ShoppingCart class, including empty cart, single item, and multiple items.",
    "starterCode": "using System;\nusing System.Collections.Generic;\n\npublic class ShoppingCart {\n    public List<double> Prices = new List<double>();\n    public double GetTotal() {\n        double total = 0;\n        foreach(var price in Prices) {\n            total += price;\n        }\n        return total;\n    }\n}",
    "solution": "// Example NUnit tests\n[TestFixture]\npublic class ShoppingCartTests {\n    [Test]\n    public void TestEmptyCart() {\n        ShoppingCart cart = new ShoppingCart();\n        Assert.AreEqual(0, cart.GetTotal());\n    }\n\n    [Test]\n    public void TestSingleItem() {\n        ShoppingCart cart = new ShoppingCart();\n        cart.Prices.Add(50);\n        Assert.AreEqual(50, cart.GetTotal());\n    }\n\n    [Test]\n    public void TestMultipleItems() {\n        ShoppingCart cart = new ShoppingCart();\n        cart.Prices.AddRange(new double[]{10,20,30});\n        Assert.AreEqual(60, cart.GetTotal());\n    }\n}",
    "hints": [
      "Test empty, single, and multiple items.",
      "Check for floating-point precision.",
      "Use Assert.AreEqual to verify totals."
    ]
  }
]
,
  performance: [
    {
    "id": 301,
    "title": "Performance Optimize Array Sum",
    "description": "Sum all even numbers in a large integer array. Current code uses LINQ but is slow for very large arrays. Optimize for performance.",
    "starterCode": "public int SumEvenNumbers(int[] arr) {\n    return arr.Where(x => x % 2 == 0).Sum();\n}",
    "solution": "public int SumEvenNumbers(int[] arr) {\n    int sum = 0;\n    foreach(var x in arr) {\n        if(x % 2 == 0) sum += x;\n    }\n    return sum;\n}",
    "hints": [
      "Avoid LINQ for tight loops in performance-critical code.",
      "Use a single loop with a running total.",
      "Check modulo operation for even numbers."
    ]
  },
  {
    "id": 302,
    "title": "Performance Optimize Fibonacci",
    "description": "Compute the nth Fibonacci number. The naive recursive solution is very slow for n > 40. Optimize using memoization or iterative approach.",
    "starterCode": "public int Fibonacci(int n) {\n    if(n <= 1) return n;\n    return Fibonacci(n-1) + Fibonacci(n-2);\n}",
    "solution": "public int Fibonacci(int n) {\n    if(n <= 1) return n;\n    int a = 0, b = 1;\n    for(int i = 2; i <= n; i++) {\n        int temp = a + b;\n        a = b;\n        b = temp;\n    }\n    return b;\n}",
    "hints": [
      "Store previously computed results in a dictionary or array.",
      "Consider bottom-up iterative computation.",
      "Avoid naive recursion for large n."
    ]
  },
  {
    "id": 303,
    "title": "Performance Optimize String Concatenation",
    "description": "Concatenating many strings using '+' is slow. Optimize the code using a more efficient method for large n.",
    "starterCode": "public string ConcatNumbers(int n) {\n    string result = \"\";\n    for(int i = 0; i < n; i++) {\n        result += i.ToString();\n    }\n    return result;\n}",
    "solution": "public string ConcatNumbers(int n) {\n    var sb = new System.Text.StringBuilder();\n    for(int i = 0; i < n; i++) {\n        sb.Append(i.ToString());\n    }\n    return sb.ToString();\n}",
    "hints": [
      "Use System.Text.StringBuilder for large concatenations.",
      "Avoid repeated string copies in loops.",
      "Append numbers directly to StringBuilder instead of converting each to string individually."
    ]
  }
  ]
};
 
export default dotnetQuestions;
