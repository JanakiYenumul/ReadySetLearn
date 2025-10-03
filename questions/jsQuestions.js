const jsQuestions = {
  problems: [
    {
      id: 1,
      title: "Find persons with more than 3 connections",
      description: `
Based on the given input, find out how many persons have connection with more than 3 persons.
1 : indicates that given two persons are connected and 0 : indicates that person is disconnected.`,
      starterCode: `function findConnections(connections) {
  // TODO: Implement logic
}

const input = [
  ["Jack","Jones",1],
  ["Andy","Mike",0],
  ["Jones","Andy",1],
  ["Jack","Mike",1],
  ["Riya","Jack",1],
  ["Mike","Jack",0],
  ["Andy","Riya",1],
  ["Jones","Jack",0],
  ["Mike","Andy",0],
];

console.log(findConnections(input));`,
      hint: "Use a hashmap to count the active connections of each person.",
      solution: `function findConnections(connections) {
  const map = {};

  for (let [a, b, status] of connections) {
    if (status === 1) {
      map[a] = (map[a] || 0) + 1;
      map[b] = (map[b] || 0) + 1;
    }
  }

  return Object.keys(map).filter(name => map[name] > 3);
}

console.log(findConnections(input));`
    },
    {
      id: 2,
      title: "Badge Access Room Mismatches",
      description: `
Given an ordered list of employees who used their badge to enter or exit the room, return two collections:
1. Employees who entered without exiting
2. Employees who exited without entering.`,
      starterCode: `function mismatches(records) {
  // TODO: Implement logic
}

const records1 = [
  ["Paul", "enter"],
  ["Pauline", "exit"],
  ["Paul", "enter"],
  ["Paul", "exit"],
  ["Martha", "exit"],
  ["Joe", "enter"],
];

console.log(mismatches(records1));`,
      hint: "Use sets to track who is currently inside and mismatched logs.",
      solution: `function mismatches(records) {
  const enterWithoutExit = new Set();
  const exitWithoutEnter = new Set();
  const inside = new Set();

  for (let [name, action] of records) {
    if (action === "enter") {
      if (inside.has(name)) enterWithoutExit.add(name);
      inside.add(name);
    } else {
      if (!inside.has(name)) exitWithoutEnter.add(name);
      else inside.delete(name);
    }
  }

  for (let name of inside) enterWithoutExit.add(name);

  return [[...enterWithoutExit], [...exitWithoutEnter]];
}`
    },
    {
      id: 3,
      title: "Blog Comment Editing Feature",
      description: `
Build a simple comment section for a blog.
- Load 3 comments from https://dummyjson.com/posts/1/comments?limit=3
- Users can click a comment to enter edit mode
- Clicking "Save" should update the comment.`,
      starterCode: `// React starter
import React, { useState, useEffect } from "react";

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/posts/1/comments?limit=3")
      .then(res => res.json())
      .then(data => setComments(data.comments));
  }, []);

  return (
    <div>
      <h2>Comments</h2>
      {comments.map(c => (
        <div key={c.id}>{c.body}</div>
      ))}
    </div>
  );
}

export default Comments;`,
      hint: "Use `useState` to toggle between view and edit mode for each comment.",
      solution: `import React, { useState, useEffect } from "react";

function Comments() {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/posts/1/comments?limit=3")
      .then(res => res.json())
      .then(data => setComments(data.comments));
  }, []);

  const saveComment = (id) => {
    setComments(comments.map(c =>
      c.id === id ? { ...c, body: editText } : c
    ));
    setEditingId(null);
    setEditText("");
  };

  return (
    <div>
      <h2>Comments</h2>
      {comments.map(c => (
        <div key={c.id}>
          {editingId === c.id ? (
            <>
              <input value={editText} onChange={e => setEditText(e.target.value)} />
              <button onClick={() => saveComment(c.id)}>Save</button>
            </>
          ) : (
            <div onClick={() => { setEditingId(c.id); setEditText(c.body); }}>
              {c.body}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Comments;`
    },
    {
      id: 4,
      title: "Flatten Nested Arrays",
      description: `
Write a function that flattens a deeply nested array into a single-level array.

Example:
Input: [1, [2, [3, [4]], 5]]
Output: [1,2,3,4,5]`,
      starterCode: `function flattenArray(arr) {
  // TODO: Implement
}

console.log(flattenArray([1, [2, [3, [4]], 5]]));`,
      hint: "Use recursion or stack to process nested arrays.",
      solution: `function flattenArray(arr) {
  const result = [];

  function helper(sub) {
    for (let val of sub) {
      if (Array.isArray(val)) helper(val);
      else result.push(val);
    }
  }

  helper(arr);
  return result;
}

console.log(flattenArray([1, [2, [3, [4]], 5]]));`
    }
  ],

  refactor: [
    {
      id: 5,
      title: "Refactor Duplicate Code",
      description: `
Refactor the function below to remove duplication and improve readability.`,
      starterCode: `function calculateDiscount(price, type) {
  if (type === "student") {
    return price - price * 0.1;
  }
  if (type === "senior") {
    return price - price * 0.2;
  }
  if (type === "veteran") {
    return price - price * 0.3;
  }
  return price;
}`,
      hint: "Use a lookup object or map instead of multiple if statements.",
      solution: `function calculateDiscount(price, type) {
  const discounts = { student: 0.1, senior: 0.2, veteran: 0.3 };
  return price - price * (discounts[type] || 0);
}`
    },
    {
      id: 6,
      title: "Refactor Callback Hell",
      description: `
The following code suffers from callback hell. Refactor it using async/await.`,
      starterCode: `getUser(function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      console.log(comments);
    });
  });
});`,
      hint: "Wrap functions in promises and use async/await.",
      solution: `async function fetchUserComments() {
  const user = await getUser();
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  console.log(comments);
}`
    }
  ],

  performance: [
    {
      id: 7,
      title: "Optimize Array Deduplication",
      description: `
Current implementation of removing duplicates is O(n^2). Optimize it.`,
      starterCode: `function removeDuplicates(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}`,
      hint: "Use a Set for O(n) performance.",
      solution: `function removeDuplicates(arr) {
  return [...new Set(arr)];
}`
    },
    {
      id: 8,
      title: "Optimize String Concatenation",
      description: `
The function builds a large string inefficiently. Optimize the implementation.`,
      starterCode: `function buildString(n) {
  let str = "";
  for (let i = 0; i < n; i++) {
    str += i + ",";
  }
  return str;
}`,
      hint: "Use arrays and join for better performance.",
      solution: `function buildString(n) {
  return Array.from({ length: n }, (_, i) => i).join(",");
}`
    }
  ],

  unitTests: [
    {
      id: 9,
      title: "Test Palindrome Checker",
      description: `
Write unit tests for the palindrome checker function.`,
      starterCode: `function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}

// TODO: write tests using Jest
`,
      hint: "Cover cases: palindrome, non-palindrome, empty string.",
      solution: `test("isPalindrome returns true for palindrome", () => {
  expect(isPalindrome("madam")).toBe(true);
});

test("isPalindrome returns false for non-palindrome", () => {
  expect(isPalindrome("hello")).toBe(false);
});

test("isPalindrome handles empty string", () => {
  expect(isPalindrome("")).toBe(true);
});`
    },
    {
      id: 10,
      title: "Test Sum Function",
      description: `
Write unit tests for the sum function.`,
      starterCode: `function sum(a, b) {
  return a + b;
}

// TODO: write tests using Jest
`,
      hint: "Test positive, negative, and zero values.",
      solution: `test("sum of two positive numbers", () => {
  expect(sum(2, 3)).toBe(5);
});

test("sum of positive and negative numbers", () => {
  expect(sum(-2, 3)).toBe(1);
});

test("sum of zeros", () => {
  expect(sum(0, 0)).toBe(0);
});`
    }
  ]
};

export default jsQuestions;
 
