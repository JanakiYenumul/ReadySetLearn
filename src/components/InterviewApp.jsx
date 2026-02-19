import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

import javaQuestions from "../questions/javaQuestions";
import jsQuestions from "../questions/jsQuestions";
import dotnetQuestions from "../questions/dotnetQuestions";
import nodeQuestions from "../questions/nodeQuestions";
import sqlQuestions from "../questions/sqlQuestions";
import pythonQuestions from "../questions/pythonQuestions";

const JUDGE0_API = "https://ce.judge0.com";

const LANGUAGE_MAP = {
  javascript: 63,
  java: 62,
  dotnet: 51,
  nodejs: 63,
  sql: 71, 
  python: 71,
};

const QUESTIONS_BY_TECH = {
  java: javaQuestions,
  javascript: jsQuestions,
  dotnet: dotnetQuestions,
  nodejs: nodeQuestions,
  sql: sqlQuestions,
  python: pythonQuestions, 
};

export default function InterviewApp() {
  const [tech, setTech] = useState("javascript");
  const [category, setCategory] = useState("problems");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [code, setCode] = useState("// Select a question to start coding");
  const [output, setOutput] = useState("");
  const [hint, setHint] = useState("");
  const [solution, setSolution] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [loading, setLoading] = useState(false);

  // Timer
  const [timeLeft, setTimeLeft] = useState(5);
  const timerRef = useRef(null);

  // Hint & solution state
  const [hintCount, setHintCount] = useState(0);
  const [solutionUnlocked, setSolutionUnlocked] = useState(false);

  const questionsData = QUESTIONS_BY_TECH[tech];

  const handleQuestionChange = (e) => {
    const selected = e.target.value;
    setSelectedQuestion(selected);
    if (selected) {
      const q = questionsData[category].find((q) => q.title === selected);

      // Choose comment style based on language/tech
      const getCommentStyle = (lang) => {
        switch (lang) {
          case "python":
            return { prefix: "# ", suffix: "", linePrefix: true };
          case "sql":
            return { prefix: "-- ", suffix: "", linePrefix: true };
          case "javascript":
          case "nodejs":
          case "java":
          case "dotnet":
          default:
            return { prefix: "/*", suffix: "*/", linePrefix: false };
        }
      };

      const getDefaultStarter = (lang) => {
        switch (lang) {
          case "python":
            return "# No starter code available";
          case "sql":
            return "-- No starter code available";
          case "java":
          case "dotnet":
            return "/* No starter code available */";
          default:
            return "// No starter code available";
        }
      };

      const style = getCommentStyle(tech);
      let questionAsComment = "";

      if (style.linePrefix) {
        const desc = q?.description || "";
        const lines = desc.split("\n").map((l) => (l.trim() ? `${style.prefix}${l.trim()}` : style.prefix.trim()));
        questionAsComment = lines.join("\n") + "\n\n";
      } else {
        questionAsComment = `${style.prefix}\n${q?.description}\n${style.suffix}\n\n`;
      }

      setCode(questionAsComment + (q?.starterCode || getDefaultStarter(tech)));
      setHint("");
      setSolution(q?.solution || "");
      setShowSolution(false);
      setOutput("");
      setHintCount(0);
      setSolutionUnlocked(false);

      const duration = category === "problems" ? 5 : 5;
      setTimeLeft(duration);
    }
  };

  useEffect(() => {
    if (!selectedQuestion) return;

    if (timeLeft === 0) {
      clearInterval(timerRef.current);
      alert("⏰ Time up! You can now view the solution.");
      setSolutionUnlocked(true); // unlock solution
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [selectedQuestion, timeLeft]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

 const getHint = () => {
  if (!selectedQuestion) return setHint("Select a question first.");
  if (solutionUnlocked) return;

  const q = questionsData[category].find((q) => q.title === selectedQuestion);

  if (Array.isArray(q?.hints) && hintCount < q.hints.length) {
    const nextHint = q.hints[hintCount]; 
    setHint((prev) => (prev ? `${prev}\n\n${nextHint}` : nextHint));
    setHintCount((prev) => prev + 1);
  } else if (!Array.isArray(q?.hints)) {
    setHint(q?.hint || "No hint available.");
  } else {
    setHint("No more hints available.");
  }
};


  const handleShowSolution = () => {
    if (!selectedQuestion) return;
    setShowSolution(true);
    setSolutionUnlocked(true);
  };

  // const runCode = async () => {
  //   if (!selectedQuestion) return setOutput("Select a question first.");
  //   if (!code.trim()) return setOutput("Code editor is empty.");
  //   //if (timeLeft <= 0) return setOutput("⏰ Time is up! Please select another question.");

  //   setLoading(true);
  //   setOutput("Running...");

  //   try {
  //     const res = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false&wait=true`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         source_code: code,
  //         language_id: LANGUAGE_MAP[tech],
  //         stdin: "",
  //       }),
  //     });

  //     const data = await res.json();

  //     if (data.stderr) setOutput(`Runtime Error:\n${data.stderr}`);
  //     else if (data.compile_output) setOutput(`Compilation Error:\n${data.compile_output}`);
  //     else if (data.stdout) setOutput(data.stdout.trim());
  //     else setOutput("No output.");
  //   } catch (err) {
  //     console.error(err);
  //     setOutput("Execution failed.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const runCode = async () => {
  if (!selectedQuestion) return setOutput("Select a question first.");
  if (!code.trim()) return setOutput("Code editor is empty.");

  setLoading(true);
  setOutput("Running...");

  try {
    const q = questionsData[category].find(
      (q) => q.title === selectedQuestion
    );

    let sourceCode = code;
    let languageId = LANGUAGE_MAP[tech];

    // ============================
    // SQL EXECUTION FIX
    // ============================
    if (tech === "sql") {
      // Remove SQL comments
      const cleanedQuery = code
        .replace(/--.*$/gm, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .trim();

      // Optional: allow only SELECT
      if (!/^select/i.test(cleanedQuery)) {
        setOutput("Only SELECT queries are allowed.");
        setLoading(false);
        return;
      }

      // Wrap inside Python SQLite driver
      sourceCode = `
import sqlite3, csv, sys

schema_sql = """
${q.schemaSql}
"""

user_query = """
${cleanedQuery}
"""

try:
    conn = sqlite3.connect(":memory:")
    cur = conn.cursor()
    cur.executescript(schema_sql)
    cur.execute(user_query)
    rows = cur.fetchall()
    w = csv.writer(sys.stdout, lineterminator="\\n")
    for r in rows:
        w.writerow(r)
except Exception as e:
    print("___ERROR___")
    print(str(e))
`;

      languageId = 71; // Python 3
    }

    const res = await fetch(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: sourceCode,
          language_id: languageId,
          stdin: ""
        }),
      }
    );

    const data = await res.json();

    if (data.stdout?.startsWith("___ERROR___")) {
      setOutput("SQL Error:\n" + data.stdout);
    } else if (data.stderr) {
      setOutput(`Runtime Error:\n${data.stderr}`);
    } else if (data.compile_output) {
      setOutput(`Compilation Error:\n${data.compile_output}`);
    } else if (data.stdout) {
      setOutput(data.stdout.trim());
    } else {
      setOutput("No output.");
    }
  } catch (err) {
    console.error(err);
    setOutput("Execution failed.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{ fontFamily: "sans-serif", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav style={{ background: "rgba(133, 61, 210, 1)", color: "#fff", padding: "15px", display: "flex", justifyContent: "space-between", gap: 8 }}>
        <div style={{ fontSize: 20 }}>Ready Set Learn</div>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            value={tech}
            onChange={(e) => {
              const newTech = e.target.value;
              setTech(newTech);
              setSelectedQuestion("");
              // Use appropriate comment style for the new language
              const commentMap = {
                python: "# Select a question to start coding",
                sql: "-- Select a question to start coding",
              };
              setCode(commentMap[newTech] || "// Select a question to start coding");
            }}
          >
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="dotnet">DOTNET</option>
            <option value="nodejs">NodeJs</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
          </select>
        </div>
      </nav>

      {/* Question Selector */}
      <div style={{ textAlign: "center", padding: 8, margin: "7px 0 5px" }}>
        <label style={{ marginRight: 8 }}>Category:</label>
        <select
          style={{ width: "15%", padding: "6px 10px" }}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSelectedQuestion("");
            setCode("// Select a question to start coding");
          }}
        >
          <option value="performance">Performance Improvement</option>
          <option value="refactor">Code Refactoring</option>
          <option value="unitTests">Fixing Unit Tests</option>
          <option value="problems">Problem Statements</option>
        </select>

        <label style={{ marginLeft: 8, marginRight: 8 }}>Choose Question:</label>
        <select value={selectedQuestion} onChange={handleQuestionChange} style={{ width: "50%", padding: "6px 10px" }}>
          <option value="">-- Select a question --</option>
          {questionsData?.[category]?.map((q, i) => (
            <option key={i} value={q.title}>
              {q.title.length > 100 ? q.title.slice(0, 100) + "..." : q.title}
            </option>
          ))}
        </select>

        {/* Timer */}
        {selectedQuestion && (
          <span style={{ marginLeft: 20, fontWeight: "bold", color: timeLeft <= 60 ? "red" : "green" }}>
            ⏳ {formatTime(timeLeft)} Left
          </span>
        )}
      </div>

      {/* Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 450px", gap: 12, padding: 12, flex: 1, minHeight: 0 }}>
        {/* Code Editor */}
        <div style={{ minHeight: 0 }}>
          <Editor
            height="100%"
            defaultLanguage={tech === "java" ? "java" : tech}
            value={code}
            onChange={(val) => setCode(val)}
            theme="vs-dark"
            options={{
              automaticLayout: true,
              renderValidationDecorations: tech === "java" || tech === "sql" || tech === "dotnet" ? "off" : "on",
            }}
          />
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
          {/* Buttons above Output */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 4 }}>
            {/* Run Code Button */}
            <button
              onClick={runCode}
              disabled={loading}
              style={{
                backgroundColor: loading ? "grey" : "rgba(133, 61, 210, 1)",
                color: "white",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                padding: "6px 10px",
              }}
            >
              Run Code
            </button>

            {/* Get Hint Button */}
            <button
              onClick={getHint}
              disabled={!selectedQuestion || solutionUnlocked || hintCount >= 3 || timeLeft <= 0}
              style={{
                backgroundColor:
                  !selectedQuestion || solutionUnlocked || hintCount >= 3 || timeLeft <= 0
                    ? "grey"
                    : "rgba(133, 61, 210, 1)",
                color: "white",
                border: "none",
                cursor:
                  !selectedQuestion || solutionUnlocked || hintCount >= 3 || timeLeft <= 0
                    ? "not-allowed"
                    : "pointer",
                padding: "6px 10px",
              }}
            >
              Get Hint ({3 - hintCount} left)
            </button>

            {/* Get Solution Button */}
            <button
              onClick={handleShowSolution}
              disabled={!selectedQuestion || (!solutionUnlocked && timeLeft > 0)}
              style={{
                backgroundColor:
                  !selectedQuestion || (!solutionUnlocked && timeLeft > 0)
                    ? "grey"
                    : "rgba(133, 61, 210, 1)",
                color: "white",
                border: "none",
                cursor:
                  !selectedQuestion || (!solutionUnlocked && timeLeft > 0)
                    ? "not-allowed"
                    : "pointer",
                padding: "6px 10px",
              }}
            >
              Get Solution
            </button>
          </div>


          {/* Output */}
          <div style={{ flex: 1, overflow: "auto", border: "1px solid #ddd", padding: 5, background: "#fff", marginBottom: 8 }}>
            <h3>Output</h3>
            <pre style={{ textAlign: "left" }}>{output}</pre>
          </div>

          {/* Hint & Solution */}
          <div style={{ flex: 1, overflow: "auto", border: "1px solid #ddd", padding: 5, background: "#fff" }}>
            <h3>Hint & Solution</h3>
            {hint && (
              <>
                <h4>Hint</h4>
                <pre style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>{hint}</pre>
              </>
            )}
            {showSolution && solution && (
              <>
                <h4>Solution</h4>
                <pre style={{ textAlign: "left" }}>{solution}</pre>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}