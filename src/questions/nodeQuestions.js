const nodeQuestions = {
  problems: [
    {
      id: 1,
      title: "Display todos with Load More button",
      description: `Given an API returning a list of todos, we want to display the list in a performant way.

Here are the functional requirements:
- Initially, display the first 20 todos. 
- On the top of the page, display the total number of loaded todos.
- Display a "Load More" button, and every time the user clicks on it, fetch and display 20 more todos.
- When the total number of loaded todos reaches 100, the "Load More" button should be hidden.

Use this endpoint URL to get the todos: https://dummyjson.com/todos?limit=20&skip=0.

You may change the skip and limit query params to load new todos. The endpoint will return the following structure with a total of 20 todos:
{
  "todos": [
    {
      "id": 1,
      "todo": "Do something nice for someone I care about",
      "completed": true,
      "userId": 26
    },
  ],
}`,
      starterCode: "",
      hints: [
        "Use fetch or axios to get data from the API.",
        "Keep track of the number of loaded todos to manage the Load More button.",
        "Append new todos to the existing list instead of replacing it."
      ],
      solution: ""
    },
    {
      id: 2,
      title: "Blog comment section with edit",
      description: `/*
While working on the website for a blog you decide to add a simple comment section. This comment section will allow users to make comments on posts, and edit those comments.

The requirements for the comment feature are:
- When run, the page should load 3 comments. The ability to load more than 3 comments is not required at this time.
- Users can click on a comment to open the edit feature.
- In edit mode, there is a "Save" button to the right of the comment.
- Clicking "Save" should return the comment to view mode with the edits applied.

This endpoint can be used to fetch comments for a blog post to test your development: https://dummyjson.com/posts/1/comments?limit=3. Each comment has the following structure:
{
  "comments": [
    {
      "id": 1,
      "userId": 2,
      "body": "This is a comment."
    }
  ]
}*/`,
      starterCode: "",
      hints: [
        "Fetch the comments from the API when the page loads.",
        "Use local state to track which comment is in edit mode.",
        "Update the comment body in state when 'Save' is clicked."
      ],
      solution: ""
    },
    {
      id: 3,
      title: "Find persons with more than 3 connections",
      description: `Based on the given input, find out how many persons have connection with more than 3 persons.
1 – indicate that given two persons are connected and 0 – indicate that person has disconnected.

Input:

Jack	    Jones	  1
Andy	    Mike	  0
Jones	   Andy	  1
Jack	   Mike	  1
Riya	   Jack	  1
Mike	   Jack	  0
Andy	   Riya	  1
Jones      Jack	  0
Mike	   Andy	  0

Print the name of the persons who have more than 3 active connetions.`,
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
        "Create an object or Map to store each person's connection count.",
        "Iterate through the list and increment counts only when the status is `1`.",
        "Finally, filter and return all persons whose count exceeds 3."
      ],
      solution: ""
    },
    {
      id: 4,
      title: "Badge mismatches in entry/exit logs",
      description: `/*
We are working on a security system for a badged-access room in our company's building.

Given an ordered list of employees who used their badge to enter or exit the room, write a function that returns two collections:

1. All employees who didn't use their badge while exiting the room - they recorded an enter without a matching exit. (All employees are required to leave the room before the log ends.)
2. All employees who didn't use their badge while entering the room - they recorded an exit without a matching enter. (The room is empty when the log begins.)

Each collection should contain no duplicates, regardless of how many times a given employee matches the criteria for belonging to it.

records1 = [
  ["Paul", "enter"],
  ["Pauline", "exit"],
  ["Paul", "enter"],
  ["Paul", "exit"],
  ["Martha", "exit"],
  ["Joe", "enter"],
  ["Martha", "enter"],
  ["Steve", "enter"],
  ["Martha", "exit"],
  ["Jennifer", "enter"],
  ["Joe", "enter"],
  ["Curtis", "exit"],
  ["Curtis", "enter"],
  ["Joe", "exit"],
  ["Martha", "enter"],
  ["Martha", "exit"],
  ["Jennifer", "exit"],
  ["Joe", "enter"],
  ["Joe", "enter"],
  ["Martha", "exit"],
  ["Joe", "exit"],
  ["Joe", "exit"]
]

Expected output: ["Steve", "Curtis", "Paul", "Joe"], ["Martha", "Pauline", "Curtis", "Joe"]

Other test cases:

records2 = [
  ["Paul", "enter"],
  ["Paul", "exit"],
]

Expected output: [], []

records3 = [
  ["Paul", "enter"],
  ["Paul", "enter"],
  ["Paul", "exit"],
  ["Paul", "exit"],
]

Expected output: ["Paul"], ["Paul"]

records4 = [
  ["Raj", "enter"],
  ["Paul", "enter"],
  ["Paul", "exit"],
  ["Paul", "exit"],
  ["Paul", "enter"],
  ["Raj", "enter"],
]

Expected output: ["Raj", "Paul"], ["Paul"]

All Test Cases:
mismatches(records1) => ["Steve", "Curtis", "Paul", "Joe"], ["Martha", "Pauline", "Curtis", "Joe"]
mismatches(records2) => [], []
mismatches(records3) => ["Paul"], ["Paul"]
mismatches(records4) => ["Raj", "Paul"], ["Paul"]

n: length of the badge records array
*/`,
      starterCode: `function mismatches(arr){
  const entryset = new Set();
  const exitset = new Set();
  const entryColl = new Set();
  const exitColl = new Set();
  for(let i = 0;i<arr.length;i++){
     if(arr[i][1] === "enter"){
        if(entryset.has(arr[i][0]) == true){
          entryColl.add(arr[i][0]);
        }
        else{
          entryset.add(arr[i][0]);
        }
     }
     else if(arr[i][1] === "exit"){
       if(entryset.has(arr[i][0]) === true){
         entryset.delete(arr[i][0]);
       }
       else{
         exitset.add(arr[i][0]);
       }
     }
  }
  entryset.forEach((value)=>{
    entryColl.add(value);
  });
  
  exitset.forEach((value)=>{
    exitColl.add(value);
  })
  
  return [entryColl , exitColl];
}`,
      hints: [
        "Use sets to track unmatched enter and exit records.",
        "Iterate through the records sequentially and update the sets accordingly.",
        "Return the two collections of mismatched employees without duplicates."
      ],
      solution: ""
    },
    {
      id: 5,
      title: "Castle rooms with treasure filter",
      description: `/*
You are with your friends in a castle, where there are multiple rooms named after flowers. Some of the rooms contain treasures - we call them the treasure rooms. 

Each room contains a single instruction that tells you which room to go to next.

*** instructions_1 and treasure_rooms_1 *** 

lily* ---------      daisy  sunflower
              |        |     |
              v        v     v
jasmin --> tulip*      violet* ----> rose* -->
           ^    |      ^             ^       |
           |    |      |             |       |
           ------    iris            ---------

* denotes a treasure room, e.g., rose is a treasure room, but jasmin isn't.

This is given as a list of pairs of (source_room, destination_room)

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

Write a function that takes two parameters as input:
* a list of instructions represented as pairs of (source_room, destination_room), and
* a list containing the treasure rooms,

and returns a collection of all the rooms that satisfy the following two conditions:
* at least two *other* rooms have instructions pointing to this room
* this room's instruction immediately points to a treasure room 

filter_rooms(instructions_1, treasure_rooms_1) => ["tulip", "violet"]
* tulip can be accessed from rooms lily and jasmin. Tulip's instruction points to a treasure room (tulip itself)
* violet can be accessed from daisy, sunflower and iris. Violet's instruction points to a treasure room (rose)

Additional inputs

treasure_rooms_2 = ["lily", "jasmin", "violet"]  

filter_rooms(instructions_1, treasure_rooms_2) => []
* none of the rooms reachable from tulip or violet are treasure rooms

*** instructions_2 and treasure_rooms_3 *** 

lily ---------          --------
             |          |      |
             v          v      |
jasmin --> tulip ---> violet*--^  

instructions_2 = [ 
    ["jasmin", "tulip"],
    ["lily", "tulip"],
    ["tulip", "violet"],
    ["violet", "violet"]       
]

treasure_rooms_3 = ["violet"]

filter_rooms(instructions_2, treasure_rooms_3) => ["tulip"]
* tulip can be accessed from rooms lily and jasmin. Tulip's instruction points to a treasure room (violet)

All the test cases: 
filter_rooms(instructions_1, treasure_rooms_1)    => ["tulip", "violet"]
filter_rooms(instructions_1, treasure_rooms_2)    => [] 
filter_rooms(instructions_2, treasure_rooms_3)    => ["tulip"]

Complexity Analysis variables:
T: number of treasure rooms
I: number of instructions given
*/`,
      starterCode: "",
      hints: [
        "Create a map to track how many rooms point to each room.",
        "Check if the destination room is a treasure room.",
        "Return only the rooms with at least two incoming instructions and pointing to a treasure room."
      ],
      solution: ""
    },
    {
      id: 6,
      title: "Castle rooms with treasure filter 2",
      description: `/*
You are with your friends in a castle, where there are multiple rooms named after flowers. Some of the rooms contain treasures - we call them the treasure rooms. 

Each room contains a single instruction that tells you which room to go to next.

*** instructions_1 and treasure_rooms_1 *** 

lily* ---------      daisy  sunflower
              |        |     |
              v        v     v
jasmin --> tulip*      violet* ----> rose* -->
           ^    |      ^             ^       |
           |    |      |             |       |
           ------    iris            ---------

* denotes a treasure room, e.g., rose is a treasure room, but jasmin isn't.

This is given as a list of pairs of (source_room, destination_room)

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

Write a function that takes two parameters as input:
* a list of instructions represented as pairs of (source_room, destination_room), and
* a list containing the treasure rooms,

and returns a collection of all the rooms that satisfy the following two conditions:
* at least two *other* rooms have instructions pointing to this room
* this room's instruction immediately points to a treasure room 

filter_rooms(instructions_1, treasure_rooms_1) => ["tulip", "violet"]
* tulip can be accessed from rooms lily and jasmin. Tulip's instruction points to a treasure room (tulip itself)
* violet can be accessed from daisy, sunflower and iris. Violet's instruction points to a treasure room (rose)

Additional inputs

treasure_rooms_2 = ["lily", "jasmin", "violet"]  

filter_rooms(instructions_1, treasure_rooms_2) => []
* none of the rooms reachable from tulip or violet are treasure rooms

*** instructions_2 and treasure_rooms_3 *** 

lily ---------          --------
             |          |      |
             v          v      |
jasmin --> tulip ---> violet*--^  

instructions_2 = [ 
    ["jasmin", "tulip"],
    ["lily", "tulip"],
    ["tulip", "violet"],
    ["violet", "violet"]       
]

treasure_rooms_3 = ["violet"]

filter_rooms(instructions_2, treasure_rooms_3) => ["tulip"]
* tulip can be accessed from rooms lily and jasmin. Tulip's instruction points to a treasure room (violet)

All the test cases: 
filter_rooms(instructions_1, treasure_rooms_1)    => ["tulip", "violet"]
filter_rooms(instructions_1, treasure_rooms_2)    => [] 
filter_rooms(instructions_2, treasure_rooms_3)    => ["tulip"]

Complexity Analysis variables:
T: number of treasure rooms
I: number of instructions given
*/`,
      starterCode: "",
      hints: [
        "Use a map to count incoming edges for each room.",
        "Check the immediate instruction points to a treasure room.",
        "Filter rooms with at least 2 incoming instructions and valid treasure."
      ],
      solution: ""
    },
    {
      id: 7,
      title: "Find employees with multiple badge entries in 1 hour",
      description: `/*
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
*/`,
      starterCode: "",
      hints: [
        "Sort badge entries for each employee by time.",
        "Use a sliding window to check for 3 or more entries within one hour.",
        "Return the earliest window meeting the criteria for each employee."
      ],
      solution: ""
    },
    {
      id: 8,
      title: "Movie recommendations based on similar taste",
      description: `/*
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
*/`,
      starterCode: "",
      hints: [
        "Group the ratings by user for easy lookup.",
        "Find users with similar taste (both rated the same movie 4 or 5).",
        "Recommend movies they rated 4 or 5 which the target user hasn't rated yet."
      ],
      solution: ""
    }
  ]
};
export default nodeQuestions;
