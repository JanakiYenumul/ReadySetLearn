const dotnetQuestions = {
    problems: [
        {
            id: 1,
            title: "Q1 : Fix the Bug in LogEntry",
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
            Console.WriteLine("TEST FAILED: {0}\\nExpected: {1} ({2})\\nActual:   {3} ({4})",
                name, expected, expected?.GetType(), actual, actual?.GetType());
            throw new Exception("Test failed: " + name);
        }
        else
        {
            Console.WriteLine("OK: {0}", name);
        }
    }

    public static void TestLogEntry()
    {
        // in-memory test lines (no external file) so this runs on Judge0
        string logLine = "44776.619 KTB918 310E MAINROAD";
        LogEntry logEntry = new LogEntry(logLine);
        // THESE ASSERTIONS MATCH THE ORIGINAL PROBLEM — the first check will fail here because Timestamp is string
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

    public static void Main()
    {
        // Running the tests; starter is expected to fail on the timestamp assert
        TestLogEntry();
        Console.WriteLine("All tests passed.");
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
            Console.WriteLine("TEST FAILED: {0}\nExpected: {1} ({2})\\nActual:   {3} ({4})",
                name, expected, expected?.GetType(), actual, actual?.GetType());
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

    public static void Main()
    {
        TestLogEntry();
        Console.WriteLine("All tests passed.");
    }
}`
        },
        {
            id: 4,
            title: "Q2 :Fix the Bug in LogEntry (File + Timestamp)",
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
            id: 21,
            title: " Q3 :Extract Full Domain and Second-Level Domain from URLs",
            description: `
We have collected some HTTP/HTTPS referrer URLs from our web server. This data can be found at the address https://public.karat.io/content/referrals_4.txt, where each line contains a URL and nothing else.

We want to learn more about the domains that refer traffic to our site.

Write code that reads the first URL in the log file and prints the full domain name and the last two pieces of the domain (usually this is the second level domain) from a given URL.

For this question, you can't use URL-parsing libraries.

Examples:
"http://world.news.yahoo.com/news/olympics/" -> ["world.news.yahoo.com", "yahoo.com"]
"https://www.yahoo.co.uk/#finance" -> ["www.yahoo.co.uk", "co.uk"]
"https://google.com/" -> ["google.com", "google.com"]
"https://google.com/search?query=groceries" -> ["google.com", "google.com"]

Expected output for the file: ["world.news.yahoo.com", "yahoo.com"]

Complexity Variable:
L = length of the URL string
      `,
            hints: [
                "Think about how to remove the protocol (http:// or https://) before parsing.",
                "Identify where the domain ends by looking for '/', '#', or '?' in the string.",
                "Split the remaining domain by '.' and reconstruct the last two parts."
            ],
            starterCode: `
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var url = "https://public.karat.io/content/referrals_4.txt";
        using (var client = new HttpClient())
        {
            var text = await client.GetStringAsync(url);
            var firstLine = text.Split('\\n')[0].Trim();
            var result = ExtractDomains(firstLine);
            Console.WriteLine($"[\\"{result[0]}\\", \\"{result[1]}\\"]");
        }
    }

    static string[] ExtractDomains(string url)
    {
        // TODO: Implement logic to extract [fullDomain, secondLevelDomain]
        return new string[] { "", "" };
    }
}
      `,
            solution: `
using System;
 
class Solution
{
    static void Main(string[] args)
    {
        // Example input
        string[] testUrls = {
            "http://world.news.yahoo.com/news/olympics/",
            "https://www.yahoo.co.uk/#finance",
            "https://google.com/",
            "https://google.com/search?query=groceries"
        };
 
        foreach (var url in testUrls)
        {
            var result = ExtractDomains(url);
            Console.WriteLine($"[\\"{result[0]}\\", \\"{result[1]}\\"]");
        }
    }
 
    static string[] ExtractDomains(string url)
    {
        // Remove protocol
        if (url.StartsWith("http://"))
            url = url.Substring(7);
        else if (url.StartsWith("https://"))
            url = url.Substring(8);
 
        // Find first '/', '#', or '?'
        int idx = url.IndexOfAny(new char[] { '/', '#', '?' });
        if (idx != -1)
            url = url.Substring(0, idx);
 
        string fullDomain = url;
        var parts = fullDomain.Split('.');
        string lastTwo = parts.Length >= 2
            ? parts[parts.Length - 2] + "." + parts[parts.Length - 1]
            : fullDomain;
 
        return new string[] { fullDomain, lastTwo };
    }
}
      `
        },
        {
            id: 8,
            title: "Q4 : Stock Trading Data Management",
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
        Debug.Assert(StockCollection.GetAvgPrice().GetValueOrDefault() - 104.25m) < 0.1m;
    }
}`,
            solution: `using System;
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
            hints: [
                "Check what happens when PriceRecords is empty in Max/Min/Average.",
                "Use conditional checks before applying LINQ methods.",
                "Remember that methods should return null if no data is available."
            ]
        },
        {
            id: 22,
            title: "Q5 :Find Biggest Stock Price Change Between Consecutive Days",
            description: `
1) We are developing a stock trading data management software that tracks the prices of different stocks over time and provides useful statistics.

The program includes three classes: Stock, PriceRecord, and StockCollection.

Classes:
* The Stock class represents data about a specific stock.
* The PriceRecord class holds information about a single price record for a stock.
* The StockCollection class manages a collection of price records for a particular stock and provides methods to retrieve useful statistics about the stock's prices.

2) We want to add a new function called "GetBiggestChange" to the StockCollection class. This function calculates and returns the largest absolute change in stock price between any two consecutive days in the price records of a stock along with the dates of the change in a list. For example, let's consider the following price records of a stock:

Price Records:
Price:  110         112         90          105
Date:   2023-06-29  2023-07-01  2023-06-25  2023-07-06

Stock price changes (sorted based on date):
Date:     2023-06-25  ->  2023-06-29  ->  2023-07-01 ->  2023-07-06
Price:        90      ->      110     ->     112     ->     105
Change:              +20              +2             -7

In this case, the biggest absolute change in the stock price was +20, which occurred between 2023-06-25 and 2023-06-29. In this case, the function should return [20, "2023-06-25", "2023-06-29"]

Two days are considered consecutive if there are no other days' data in between them in the price records based on their dates.

To assist you in testing this new function, we have provided the TestGetBiggestChange function.

Complexity Variable:
n = number of price records
      `,
            hints: [
                "Sort the PriceRecords by date before calculating changes.",
                "Iterate over consecutive records and compute absolute price differences.",
                "Keep track of the maximum change and store the corresponding dates."
            ],
            starterCode: `
using System;
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

   public int? GetMaxPrice()
   {
       return PriceRecords.Count > 0 ? PriceRecords.Max(priceRecord => priceRecord.Price) : null;
   }

   public int? GetMinPrice()
   {
       return PriceRecords.Count > 0 ? PriceRecords.Min(priceRecord => priceRecord.Price) : null;
   }

   public double? GetAvgPrice()
   {
       return PriceRecords.Count > 0 ? PriceRecords.Average(priceRecord => priceRecord.Price) : null;
   }

   public Tuple<int, string, string> GetBiggestChange()
   {
       // TODO: Implement logic to find largest absolute price change
       return new Tuple<int, string, string>(0, "", "");
   }
}

public class Solution
{
   public static void Main(String[] args) {
       TestPriceRecord();
       TestStockCollection();
       TestGetBiggestChange();
   }
   
   public static void TestPriceRecord()
   {
       Console.WriteLine("Running TestPriceRecord");
       Stock TestStock = new Stock("AAPL", "Apple Inc.");
       PriceRecord TestPriceRecord = new PriceRecord(TestStock, 100, "2023-07-01");
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
   }
   
   public static void TestGetBiggestChange()
   {
       Console.WriteLine("Running TestGetBiggestChange");
       Stock TestStock = new Stock("AAPL", "Apple Inc.");
       StockCollection StockCollection = new StockCollection(TestStock);
       Debug.Assert(StockCollection.GetBiggestChange().Equals(new Tuple<int,string,string>(0, "", "")));
   }
}
      `,
            solution: ` 
using System;
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
 
   public Tuple<int, string, string> GetBiggestChange()
{
    if (PriceRecords.Count < 2)
        return new Tuple<int, string, string>(0, "", "");
 
    // Sort price records by date ascending
    var sorted = PriceRecords.OrderBy(pr => pr.Date).ToList();
    int maxChange = 0;
    string date1 = "", date2 = "";
    for (int i = 1; i < sorted.Count; i++)
    {
        int change = Math.Abs(sorted[i].Price - sorted[i - 1].Price);
        if (change > maxChange)
        {
            maxChange = change;
            date1 = sorted[i - 1].Date;
            date2 = sorted[i].Date;
        }
    }
    return new Tuple<int, string, string>(maxChange, date1, date2);
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
 
   public int? GetMaxPrice()
   {
       return PriceRecords?.Count > 0 ? PriceRecords.Max(priceRecord => priceRecord.Price) : 0;
   }
 
   public int? GetMinPrice()
   {
       return PriceRecords?.Count > 0 ? PriceRecords.Min(priceRecord => priceRecord.Price) : 0;
   }
 
   public double? GetAvgPrice()
   {
       return PriceRecords?.Count > 0 ? PriceRecords.Average(priceRecord => priceRecord.Price) : 0;
   }
 
}
public class Solution
{
   public static void Main(String[] args) {
       TestPriceRecord();
       TestStockCollection();
       TestGetBiggestChange();
   }
   
   public static void TestPriceRecord()
   {
       Console.WriteLine("Running TestPriceRecord");
       // Test basic PriceRecord functionality
       Stock TestStock = new Stock("AAPL", "Apple Inc.");
       PriceRecord TestPriceRecord = new PriceRecord(TestStock, 100, "2023-07-01");
       Debug.Assert(TestPriceRecord?.Stock == TestStock);
       Debug.Assert(TestPriceRecord?.Price == 100);
       Debug.Assert(TestPriceRecord?.Date == "2023-07-01");
   }
   
   public static StockCollection MakeStockCollection(Stock Stock, List<Tuple<int, string>> PriceData)
   {
       // Create a new StockCollection for test purposes.
       // Stock: The Stock object this StockCollection is for
       // PriceData: a list of tuples. Each tuple represents a price record for a single date.
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
       // Test basic StockCollection functionality
       Stock TestStock = new Stock("AAPL", "Apple Inc.");
       StockCollection StockCollection = new StockCollection(TestStock);
       Debug.Assert(StockCollection.GetNumPriceRecords() == 0);
       Debug.Assert(StockCollection.GetMaxPrice() == null);
       Debug.Assert(StockCollection.GetMinPrice() == null);
       Debug.Assert(StockCollection.GetAvgPrice() == null);
       
       // Price Records:
       // Price:  110         112         90          105
       // Date:   2023-06-29  2023-07-01  2023-06-28  2023-07-06
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
   
   public static void TestGetBiggestChange()
   {
       Console.WriteLine("Running TestGetBiggestChange");
       // Test the get_biggest_change method
       Stock TestStock = new Stock("AAPL", "Apple Inc.");
       StockCollection StockCollection = new StockCollection(TestStock);
       Debug.Assert(StockCollection.GetBiggestChange().Equals(new Tuple<int,string,string>(0, "", "")));
       
       // Price Records:
       // Price:  110         112         90          105
       // Date:   2023-06-29  2023-07-01  2023-06-25  2023-07-06
       List<Tuple<int, string>> PriceData = new List<Tuple<int, string>>
       {
           new Tuple<int, string>(110, "2023-06-29"),
           new Tuple<int, string>(112, "2023-07-01"),
           new Tuple<int, string>(90, "2023-06-25"),
           new Tuple<int, string>(105, "2023-07-06")
       };
       StockCollection = MakeStockCollection(TestStock, PriceData);
       Debug.Assert(StockCollection.GetBiggestChange().Equals(new Tuple<int,string,string>(20, "2023-06-25", "2023-06-29")));
       
       // Price Records:
       // Price:  200         210         190          180
       // Date:   2000-01-04  1999-12-30  2000-01-03  2000-01-01
       PriceData = new List<Tuple<int, string>>
       {
           new Tuple<int, string>(200, "2000-01-04"),
           new Tuple<int, string>(210, "1999-12-30"),
           new Tuple<int, string>(190, "2000-01-03"),
           new Tuple<int, string>(180, "2000-01-01")
       };
       StockCollection = MakeStockCollection(TestStock, PriceData);
       Debug.Assert(StockCollection.GetBiggestChange().Equals(new Tuple<int,string,string>(30, "1999-12-30", "2000-01-01")));
   }
 
}
 
      `
        },
        {
            id: 23,
            title: "Q6 :Gym Membership Workout Tracker",
            description: `
We are building a program to manage a gym's membership. The gym has multiple members, each with a unique ID, name, and membership status. The program allows gym staff to add new members, update member status, and get membership statistics.

Recently, the system has been updated to include information about workouts for members. Each Workout object represents a single session with a unique ID, start time, and end time (in minutes from the start of the day). You need to implement:

1) AddWorkout: Add a workout session for a member. If the member does not exist, ignore the workout.
2) GetAverageWorkoutDurations: Calculate the average duration of workouts for each member and return as a dictionary/map.

Example:
- Member 12 has workouts of durations 10, 55, and 10 minutes → average = 25.
- Member 22 has workouts 20 and 80 → average = 50.
- Member 31 has workouts 40 and 100 → average = 70.
- Member 4 does not exist → ignored.
      `,
            starterCode: `
using System;
using System.Collections.Generic;

public enum MembershipStatus
{
    BASIC = 1,
    PRO = 2,
    ELITE = 3
}

public class Member
{
    public int MemberId { get; set; }
    public string Name { get; set; }
    public MembershipStatus MembershipStatus { get; set; }

    public Member(int memberId, string name, MembershipStatus membershipStatus)
    {
        MemberId = memberId;
        Name = name;
        MembershipStatus = membershipStatus;
    }
}

public class Workout
{
    public int Id { get; private set; }
    public int StartTime { get; private set; }
    public int EndTime { get; private set; }

    public Workout(int id, int startTime, int endTime)
    {
        Id = id;
        StartTime = startTime;
        EndTime = endTime;
    }

    public int GetDuration()
    {
        return EndTime - StartTime;
    }
}

public class Membership
{
    private List<Member> members;
    // TODO: Add dictionary to store member workouts
    public Membership()
    {
        members = new List<Member>();
    }

    public void AddMember(Member member)
    {
        members.Add(member);
    }

    public void AddWorkout(int memberId, Workout workout)
    {
        // TODO: Implement this function
    }

    public Dictionary<int, double> GetAverageWorkoutDurations()
    {
        // TODO: Implement this function
        return new Dictionary<int, double>();
    }
}
      `,
            solution: `
using System;
using System.Collections.Generic;

// Enum for membership type
public enum MembershipStatus
{
    BASIC = 1,
    PRO = 2,
    ELITE = 3
}

// Member class
public class Member
{
    public int MemberId { get; set; }
    public string Name { get; set; }
    public MembershipStatus MembershipStatus { get; set; }

    public Member(int memberId, string name, MembershipStatus membershipStatus)
    {
        MemberId = memberId;
        Name = name;
        MembershipStatus = membershipStatus;
    }
}


public class Workout
{
    public int Id { get; private set; }
    public int StartTime { get; private set; }
    public int EndTime { get; private set; }

    public Workout(int id, int startTime, int endTime)
    {
        Id = id;
        StartTime = startTime;
        EndTime = endTime;
    }

    public int GetDuration()
    {
        return EndTime - StartTime;
    }
}

public class Membership
{
    private List<Member> members;
    private Dictionary<int, List<Workout>> memberWorkouts;

    public Membership()
    {
        members = new List<Member>();
        memberWorkouts = new Dictionary<int, List<Workout>>();
    }

    public void AddMember(Member member)
    {
        members.Add(member);
    }

    public void AddWorkout(int memberId, Workout workout)
    {
        Member member = members.Find(m => m.MemberId == memberId);
        if (member != null)
        {
            if (!memberWorkouts.ContainsKey(memberId))
                memberWorkouts[memberId] = new List<Workout>();

            memberWorkouts[memberId].Add(workout);
        }
    }

    public Dictionary<int, double> GetAverageWorkoutDurations()
    {
        var avgDurations = new Dictionary<int, double>();
        foreach (var member in members)
        {
            if (memberWorkouts.ContainsKey(member.MemberId))
            {
                List<Workout> workouts = memberWorkouts[member.MemberId];
                if (workouts.Count > 0)
                {
                    double total = 0;
                    foreach (var w in workouts)
                        total += w.GetDuration();

                    avgDurations[member.MemberId] = total / workouts.Count;
                }
            }
        }
        return avgDurations;
    }
}

public class Program
{
    public static void Main()
    {
        Membership gym = new Membership();
        Member m1 = new Member(1, "John", MembershipStatus.PRO);
        gym.AddMember(m1);

        gym.AddWorkout(1, new Workout(101, 10, 20));
        gym.AddWorkout(1, new Workout(102, 30, 50));

        var averages = gym.GetAverageWorkoutDurations();
        foreach (var kvp in averages)
            Console.WriteLine($"Member {kvp.Key} avg duration: {kvp.Value}");
    }
}

      `,
            hints: [
                "Use a Dictionary<int, List<Workout>> to keep track of workouts per member.",
                "When adding a workout, first check if the member exists.",
                "For average durations, sum up durations for each member and divide by count of workouts."
            ]
        },
        {
            id: 5,
            title: "Q7 :Count Complete Journeys in Toll Log",
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
        TestCountJourneys();
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
            id: 13,
            title: "Q8 :Castle Treasure Room Filter",
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
             FIX: exclude self references when counting
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

        Console.WriteLine(string.Join(", ", filter_rooms(instructions_1, treasure_rooms_1)));  tulip, violet
        Console.WriteLine(string.Join(", ", filter_rooms(instructions_1, treasure_rooms_2)));  
        Console.WriteLine(string.Join(", ", filter_rooms(instructions_2, treasure_rooms_3)));  tulip
    }
}`,

            hints: [
                "Only count *other* rooms pointing to a room; ignore self references.",
                "Use dictionaries to map destinations to sources and sources to next rooms.",
                "Check that the room’s instruction leads to a treasure room before adding to result."
            ]
        },
        {
            id: 19,
            title: "Q9 :Word Wrap Functionality",
            description: `We are building a word processor and we would like to implement a "word-wrap" functionality.
 
Given a list of words followed by a maximum number of characters in a line, return a collection of strings where each string element represents a line that contains as many words as possible, with the words in each line being concatenated with a single '-' (representing a space, but easier to see for testing). The length of each string must not exceed the maximum character length per line.
 
Your function should take in the maximum characters per line and return a data structure representing all lines in the indicated max length.
 
Examples:
 
words1 = [ "The", "day", "began", "as", "still", "as", "the",
          "night", "abruptly", "lighted", "with", "brilliant",
          "flame" ]
 
wrapLines(words1, 13) "wrap words1 to line length 13" =>
 
  [ "The-day-began",
    "as-still-as",
    "the-night",
    "abruptly",
    "lighted-with",
    "brilliant",
    "flame" ]
 
wrapLines(words1, 12) "wrap words1 to line length 12" =>
 
  [ "The-day",
    "began-as",
    "still-as-the",
    "night",
    "abruptly",
    "lighted-with",
    "brilliant",
    "flame" ]    
 
wrapLines(words1, 20) "wrap words1 to line length 20" =>
 
  [ "The-day-began-as",
    "still-as-the-night",
    "abruptly-lighted",
    "with-brilliant-flame" ]
 
words2 = [ "Hello" ]
 
wrapLines(words2, 5) "wrap words2 to line length 5" =>
 
  [ "Hello" ]
 
wrapLines(words2, 30) "wrap words2 to line length 30" =>
 
  [ "Hello" ]  
 
words3 = [ "Hello", "Hello" ]
 
wrapLines(words3, 5) "wrap words3 to line length 5" =>
 
  [ "Hello",
  "Hello" ]
 
words4 = ["Well", "Hello", "world" ]
 
wrapLines(words4, 5) "wrap words4 to line length 5" =>
 
  [ "Well",
  "Hello",
  "world" ]
 
words5 = ["Hello", "HelloWorld", "Hello", "Hello"]
 
wrapLines(words5, 20) "wrap words 5 to line length 20 =>
 
  [ "Hello-HelloWorld",
    "Hello-Hello" ]
 
words6 = [ "a", "b", "c", "d" ]
wrapLines(words6, 20) "wrap words 6 to line length 20 =>
 
  [ "a-b-c-d" ]
 
wrapLines(words6, 4) "wrap words 6 to line length 4 =>
 
  [ "a-b",
    "c-d" ]
 
wrapLines(words6, 1) "wrap words 6 to line length 1 =>
 
  [ "a",
    "b",
    "c",
    "d" ]
 
All Test Cases:
          words,  max line length
wrapLines(words1, 13)
wrapLines(words1, 12)
wrapLines(words1, 20)
wrapLines(words2, 5)
wrapLines(words2, 30)
wrapLines(words3, 5)
wrapLines(words4, 5)
wrapLines(words5, 20)
wrapLines(words6, 20)
wrapLines(words6, 4)
wrapLines(words6, 1)
 
n = number of words OR total characters`,
            hints: [
                "Keep track of the current line length as you add words.",
                "When the next word doesn’t fit, push the current line and start a new one.",
                "Don’t forget to add the last line after the loop ends."
            ],
            starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
class Program 
{
  public List<string> wrapLines(string[] words, int length) 
  {
    // TODO: Implement the wrap logic here
    return new List<string>();
  }

  static void Main(String[] args) 
  {
    String[] words1 = new String[] {"The","day","began","as","still","as","the","night","abruptly","lighted","with","brilliant","flame"};
    Program p = new Program();
    var result = p.wrapLines(words1, 13);
    foreach(var line in result)
      Console.WriteLine(line);
  }
}`,
            solution: `using System;
using System.Collections.Generic;
using System.Linq;
class Program 
{
  public List<string> wrapLines(string[] words, int length) 
  {
    List<string> result = new List<string>();
    string line = "";
    foreach(var word in words)
    {
      if(line.Length==0)
      {
        line = word;
      }
      else if(line.Length+1+word.Length <= length)
      {
        line += "-" + word;
      }
      else
      {
        result.Add(line);
        line = word;
      }
    }
    if (line.Length>0)
      result.Add(line);
    return result;
  }

  static void Main(String[] args) 
  {
    String[] words1 = new String[] {"The","day","began","as","still","as","the","night","abruptly","lighted","with","brilliant","flame"};
    // String[] words2 = new String[] {"Hello"};
    // String[] words3 = new String[] {"Hello", "Hello"};
    // String[] words4 = new String[] {"Well", "Hello", "world"};
    // String[] words5 = new String[] {"Hello", "HelloWorld", "Hello", "Hello"};
    // String[] words6 = new String[] {"a", "b", "c", "d"};

    Program p = new Program();
    var result = p.wrapLines(words1, 13);
    foreach(var line in result)
      Console.WriteLine(line);
  }
}`
        },
        {
            id: 15,
            title: "Q 10 : Video Game Path to Exit",
            description: `
You are working on a video game where the player has to go through a level without falling into any obstacles.

The player starts at position zero and can move in three ways:
- L (left)  => one position to the left
- R (right) => one position to the right 
- J (jump)  => move two positions, in the direction of the previous move

The player starts at position 0 and the exit will always be at position 10.

The instructions never lead the player outside the level boundaries, and the first move is always right.

Write a function that given the instructions and the positions of the obstacles, returns True if the instructions lead to the exit position, and False otherwise.

For example:

Obstacles 1: [4,6]  

--------------------------------------------------------
  ->                X         X                   Exit
--------------------------------------------------------
0    1    2    3    4    5    6    7    8    9    10  

Obstacles 1: [4,6]  
Instructions 1: "RRRJJRRR" -> True.

                  JUMP      JUMP
-----------------^    ^----^    ^-----------------------
  ->   ->   ->      X         X      ->   ->   -> Exit
--------------------------------------------------------
0    1    2    3    4    5    6    7    8    9    10  

Instructions 2: "RRRLJ" -> False, it would just lead back to the start.

Instructions 3: "RRRJJRRRL" -> True, extra instructions can be ignored.

Instructions 4: "RRRLRJJRRR" -> True, the player is allowed to move back and forth.

Instructions 5: "RRRRRRRRRR" -> False, due to falling into an obstacle.

Instructions 6: "RRJJJJ" -> False, as the jump would land on an obstacle.

Instructions 7: "RLRRRJJRRLLJJJLRRRJJRRR" -> True, even after many instructions, exit is reached.

Instructions 8: "RRRJJRLJJJRRR" -> False, as directions of jumps must be observed.

Instructions 9: "R" -> False, as the exit position isn't reached.

Instructions 10: "RJJJJR" -> True, as it gets to the exit after avoiding the obstacles.

Instructions 11: "RJJRRRRR" -> False, as it hits an obstacle.

Instructions 12: "RJJRRRJ" -> True, as it avoids all obstacles.

Instructions 13: "RJJJLJRJRJ" -> False, as it jumps to an obstacle.

Obstacles 2: [9,4,2], Instructions 12: "RJJRRRJ" -> True, as it gets to the exit after avoiding the obstacles.

Obstacles 3: [], Instructions 9: -> False

All test cases: 

obstacles_1 = [4,6]
obstacles_2 = [9,4,2]
obstacles_3 = []

level(obstacles_1, instructions_1) # True
level(obstacles_1, instructions_2) # False
level(obstacles_1, instructions_3) # True
level(obstacles_1, instructions_4) # True
level(obstacles_1, instructions_5) # False
level(obstacles_1, instructions_6) # False
level(obstacles_1, instructions_7) # True
level(obstacles_1, instructions_8) # False
level(obstacles_1, instructions_9) # False
level(obstacles_1, instructions_10) # True
level(obstacles_2, instructions_11) # False
level(obstacles_2, instructions_12) # True
level(obstacles_2, instructions_13) # False
level(obstacles_3, instructions_9)  # False

Complexity variables:

N - number of instructions.
      `,
            starterCode: `
using System;
using System.Collections.Generic;

class Solution {
    static void Main(string[] args) {
        int[] obstacles = new int[] {4, 6};
        string instructions = "RRRJJRRR";
        
        Console.WriteLine(ReachExit(obstacles, instructions));
    }

    static bool ReachExit(int[] obstacles, string instructions) {
        // TODO: Implement logic
        return false;
    }
}
      `,
            solution: `
using System;
using System.Collections.Generic;

class Solution {
    static void Main(string[] args) {
        int[] obstacles_1 = new int[] {4, 6};
        int[] obstacles_2 = new int[] {9, 4, 2};
        int[] obstacles_3 = new int[] {};

        string instructions_1 = "RRRJJRRR";
        string instructions_2 = "RRRLJ";
        string instructions_3 = "RRRJJRRRL";
        string instructions_4 = "RRRLRJJRRR";
        string instructions_5 = "RRRRRRRRRR";
        string instructions_6 = "RRJJJJ";
        string instructions_7 = "RLRRRJJRRLLJJJLRRRJJRRR";
        string instructions_8 = "RRRJJRLJJJRRR";
        string instructions_9 = "R";
        string instructions_10 = "RJJJJR";
        string instructions_11 = "RJJRRRRR";
        string instructions_12 = "RJJRRRJ";
        string instructions_13 = "RJJJLJRJRJ";

        Console.WriteLine(ReachExit(obstacles_1, instructions_1));
        Console.WriteLine(ReachExit(obstacles_1, instructions_2));
        Console.WriteLine(ReachExit(obstacles_1, instructions_3));
        Console.WriteLine(ReachExit(obstacles_1, instructions_4));
        Console.WriteLine(ReachExit(obstacles_1, instructions_5));
        Console.WriteLine(ReachExit(obstacles_1, instructions_6));
        Console.WriteLine(ReachExit(obstacles_1, instructions_7));
        Console.WriteLine(ReachExit(obstacles_1, instructions_8));
        Console.WriteLine(ReachExit(obstacles_1, instructions_9));
        Console.WriteLine(ReachExit(obstacles_1, instructions_10));
        Console.WriteLine(ReachExit(obstacles_2, instructions_11));
        Console.WriteLine(ReachExit(obstacles_2, instructions_12));
        Console.WriteLine(ReachExit(obstacles_2, instructions_13));
        Console.WriteLine(ReachExit(obstacles_3, instructions_9));
    }

    static bool ReachExit(int[] obstacles, string instructions) {
        HashSet<int> obstacleSet = new HashSet<int>(obstacles);
        int position = 0;
        const int exit = 10;

        char prevMove = 'R'; // first move is always right

        foreach (char move in instructions) {
            if (move == 'R') {
                position += 1;
                prevMove = 'R';
            } else if (move == 'L') {
                position -= 1;
                prevMove = 'L';
            } else if (move == 'J') {
                if (prevMove == 'R') position += 2;
                else if (prevMove == 'L') position -= 2;
            }

            if (position < 0 || position > exit) return false;
            if (obstacleSet.Contains(position)) return false;
        }

        return position == exit;
    }
}
      `,
            hints: [
                "Use a HashSet to quickly check if the player lands on an obstacle.",
                "Track the previous move so that you know which direction a jump should go.",
                "Return true only if the final position is exactly at the exit (10)."
            ]
        },
        {
            id: 16,
            title: "Q 11 : Treasure Hunt with Instructions and Money",
            description: `
We are playing a game where the player needs to follow instructions to find a treasure. 
 
There are multiple rooms, aligned in a straight line, labeled sequentially from 0. Each room contains one instruction, given as a positive integer. 
 
An instruction directs the player to move forward a specific number of rooms. The last instruction is "9" by convention, and can be ignored (there's no room to move after the last room).  
 
The player starts the game in room number 0 and has to reach the treasure which is in the last room. The player is given an amount of money to start the game with. They must use this money wisely to get to the treasure as fast as possible. 
 
The player can follow the instruction or pay $1 to change the value of the instruction by one. For example, for $1, the instruction "2" may be changed to "1" or "3". A player cannot pay more than $1 to change the value of an instruction by more than one unit.
 
Write a function that takes a list of instructions and a total amount of money as input and returns the minimum number of instructions needed to reach the treasure room, or None/null/-1 if the treasure cannot be reached. 
 
Examples
Note: The updated instructions are marked with *. 
 
Example 1
 
instructions_2_1 =  [1, 1, 1, 9]
 
With $0, the player would follow 3 instructions:
Instructions:   [  1,  1,  1,  9]
Itinerary:      [  1,  1,  1,  9]
                   ^   ^   ^   ^                
 
With $1, the player would reach the treasure in 2 instructions: they could change, for example, the first instruction to 2. 
Instructions:   [  1,  1,  1,  9]
Itinerary:      [ *2,  1,  1,  9]
                   ^       ^   ^
 
Example 2
 
instructions_2_2 = [1, 1, 2, 9]
 
With $0 as the initial amount, the treasure is not reachable. 
 
With $1 (or more) as the initial amount, the treasure can be reached in 2 instructions.
Instructions:   [  1,  1,  2,  9]
Itinerary:      [  1, *2,  2,  9]
                   ^   ^       ^                 
 
Example 3
 
instructions_2_3  =  [1, 3, 1, 1, 1, 3, 10, 9]
 
With $0, the treasure cannot be reached
Instructions:   [  1,  3,  1,  1,  1,  3,  10,  9]
Itinerary:      [  1,  3,  1,  1,  1,  3,  10,  9]
                   ^   ^           ^   ^        x
 
With $1, the treasure can be found in 4 instructions:
Instructions:   [  1,  3,  1,  1,  1,  3,  10,  9]
Itinerary:      [  1,  3,  1,  1,  1, *2,  10,  9]
                   ^   ^           ^   ^        ^  
 
With $2,the treasure can be found in 3 instructions:
Instructions:   [  1,  3,  1,  1,  1,  3,  10,  9]
Itinerary:      [  1, *4,  1,  1,  1, *2,  10,  9]
                   ^   ^               ^        ^ 
 
All the test cases:
 
instructions_2_1 = [1, 1, 1, 9]
instructions_2_2 = [1, 1, 2, 9]
instructions_2_3 = [1, 3, 1, 1, 1, 3, 10, 9]
 
find_treasure(instructions_2_1, 0) => 3 
find_treasure(instructions_2_1, 1) => 2 
 
find_treasure(instructions_2_2, 0) => None or Null
find_treasure(instructions_2_2, 1) => 2 
find_treasure(instructions_2_2, 2) => 2 
 
find_treasure(instructions_2_3, 0) => None or Null
find_treasure(instructions_2_3, 1) => 4 
find_treasure(instructions_2_3, 2) => 3 
 
Complexity Analysis variables:
I: number of instructions
M: money
      `,
            starterCode: `
using System;
using System.Collections.Generic;

class Solution {
    static void Main(string[] args) {
        int[] instructions = new int[] {1, 1, 1, 9};
        int money = 1;

        Console.WriteLine(FindTreasure(instructions, money));
    }

    static int? FindTreasure(int[] instructions, int money) {
        // TODO: Implement logic
        return null;
    }
}
      `,
            solution: `
using System;
using System.Collections.Generic;

class Solution {
    static void Main(string[] args) {
        int[] instructions_2_1 = new int[] {1, 1, 1, 9};
        int[] instructions_2_2 = new int[] {1, 1, 2, 9};
        int[] instructions_2_3 = new int[] {1, 3, 1, 1, 1, 3, 10, 9};

        Console.WriteLine(FindTreasure(instructions_2_1, 0)); // 3
        Console.WriteLine(FindTreasure(instructions_2_1, 1)); // 2

        Console.WriteLine(FindTreasure(instructions_2_2, 0)); // null
        Console.WriteLine(FindTreasure(instructions_2_2, 1)); // 2
        Console.WriteLine(FindTreasure(instructions_2_2, 2)); // 2

        Console.WriteLine(FindTreasure(instructions_2_3, 0)); // null
        Console.WriteLine(FindTreasure(instructions_2_3, 1)); // 4
        Console.WriteLine(FindTreasure(instructions_2_3, 2)); // 3
    }

    static int? FindTreasure(int[] instructions, int money) {
        int n = instructions.Length;
        int target = n - 1;

        var visited = new HashSet<(int, int)>();
        var queue = new Queue<(int pos, int moneyLeft, int steps)>();

        queue.Enqueue((0, money, 0));
        visited.Add((0, money));

        while (queue.Count > 0) {
            var (pos, moneyLeft, steps) = queue.Dequeue();
            if (pos == target) return steps;

            if (pos >= n - 1) continue;

            int move = instructions[pos];

            // follow instruction directly
            int nextPos = pos + move;
            if (nextPos < n && !visited.Contains((nextPos, moneyLeft))) {
                visited.Add((nextPos, moneyLeft));
                queue.Enqueue((nextPos, moneyLeft, steps + 1));
            }

            // try changing instruction by +/-1 if money is available
            if (moneyLeft > 0) {
                foreach (int delta in new int[] {-1, 1}) {
                    int newMove = move + delta;
                    int newPos = pos + newMove;
                    if (newMove > 0 && newPos < n && !visited.Contains((newPos, moneyLeft - 1))) {
                        visited.Add((newPos, moneyLeft - 1));
                        queue.Enqueue((newPos, moneyLeft - 1, steps + 1));
                    }
                }
            }
        }

        return null; // treasure not reachable
    }
}
      `,
            hints: [
                "Use BFS to explore the minimum steps while tracking both position and remaining money.",
                "At each room, enqueue the option of following the instruction and also modifying it by +1 or -1 if money is available.",
                "Mark visited states as (position, moneyLeft) to avoid infinite loops."
            ]
        },
        {
            id: 17,
            title: "Q 12 : Thrilling Teleporters – Reachable Tiles",
            description: `
We're building the game engine for *Thrilling Teleporters*, a board game with N tiles, starting from tile 0.

Some tiles contain teleporters that instantly move the player to another tile (forward or backward).  
For example:

teleporters1 = [
  "3,1",  // From tile 3 to tile 1
  "4,2",  // From tile 4 to tile 2
  "5,10"  // From tile 5 to tile 10
]

Visual example for N = 12:

       "3,1"
     ┌─<───<─┐                                    
     v       │
 0 → 1 → 2 → 3 . 4 . 5 . 6 → 7 → 8 → 9 → 10 → 11 → 12
         ^       │   │                    ^
         └─<───<─┘   └──>───>───>───>───>──┘
           "4,2"             "5,10"

Rules:
- The player rolls a die and moves forward.
- If they land on a tile with a teleporter, they are instantly transported.
- Only one teleporter is activated per roll.
- The player cannot move past the final tile N.

Write a function that returns all unique tiles the player can reach in a single die roll.

Example:  
N = 12, start = 0, die = 6, teleporters1 above → [1, 2, 10, 6].
      `,
            hints: [
                "Parse the teleporter strings into a dictionary mapping start → destination.",
                "Simulate each possible die roll (1 to die sides).",
                "Check if the new tile has a teleporter; apply at most one teleport per roll."
            ],
            starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Solution {
    static List<int> Destinations(string[] teleporters, int dieSides, int start, int N) {
        var teleporterMap = new Dictionary<int, int>();
        foreach (var t in teleporters) {
            var parts = t.Split(',');
            int from = int.Parse(parts[0]);
            int to = int.Parse(parts[1]);
            teleporterMap[from] = to;
        }

        var result = new HashSet<int>();

        // BUGGY: Does not correctly handle edge cases
        for (int roll = 1; roll <= dieSides; roll++) {
            int pos = start + roll;
            if (pos > N) continue;
            if (teleporterMap.ContainsKey(pos)) {
                // Incorrect handling: might apply multiple teleports if chained
                pos = teleporterMap[pos];
            }
            result.Add(pos);
        }

        return result.ToList();
    }

    static void Main(string[] args) {
        var teleporters1 = new string[] {"3,1", "4,2", "5,10"};
        var result = Destinations(teleporters1, 6, 0, 12);
        Console.WriteLine(string.Join(", ", result));
    }
}`,
            solution: `using System;
using System.Collections.Generic;
using System.Linq;
 
class Solution
{
    public static List<int> destinations(string[] teleporters, int dieSides, int start, int N)
    {
        // Parse teleporters into a dictionary
        var teleDict = new Dictionary<int, int>();
        foreach (var t in teleporters)
        {
            var parts = t.Split(',');
            int from = int.Parse(parts[0]);
            int to = int.Parse(parts[1]);
            teleDict[from] = to;
        }
 
        var result = new HashSet<int>();
        for (int roll = 1; roll <= dieSides; roll++)
        {
            int tile = start + roll;
            if (tile > N) continue;
            if (teleDict.ContainsKey(tile))
                tile = teleDict[tile];
            result.Add(tile);
        }
        return result.ToList();
    }
 
    static void Main(String[] args)
    {
        var teleporters1 = new string[] { "3,1", "4,2", "5,10" };
        // var teleporters2 = new string[] { "5,10", "6,22", "39,40", "40,49", "47,29" };
        // var teleporters3 = new string[] { "6,18", "36,26", "41,21", "49,55", "54,52", "71,58", "74,77", "78,76", "80,73", "92,85" };
        // var teleporters4 = new string[] { "97,93", "99,81", "36,33", "92,59", "17,3", "82,75", "4,1", "84,79", "54,4", "88,53", "91,37", "60,57", "61,7", "62,51", "31,19" };
        // var teleporters5 = new string[] { "3,8", "8,9", "9,3" };
 
        // Example test case
        var res = destinations(teleporters1, 6, 0, 12);
        Console.WriteLine(string.Join(", ", res)); // Output: 1, 2, 10, 6
    }
}`
        },
        {
            id: 18,
            title: "Q 13 : Snowy Mountain Trek – Best Day to Cross",
            description: `
You are planning a trek across a snowy mountain. Each day:

- In the **morning**, snow falls on some positions.
- In the **afternoon**, if a location has not received snow for 2 days, its snow begins to melt (1 unit per day).
- In the **evening**, the player may attempt a crossing.

Rules:
- Snow increases the altitude at that location.
- You can climb up or down **at most one level** when moving to the next position.
- The goal is to cross the mountain with the **least number of climbs**.
- The forecast is limited; later days are unpredictable.

Write a function that, given:
- base altitudes of the mountain, and
- a daily forecast of snowfall per position,  

returns the best day (0-indexed) and the number of climbs needed.  
If no crossing is possible, return [-1, -1].

---

**Example**:  

Altitudes: [0,1,2,1]  
Snow forecast:

\`\`\`
Day 0: [1,0,1,0]
Day 1: [0,0,0,0]
Day 2: [1,1,0,2]
\`\`\`

Evening profiles:

- Day 0: Too steep → no crossing
- Day 1: No changes → still no crossing
- Day 2: Melting begins, crossing possible with **1 climb** → result [2, 1]

---

**Expected Results**:

- best_day_to_cross(altitudes_1, snow_1) → [2, 1]  
- best_day_to_cross(altitudes_2, snow_2) → [0, 0]  
- best_day_to_cross(altitudes_3, snow_3) → [2, 0]  
- best_day_to_cross(altitudes_4, snow_4) → [-1, -1]  
- best_day_to_cross(altitudes_5, snow_5) → [5, 1]  
- best_day_to_cross(altitudes_6, snow_6) → [0, 4]  

Complexity variables:  
- A = number of altitude positions  
- D = number of forecast days
      `,
            hints: [
                "Simulate the snow accumulation and melting day by day.",
                "After each day, check if the path is crossable by ensuring no step difference exceeds 1.",
                "Track the number of climbs required and pick the day with the minimum climbs."
            ],
            starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Solution {
    static int[] BestDayToCross(int[] baseAltitudes, int[][] forecast) {
        int days = forecast.Length;
        int n = baseAltitudes.Length;
        int[] snow = new int[n];
        int[] lastSnow = new int[n];
        Array.Fill(lastSnow, -2);

        int bestDay = -1;
        int minClimbs = int.MaxValue;

        for (int day = 0; day < days; day++) {
            // Add snowfall
            for (int i = 0; i < n; i++) {
                if (forecast[day][i] > 0) {
                    snow[i] += forecast[day][i];
                    lastSnow[i] = day;
                }
            }

            // BUGGY: melting is not applied correctly
            for (int i = 0; i < n; i++) {
                if (day - lastSnow[i] >= 2 && snow[i] > 0) {
                    snow[i]--; // might under-melt or over-melt
                }
            }

            // Build current profile
            int[] profile = new int[n];
            for (int i = 0; i < n; i++) {
                profile[i] = baseAltitudes[i] + snow[i];
            }

            int climbs = CalculateClimbs(profile);

            if (climbs >= 0 && climbs < minClimbs) {
                minClimbs = climbs;
                bestDay = day;
            }
        }

        if (bestDay == -1) return new int[] {-1, -1};
        return new int[] {bestDay, minClimbs};
    }

    // Simplified climb check (BUGGY: may miscount climbs)
    static int CalculateClimbs(int[] profile) {
        int climbs = 0;
        for (int i = 1; i < profile.Length; i++) {
            int diff = Math.Abs(profile[i] - profile[i-1]);
            if (diff > 1) return -1;
            if (profile[i] > profile[i-1]) climbs++;
        }
        return climbs;
    }

    static void Main(string[] args) {
        int[] altitudes_1 = new int[] {0, 1, 2, 1};
        int[][] snow_1 = new int[][] {
            new int[] {1, 0, 1, 0},
            new int[] {0, 0, 0, 0},
            new int[] {1, 1, 0, 2}
        };
        var result = BestDayToCross(altitudes_1, snow_1);
        Console.WriteLine(string.Join(", ", result));
    }
}`,
            solution: `using System;
using System.Collections.Generic;
using System.Linq;
class Solution {
    static void Main(String[] args) {
        int[] altitudes_1 = new int[] {0, 1, 2, 1};
        int[][] snow_1 = new int[][] {
            new int[] {1, 0, 1, 0},
            new int[] {0, 0, 0, 0},
            new int[] {1, 1, 0, 2}
        };
        int[] altitudes_2 = new int[] {0, 0, 0, 0};
        int[][] snow_2 = new int[][] {
            new int[] {2, 2, 2, 2},
            new int[] {1, 0, 0, 0},
            new int[] {1, 0, 0, 0}
        };
        int[] altitudes_3 = new int[] {0, 0, 0, 1};
        int[][] snow_3 = new int[][] {
            new int[] {0, 0, 2, 0},
            new int[] {1, 1, 0, 0},
            new int[] {0, 0, 0, 0},
            new int[] {1, 1, 1, 0}
        };
        int[] altitudes_4 = new int[] {0, 1, 2, 0};
        int[][] snow_4 = new int[][] {
            new int[] {1, 0, 0, 0},
            new int[] {0, 1, 0, 0}
        };
        int[] altitudes_5 = new int[] {0, 0, 0};
        int[][] snow_5 = new int[][] {
            new int[] {5, 5, 0},
            new int[] {0, 0, 0},
            new int[] {0, 0, 0},
            new int[] {0, 0, 0},
            new int[] {0, 0, 0},
            new int[] {0, 0, 0}
        };
        int[] altitudes_6 = new int[] {0, 0, 0, 0, 0};
        int[][] snow_6 = new int[][] {
            new int[] {2, 1, 2, 1, 2}
        };
        program pro = new program();
        var result = pro.BestDayToCross(altitudes_1, snow_1);
        Console.WriteLine($"{result[0]},{result[1]}");
        var result2 = pro.BestDayToCross(altitudes_2, snow_2);
        Console.WriteLine($"{result2[0]},{result2[1]}");
         var result3 = pro.BestDayToCross(altitudes_3, snow_3);
        Console.WriteLine($"{result3[0]},{result3[1]}");
         var result4 = pro.BestDayToCross(altitudes_4, snow_4);
        Console.WriteLine($"{result4[0]},{result4[1]}");
         var result5 = pro.BestDayToCross(altitudes_5, snow_5);
        Console.WriteLine($"{result5[0]},{result5[1]}");
         var result6 = pro.BestDayToCross(altitudes_6, snow_6);
        Console.WriteLine($"{result6[0]},{result6[1]}");
        }
    }
public class program
{
  public int[] BestDayToCross(int[] altitudes, int[][] snow)
  {
    int n = altitudes.Length;
    int d = snow.Length;
    int[] snowDepth = new int[n];
    int[] lastSnowDay = new int[n];
    for(int i=0; i<n; i++)
      lastSnowDay[i] = -2;
    int bestDay = -1;
    int minClimbs = int.MaxValue;
    for (int day = 0; day<d; day++)
    {
      for(int i=0; i<n; i++)
      {
        if(snow[day][i]>0)
        {
          snowDepth[i] += snow[day][i];
          lastSnowDay[i] = day;
        }
      }
      for(int i=0; i<n; i++)
      {
        if(day-lastSnowDay[i] >=2 && snowDepth[i]>0)
        {
          snowDepth[i]--;
        }
      }
      int[] profile = new int[n];
      for(int i=0; i<n; i++)
      {
        profile[i] = altitudes[i] + snowDepth[i];
      }
      int climbs = 0;
      bool possible = true;
      for(int i=1; i<n; i++)
      {
        int diff = profile[i] - profile[i-1];
        if(diff>1)
        {
          possible = false;
          break;
        }
        if (diff==1)
          climbs++;
      }
      if(possible && climbs < minClimbs)
      {
        bestDay = day;
        minClimbs = climbs;
      }
    }
    return bestDay == -1? new int[] {-1,-1}: new int[] {bestDay, minClimbs};
  }
}`
        },
        {
            id: 20,
            title: "Q 14 : Group Users by Popularity",
            description: `You are analyzing data for Aquaintly, a hot new social network.

On Aquaintly, connections are always symmetrical. If a user Alice is connected to Bob, then Bob is also connected to Alice.

You are given a sequential log of CONNECT and DISCONNECT events of the following form:
- This event connects users Alice and Bob: ["CONNECT", "Alice", "Bob"]
- This event disconnects the same users: ["DISCONNECT", "Bob", "Alice"] (order of users does not matter)

We want to separate users based on their popularity (number of connections). To do this, write a function that takes in the event log and a number N and returns two collections:
[Users with fewer than N connections], [Users with N or more connections]

Example:
events = [
    ["CONNECT","Alice","Bob"],
    ["DISCONNECT","Bob","Alice"],
    ["CONNECT","Alice","Charlie"],
    ["CONNECT","Dennis","Bob"],
    ["CONNECT","Pam","Dennis"],
    ["DISCONNECT","Pam","Dennis"],
    ["CONNECT","Pam","Dennis"],
    ["CONNECT","Edward","Bob"],
    ["CONNECT","Dennis","Charlie"],
    ["CONNECT","Alice","Nicole"],
    ["CONNECT","Pam","Edward"],
    ["DISCONNECT","Dennis","Charlie"],
    ["CONNECT","Dennis","Edward"],
    ["CONNECT","Charlie","Bob"]
]

Using a target of 3 connections, the expected results are:
Users with less than 3 connections: ["Alice", "Charlie", "Pam", "Nicole"]
Users with 3 or more connections: ["Dennis", "Bob", "Edward"]

All test cases:
grouping(events, 3) => [["Alice", "Charlie", "Pam", "Nicole"], ["Dennis", "Bob", "Edward"]]
grouping(events, 1) => [[], ["Alice", "Charlie", "Dennis", "Bob", "Pam", "Edward", "Nicole"]]
grouping(events, 10) => [["Alice", "Charlie", "Dennis", "Bob", "Pam", "Edward", "Nicole"], []]
Complexity Variable:
E = number of events`,
            hints: [
                "Use a dictionary to map each user to their set of current connections.",
                "When you see a CONNECT event, add each user to the other’s set.",
                "When you see a DISCONNECT event, remove each user from the other’s set.",
                "After processing, split users into <N and >=N connections."
            ],
            starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Solution {
    static List<List<string>> grouping(string[][] events, int N) {
        // TODO: Implement grouping logic here
        return new List<List<string>>();
    }

    static void Main(String[] args) {
        var events = new string[][] {
            new string[] {"CONNECT","Alice","Bob"},
            new string[] {"DISCONNECT","Bob","Alice"},
            new string[] {"CONNECT","Alice","Charlie"},
            new string[] {"CONNECT","Dennis","Bob"},
            new string[] {"CONNECT","Pam","Dennis"},
            new string[] {"DISCONNECT","Pam","Dennis"},
            new string[] {"CONNECT","Pam","Dennis"},
            new string[] {"CONNECT","Edward","Bob"},
            new string[] {"CONNECT","Dennis","Charlie"},
            new string[] {"CONNECT","Alice","Nicole"},
            new string[] {"CONNECT","Pam","Edward"},
            new string[] {"DISCONNECT","Dennis","Charlie"},
            new string[] {"CONNECT","Dennis","Edward"},
            new string[] {"CONNECT","Charlie","Bob"}
        };

        var result = grouping(events, 3);
        Console.WriteLine("Less than 3: " + string.Join(", ", result[0]));
        Console.WriteLine("3 or more: " + string.Join(", ", result[1]));
    }
}`,
            solution: `using System;
using System.Collections.Generic;
using System.Linq;
 
class Solution {
    static List<List<string>> grouping(string[][] events, int N) {
        var connections = new Dictionary<string, HashSet<string>>();
 
        foreach (var evt in events) {
            string action = evt[0];
            string user1 = evt[1];
            string user2 = evt[2];
 
            if (!connections.ContainsKey(user1)) connections[user1] = new HashSet<string>();
            if (!connections.ContainsKey(user2)) connections[user2] = new HashSet<string>();
 
            if (action == "CONNECT") {
                connections[user1].Add(user2);
                connections[user2].Add(user1);
            } else if (action == "DISCONNECT") {
                connections[user1].Remove(user2);
                connections[user2].Remove(user1);
            }
        }
 
        var lessThanN = new List<string>();
        var atLeastN = new List<string>();
 
        foreach (var kvp in connections) {
            if (kvp.Value.Count < N)
                lessThanN.Add(kvp.Key);
            else
                atLeastN.Add(kvp.Key);
        }
 
        lessThanN.Sort();
        atLeastN.Sort();
 
        return new List<List<string>> { lessThanN, atLeastN };
    }
 
    static void Main(String[] args) {
        var events = new string[][] {
            new string[] {"CONNECT","Alice","Bob"},
            new string[] {"DISCONNECT","Bob","Alice"},
            new string[] {"CONNECT","Alice","Charlie"},
            new string[] {"CONNECT","Dennis","Bob"},
            new string[] {"CONNECT","Pam","Dennis"},
            new string[] {"DISCONNECT","Pam","Dennis"},
            new string[] {"CONNECT","Pam","Dennis"},
            new string[] {"CONNECT","Edward","Bob"},
            new string[] {"CONNECT","Dennis","Charlie"},
            new string[] {"CONNECT","Alice","Nicole"},
            new string[] {"CONNECT","Pam","Edward"},
            new string[] {"DISCONNECT","Dennis","Charlie"},
            new string[] {"CONNECT","Dennis","Edward"},
            new string[] {"CONNECT","Charlie","Bob"}
        };
 
        var result = grouping(events, 3);
        Console.WriteLine("Less than 3: " + string.Join(", ", result[0]));
        Console.WriteLine("3 or more: " + string.Join(", ", result[1]));
    }
}`
        },
    ],
    refactor: [
        {
            id: 101,
            title: "Refactor Nested Loops for Intersection",
            description: "You are given a function that calculates the intersection of two lists of integers. The current implementation uses nested loops and has O(n*m) time complexity. Refactor it to improve readability and efficiency using built-in C# data structures.",
            starterCode: `using System;
using System.Collections.Generic;

public class Program {
    public static void Main() {
        var list1 = new List<int>{1,2,3,4};
        var list2 = new List<int>{3,4,5,6};
        var result = FindIntersection(list1, list2);
        Console.WriteLine(string.Join(",", result));
    }

    public static List<int> FindIntersection(List<int> list1, List<int> list2) {
        List<int> result = new List<int>();
        foreach(var a in list1) {
            foreach(var b in list2) {
                if(a == b && !result.Contains(a)) {
                    result.Add(a);
                }
            }
        }
        return result;
    }
}`,
            solution: `public List<int> FindIntersection(List<int> list1, List<int> list2) {
    HashSet<int> set1 = new HashSet<int>(list1);
    HashSet<int> resultSet = new HashSet<int>();
    foreach(var b in list2) {
        if(set1.Contains(b)) resultSet.Add(b);
    }
    return resultSet.ToList();
}`,
            hints: [
                "Use HashSet for faster lookups.",
                "Avoid duplicate checks using the HashSet.",
                "Time complexity should be O(n + m) instead of O(n*m)."
            ]
        },
        {
            id: 102,
            title: "Refactor Conditional Logic for Discounts",
            description: "The following code determines the discount for a customer. It is correct but hard to read. Refactor it to improve readability without changing behavior.",
            starterCode: `using System;

public class Program {
    public static void Main() {
        Console.WriteLine(CalculateDiscount(16, true));   // 0.2
        Console.WriteLine(CalculateDiscount(20, false));  // 0.0
    }

    public static double CalculateDiscount(int age, bool isMember) {
        if(age < 18) return isMember ? 0.2 : 0.1;
        return isMember ? 0.15 : 0.0;
    }
}`,
            solution: `public double CalculateDiscount(int age, bool isMember) {
    if(age < 18) return isMember ? 0.2 : 0.1;
    return isMember ? 0.15 : 0.0;
}`,
            hints: [
                "Consider using ternary operators for simple conditionals.",
                "Group conditions logically for clarity.",
                "Avoid deeply nested if-else blocks."
            ]
        },
        {
            id: 103,
            title: "Refactor Repeated Code in Username Validation",
            description: "The following function validates a list of usernames. It repeats similar checks multiple times. Refactor to reduce code duplication.",
            starterCode: `using System;
using System.Collections.Generic;

public class Program {
    public static void Main() {
        var usernames = new List<string>{"Alice", "Bob123", "John Doe", "Anna"};
        var valid = ValidateUsernames(usernames);
        Console.WriteLine(string.Join(",", valid));
    }

    public static List<string> ValidateUsernames(List<string> usernames) {
        List<string> valid = new List<string>();
        foreach(var name in usernames) {
            if(name.Length >= 5 && name.Length <= 10 && !name.Contains(" ")) {
                valid.Add(name);
            }
        }
        return valid;
    }
}`,
            solution: `public List<string> ValidateUsernames(List<string> usernames) {
    List<string> valid = new List<string>();
    foreach(var name in usernames) {
        if(name.Length >= 5 && name.Length <= 10 && !name.Contains(" ")) {
            valid.Add(name);
        }
    }
    return valid;
}`,
            hints: [
                "Combine conditions using logical AND (&&).",
                "Consider extracting a helper method for clarity.",
                "Avoid deeply nested if-statements."
            ]
        },
        {
            id: 104,
            title: "Optimize the Code",
            description: "You need to process thousands of CSV-formatted messages per second.The current code parses each message using string.Split(',') and creates an object for each message.How would you optimize this code for high-throughput scenarios?",
            starterCode: `public class Message
{
    public string Id { get; set; }
    public string Value { get; set; }

    public static Message Parse(string csv)
    {
        var parts = csv.Split(',');
        return new Message { Id = parts[0], Value = parts[1] };
    }
}`,
            solution: `public static Message Parse(string csv)
{
    ReadOnlySpan<char> span = csv.AsSpan();
    int comma = span.IndexOf(',');
    var id = span.Slice(0, comma).ToString();
    var value = span.Slice(comma + 1).ToString();
    return new Message { Id = id, Value = value };
}`,
            hints: [
                "string.Split(',') allocates memory for every message; consider using Span<char> or ReadOnlySpan<char> for zero-allocation parsing",
                "Avoid unnecessary string allocations and object creation",
                "Use parallel processing or batching if messages can be processed independently.",
                "Profile and benchmark different parsing strategies."
            ]
        }
    ],
    unitTests: [
        {
            id: 201,
            title: "Test Calculator Methods",
            description: "You have a simple Calculator class. Run some tests to verify its Add and Divide methods, including handling division by zero.",
            starterCode: `using System;

public class Calculator {
    public int Add(int a, int b) => a + b;
    public int Divide(int a, int b) => a / b;
}

public class Program {
    public static void Main() {
        Calculator calc = new Calculator();

        // Test Add
        Console.WriteLine("Add(2,3) = " + calc.Add(2,3));
        Console.WriteLine("Add(-2,1) = " + calc.Add(-2,1));

        // Test Divide
        Console.WriteLine("Divide(4,2) = " + calc.Divide(4,2));

        try {
            Console.WriteLine("Divide(5,0) = " + calc.Divide(5,0));
        } catch (DivideByZeroException) {
            Console.WriteLine("Divide(5,0) throws DivideByZeroException");
        }
    }
}`,
            hints: [
                "Use try-catch to handle divide by zero exceptions.",
                "Test both positive and negative numbers.",
                "Print outputs using Console.WriteLine to verify results."
            ],
            solution: `using System;

public class Calculator {
    public int Add(int a, int b) => a + b;
    public int Divide(int a, int b) => a / b;
}

public class Program {
    public static void Main() {
        Calculator calc = new Calculator();
        Console.WriteLine(calc.Add(2,3)); // 5
        Console.WriteLine(calc.Add(-2,1)); // -1
        Console.WriteLine(calc.Divide(4,2)); // 2
        try { Console.WriteLine(calc.Divide(5,0)); } 
        catch (DivideByZeroException) { Console.WriteLine("DivideByZeroException"); }
    }
}`
        },
        {
            id: 202,
            title: "Test Email Validation",
            description: "Write tests for a function IsValidEmail(string email) that validates emails. Cover valid emails, invalid emails, and empty or null input.",
            starterCode: `using System;

public class EmailValidator {
    public bool IsValidEmail(string email) {
        return email != null && email.Contains("@") && email.Contains(".");
    }
}

public class Program {
    public static void Main() {
        EmailValidator validator = new EmailValidator();
        string[] emails = {"user@example.com", "userexample.com", "", null};
        foreach(var email in emails) {
            Console.WriteLine($"{email ?? "null"} -> {validator.IsValidEmail(email)}");
        }
    }
}`,
            hints: [
                "Iterate through sample emails and print results using Console.WriteLine.",
                "Check null and empty strings.",
                "Check emails missing '@' or '.'"
            ],
            solution: `using System;

public class EmailValidator {
    public bool IsValidEmail(string email) {
        return email != null && email.Contains("@") && email.Contains(".");
    }
}

public class Program {
    public static void Main() {
        EmailValidator validator = new EmailValidator();
        Console.WriteLine(validator.IsValidEmail("user@example.com")); // True
        Console.WriteLine(validator.IsValidEmail("userexample.com")); // False
        Console.WriteLine(validator.IsValidEmail("")); // False
        Console.WriteLine(validator.IsValidEmail(null)); // False
    }
}`
        },
        {
            id: 203,
            title: "Test Shopping Cart Total",
            description: "Write tests to verify the GetTotal method of a ShoppingCart class, including empty cart, single item, and multiple items.",
            starterCode: `using System;
using System.Collections.Generic;

public class ShoppingCart {
    public List<double> Prices = new List<double>();
    public double GetTotal() {
        double total = 0;
        foreach(var price in Prices) total += price;
        return total;
    }
}

public class Program {
    public static void Main() {
        ShoppingCart cart = new ShoppingCart();

        // Empty cart
        Console.WriteLine("Empty cart total: " + cart.GetTotal());

        // Single item
        cart.Prices.Add(50);
        Console.WriteLine("Single item total: " + cart.GetTotal());

        // Multiple items
        cart.Prices.AddRange(new double[]{10,20,30});
        Console.WriteLine("Multiple items total: " + cart.GetTotal());
    }
}`,
            hints: [
                "Print totals for empty, single, and multiple item carts.",
                "Use a List<double> to store prices.",
                "Verify totals using Console.WriteLine."
            ],
            solution: `using System;
using System.Collections.Generic;

public class ShoppingCart {
    public List<double> Prices = new List<double>();
    public double GetTotal() {
        double total = 0;
        foreach(var price in Prices) total += price;
        return total;
    }
}

public class Program {
    public static void Main() {
        ShoppingCart cart = new ShoppingCart();
        Console.WriteLine(cart.GetTotal()); // 0
        cart.Prices.Add(50);
        Console.WriteLine(cart.GetTotal()); // 50
        cart.Prices.AddRange(new double[]{10,20,30});
        Console.WriteLine(cart.GetTotal()); // 110
    }
}`
        }
    ],
    performance: [
        {
            id: 301,
            title: "Performance Optimize Array Sum",
            description: "Sum all even numbers in a large integer array. Current code uses LINQ but is slow for very large arrays. Optimize for performance.",
            starterCode: `using System;
using System.Linq;

public class Program {
    public static void Main() {
        int[] arr = {1,2,3,4,5,6};
        Console.WriteLine(SumEvenNumbers(arr)); // 12
    }

    public static int SumEvenNumbers(int[] arr) {
        return arr.Where(x => x % 2 == 0).Sum();
    }
}`,
            hints: [
                "Avoid LINQ for tight loops in performance-critical code.",
                "Use a single loop with a running total.",
                "Check modulo operation for even numbers."
            ]
        },
        {
            id: 302,
            title: "Performance Optimize Fibonacci",
            description: "Compute the nth Fibonacci number. The naive recursive solution is very slow for n > 40. Optimize using memoization or iterative approach.",
            starterCode: `using System;

public class Program {
    public static void Main() {
        Console.WriteLine(Fibonacci(10)); // 55
    }

    public static int Fibonacci(int n) {
        if(n <= 1) return n;
        int a = 0, b = 1;
        for(int i = 2; i <= n; i++) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }
}`,
            hints: [
                "Store previously computed results in a dictionary or array.",
                "Consider bottom-up iterative computation.",
                "Avoid naive recursion for large n."
            ]
        },
        {
            id: 303,
            title: "Performance Optimize String Concatenation",
            description: "Concatenating many strings using '+' is slow. Optimize the code using a more efficient method for large n.",
            starterCode: `using System;
using System.Text;

public class Program {
    public static void Main() {
        Console.WriteLine(ConcatNumbers(10)); // 0123456789
    }

    public static string ConcatNumbers(int n) {
        var sb = new StringBuilder();
        for(int i = 0; i < n; i++) {
            sb.Append(i.ToString());
        }
        return sb.ToString();
    }
        }`,
            hints: [
                "Use System.Text.StringBuilder for large concatenations.",
                "Avoid repeated string copies in loops.",
                "Append numbers directly to StringBuilder instead of converting each to string individually."
            ]
        },
        {
            id: 304,
            title: "Performance Singleton Pattern",
            description: "The snippet shows that the performance of getting the Instance is slow. What is the cause of performance degradation? How would you fix it",
            starterCode: `public static Singleton Instance {
private Singleton (){}

private static readonly object Lock = new Object();

private static Singleton instance;

public static Singleton instance

{ 
get
{ lock (Lock) 
 { 
if (instance == null)
 { 
instance = new Singleton();
 }
 }
  return instance; 
  }
}

public void Log(string message)
 {
 Console.WriteLine($"[{DateTime.Now}] {message}");
  }
  }
   // Usage example
    public class Program
     {
     public static void Main() 
     { 
     Parallel.For(0, 10, i =>
{
         Logger.Instance.Log($"Log message {i}"); 
         }); 
         }
          }`,
            hints: [
                "The lock is acquired every time Instance is accessed, even after the singleton is initialized.",
                "This causes unnecessary contention and slows down access in multi-threaded scenarios.",
                "Use double-checked locking so the lock is only acquired when the instance is not yet created.",
                "Consider using Lazy<T> or static initialization for thread-safe singletons in C#."
            ],
              solution: `public class Singleton
{
    private Singleton() {}

    private static readonly object Lock = new object();
    private static Singleton instance;

    public static Singleton Instance
    {
        get
        {
            if (instance == null)
            {
                lock (Lock)
                {
                    if (instance == null)
                        instance = new Singleton();
                }
            }
            return instance;
        }
    }

    public void Log(string message)
    {
        Console.WriteLine($"[{DateTime.Now}] {message}");
    }
}`
        },
        {
            id: 305,
            title: "Performance Microservices",
            description: "The following code uses a microservice to retrieve a list of companies' data. While profiling the code, we have observed that the microservice is being called multiple times when `GetReportableCompanies` is invoked.",
            starterCode: `public class CompanyInfo
{
public Guid Id { get; set; }
public string Name { get; set; }
public string Description { get; set; }
public bool IsVip { get; set; }
}
public class CompanyService
{
private const int MaxReportableCompanies = 100;
private readonly HttpClient _httpClient;
public CompanyService(HttpClient httpClient)
{
_httpClient = httpClient;
}
public IEnumerable<CompanyInfo> GetReportableCompanies()
{
var companies = GetCompanyInfoList();
if (!companies.Any()) return Array.Empty<CompanyInfo>();
var vipCompanies = companies.Where(c => c.IsVip);
if (vipCompanies.Count() > MaxReportableCompanies)
{
return vipCompanies.Take(MaxReportableCompanies);
}
var nonVipReportableCompanies = companies
.Where(c => !c.IsVip)
.Where(c => c.Description.Contains("REPORT"));
return vipCompanies.Concat(nonVipReportableCompanies.Take(MaxReportableCompanies - vipCompanies.Count()));
}
private List<CompanyInfo> GetCompanyInfoList()
{
var text = _httpClient.GetStringAsync("/").Result;
var csvLines = text.Split(Environment.NewLine);
foreach (var csvLine in csvLines)
{
yield return ParseCompanyInfo(csvLine);
}
}
private static CompanyInfo ParseCompanyInfo(string csvLine)
{
var parts = csvLine.Split(',');
return new CompanyInfo
{
Id = Guid.Parse(parts[0]),
Name = parts[1],
Description = parts[2],
IsVip = bool.Parse(parts[3])
};
}
}`,
            hints: [
                "The method GetCompanyInfoList() calls the microservice every time it's invoked, which can lead to multiple network requests in GetReportableCompanies().",
                "Using .Result on an async method can cause blocking and deadlocks; prefer await with async methods.",
                "Refactor to fetch the company list once, cache the result, and use async/await for non-blocking calls.",
                "Consider changing GetReportableCompanies to be async and return Task<IEnumerable<CompanyInfo>>.",
                "Use ToList() to materialize the collection after fetching to avoid multiple enumerations.",
                "Parse all company data in one pass then filter as needed."
            ],
            solution : `using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

public class CompanyInfo
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public bool IsVip { get; set; }
}

public class CompanyService
{
    private const int MaxReportableCompanies = 100;
    private readonly HttpClient _httpClient;

    public CompanyService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IEnumerable<CompanyInfo>> GetReportableCompaniesAsync()
    {
        var companies = await GetCompanyInfoListAsync();
        if (!companies.Any()) return Array.Empty<CompanyInfo>();

        var vipCompanies = companies.Where(c => c.IsVip).ToList();
        if (vipCompanies.Count > MaxReportableCompanies)
        {
            return vipCompanies.Take(MaxReportableCompanies);
        }

        var nonVipReportableCompanies = companies
            .Where(c => !c.IsVip)
            .Where(c => c.Description.Contains("REPORT"))
            .ToList();

        return vipCompanies.Concat(
            nonVipReportableCompanies.Take(MaxReportableCompanies - vipCompanies.Count)
        );
    }

    private async Task<List<CompanyInfo>> GetCompanyInfoListAsync()
    {
        var text = await _httpClient.GetStringAsync("/");
        var csvLines = text.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
        var result = new List<CompanyInfo>();
        foreach (var csvLine in csvLines)
        {
            result.Add(ParseCompanyInfo(csvLine));
        }
        return result;
    }

    private static CompanyInfo ParseCompanyInfo(string csvLine)
    {
        var parts = csvLine.Split(',');
        return new CompanyInfo
        {
            Id = Guid.Parse(parts[0]),
            Name = parts[1],
            Description = parts[2],
            IsVip = bool.Parse(parts[3])
        };
    }
}`
        },
        {
            id: 306,
            title: "Implementing a thread-safe counter",
            description: "You are implementing a thread-safe counter using Interlocked.Increment and Interlocked.Decrement.However, sometimes your code throws a NullReferenceException.Why does this happen, and how can you fix it",
            starterCode: `public class Counter
{
    public int? Value = 0;

    public void Increment()
    {
        Interlocked.Increment(ref Value);
    }

    public void Decrement()
    {
        Interlocked.Decrement(ref Value);
    }
}`,
            hints: [
                "Interlocked.Increment and Interlocked.Decrement require a reference to a non-null variable.",
                "Nullable types (int?) are not supported by Interlocked methods.",
                "Use a non-nullable int for the counter field"
            ],
            solution: `public class Counter
{
    public int Value = 0; // FIX: Use non-nullable int

    public void Increment()
    {
        Interlocked.Increment(ref Value);
    }

    public void Decrement()
    {
        Interlocked.Decrement(ref Value);
    }
}`
        }
        
    ]
  
};

export default dotnetQuestions;

