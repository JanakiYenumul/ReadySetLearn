const dotnetQuestions = {
    problems: [
        {
            id: 1,
            title: "Q1 : Fix the Bug in LogEntry",
            description: `/*
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

            starterCode: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;

public class LogEntry
{
    public string Timestamp { get; private set; }
    public string LicensePlate { get; private set; }
    public string BoothType { get; private set; }
    public int Location { get; private set; }
    public string Direction { get; private set; }

    public LogEntry(string logLine)
    {
        string[] tokens = logLine.Split(' ');
        Timestamp = tokens[0]; 
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
}`,
            hints: [
                "Check the data type of `Timestamp`. Tests compare numbers, not strings.",
                "Use `double.Parse` (or Convert.ToDouble) to extract timestamp from tokens if Timestamp should be numeric.",
                "Remove nullable reference syntax (e.g. `string?`) and avoid reading external files — Judge0 runs code in a sandbox with no extra files."
            ],

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
            description: `
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
    public string Timestamp { get; private set; }
    public string LicensePlate { get; private set; }
    public string BoothType { get; private set; }
    public int Location { get; private set; }
    public string Direction { get; private set; }

    public LogEntry(string logLine)
    {
        string[] tokens = logLine.Split(' ');
        Timestamp = tokens[0]; 
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
            title: "Q3 : Extract Full Domain and Second-Level Domain from URLs",
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
            starterCode: `using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("---- Running test (Problem Code) ----");

        string firstUrl = "http://world.news.yahoo.com/news/olympics/";

        string[] result = ExtractDomains(firstUrl);

        RunTest("world.news.yahoo.com", result[0], "Full domain");
        RunTest("yahoo.com", result[1], "Last two domain parts");
    }
  
    static void RunTest(string expected, string actual, string testName)
    {
        if (expected == actual)
            Console.WriteLine("PASS : " + testName);
        else
            Console.WriteLine("FAIL : " + testName +
                              " expected=" + expected +
                              " actual=" + actual);
    }
}`,
            hints: [
                "Do not use URL parsing libraries.",
                "Remove the protocol part (http:// or https://) manually.",
                "The domain ends before '/', '?' or '#'.",
                "Split the domain using '.' to compute the last two parts."
            ],
            solution: `using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("---- Running test (Solution Code) ----");

        string firstUrl = "http://world.news.yahoo.com/news/olympics/";

        string[] result = ExtractDomains(firstUrl);

        RunTest("world.news.yahoo.com", result[0], "Full domain");
        RunTest("yahoo.com", result[1], "Last two domain parts");
    }

    static string[] ExtractDomains(string url)
    {
        int start = 0;

        if (url.StartsWith("http://"))
            start = "http://".Length;
        else if (url.StartsWith("https://"))
            start = "https://".Length;

        string remaining = url.Substring(start);

        int end = remaining.Length;

        int slashIndex = remaining.IndexOf('/');
        if (slashIndex >= 0 && slashIndex < end)
            end = slashIndex;

        int questionIndex = remaining.IndexOf('?');
        if (questionIndex >= 0 && questionIndex < end)
            end = questionIndex;

        int hashIndex = remaining.IndexOf('#');
        if (hashIndex >= 0 && hashIndex < end)
            end = hashIndex;

        string fullDomain = remaining.Substring(0, end);

        string[] parts = fullDomain.Split('.');

        string lastTwo;

        if (parts.Length >= 2)
            lastTwo = parts[parts.Length - 2] + "." + parts[parts.Length - 1];
        else
            lastTwo = fullDomain;

        return new string[] { fullDomain, lastTwo };
    }

    static void RunTest(string expected, string actual, string testName)
    {
        if (expected == actual)
            Console.WriteLine("PASS : " + testName);
        else
            Console.WriteLine("FAIL : " + testName +
                              " expected=" + expected +
                              " actual=" + actual);
    }
}`
        }
        ,
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
   public Membership()
    {
        members = new List<Member>();
    }

    public void AddMember(Member member)
    {
        members.Add(member);
    }
  
}`,
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
            description: `
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

        Console.WriteLine(string.Join(", ", filter_rooms(instructions_1, treasure_rooms_1)));  
        Console.WriteLine(string.Join(", ", filter_rooms(instructions_1, treasure_rooms_2)));  
        Console.WriteLine(string.Join(", ", filter_rooms(instructions_2, treasure_rooms_3)));   
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

        Console.WriteLine(string.Join(", ", filter_rooms(instructions_1, treasure_rooms_1)));  
        Console.WriteLine(string.Join(", ", filter_rooms(instructions_1, treasure_rooms_2)));  
        Console.WriteLine(string.Join(", ", filter_rooms(instructions_2, treasure_rooms_3)));  
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
        {
            id: 307,
            title: "Q : Badge Access Mismatch Detection",
            description: `
/*

Given an ordered list of employees who used their badge to enter or exit the room, return two collections:
1. Employees who entered without exiting
2. Employees who exited without entering.

*/
`,
            starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string[]> records1 = new List<string[]>
        {
            new string[] { "Paul", "enter" },
            new string[] { "Pauline", "exit" },
            new string[] { "Paul", "enter" },
            new string[] { "Paul", "exit" },
            new string[] { "Martha", "exit" },
            new string[] { "Joe", "enter" }
        };

        Tuple<List<string>, List<string>> result = Mismatches(records1);

        Console.WriteLine("Entered without exiting  : " + string.Join(\", \", result.Item1));
        Console.WriteLine("Exited without entering : " + string.Join(\", \", result.Item2));
    }

    static Tuple<List<string>, List<string>> Mismatches(List<string[]> records)
    {
        // ❌ TODO: logic not implemented yet
        return new Tuple<List<string>, List<string>>(
            new List<string>(),
            new List<string>()
        );
    }
}`,
            hints: [
                "Track whether each employee is currently inside the room.",
                "Use a dictionary to store the current state for each employee.",
                "Use two collections to store employees who enter twice and who exit without entering.",
                "After processing all records, employees still inside should be treated as entered without exiting."
            ],
            solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string[]> records1 = new List<string[]>
        {
            new string[] { "Paul", "enter" },
            new string[] { "Pauline", "exit" },
            new string[] { "Paul", "enter" },
            new string[] { "Paul", "exit" },
            new string[] { "Martha", "exit" },
            new string[] { "Joe", "enter" }
        };

        Tuple<List<string>, List<string>> result = Mismatches(records1);

        Console.WriteLine("Entered without exiting  : " + string.Join(\", \", result.Item1));
        Console.WriteLine("Exited without entering : " + string.Join(\", \", result.Item2));
    }

    static Tuple<List<string>, List<string>> Mismatches(List<string[]> records)
    {
        // Track current room state per employee
        Dictionary<string, bool> inside = new Dictionary<string, bool>();

        HashSet<string> enteredWithoutExit = new HashSet<string>();
        HashSet<string> exitedWithoutEnter = new HashSet<string>();

        foreach (string[] record in records)
        {
            string name = record[0];
            string action = record[1];

            bool isInside;

            if (!inside.TryGetValue(name, out isInside))
            {
                isInside = false;
            }

            if (action == "enter")
            {
                if (!isInside)
                {
                    inside[name] = true;
                }
                else
                {
                    // entered again without exit
                    enteredWithoutExit.Add(name);
                }
            }
            else if (action == "exit")
            {
                if (!isInside)
                {
                    // exited without entering
                    exitedWithoutEnter.Add(name);
                }
                else
                {
                    inside[name] = false;
                }
            }
        }

        // Anyone still inside at the end also entered without exiting
        foreach (KeyValuePair<string, bool> kv in inside)
        {
            if (kv.Value)
                enteredWithoutExit.Add(kv.Key);
        }

        return new Tuple<List<string>, List<string>>(
            new List<string>(enteredWithoutExit),
            new List<string>(exitedWithoutEnter)
        );
    }
}`
        }, {
            id: 308,
            title: "Q : Flatten a Deeply Nested Array",
            description: `
/*

Write a function that flattens a deeply nested array into a single-level array.

Example:
Input: [1, [2, [3, [4]], 5]]
Output: [1,2,3,4,5]

*/
`,
            starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<object> input = new List<object>
        {
            1,
            new List<object>
            {
                2,
                new List<object>
                {
                    3,
                    new List<object> { 4 }
                },
                5
            }
        };

        List<int> result = FlattenArray(input);

        Console.WriteLine("Result : " + string.Join(", ", result));
    }

    static List<int> FlattenArray(List<object> arr)
    {
        // ❌ TODO : Not implemented yet
        return new List<int>();
    }
}`,
            hints: [
                "This is a recursive problem.",
                "If the current element is an integer, add it to the result list.",
                "If the current element is a list, recursively flatten it.",
                "Use a helper method to avoid creating multiple lists."
            ],
            solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<object> input = new List<object>
        {
            1,
            new List<object>
            {
                2,
                new List<object>
                {
                    3,
                    new List<object> { 4 }
                },
                5
            }
        };

        List<int> result = FlattenArray(input);

        Console.WriteLine("Result : " + string.Join(", ", result));
    }

    static List<int> FlattenArray(List<object> arr)
    {
        List<int> result = new List<int>();

        FlattenInternal(arr, result);

        return result;
    }

    static void FlattenInternal(List<object> arr, List<int> result)
    {
        foreach (object item in arr)
        {
            if (item is int)
            {
                result.Add((int)item);
            }
            else if (item is List<object>)
            {
                FlattenInternal((List<object>)item, result);
            }
        }
    }
}`
        }, {
            id: 309,
            title: "Q : Library Borrowing and Fine Calculation System",
            description: `
/*

A public library maintains a record of books and borrowers.
You need to design a system to track borrowed books and calculate overdue fines.
      
*/
`,
            starterCode: `using System;

class Book
{
    public int id;
    public string title;
    public string author;

    // ❌ Constructor missing
}

class Borrower
{
    public int id;
    public string name;
    public Book borrowedBook;

    // ❌ Constructor missing

    public int CalculateFine(int daysBorrowed)
    {
        // ❌ Not implemented yet
        return 0;
    }
}

class LibrarySystem
{
    static void Main(string[] args)
    {
        // ❌ Create book and borrower
        Book book = new Book();
        Borrower borrower = new Borrower();

        borrower.borrowedBook = book;

        int fine = borrower.CalculateFine(20);

        Console.WriteLine("Fine for 20 days = " + fine);
        // Expected: 12
    }
}`,
            hints: [
                "Add constructors to initialize Book and Borrower objects.",
                "Borrower should store the borrowed Book.",
                "Allow a fixed number of free days before applying a fine.",
                "Calculate fine only for the days exceeding the free period."
            ],
            solution: `using System;

class Book
{
    public int id;
    public string title;
    public string author;

    public Book(int id, string title, string author)
    {
        this.id = id;
        this.title = title;
        this.author = author;
    }
}

class Borrower
{
    public int id;
    public string name;
    public Book borrowedBook;

    public Borrower(int id, string name, Book borrowedBook)
    {
        this.id = id;
        this.name = name;
        this.borrowedBook = borrowedBook;
    }

    public int CalculateFine(int daysBorrowed)
    {
        int freeDays = 14;
        int finePerDay = 2;

        if (daysBorrowed <= freeDays)
            return 0;

        int extraDays = daysBorrowed - freeDays;
        return extraDays * finePerDay;
    }
}

class LibrarySystem
{
    static void Main(string[] args)
    {
        Book book = new Book(1, "Clean Code", "Robert C. Martin");

        Borrower borrower = new Borrower(101, "Pankaj", book);

        int fine = borrower.CalculateFine(20);

        Console.WriteLine("Fine for 20 days = " + fine);
        // Output: 12
    }
}`
        }, {
            id: 310,
            title: "Q : Online Food Order Management and Billing",
            description: `
/*

An online food app tracks restaurant orders.
You must implement order management and calculate bills with delivery charges.
      
*/
`,
            starterCode: `using System;

class FoodItem
{
    public string name;
    public int price;

    // ❌ Constructor missing
}

class Order
{
    public FoodItem[] items;

    // ❌ Constructor missing

    public int CalculateBill()
    {
        // ❌ Not implemented yet
        return 0;
    }
}

class FoodApp
{
    static void Main(string[] args)
    {
        // ❌ Create 3 food items
        FoodItem f1 = new FoodItem();
        FoodItem f2 = new FoodItem();
        FoodItem f3 = new FoodItem();

        Order order = new Order();

        int bill = order.CalculateBill();

        Console.WriteLine("Final Bill = " + bill);
        // Expected output : 480
    }
}`,
            hints: [
                "Create constructors for FoodItem and Order classes.",
                "Order should accept a list of FoodItem objects.",
                "Calculate the total price of all food items in the order.",
                "Add a fixed delivery charge to the final bill."
            ],
            solution: `using System;

class FoodItem
{
    public string name;
    public int price;

    public FoodItem(string name, int price)
    {
        this.name = name;
        this.price = price;
    }
}

class Order
{
    public FoodItem[] items;

    public Order(FoodItem[] items)
    {
        this.items = items;
    }

    public int CalculateBill()
    {
        int total = 0;

        for (int i = 0; i < items.Length; i++)
        {
            total += items[i].price;
        }

        int deliveryCharge = 30;

        return total + deliveryCharge;
    }
}

class FoodApp
{
    static void Main(string[] args)
    {
        FoodItem f1 = new FoodItem("Burger", 100);
        FoodItem f2 = new FoodItem("Pizza", 200);
        FoodItem f3 = new FoodItem("Pasta", 150);

        FoodItem[] items = new FoodItem[] { f1, f2, f3 };

        Order order = new Order(items);

        int bill = order.CalculateBill();

        Console.WriteLine("Final Bill = " + bill);
        // Output : 480
    }
}`
        }, {
            id: 311,
            title: "Q : Cinema Hall Ticket Booking and Revenue Calculation",
            description: `
/*

A cinema hall manages movie bookings.
Implement a ticket booking system and calculate revenue.
      
*/
`,
            starterCode: `using System;

class Movie
{
    public string name;
    public int price;

    // ❌ Constructor missing
}

class Customer
{
    public string name;
    public int tickets;
    public Movie movie;

    // ❌ Constructor missing

    public int TotalCost()
    {
        // ❌ Not implemented
        return 0;
    }
}

class CinemaHall
{
    static void Main(string[] args)
    {
        Movie movie = new Movie();

        Customer c1 = new Customer();
        Customer c2 = new Customer();
        Customer c3 = new Customer();

        int revenue =
            c1.TotalCost() +
            c2.TotalCost() +
            c3.TotalCost();

        Console.WriteLine("Total Revenue = " + revenue);
        // Expected : 1200
    }
}`,
            hints: [
                "Create constructors for Movie and Customer classes.",
                "Each customer should store the selected movie and number of tickets.",
                "Total cost should be calculated using ticket count and movie price.",
                "Revenue is the sum of total cost of all customers."
            ],
            solution: `using System;

class Movie
{
    public string name;
    public int price;

    public Movie(string name, int price)
    {
        this.name = name;
        this.price = price;
    }
}

class Customer
{
    public string name;
    public int tickets;
    public Movie movie;

    public Customer(string name, int tickets, Movie movie)
    {
        this.name = name;
        this.tickets = tickets;
        this.movie = movie;
    }

    public int TotalCost()
    {
        return tickets * movie.price;
    }
}

class CinemaHall
{
    static void Main(string[] args)
    {
        Movie movie = new Movie("Avatar", 200);

        Customer c1 = new Customer("Rahul", 2, movie);
        Customer c2 = new Customer("Anita", 3, movie);
        Customer c3 = new Customer("Rohit", 1, movie);

        int revenue =
            c1.TotalCost() +
            c2.TotalCost() +
            c3.TotalCost();

        Console.WriteLine("Total Revenue = " + revenue);
        // Output : 1200
    }
}`
        }, {
            id: 312,
            title: "Q : E-commerce Cart Billing with Discount",
            description: `
/*

An e-commerce platform tracks shopping carts.
Build a system to calculate total bill with discounts.
      
*/
`,
            starterCode: `using System;

class Product
{
    public string name;
    public int price;

    // ❌ Constructor missing
}

class Cart
{
    public Product[] items;

    // ❌ Constructor missing

    public double CalculateBill()
    {
        // ❌ Not implemented
        return 0;
    }
}

class ShoppingApp
{
    static void Main(string[] args)
    {
        Product p1 = new Product();
        Product p2 = new Product();
        Product p3 = new Product();
        Product p4 = new Product();

        Cart cart = new Cart();

        double bill = cart.CalculateBill();

        Console.WriteLine("Final Bill = " + bill);
        // Expected : 720
    }
}`,
            hints: [
                "Create constructors for Product and Cart.",
                "Add all product prices to calculate the total amount.",
                "Apply a discount only if the total exceeds a threshold.",
                "Return the discounted total as a double value."
            ],
            solution: `using System;

class Product
{
    public string name;
    public int price;

    public Product(string name, int price)
    {
        this.name = name;
        this.price = price;
    }
}

class Cart
{
    public Product[] items;

    public Cart(Product[] items)
    {
        this.items = items;
    }

    public double CalculateBill()
    {
        int total = 0;

        for (int i = 0; i < items.Length; i++)
        {
            total += items[i].price;
        }

        if (total > 500)
        {
            return total - (total * 0.10);
        }

        return total;
    }
}

class ShoppingApp
{
    static void Main(string[] args)
    {
        Product p1 = new Product("Shoes", 300);
        Product p2 = new Product("Shirt", 200);
        Product p3 = new Product("Jeans", 250);
        Product p4 = new Product("Cap", 50);

        Product[] products = new Product[] { p1, p2, p3, p4 };

        Cart cart = new Cart(products);

        double bill = cart.CalculateBill();

        Console.WriteLine("Final Bill = " + bill);
        // Output : 720
    }
}`
        }, {
            id: 313,
            title: "Q : Frequent Badge Access Within One Hour",
            description: `
/*
We are working on a security system for a badged-access room in our company's building.

We want to find employees who badged into our secured room unusually often. We have an unordered list of names and entry times over a single day. Access times are given as numbers up to four digits in length using 24-hour time, such as "800" or "2250".

Write a function that finds anyone who badged into the room three or more times in a one-hour period. Your function should return each of the employees who fit that criteria, plus the times that they badged in during the one-hour period. If there are multiple one-hour periods where this was true for an employee, just return the earliest one for that employee.

badge_times = [ ["Paul", "1355"], ["Jennifer", "1910"], ["Jose", "835"], ["Jose", "830"], ["Paul", "1315"], ["Chloe", "0"], ["Chloe", "1910"], ["Jose", "1615"], ["Jose", "1640"], ["Paul", "1405"], ["Jose", "855"], ["Jose", "930"], ["Jose", "915"], ["Jose", "730"], ["Jose", "940"], ["Jennifer", "1335"], ["Jennifer", "730"], ["Jose", "1630"], ["Jennifer", "5"], ["Chloe", "1909"], ["Zhang", "1"], ["Zhang", "10"], ["Zhang", "109"], ["Zhang", "110"], ["Amos", "1"], ["Amos", "2"], ["Amos", "400"], ["Amos", "500"], ["Amos", "503"], ["Amos", "504"], ["Amos", "601"], ["Amos", "602"], ["Paul", "1416"], ];

Expected output (in any order)
Paul: 1315 1355 1405
Jose: 830 835 855 915 930
Zhang: 10 109 110
Amos: 500 503 504

n: length of the badge records array
*/
`,
            starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string[]> badgeTimes = new List<string[]>
        {
            new string[]{"Paul","1355"}, new string[]{"Jennifer","1910"},
            new string[]{"Jose","835"}, new string[]{"Jose","830"},
            new string[]{"Paul","1315"}, new string[]{"Chloe","0"},
            new string[]{"Chloe","1910"}, new string[]{"Jose","1615"},
            new string[]{"Jose","1640"}, new string[]{"Paul","1405"},
            new string[]{"Jose","855"}, new string[]{"Jose","930"},
            new string[]{"Jose","915"}, new string[]{"Jose","730"},
            new string[]{"Jose","940"}, new string[]{"Jennifer","1335"},
            new string[]{"Jennifer","730"}, new string[]{"Jose","1630"},
            new string[]{"Jennifer","5"}, new string[]{"Chloe","1909"},
            new string[]{"Zhang","1"}, new string[]{"Zhang","10"},
            new string[]{"Zhang","109"}, new string[]{"Zhang","110"},
            new string[]{"Amos","1"}, new string[]{"Amos","2"},
            new string[]{"Amos","400"}, new string[]{"Amos","500"},
            new string[]{"Amos","503"}, new string[]{"Amos","504"},
            new string[]{"Amos","601"}, new string[]{"Amos","602"},
            new string[]{"Paul","1416"}
        };

        Dictionary<string, List<string>> result =
            FindFrequentBadgeAccess(badgeTimes);

        foreach (var kv in result)
        {
            Console.WriteLine(kv.Key + ": " + string.Join(" ", kv.Value));
        }
    }

    static Dictionary<string, List<string>> FindFrequentBadgeAccess(
        List<string[]> records)
    {
        // ❌ TODO – logic not implemented
        return new Dictionary<string, List<string>>();
    }
}`,
            hints: [
                "Group all badge times by employee name.",
                "Convert time strings such as \"835\" or \"5\" into minutes for comparison.",
                "Sort each employee's access times.",
                "Use a sliding window to find three or more accesses within 60 minutes.",
                "If multiple windows exist, return only the earliest one."
            ],
            solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string[]> badgeTimes = new List<string[]>
        {
            new string[]{"Paul","1355"}, new string[]{"Jennifer","1910"},
            new string[]{"Jose","835"}, new string[]{"Jose","830"},
            new string[]{"Paul","1315"}, new string[]{"Chloe","0"},
            new string[]{"Chloe","1910"}, new string[]{"Jose","1615"},
            new string[]{"Jose","1640"}, new string[]{"Paul","1405"},
            new string[]{"Jose","855"}, new string[]{"Jose","930"},
            new string[]{"Jose","915"}, new string[]{"Jose","730"},
            new string[]{"Jose","940"}, new string[]{"Jennifer","1335"},
            new string[]{"Jennifer","730"}, new string[]{"Jose","1630"},
            new string[]{"Jennifer","5"}, new string[]{"Chloe","1909"},
            new string[]{"Zhang","1"}, new string[]{"Zhang","10"},
            new string[]{"Zhang","109"}, new string[]{"Zhang","110"},
            new string[]{"Amos","1"}, new string[]{"Amos","2"},
            new string[]{"Amos","400"}, new string[]{"Amos","500"},
            new string[]{"Amos","503"}, new string[]{"Amos","504"},
            new string[]{"Amos","601"}, new string[]{"Amos","602"},
            new string[]{"Paul","1416"}
        };

        Dictionary<string, List<string>> result =
            FindFrequentBadgeAccess(badgeTimes);

        foreach (var kv in result)
        {
            Console.WriteLine(kv.Key + ": " + string.Join(" ", kv.Value));
        }
    }

    static Dictionary<string, List<string>> FindFrequentBadgeAccess(
        List<string[]> records)
    {
        Dictionary<string, List<int>> map =
            new Dictionary<string, List<int>>();

        // Group by employee name
        foreach (var r in records)
        {
            string name = r[0];
            int time = ToMinutes(r[1]);

            if (!map.ContainsKey(name))
                map[name] = new List<int>();

            map[name].Add(time);
        }

        Dictionary<string, List<string>> result =
            new Dictionary<string, List<string>>();

        foreach (var kv in map)
        {
            string name = kv.Key;
            List<int> times = kv.Value;

            times.Sort();
            int n = times.Count;

            for (int i = 0; i < n; i++)
            {
                List<int> window = new List<int>();

                for (int j = i; j < n; j++)
                {
                    if (times[j] - times[i] <= 60)
                        window.Add(times[j]);
                    else
                        break;
                }

                if (window.Count >= 3)
                {
                    List<string> formatted = new List<string>();

                    for (int k = 0; k < window.Count; k++)
                        formatted.Add(FromMinutes(window[k]));

                    result[name] = formatted;
                    break; // earliest window only
                }
            }
        }

        return result;
    }

    // Converts "835", "5", "1910" to minutes since 00:00
    static int ToMinutes(string t)
    {
        int val = int.Parse(t);

        int hours = val / 100;
        int mins = val % 100;

        return hours * 60 + mins;
    }

    // Converts minutes back to HHMM-like format
    static string FromMinutes(int total)
    {
        int h = total / 60;
        int m = total % 60;

        int value = h * 100 + m;
        return value.ToString();
    }
}`
        }, {
            id: 314,
            title: "Q : Movie Recommendation Based on Similar User Ratings",
            description: `
/*
/*
One of the fun features of Aquaintly is that users can rate movies they have seen from 1 to 5. We want to use these ratings to make movie recommendations. Ratings will be provided in the following format: [Member Name, Movie Name, Rating]

We consider two users to have similar taste in movies if they have both rated the same movie as 4 or 5.

A movie should be recommended to a user if:
- They haven't rated the movie
- A user with similar taste has rated the movie as 4 or 5

Example:

ratings = [
  ["Alice", "Frozen", "5"],
  ["Bob", "Mad Max", "5"],
  ["Charlie", "Lost In Translation", "4"],
  ["Charlie", "Inception", "4"],
  ["Bob", "All About Eve", "3"],
  ["Bob", "Lost In Translation", "5"],
  ["Dennis", "All About Eve", "5"],
  ["Dennis", "Mad Max", "4"],
  ["Charlie", "Topsy-Turvy", "2"],
  ["Dennis", "Topsy-Turvy", "4"],
  ["Alice", "Lost In Translation", "1"],
  ["Franz", "Lost In Translation", "5"],
  ["Franz", "Mad Max", "5"]
]

If we want to recommend a movie to Charlie, we would recommend "Mad Max" because:
- Charlie has not rated "Mad Max"
- Charlie and Bob have similar taste as they both rated "Lost in Translation" 4 or 5
- Bob rated "Mad Max" a 5

Write a function that takes the name of a user and a collection of ratings, and returns a collection of all movie recommendations that can be made for the given user.

All test cases:
recommendations("Charlie", ratings) => ["Mad Max"]
recommendations("Bob", ratings) => ["Inception", "Topsy-Turvy"]
recommendations("Dennis", ratings) => ["Lost In Translation"]
recommendations("Alice", ratings) => []
recommendations("Franz", ratings) => ["Inception", "All About Eve", "Topsy-Turvy"]

Complexity Variable: R = number of ratings
M = number of movies
U = number of users
*/
*/
`,
            starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string[]> ratings = new List<string[]>
        {
            new string[]{"Alice","Frozen","5"},
            new string[]{"Bob","Mad Max","5"},
            new string[]{"Charlie","Lost In Translation","4"},
            new string[]{"Charlie","Inception","4"},
            new string[]{"Bob","All About Eve","3"},
            new string[]{"Bob","Lost In Translation","5"},
            new string[]{"Dennis","All About Eve","5"},
            new string[]{"Dennis","Mad Max","4"},
            new string[]{"Charlie","Topsy-Turvy","2"},
            new string[]{"Dennis","Topsy-Turvy","4"},
            new string[]{"Alice","Lost In Translation","1"},
            new string[]{"Franz","Lost In Translation","5"},
            new string[]{"Franz","Mad Max","5"}
        };

        Print("Charlie", Recommendations("Charlie", ratings));
        Print("Bob", Recommendations("Bob", ratings));
        Print("Dennis", Recommendations("Dennis", ratings));
        Print("Alice", Recommendations("Alice", ratings));
        Print("Franz", Recommendations("Franz", ratings));
    }

    static List<string> Recommendations(string user, List<string[]> ratings)
    {
        // ❌ TODO – not implemented
        return new List<string>();
    }

    static void Print(string user, List<string> movies)
    {
        Console.WriteLine(user + " => [" + string.Join(", ", movies) + "]");
    }
}`,
            hints: [
                "Group all ratings by user.",
                "For the target user, find all movies rated 4 or 5.",
                "Find other users who also rated any of those movies 4 or 5.",
                "Recommend movies rated 4 or 5 by similar users that the target user has not rated."
            ],
            solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string[]> ratings = new List<string[]>
        {
            new string[]{"Alice","Frozen","5"},
            new string[]{"Bob","Mad Max","5"},
            new string[]{"Charlie","Lost In Translation","4"},
            new string[]{"Charlie","Inception","4"},
            new string[]{"Bob","All About Eve","3"},
            new string[]{"Bob","Lost In Translation","5"},
            new string[]{"Dennis","All About Eve","5"},
            new string[]{"Dennis","Mad Max","4"},
            new string[]{"Charlie","Topsy-Turvy","2"},
            new string[]{"Dennis","Topsy-Turvy","4"},
            new string[]{"Alice","Lost In Translation","1"},
            new string[]{"Franz","Lost In Translation","5"},
            new string[]{"Franz","Mad Max","5"}
        };

        Print("Charlie", Recommendations("Charlie", ratings));
        Print("Bob", Recommendations("Bob", ratings));
        Print("Dennis", Recommendations("Dennis", ratings));
        Print("Alice", Recommendations("Alice", ratings));
        Print("Franz", Recommendations("Franz", ratings));
    }

    static List<string> Recommendations(string user, List<string[]> ratings)
    {
        Dictionary<string, Dictionary<string, int>> map =
            new Dictionary<string, Dictionary<string, int>>();

        foreach (var r in ratings)
        {
            string name = r[0];
            string movie = r[1];
            int rating = int.Parse(r[2]);

            if (!map.ContainsKey(name))
                map[name] = new Dictionary<string, int>();

            map[name][movie] = rating;
        }

        Dictionary<string, int> userRatings;

        if (!map.TryGetValue(user, out userRatings))
            return new List<string>();

        HashSet<string> likedByUser = new HashSet<string>();

        foreach (var kv in userRatings)
        {
            if (kv.Value >= 4)
                likedByUser.Add(kv.Key);
        }

        HashSet<string> similarUsers = new HashSet<string>();

        foreach (var kv in map)
        {
            string otherUser = kv.Key;

            if (otherUser == user)
                continue;

            Dictionary<string, int> otherRatings = kv.Value;

            foreach (string movie in likedByUser)
            {
                int r;

                if (otherRatings.TryGetValue(movie, out r) && r >= 4)
                {
                    similarUsers.Add(otherUser);
                    break;
                }
            }
        }

        HashSet<string> recommendations = new HashSet<string>();

        foreach (string similarUser in similarUsers)
        {
            Dictionary<string, int> otherRatings = map[similarUser];

            foreach (var kv in otherRatings)
            {
                string movie = kv.Key;
                int rating = kv.Value;

                if (rating >= 4 && !userRatings.ContainsKey(movie))
                {
                    recommendations.Add(movie);
                }
            }
        }

        return new List<string>(recommendations);
    }

    static void Print(string user, List<string> movies)
    {
        Console.WriteLine(user + " => [" + string.Join(", ", movies) + "]");
    }
}`
        }, {
            id: 315,
            title: "Q : Find Scrambled Word Inside a Note",
            description: `
/*
You are running a classroom and suspect that some of your students are passing around the answer to a multiple-choice question disguised as a random note.

Your task is to write a function that, given a list of words and a note, finds and returns the word in the list that is scrambled inside the note, if any exists. If none exist, it returns the result "-" as a string. There will be at most one matching word. The letters don't need to be in order or next to each other. The letters cannot be reused.

Example:  
words = ["baby", "referee", "cat", "dada", "dog", "bird", "ax", "baz"]
note1 = "ctay"
find(words, note1) => "cat"   (the letters do not have to be in order)  
  
note2 = "bcanihjsrrrferet"
find(words, note2) => "cat"   (the letters do not have to be together)  
  
note3 = "tbaykkjlga"
find(words, note3) => "-"     (the letters cannot be reused)  
  
note4 = "bbbblkkjbaby"
find(words, note4) => "baby"    
  
note5 = "dad"
find(words, note5) => "-"    
  
note6 = "breadmaking"
find(words, note6) => "bird"    

note7 = "dadaa"
find(words, note7) => "dada"    

All Test Cases:
find(words, note1) -> "cat"
find(words, note2) -> "cat"
find(words, note3) -> "-"
find(words, note4) -> "baby"
find(words, note5) -> "-"
find(words, note6) -> "bird"
find(words, note7) -> "dada"
  
Complexity analysis variables:  
  
W = number of words in \`words\`  
S = maximal length of each word or of the note  
*/
`,
            starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string[] words = new string[]
        {
            "baby", "referee", "cat", "dada", "dog", "bird", "ax", "baz"
        };

        Run(words, "ctay");               // cat
        Run(words, "bcanihjsrrrferet");   // cat
        Run(words, "tbaykkjlga");         // -
        Run(words, "bbbblkkjbaby");       // baby
        Run(words, "dad");                // -
        Run(words, "breadmaking");        // bird
        Run(words, "dadaa");              // dada
    }

    static void Run(string[] words, string note)
    {
        Console.WriteLine("find(" + note + ") => " + Find(words, note));
    }

    static string Find(string[] words, string note)
    {
        // ❌ TODO – not implemented
        return "-";
    }
}`,
            hints: [
                "Count how many times each character appears in the note.",
                "For each word, check if all its characters can be taken from the note counts.",
                "Characters cannot be reused.",
                "Return the first matching word, otherwise return \"-\"."
            ],
            solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string[] words = new string[]
        {
            "baby", "referee", "cat", "dada", "dog", "bird", "ax", "baz"
        };

        Run(words, "ctay");               // cat
        Run(words, "bcanihjsrrrferet");   // cat
        Run(words, "tbaykkjlga");         // -
        Run(words, "bbbblkkjbaby");       // baby
        Run(words, "dad");                // -
        Run(words, "breadmaking");        // bird
        Run(words, "dadaa");              // dada
    }

    static void Run(string[] words, string note)
    {
        Console.WriteLine("find(" + note + ") => " + Find(words, note));
    }

    static string Find(string[] words, string note)
    {
        int[] noteCount = BuildCount(note);

        for (int i = 0; i < words.Length; i++)
        {
            string word = words[i];

            if (CanForm(word, noteCount))
                return word;
        }

        return "-";
    }

    static bool CanForm(string word, int[] noteCount)
    {
        int[] temp = new int[26];

        for (int i = 0; i < noteCount.Length; i++)
            temp[i] = noteCount[i];

        for (int i = 0; i < word.Length; i++)
        {
            char c = word[i];

            if (c < 'a' || c > 'z')
                return false;

            int idx = c - 'a';

            if (temp[idx] == 0)
                return false;

            temp[idx]--;
        }

        return true;
    }

    static int[] BuildCount(string s)
    {
        int[] count = new int[26];

        for (int i = 0; i < s.Length; i++)
        {
            char c = s[i];

            if (c >= 'a' && c <= 'z')
                count[c - 'a']++;
        }

        return count;
    }
}`
        }, {
            id: 316,
            title: "Q : Fix Performance Issue in High-Frequency Order Processing",
            description: `
Given code snippet is slow when thousand order per second is the frequency. Analyze the code and fix the performance issue.
`,
            starterCode: `using System;

namespace Orders
{
    public class Order
    {
        public int Id { get; set; }
        public string Name { get; set; }

        private Order(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public static Order CreateOrder()
        {
            int id = 10;
            string name = "ABC";
            return new Order(id, name);
        }
    }

    public interface IRepo
    {
        void UpsertOrder(Order order);
    }

    public interface ILogger
    {
        void Info(string message);
    }

    public interface IClassA
    {
        void Method1();
    }

    // Dummy implementations so the code can run
    public class Repo : IRepo
    {
        public void UpsertOrder(Order order)
        {
            // simulate db call
        }
    }

    public class Logger : ILogger
    {
        public void Info(string message)
        {
            Console.WriteLine(message);
        }
    }

    public class ClassA : IClassA
    {
        private readonly IRepo _repo;
        private readonly ILogger _logger;

        public ClassA(IRepo repo, ILogger logger)
        {
            _repo = repo;
            _logger = logger;
        }

        public void Method1()
        {
            Order orderA;

            try
            {
                orderA = Order.CreateOrder();
            }
            catch (Exception ex)
            {
                _logger.Info("Error1");
                throw ex; // ❌ bad rethrow
            }

            try
            {
                _repo.UpsertOrder(orderA);
            }
            catch (Exception ex)
            {
                _logger.Info("Error1");
                throw ex; // ❌ bad rethrow
            }
        }
    }

    // ----------------- Main -----------------
    class Program
    {
        static void Main(string[] args)
        {
            IRepo repo = new Repo();
            ILogger logger = new Logger();

            IClassA service = new ClassA(repo, logger);

            // simulate multiple calls
            for (int i = 0; i < 5; i++)
            {
                service.Method1();
            }

            Console.WriteLine("Problem code executed.");
        }
    }
}`,
            hints: [
                "Avoid rethrowing exceptions using 'throw ex'.",
                "Preserve the original stack trace when rethrowing.",
                "Reduce duplicate try-catch blocks.",
                "Wrap both operations inside a single try block when possible."
            ],
            solution: `using System;

namespace Orders
{
    public class Order
    {
        public int Id { get; set; }
        public string Name { get; set; }

        private Order(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public static Order CreateOrder()
        {
            int id = 10;
            string name = "ABC";
            return new Order(id, name);
        }
    }

    public interface IRepo
    {
        void UpsertOrder(Order order);
    }

    public interface ILogger
    {
        void Info(string message);
    }

    public interface IClassA
    {
        void Method1();
    }

    // Dummy implementations
    public class Repo : IRepo
    {
        public void UpsertOrder(Order order)
        {
            // simulate db call
        }
    }

    public class Logger : ILogger
    {
        public void Info(string message)
        {
            Console.WriteLine(message);
        }
    }

    public class ClassA : IClassA
    {
        private readonly IRepo _repo;
        private readonly ILogger _logger;

        public ClassA(IRepo repo, ILogger logger)
        {
            _repo = repo;
            _logger = logger;
        }

        public void Method1()
        {
            try
            {
                Order orderA = Order.CreateOrder();
                _repo.UpsertOrder(orderA);
            }
            catch (Exception)
            {
                _logger.Info("Error1");

                // ✅ correct rethrow
                throw;
            }
        }
    }

    // ----------------- Main -----------------
    class Program
    {
        static void Main(string[] args)
        {
            IRepo repo = new Repo();
            ILogger logger = new Logger();

            IClassA service = new ClassA(repo, logger);

            // simulate multiple calls
            for (int i = 0; i < 5; i++)
            {
                service.Method1();
            }

            Console.WriteLine("Solution code executed.");
        }
    }
}`
        }, {
            id: 317,
            title: "Q : Fix Membership Statistics Bug in Gym Management System",
            description: `
/*

We are building a program to manage a gym's membership. The gym has multiple members, each with a unique ID, name, and membership status. The program allows gym staff to add new members, update member status, and get membership statistics.
Definitions:
* A "member" is an object that represents a gym member. It has properties for the ID, name, and membership status.
* A "membership" is a class which is used for managing members in the gym.

To begin with, we present you with two tasks:
1-1) Read through and understand the code below. Please take as much time as necessary, and feel free to run the code.
1-2) The test for Membership is not passing due to a bug in the code. Make the necessary changes to Membership to fix the bug.

*/
`,
            starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

public enum MembershipStatus
{
    BRONZE = 1,
    SILVER = 2,
    GOLD = 3
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

public class Membership
{
    private List<Member> members;

    public Membership()
    {
        members = new List<Member>();
    }

    public void AddMember(Member member)
    {
        members.Add(member);
    }

    public void UpdateMemberShip(int memberId, MembershipStatus newStatus)
    {
        foreach (var member in members)
        {
            if (member.MemberId == memberId)
            {
                member.MembershipStatus = newStatus;
                return;
            }
        }
    }

    
    public Dictionary<string, double> GetMembershipStatistics()
    {
        int totalMembers = members.Count;

        int totalPaidMembers =
            members.Count(m => m.MembershipStatus == MembershipStatus.GOLD);

        double conversionRate = 0;

        if (totalMembers > 0)
            conversionRate = (double)totalPaidMembers / totalMembers * 100;

        return new Dictionary<string, double>
        {
            { "TotalMembers", totalMembers },
            { "TotalPaidMembers", totalPaidMembers },
            { "ConversionRate", conversionRate }
        };
    }
}

class Program
{
    static void Main()
    {
        TestMembership();
        Console.WriteLine("Finished (problem code).");
    }

    static void Check(string testName, bool condition)
    {
        if (condition)
            Console.WriteLine("PASS : " + testName);
        else
            Console.WriteLine("FAIL : " + testName);
    }

    static void TestMembership()
    {
        Console.WriteLine("Running Test Membership");

        Membership testmembership = new Membership();

        testmembership.AddMember(
            new Member(1, "John Doe", MembershipStatus.BRONZE));

        Check("TotalMembers == 1",
            testmembership.GetMembershipStatistics()["TotalMembers"] == 1);

        testmembership.UpdateMemberShip(1, MembershipStatus.SILVER);

        
        Check("After upgrade to SILVER, TotalPaidMembers == 1",
            testmembership.GetMembershipStatistics()["TotalPaidMembers"] == 1);

        testmembership.AddMember(new Member(2, "Alex C", MembershipStatus.BRONZE));
        testmembership.AddMember(new Member(3, "Sam K", MembershipStatus.GOLD));
        testmembership.AddMember(new Member(4, "Linda P", MembershipStatus.SILVER));
        testmembership.AddMember(new Member(5, "Nina T", MembershipStatus.BRONZE));

        var stats = testmembership.GetMembershipStatistics();

        Check("TotalMembers == 5", stats["TotalMembers"] == 5);
        Check("TotalPaidMembers == 3", stats["TotalPaidMembers"] == 3);
        Check("ConversionRate == 60",
            Math.Abs(stats["ConversionRate"] - 60.0) < 0.01);
    }
}`,
            hints: [
                "Identify which membership statuses should be treated as paid.",
                "Look carefully at how TotalPaidMembers is calculated.",
                "Update the LINQ condition to include all paid membership types.",
                "Ensure the conversion rate calculation remains unchanged."
            ],
            solution: `using System;
using System.Collections.Generic;
using System.Linq;

public enum MembershipStatus
{
    BRONZE = 1,
    SILVER = 2,
    GOLD = 3
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

public class Membership
{
    private List<Member> members;

    public Membership()
    {
        members = new List<Member>();
    }

    public void AddMember(Member member)
    {
        members.Add(member);
    }

    public void UpdateMemberShip(int memberId, MembershipStatus newStatus)
    {
        foreach (var member in members)
        {
            if (member.MemberId == memberId)
            {
                member.MembershipStatus = newStatus;
                return;
            }
        }
    }

    // ✅ FIX: SILVER and GOLD are paid members
    public Dictionary<string, double> GetMembershipStatistics()
    {
        int totalMembers = members.Count;

        int totalPaidMembers =
            members.Count(m =>
                m.MembershipStatus == MembershipStatus.SILVER ||
                m.MembershipStatus == MembershipStatus.GOLD);

        double conversionRate = 0;

        if (totalMembers > 0)
            conversionRate = (double)totalPaidMembers / totalMembers * 100;

        return new Dictionary<string, double>
        {
            { "TotalMembers", totalMembers },
            { "TotalPaidMembers", totalPaidMembers },
            { "ConversionRate", conversionRate }
        };
    }
}

class Program
{
    static void Main()
    {
        TestMembership();
        Console.WriteLine("Finished (solution code).");
    }

    static void Check(string testName, bool condition)
    {
        if (condition)
            Console.WriteLine("PASS : " + testName);
        else
            Console.WriteLine("FAIL : " + testName);
    }

    static void TestMembership()
    {
        Console.WriteLine("Running Test Membership");

        Membership testmembership = new Membership();

        testmembership.AddMember(
            new Member(1, "John Doe", MembershipStatus.BRONZE));

        Check("TotalMembers == 1",
            testmembership.GetMembershipStatistics()["TotalMembers"] == 1);

        testmembership.UpdateMemberShip(1, MembershipStatus.SILVER);

        Check("After upgrade to SILVER, TotalPaidMembers == 1",
            testmembership.GetMembershipStatistics()["TotalPaidMembers"] == 1);

        testmembership.AddMember(new Member(2, "Alex C", MembershipStatus.BRONZE));
        testmembership.AddMember(new Member(3, "Sam K", MembershipStatus.GOLD));
        testmembership.AddMember(new Member(4, "Linda P", MembershipStatus.SILVER));
        testmembership.AddMember(new Member(5, "Nina T", MembershipStatus.BRONZE));

        var stats = testmembership.GetMembershipStatistics();

        Check("TotalMembers == 5", stats["TotalMembers"] == 5);
        Check("TotalPaidMembers == 3", stats["TotalPaidMembers"] == 3);
        Check("ConversionRate == 60",
            Math.Abs(stats["ConversionRate"] - 60.0) < 0.01);
    }
}`
        },
        {
            id: 21,
            title: "Q 15 : Local Radio Station Play",
            description: `We have a catalog of song titles (and their lengths) that we play at a local radio station. We have been asked to play two of those songs in a row, and they must add up to exactly seven minutes long. 

Given a list of songs and their durations, write a function that returns the names of any two distinct songs that add up to exactly seven minutes. If there is no such pair, return an empty collection. 

Example:
song_times_1 = [
("Stairway to Heaven", "8:05"), ("Immigrant Song", "2:27"),
("Rock and Roll", "3:41"), ("Communication Breakdown", "2:29"),
("Good Times Bad Times", "2:48"), ("Hot Dog", "3:19"),
("The Crunge", "3:18"), ("Achilles Last Stand", "10:26"),
("Black Dog", "4:55")
]
find_pair(song_times_1) => ["Rock and Roll", "Hot Dog"] (3:41 + 3:19 = 7:00)

Additional Input:
song_times_2 = [
("Stairway to Heaven", "8:05"), ("Immigrant Song", "2:27"),
("Rock and Roll", "3:41"), ("Communication Breakdown", "2:29"),
("Good Times Bad Times", "2:48"), ("Black Dog", "4:55"),
("The Crunge", "3:18"), ("Achilles Last Stand", "10:26"),
("The Ocean", "4:31"), ("Hot Dog", "3:19"),
]
song_times_3 = [
("Stairway to Heaven", "8:05"), ("Immigrant Song", "2:27"),
("Rock and Roll", "3:41"), ("Communication Breakdown", "2:29"),
("Hey Hey What Can I Do", "4:00"), ("Poor Tom", "3:00"),
("Black Dog", "4:55")
]
song_times_4 = [
("Hey Hey What Can I Do", "4:00"), ("Rock and Roll", "3:41"),
("Communication Breakdown", "2:29"), ("Going to California", "3:30"),
("On The Run", "3:50"), ("The Wrestler", "3:50"), 
("Black Mountain Side", "2:11"), ("Brown Eagle", "2:20")
]
song_times_5 = [("Celebration Day", "3:30"), ("Going to California", "3:30"), ("Take it easy", "3:30")]
song_times_6 = [
("Rock and Roll", "3:41"), ("If I lived here", "3:59"),
("Day and night", "5:03"), ("Tempo song", "1:57")
]


All Test Cases - snake_case:
find_pair(song_times_1) => ["Rock and Roll", "Hot Dog"]
find_pair(song_times_2) => ["Rock and Roll", "Hot Dog"] or ["Communication Breakdown", "The Ocean"]
find_pair(song_times_3) => ["Hey Hey What Can I Do", "Poor Tom"]
find_pair(song_times_4) => []
find_pair(song_times_5) => ["Celebration Day", "Going to California"] or ["Celebration Day", "Take it easy"] or ["Going to California", "Take it easy"]
find_pair(song_times_6) => ["Day and night", "Tempo song"]

All Test Cases - camelCase:
findPair(songTimes1) => ["Rock and Roll", "Hot Dog"]
findPair(songTimes2) => ["Rock and Roll", "Hot Dog"] or ["Communication Breakdown", "The Ocean"]
findPair(songTimes3) => ["Hey Hey What Can I Do", "Poor Tom"]
findPair(songTimes4) => []
findPair(songTimes5) => ["Celebration Day", "Going to California"] or ["Celebration Day", "Take it easy"] or ["Going to California", "Take it easy"]
findPair(songTimes6) => ["Day and night", "Tempo song"]

Complexity Variable:
n = number of song/time pairs
*/
`,
            hints: [
                "Convert time to seconds.",
                "Use a Dictionary for O(1) lookups",
                "Ensure songs are Distinct."
            ],
            starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Solution {
static void Main(String[] args) {
var songTimes1 = new string[][] {
new string[] {"Stairway to Heaven", "8:05"}, 
new string[] {"Immigrant Song", "2:27"},
new string[] {"Rock and Roll", "3:41"}, 
new string[] {"Communication Breakdown", "2:29"},
new string[] {"Good Times Bad Times", "2:48"}, 
new string[] {"Hot Dog", "3:19"},
new string[] {"The Crunge", "3:18"}, 
new string[] {"Achilles Last Stand", "10:26"},
new string[] {"Black Dog", "4:55"}
};
var songTimes2 = new string[][] {
new string[] {"Stairway to Heaven", "8:05"}, 
new string[] {"Immigrant Song", "2:27"},
new string[] {"Rock and Roll", "3:41"}, 
new string[] {"Communication Breakdown", "2:29"},
new string[] {"Good Times Bad Times", "2:48"}, 
new string[] {"Black Dog", "4:55"},
new string[] {"The Crunge", "3:18"}, 
new string[] {"Achilles Last Stand", "10:26"},
new string[] {"The Ocean", "4:31"}, 
new string[] {"Hot Dog", "3:19"}
};
var songTimes3 = new string[][] {
new string[] {"Stairway to Heaven", "8:05"}, 
new string[] {"Immigrant Song", "2:27"},
new string[] {"Rock and Roll", "3:41"}, 
new string[] {"Communication Breakdown", "2:29"},
new string[] {"Hey Hey What Can I Do", "4:00"}, 
new string[] {"Poor Tom", "3:00"},
new string[] {"Black Dog", "4:55"}
};
var songTimes4 = new string[][] {
new string[] {"Hey Hey What Can I Do", "4:00"}, 
new string[] {"Rock and Roll", "3:41"}, 
new string[] {"Communication Breakdown", "2:29"}, 
new string[] {"Going to California", "3:30"}, 
new string[] {"On The Run", "3:50"}, 
new string[] {"The Wrestler", "3:50"}, 
new string[] {"Black Mountain Side", "2:11"}, 
new string[] {"Brown Eagle", "2:20"}
}; 
var songTimes5 = new string[][] {
new string[] {"Celebration Day", "3:30"}, 
new string[] {"Going to California", "3:30"},
new string[] {"Take it easy", "3:30"}
};
var songTimes6 = new string[][] {
new string[] {"Rock and Roll", "3:41"},
new string[] {"If I lived here", "3:59"},
new string[] {"Day and night", "5:03"},
new string[] {"Tempo song", "1:57"}
};
}`,
            solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Solution
{
    /// <summary>
    /// Finds two distinct songs that add up to exactly 7 minutes (420 seconds)
    /// </summary>
    /// <param name="songTimes">Array of [songName, duration] pairs</param>
    /// <returns>Array with two song names, or empty array if no pair found</returns>
  static int ParseTimeToSeconds(string timeStr) {
    var parts = timeStr.Split(':');
    int minutes = int.Parse(parts[0]);
    int seconds = int.Parse(parts[1]);
    return minutes * 60 + seconds;
}

static string[] FindPair(string[][] songTimes) {
    const int TARGET = 7 * 60; // 420 seconds
    var seen = new Dictionary<int, int>(); // seconds -> index

    for (int i = 0; i < songTimes.Length; i++) {
        var title = songTimes[i][0];
        var timeStr = songTimes[i][1];
        int secs = ParseTimeToSeconds(timeStr);
        int need = TARGET - secs;

        if (seen.ContainsKey(need)) {
            // return names of the two songs (distinct by index)
            return new string[] { songTimes[seen[need]][0], title };
        }

        // store first occurrence of this duration
        if (!seen.ContainsKey(secs)) seen[secs] = i;
    }

    return new string[0]; // no pair found
}

static void Main(string[] args)
    {
        var songTimes1 = new string[][]
        {
            new string[] {"Stairway to Heaven", "8:05"},
            new string[] {"Immigrant Song", "2:27"},
            new string[] {"Rock and Roll", "3:41"},
            new string[] {"Communication Breakdown", "2:29"},
            new string[] {"Good Times Bad Times", "2:48"},
            new string[] {"Hot Dog", "3:19"},
            new string[] {"The Crunge", "3:18"},
            new string[] {"Achilles Last Stand", "10:26"},
            new string[] {"Black Dog", "4:55"}
        };

        var songTimes2 = new string[][]
        {
            new string[] {"Stairway to Heaven", "8:05"},
            new string[] {"Immigrant Song", "2:27"},
            new string[] {"Rock and Roll", "3:41"},
            new string[] {"Communication Breakdown", "2:29"},
            new string[] {"Good Times Bad Times", "2:48"},
            new string[] {"Black Dog", "4:55"},
            new string[] {"The Crunge", "3:18"},
            new string[] {"Achilles Last Stand", "10:26"},
            new string[] {"The Ocean", "4:31"},
            new string[] {"Hot Dog", "3:19"}
        };

        var songTimes3 = new string[][]
        {
            new string[] {"Stairway to Heaven", "8:05"},
            new string[] {"Immigrant Song", "2:27"},
            new string[] {"Rock and Roll", "3:41"},
            new string[] {"Communication Breakdown", "2:29"},
            new string[] {"Hey Hey What Can I Do", "4:00"},
            new string[] {"Poor Tom", "3:00"},
            new string[] {"Black Dog", "4:55"}
        };

        var songTimes4 = new string[][]
        {
            new string[] {"Hey Hey What Can I Do", "4:00"},
            new string[] {"Rock and Roll", "3:41"},
            new string[] {"Communication Breakdown", "2:29"},
            new string[] {"Going to California", "3:30"},
            new string[] {"On The Run", "3:50"},
            new string[] {"The Wrestler", "3:50"},
            new string[] {"Black Mountain Side", "2:11"},
            new string[] {"Brown Eagle", "2:20"}
        };

        var songTimes5 = new string[][]
        {
            new string[] {"Celebration Day", "3:30"},
            new string[] {"Going to California", "3:30"},
            new string[] {"Take it easy", "3:30"}
        };

        var songTimes6 = new string[][]
        {
            new string[] {"Rock and Roll", "3:41"},
            new string[] {"If I lived here", "3:59"},
            new string[] {"Day and night", "5:03"},
            new string[] {"Tempo song", "1:57"}
        };

        // Run tests
        Console.WriteLine("Test 1: " + string.Join(", ", FindPair(songTimes1))); // Rock and Roll, Hot Dog
        Console.WriteLine("Test 2: " + string.Join(", ", FindPair(songTimes2))); // Rock and Roll, Hot Dog
        Console.WriteLine("Test 3: " + string.Join(", ", FindPair(songTimes3))); // Hey Hey What Can I Do, Poor Tom
        Console.WriteLine("Test 4: " + string.Join(", ", FindPair(songTimes4))); // (empty)
        Console.WriteLine("Test 5: " + string.Join(", ", FindPair(songTimes5))); // Celebration Day, Going to California
        Console.WriteLine("Test 6: " + string.Join(", ", FindPair(songTimes6))); // Day and night, Tempo song
    }
}
`
        }
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

public class Program
{
    public static void Main()
    {
        Console.WriteLine(CalculateDiscount(16, true));   // 0.2
        Console.WriteLine(CalculateDiscount(20, false));  // 0.0
    }

    // Hard to read (nested ternary logic)
    public static double CalculateDiscount(int age, bool isMember)
    {
        if (age < 18)
            return isMember ? 0.2 : 0.1;

        return isMember ? 0.15 : 0.0;
    }
}`,
            hints: [
                "Introduce meaningful boolean variables to clarify the conditions.",
                "Avoid nested or compact conditional expressions when readability suffers.",
                "Ensure the refactoring does not change the original behavior."
            ],
            solution: `using System;

public class Program
{
    public static void Main()
    {
        Console.WriteLine(CalculateDiscount(16, true));   // 0.2
        Console.WriteLine(CalculateDiscount(20, false));  // 0.0
    }

    // Refactored for readability (no behavior change)
    public static double CalculateDiscount(int age, bool isMember)
    {
        bool isMinor = age < 18;

        if (isMinor && isMember)
            return 0.2;

        if (isMinor && !isMember)
            return 0.1;

        if (!isMinor && isMember)
            return 0.15;

        return 0.0;
    }
}`
        },
        {
            id: 103,
            title: "Refactor Repeated Code in Username Validation",
            description: "The following function validates a list of usernames. The validation logic is embedded inside the loop. Refactor the code to reduce duplication and improve readability by extracting reusable validation logic.",
            starterCode: `using System;
using System.Collections.Generic;

public class Program
{
    public static void Main()
    {
        var usernames = new List<string> { "Alice", "Bob123", "John Doe", "Anna" };
        var valid = ValidateUsernames(usernames);
        Console.WriteLine(string.Join(",", valid));
    }

    public static List<string> ValidateUsernames(List<string> usernames)
    {
        List<string> valid = new List<string>();

        foreach (var name in usernames)
        {
            // validation logic is embedded here
            if (name.Length >= 5 && name.Length <= 10 && !name.Contains(" "))
            {
                valid.Add(name);
            }
        }

        return valid;
    }
}`,
            hints: [
                "Extract the validation logic into a separate method.",
                "The refactoring should not change the behavior.",
                "A small helper method can make the main loop easier to read."
            ],
            solution: `using System;
using System.Collections.Generic;

public class Program
{
    public static void Main()
    {
        var usernames = new List<string> { "Alice", "Bob123", "John Doe", "Anna" };
        var valid = ValidateUsernames(usernames);
        Console.WriteLine(string.Join(",", valid));
    }

    public static List<string> ValidateUsernames(List<string> usernames)
    {
        List<string> valid = new List<string>();

        foreach (var name in usernames)
        {
            if (IsValidUsername(name))
            {
                valid.Add(name);
            }
        }

        return valid;
    }

    // extracted reusable validation logic
    private static bool IsValidUsername(string name)
    {
        return name.Length >= 5
               && name.Length <= 10
               && !name.Contains(" ");
    }
}`
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
            description: "You have a simple Calculator class. The current test code incorrectly verifies the divide-by-zero scenario as a normal value. Update the tests so that the exception case is validated correctly.",
            starterCode: `using System;

public class Calculator
{
    public int Add(int a, int b) => a + b;
    public int Divide(int a, int b) => a / b;
}

public class Program
{
    public static void Main()
    {
        Calculator calc = new Calculator();

        Console.WriteLine("---- Running tests (Problem Code) ----");

        AssertEqual(5, calc.Add(2, 3), "Add(2,3)");
        AssertEqual(-1, calc.Add(-2, 1), "Add(-2,1)");
        AssertEqual(2, calc.Divide(4, 2), "Divide(4,2)");

        // ❌ WRONG test: exception case is tested like a normal value
        // Program will crash here
        AssertEqual(0, calc.Divide(5, 0), "Divide(5,0)");
    }

    private static void AssertEqual(int expected, int actual, string testName)
    {
        if (expected == actual)
            Console.WriteLine("PASS : " + testName);
        else
            Console.WriteLine("FAIL : " + testName +
                              " expected=" + expected +
                              " actual=" + actual);
    }
}`,
            hints: [
                "Division by zero throws an exception, it should not be tested like a normal return value.",
                "Create a separate assertion method for exception cases.",
                "Use try-catch to validate that DivideByZeroException is thrown."
            ],
            solution: `using System;

public class Calculator
{
    public int Add(int a, int b) => a + b;
    public int Divide(int a, int b) => a / b;
}

public class Program
{
    public static void Main()
    {
        Calculator calc = new Calculator();

        Console.WriteLine("---- Running tests (Solution Code) ----");

        AssertEqual(5, calc.Add(2, 3), "Add(2,3)");
        AssertEqual(-1, calc.Add(-2, 1), "Add(-2,1)");
        AssertEqual(2, calc.Divide(4, 2), "Divide(4,2)");

        AssertThrowsDivideByZero(calc, "Divide(5,0)");
    }

    private static void AssertEqual(int expected, int actual, string testName)
    {
        if (expected == actual)
            Console.WriteLine("PASS : " + testName);
        else
            Console.WriteLine("FAIL : " + testName +
                              " expected=" + expected +
                              " actual=" + actual);
    }

    private static void AssertThrowsDivideByZero(Calculator calc, string testName)
    {
        try
        {
            calc.Divide(5, 0);
            Console.WriteLine("FAIL : " + testName + " (exception expected)");
        }
        catch (DivideByZeroException)
        {
            Console.WriteLine("PASS : " + testName + " (DivideByZeroException)");
        }
    }
}`
        },
        {
            id: 202,
            title: "Test Email Validation",
            description: "The current email validation logic is too weak and allows some invalid email formats to pass. Run the given tests, identify the failing case, and fix the validation logic without changing the test code.",
            starterCode: `using System;

public class EmailValidator
{
    // BUG: validation is too weak
    public bool IsValidEmail(string email)
    {
        return email != null
            && email.Contains("@")
            && email.Contains(".");
    }
}

public class Program
{
    public static void Main()
    {
        EmailValidator validator = new EmailValidator();

        Console.WriteLine("---- Running tests (Problem Code) ----");

        RunTest(true,  validator.IsValidEmail("user@example.com"), "Valid email");
        RunTest(false, validator.IsValidEmail("userexample.com"), "Missing @");
        RunTest(false, validator.IsValidEmail("user@examplecom"), "Missing dot");
        RunTest(false, validator.IsValidEmail(""), "Empty string");
        RunTest(false, validator.IsValidEmail(null), "Null input");

        // This test SHOULD FAIL with current implementation
        RunTest(false, validator.IsValidEmail("user.example@com"),
            "Dot before @ (invalid format)");
    }

    private static void RunTest(bool expected, bool actual, string testName)
    {
        if (expected == actual)
            Console.WriteLine("PASS : " + testName);
        else
            Console.WriteLine("FAIL : " + testName +
                              " expected=" + expected +
                              " actual=" + actual);
    }
}`,
            hints: [
                "The current implementation only checks for the presence of '@' and '.'.",
                "Ensure there is exactly one '@' character.",
                "Ensure the dot appears after the '@' and is not the last character.",
                "Do not change the test code—fix only the validation logic."
            ],
            solution: `using System;

public class EmailValidator
{
    // FIX: stricter validation without changing test code
    public bool IsValidEmail(string email)
    {
        if (string.IsNullOrEmpty(email))
            return false;

        int atIndex = email.IndexOf('@');
        int lastDotIndex = email.LastIndexOf('.');

        // must contain exactly one '@'
        if (atIndex <= 0)
            return false;

        if (email.LastIndexOf('@') != atIndex)
            return false;

        // dot must be after @ and not at the end
        if (lastDotIndex < atIndex + 2)
            return false;

        if (lastDotIndex == email.Length - 1)
            return false;

        return true;
    }
}

public class Program
{
    public static void Main()
    {
        EmailValidator validator = new EmailValidator();

        Console.WriteLine("---- Running tests (Solution Code) ----");

        RunTest(true,  validator.IsValidEmail("user@example.com"), "Valid email");
        RunTest(false, validator.IsValidEmail("userexample.com"), "Missing @");
        RunTest(false, validator.IsValidEmail("user@examplecom"), "Missing dot");
        RunTest(false, validator.IsValidEmail(""), "Empty string");
        RunTest(false, validator.IsValidEmail(null), "Null input");
        RunTest(false, validator.IsValidEmail("user.example@com"),
            "Dot before @ (invalid format)");
    }

    private static void RunTest(bool expected, bool actual, string testName)
    {
        if (expected == actual)
            Console.WriteLine("PASS : " + testName);
        else
            Console.WriteLine("FAIL : " + testName +
                              " expected=" + expected +
                              " actual=" + actual);
    }
}`
        },
        {
            id: 203,
            title: "Test Shopping Cart Total",
            description: "Write tests to verify the GetTotal method of a ShoppingCart class, including empty cart, single item, and multiple items. One test currently has an incorrect expected value and must be fixed.",
            starterCode: `using System;
using System.Collections.Generic;

public class ShoppingCart
{
    public List<double> Prices = new List<double>();

    public double GetTotal()
    {
        double total = 0;
        foreach (var price in Prices)
            total += price;

        return total;
    }
}

public class Program
{
    public static void Main()
    {
        Console.WriteLine("---- Running tests (Problem Code) ----");

        // Empty cart
        ShoppingCart cart1 = new ShoppingCart();
        RunTest(0, cart1.GetTotal(), "Empty cart");

        // Single item
        ShoppingCart cart2 = new ShoppingCart();
        cart2.Prices.Add(50);
        RunTest(50, cart2.GetTotal(), "Single item (50)");

        // Multiple items
        ShoppingCart cart3 = new ShoppingCart();
        cart3.Prices.Add(50);
        cart3.Prices.AddRange(new double[] { 10, 20, 30 });

        // ❌ Intentionally wrong expected value to create a failing test
        RunTest(100, cart3.GetTotal(), "Multiple items (50,10,20,30)");
    }

    private static void RunTest(double expected, double actual, string testName)
    {
        if (expected == actual)
            Console.WriteLine("PASS : " + testName);
        else
            Console.WriteLine("FAIL : " + testName +
                              " expected=" + expected +
                              " actual=" + actual);
    }
}`,
            hints: [
                "Check the expected total for the multiple-items test carefully.",
                "Verify the sum of all values added to the Prices list.",
                "Only the test expectation is wrong, not the GetTotal method."
            ],
            solution: `using System;
using System.Collections.Generic;

public class ShoppingCart
{
    public List<double> Prices = new List<double>();

    public double GetTotal()
    {
        double total = 0;
        foreach (var price in Prices)
            total += price;

        return total;
    }
}

public class Program
{
    public static void Main()
    {
        Console.WriteLine("---- Running tests (Solution Code) ----");

        // Empty cart
        ShoppingCart cart1 = new ShoppingCart();
        RunTest(0, cart1.GetTotal(), "Empty cart");

        // Single item
        ShoppingCart cart2 = new ShoppingCart();
        cart2.Prices.Add(50);
        RunTest(50, cart2.GetTotal(), "Single item (50)");

        // Multiple items
        ShoppingCart cart3 = new ShoppingCart();
        cart3.Prices.Add(50);
        cart3.Prices.AddRange(new double[] { 10, 20, 30 });

        // ✅ Correct expected value
        RunTest(110, cart3.GetTotal(), "Multiple items (50,10,20,30)");
    }

    private static void RunTest(double expected, double actual, string testName)
    {
        if (expected == actual)
            Console.WriteLine("PASS : " + testName);
        else
            Console.WriteLine("FAIL : " + testName +
                              " expected=" + expected +
                              " actual=" + actual);
    }
}`
        }
    ],
    performance: [
        {
            id: 302,
            title: "Performance Optimize Fibonacci",
            description: "Compute the nth Fibonacci number. The naive recursive solution is very slow for n > 40. Optimize using memoization or iterative approach. Expected time complexity after optimization: O(n). Assume 0 <= n <= 45.",
            starterCode: `using System;


public class Program
{
public static void Main()
{
Console.WriteLine(Fibonacci(10)); // 55
}


// Naive recursive solution (very slow for n > 40)
public static long Fibonacci(int n)
{
if (n < 0) throw new ArgumentException();


if (n <= 1)
return n;


return Fibonacci(n - 1) + Fibonacci(n - 2);
}
}`,
            hints: [
                "The recursive solution recomputes the same Fibonacci values many times.",
                "Use an iterative bottom-up approach to compute the result in O(n) time.",
                "You can also use memoization to cache already computed values."
            ],
            solution: `using System;


public class Program
{
public static void Main()
{
Console.WriteLine(Fibonacci(10)); // 55
}


// Optimized iterative solution
public static long Fibonacci(int n)
{
if (n < 0) throw new ArgumentException();


if (n <= 1) return n;


long a = 0, b = 1;


for (int i = 2; i <= n; i++)
{
long temp = a + b;
a = b;
b = temp;
}


return b;
}
}`
        },
        {
            id: 303,
            title: "Performance Optimize String Concatenation",
            description: "Concatenating many strings using '+' is slow. Optimize the code using a more efficient method for large n. Expected time complexity after optimization: O(n).",
            starterCode: `using System;


public class Program
{
public static void Main()
{
Console.WriteLine(ConcatNumbers(10)); // 0123456789
}


// Naive and slow approach
public static string ConcatNumbers(int n)
{
string result = "";


for (int i = 0; i < n; i++)
{
result = result + i.ToString(); // slow
}


return result;
}
}`,
            hints: [
                "String concatenation using '+' inside a loop creates many temporary strings.",
                "Use StringBuilder to avoid repeated allocations.",
                "Append values to a buffer and convert to string at the end."
            ],
            solution: `using System;
using System.Text;


public class Program
{
public static void Main()
{
Console.WriteLine(ConcatNumbers(10)); // 0123456789
}


// Optimized approach using StringBuilder
public static string ConcatNumbers(int n)
{
var sb = new StringBuilder();


for (int i = 0; i < n; i++)
{
sb.Append(i.ToString());
}


return sb.ToString();
}
}`
        },
        {
            id: 304,
            title: "Performance Singleton Pattern",
            description: "The snippet shows that the performance and correctness of getting the Singleton instance is problematic in a multi-threaded environment. Identify the cause of the issue and fix it using a thread-safe and efficient approach.",
            starterCode: `using System;
using System.Threading.Tasks;

public class Singleton
{
    private static Singleton _instance;

    private Singleton() { }

    // PROBLEM: Not thread-safe
    public static Singleton Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = new Singleton();
            }
            return _instance;
        }
    }

    public void Show()
    {
        Console.WriteLine("Singleton instance used");
    }
}

// Test / Usage
public class Program
{
    public static void Main()
    {
        Parallel.For(0, 10, i =>
        {
            Singleton.Instance.Show();
        });
    }
}`,
            hints: [
                "The current implementation is not thread-safe and may create multiple instances under concurrency.",
                "Multiple threads can enter the null check at the same time.",
                "Use locking carefully to avoid unnecessary performance overhead.",
                "Double-checked locking is a common pattern to solve this problem."
            ],
            solution: `using System;
using System.Threading.Tasks;

public class Singleton
{
    private static Singleton _instance;
    private static readonly object _lock = new object();

    private Singleton() { }

    // Thread-safe Singleton using double-checked locking
    public static Singleton Instance
    {
        get
        {
            if (_instance == null)
            {
                lock (_lock)
                {
                    if (_instance == null)
                    {
                        _instance = new Singleton();
                    }
                }
            }

            return _instance;
        }
    }

    public void Show()
    {
        Console.WriteLine($"Singleton instance hash: {GetHashCode()}");
    }
}

// Test / Usage
public class Program
{
    public static void Main()
    {
        Parallel.For(0, 10, i =>
        {
            Singleton.Instance.Show();
        });
    }
}`
        },
        {
            id: 305,
            title: "Performance Microservices",
            description: "The following code uses a microservice to retrieve a list of companies' data. While profiling the code, we observed that the microservice is effectively used multiple times because the result is re-enumerated several times. Identify the performance issue and fix it so the microservice result is fetched and enumerated only once.",
            starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

public class CompanyInfo
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public bool IsVip { get; set; }
}

/* --------------------------------------------------
   Fake HttpClient for old compiler
-------------------------------------------------- */
public class HttpClient
{
    public string GetString(string url)
    {
        Console.WriteLine("Microservice called...");

        return
            Guid.NewGuid() + ",A,REPORT COMPANY,true" + Environment.NewLine +
            Guid.NewGuid() + ",B,NORMAL,false" + Environment.NewLine +
            Guid.NewGuid() + ",C,REPORT,false";
    }
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

        if (!companies.Any()) return new CompanyInfo[0];

        var vipCompanies = companies.Where(c => c.IsVip);

        if (vipCompanies.Count() > MaxReportableCompanies)
        {
            return vipCompanies.Take(MaxReportableCompanies);
        }

        var nonVipReportableCompanies = companies
            .Where(c => !c.IsVip)
            .Where(c => c.Description.Contains("REPORT"));

        return vipCompanies.Concat(
            nonVipReportableCompanies.Take(
                MaxReportableCompanies - vipCompanies.Count()));
    }

    private IEnumerable<CompanyInfo> GetCompanyInfoList()
    {
        var text = _httpClient.GetString("/");

        var csvLines = text.Split(
            new[] { Environment.NewLine },
            StringSplitOptions.None);

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
}

/* ---------------- Main ---------------- */

public class Program
{
    public static void Main()
    {
        var httpClient = new HttpClient();
        var service = new CompanyService(httpClient);

        var result = service.GetReportableCompanies().ToList();

        Console.WriteLine("Companies returned: " + result.Count);
    }
}`,
            hints: [
                "The IEnumerable returned by GetCompanyInfoList is enumerated multiple times.",
                "Each LINQ operation such as Any(), Count() and Where() can re-enumerate the source.",
                "Materialize the result once using ToList() before applying multiple queries."
            ],
            solution: `using System;
using System.Collections.Generic;
using System.Linq;

public class CompanyInfo
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public bool IsVip { get; set; }
}

/* Fake HttpClient (same as above) */
public class HttpClient
{
    public string GetString(string url)
    {
        Console.WriteLine("Microservice called...");

        return
            Guid.NewGuid() + ",A,REPORT COMPANY,true" + Environment.NewLine +
            Guid.NewGuid() + ",B,NORMAL,false" + Environment.NewLine +
            Guid.NewGuid() + ",C,REPORT,false";
    }
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
        // FIX: materialize once
        var companies = GetCompanyInfoList().ToList();

        if (!companies.Any()) return new CompanyInfo[0];

        var vipCompanies = companies.Where(c => c.IsVip);

        if (vipCompanies.Count() > MaxReportableCompanies)
        {
            return vipCompanies.Take(MaxReportableCompanies);
        }

        var nonVipReportableCompanies = companies
            .Where(c => !c.IsVip)
            .Where(c => c.Description.Contains("REPORT"));

        return vipCompanies.Concat(
            nonVipReportableCompanies.Take(
                MaxReportableCompanies - vipCompanies.Count()));
    }

    private IEnumerable<CompanyInfo> GetCompanyInfoList()
    {
        var text = _httpClient.GetString("/");

        var csvLines = text.Split(
            new[] { Environment.NewLine },
            StringSplitOptions.None);

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
}

/* ---------------- Main ---------------- */

public class Program
{
    public static void Main()
    {
        var httpClient = new HttpClient();
        var service = new CompanyService(httpClient);

        var result = service.GetReportableCompanies().ToList();

        Console.WriteLine("Companies returned: " + result.Count);
    }
}`
        },
        {
            id: 306,
            title: "Implementing a thread-safe counter",
            description: "You are implementing a thread-safe counter using Interlocked.Increment and Interlocked.Decrement. However, sometimes your code throws a NullReferenceException. Why does this happen, and how can you fix it?",
            starterCode: `using System;
using System.Threading;

public class Counter
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
}

public class Program
{
    public static void Main()
    {
        Counter counter = new Counter();

        // Somewhere in the program, Value becomes null
        counter.Value = null;

        // This will sometimes throw NullReferenceException
        counter.Increment();

        Console.WriteLine(counter.Value);
    }
}`,
            hints: [
                "Interlocked methods do not support nullable variables.",
                "If the field becomes null, Interlocked.Increment cannot operate on it safely.",
                "Use a non-nullable int field for counters that are updated with Interlocked."
            ],
            solution: `using System;
using System.Threading;

public class Counter
{
    // FIX: use non-nullable int
    public int Value = 0;

    public void Increment()
    {
        Interlocked.Increment(ref Value);
    }

    public void Decrement()
    {
        Interlocked.Decrement(ref Value);
    }
}

public class Program
{
    public static void Main()
    {
        Counter counter = new Counter();

        counter.Increment();
        counter.Increment();
        counter.Decrement();

        Console.WriteLine(counter.Value);
    }
}`
        }
    ]
};

export default dotnetQuestions;

