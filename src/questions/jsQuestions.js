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
      hints: [
        "Create an object (or Map) to store each persons connection count.",
        "Iterate through the list and increment counts only when the status is `1`.",
        "Finally, filter and return all persons whose count exceeds 3."
      ],
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
      hints: [
        "Use a Set to track who is currently inside the room.",
        "If someone enters twice without exit, add them to an 'enterWithoutExit' set.",
        "At the end, anyone still inside should also be added to the 'enterWithoutExit' list."
      ],
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
      hints: [
        "Iterate through the array and check if each element is an array using `Array.isArray()`.",
        "Use recursion to flatten subarrays into a result array.",
        "Alternatively, use the ES6 method `arr.flat(Infinity)` for a simpler approach."
      ],
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
      hints: [
        "Notice that all three branches perform the same formula with different rates.",
        "Store discount values in an object with keys like 'student', 'senior', etc.",
        "Use a lookup instead of multiple if/else conditions."
      ],
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
      hints: [
        "Wrap the callback-based functions into Promises.",
        "Use `await` sequentially to call `getUser`, `getPosts`, then `getComments`.",
        "Handle errors using try/catch blocks for cleaner async code."
      ],
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
      hints: [
        "The `includes()` check makes the loop O(n²).",
        "Use a `Set` to track seen elements efficiently.",
        "Convert the Set back into an array using the spread operator."
      ],
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
      hints: [
        "Repeated string concatenation in a loop is slow.",
        "Collect all values in an array first, then join them.",
        "Use `Array.from({ length: n }, (_, i) => i)` to build the sequence efficiently."
      ],
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
      hints: [
        "Write one test for a word that reads the same backward (e.g. 'madam').",
        "Write another test for a non-palindrome word (e.g. 'hello').",
        "Add a test for an empty string — it should be considered a palindrome."
      ],
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
      hints: [
        "Start by testing simple positive numbers like 2 + 3.",
        "Then check edge cases like negative numbers.",
        "Don’t forget to test zeros to ensure no unexpected behavior."
      ],
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
