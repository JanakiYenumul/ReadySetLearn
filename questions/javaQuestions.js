const javaQuestions = {
    problems: [
        {
            id: 1,
            title: "Library Book Management",
            category: "Problem Statements",
            description: `
A public library maintains a record of books and borrowers.
You need to design a system to track borrowed books and calculate overdue fines.
 
Definitions:
- Book: has an ID, title, and author.
- Borrower: has an ID and name.
- Fine: if a book is overdue, borrower pays ₹5 per extra day.
 
Tasks:
1. Create a Book class with id, title, and author.
2. Create a Borrower class with id, name, and borrowed book info.
3. Implement a method calculateFine(int daysBorrowed) that returns fine if days > 14.
4. Write a main method to test borrowing a book and computing fine.
        `,
            starterCode: `
class Book {
    int id;
    String title;
    String author;
 
    // Constructor missing
}
 
class Borrower {
    int id;
    String name;
    Book borrowedBook;
 
    // TODO: Add constructor
 
    public int calculateFine(int daysBorrowed) {
        // TODO: Implement fine calculation
        return 0;
    }
}
 
public class LibrarySystem {
    public static void main(String[] args) {
        // TODO: Create a Book and Borrower
        // Borrow book for 20 days and print fine
    }
}
        `,
            hint: "Fine is only charged if daysBorrowed > 14. Calculate extra days and multiply by 5.",
            solution: `
class Book {
    int id;
    String title;
    String author;
 
    public Book(int id, String title, String author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }
}
 
class Borrower {
    int id;
    String name;
    Book borrowedBook;
 
    public Borrower(int id, String name, Book borrowedBook) {
        this.id = id;
        this.name = name;
        this.borrowedBook = borrowedBook;
    }
 
    public int calculateFine(int daysBorrowed) {
        if (daysBorrowed > 14) {
            return (daysBorrowed - 14) * 5;
        }
        return 0;
    }
}
 
public class LibrarySystem {
    public static void main(String[] args) {
        Book b1 = new Book(101, "Java Basics", "James Gosling");
        Borrower br1 = new Borrower(1, "Rahul", b1);
 
        int fine = br1.calculateFine(20);
        System.out.println("Fine to pay: ₹" + fine);
    }
}
        `
        },
        {
            id: 2,
            title: "Online Food Ordering",
            category: "Problem Statements",
            description: `
An online food app tracks restaurant orders.
You must implement order management and calculate bills with delivery charges.
 
Definitions:
- FoodItem: has name and price.
- Order: consists of multiple food items.
- Bill: total price + ₹30 delivery charge.
 
Tasks:
1. Create FoodItem class with name and price.
2. Create Order class that stores an array of food items.
3. Implement calculateBill() method.
4. Test the system by creating an order of 3 items.
        `,
            starterCode: `
class FoodItem {
    String name;
    int price;
    // TODO: Constructor
}
 
class Order {
    FoodItem[] items;
 
    // TODO: Constructor
 
    public int calculateBill() {
        // TODO: Add food prices and delivery charge
        return 0;
    }
}
 
public class FoodApp {
    public static void main(String[] args) {
        // TODO: Create 3 food items and order
        // Print final bill
    }
}
        `,
            hint: "Iterate over the FoodItem array, sum prices, then add 30 delivery charge.",
            solution: `
class FoodItem {
    String name;
    int price;
 
    public FoodItem(String name, int price) {
        this.name = name;
        this.price = price;
    }
}
 
class Order {
    FoodItem[] items;
 
    public Order(FoodItem[] items) {
        this.items = items;
    }
 
    public int calculateBill() {
        int total = 0;
        for (FoodItem item : items) {
            total += item.price;
        }
        return total + 30; // delivery charge
    }
}
 
public class FoodApp {
    public static void main(String[] args) {
        FoodItem f1 = new FoodItem("Pizza", 200);
        FoodItem f2 = new FoodItem("Burger", 100);
        FoodItem f3 = new FoodItem("Juice", 50);
 
        FoodItem[] arr = {f1, f2, f3};
        Order order = new Order(arr);
 
        System.out.println("Final Bill: ₹" + order.calculateBill());
    }
}
        `
        },
        {
            id: 3,
            title: "Movie Ticket Booking",
            category: "Problem Statements",
            description: `
A cinema hall manages movie bookings.
Implement a ticket booking system and calculate revenue.
 
Definitions:
- Movie: has name and ticket price.
- Customer: books tickets for a movie.
- Revenue: sum of all ticket sales.
 
Tasks:
1. Create Movie class with name and price.
2. Create Customer class that stores tickets booked.
3. Implement totalCost() for each customer.
4. Test with 3 customers booking tickets.
        `,
            starterCode: `
class Movie {
    String name;
    int price;
    // TODO: Constructor
}
 
class Customer {
    String name;
    int tickets;
    Movie movie;
 
    // TODO: Constructor
 
    public int totalCost() {
        // TODO: Return tickets * movie price
        return 0;
    }
}
 
public class CinemaHall {
    public static void main(String[] args) {
        // TODO: Create Movie and 3 Customers
        // Calculate total revenue
    }
}
        `,
            hint: "Revenue = sum of all customer ticket costs.",
            solution: `
class Movie {
    String name;
    int price;
 
    public Movie(String name, int price) {
        this.name = name;
        this.price = price;
    }
}
 
class Customer {
    String name;
    int tickets;
    Movie movie;
 
    public Customer(String name, int tickets, Movie movie) {
        this.name = name;
        this.tickets = tickets;
        this.movie = movie;
    }
 
    public int totalCost() {
        return tickets * movie.price;
    }
}
 
public class CinemaHall {
    public static void main(String[] args) {
        Movie m1 = new Movie("Inception", 150);
 
        Customer c1 = new Customer("Aman", 2, m1);
        Customer c2 = new Customer("Priya", 3, m1);
        Customer c3 = new Customer("Vikram", 1, m1);
 
        int revenue = c1.totalCost() + c2.totalCost() + c3.totalCost();
        System.out.println("Total Revenue: ₹" + revenue);
    }
}
        `
        },
        {
            id: 4,
            title: "Online Shopping Cart",
            category: "Problem Statements",
            description: `
An e-commerce platform tracks shopping carts.
Build a system to calculate total bill with discounts.
 
Definitions:
- Product: has name and price.
- Cart: holds multiple products.
- Discount: if bill > ₹500, apply 10% discount.
 
Tasks:
1. Create Product class with name and price.
2. Create Cart class with array of products.
3. Implement calculateBill() with discount logic.
4. Test with 4 products.
        `,
            starterCode: `
class Product {
    String name;
    int price;
    // TODO: Constructor
}
 
class Cart {
    Product[] items;
 
    // TODO: Constructor
 
    public double calculateBill() {
        // TODO: Implement discount logic
        return 0;
    }
}
 
public class ShoppingApp {
    public static void main(String[] args) {
        // TODO: Create 4 products and add to cart
        // Print final bill
    }
}
        `,
            hint: "If total > 500, apply 10% discount. Otherwise return total.",
            solution: `
class Product {
    String name;
    int price;
 
    public Product(String name, int price) {
        this.name = name;
        this.price = price;
    }
}
 
class Cart {
    Product[] items;
 
    public Cart(Product[] items) {
        this.items = items;
    }
 
    public double calculateBill() {
        int total = 0;
        for (Product p : items) {
            total += p.price;
        }
        if (total > 500) {
            return total * 0.9; // 10% discount
        }
        return total;
    }
}
 
public class ShoppingApp {
    public static void main(String[] args) {
        Product p1 = new Product("Shoes", 300);
        Product p2 = new Product("T-Shirt", 200);
        Product p3 = new Product("Watch", 250);
        Product p4 = new Product("Cap", 100);
 
        Product[] arr = {p1, p2, p3, p4};
        Cart cart = new Cart(arr);
 
        System.out.println("Final Bill: ₹" + cart.calculateBill());
    }
}
        `
        }
    ],
 
    refactor: [
        {
            id: 1,
            title: "Refactor Student Grade Calculator",
            description: `
The code calculates average grade for students but violates OOP principles.
Refactor it to improve readability and encapsulation.
        `,
            starterCode: `
class Student {
    String name;
    int[] marks;
 
    public Student(String n, int[] m) {
        name = n;
        marks = m;
    }
}
 
public class GradeApp {
    public static void main(String[] args) {
        int[] marks = {80, 90, 70};
        Student s = new Student("Ravi", marks);
 
        int sum = 0;
        for (int i = 0; i < s.marks.length; i++) {
            sum += s.marks[i];
        }
        int avg = sum / s.marks.length;
        System.out.println("Average: " + avg);
    }
}
        `,
            hint: "Move calculation logic into Student class. Apply encapsulation.",
            solution: `
class Student {
    private String name;
    private int[] marks;
 
    public Student(String name, int[] marks) {
        this.name = name;
        this.marks = marks;
    }
 
    public double getAverage() {
        int sum = 0;
        for (int mark : marks) sum += mark;
        return (double) sum / marks.length;
    }
}
 
public class GradeApp {
    public static void main(String[] args) {
        int[] marks = {80, 90, 70};
        Student s = new Student("Ravi", marks);
        System.out.println("Average: " + s.getAverage());
    }
}
        `
        },
        {
            id: 2,
            title: "Refactor Nested If-Else",
            description: `
The code uses nested if-else for calculating discount. Refactor using cleaner logic (switch/ternary/strategy).
        `,
            starterCode: `
public class DiscountApp {
    public static void main(String[] args) {
        String type = "GOLD";
        if (type.equals("SILVER")) {
            System.out.println("5% discount");
        } else {
            if (type.equals("GOLD")) {
                System.out.println("10% discount");
            } else {
                if (type.equals("PLATINUM")) {
                    System.out.println("15% discount");
                } else {
                    System.out.println("No discount");
                }
            }
        }
    }
}
        `,
            hint: "Replace deep nesting with switch-case or map lookup.",
            solution: `
public class DiscountApp {
    public static void main(String[] args) {
        String type = "GOLD";
        switch (type) {
            case "SILVER": System.out.println("5% discount"); break;
            case "GOLD": System.out.println("10% discount"); break;
            case "PLATINUM": System.out.println("15% discount"); break;
            default: System.out.println("No discount");
        }
    }
}
        `
        }
    ],
 
    performance: [
        {
            id: 1,
            title: "Optimize String Concatenation",
            description: `
The program builds a long string using '+' in a loop.
Optimize it for better performance with StringBuilder.
        `,
            starterCode: `
public class StringConcat {
    public static void main(String[] args) {
        String s = "";
        for (int i = 0; i < 10000; i++) {
            s = s + i;
        }
        System.out.println(s.length());
    }
}
        `,
            hint: "Use StringBuilder instead of repeatedly creating new String.",
            solution: `
public class StringConcat {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10000; i++) {
            sb.append(i);
        }
        System.out.println(sb.length());
    }
}
        `
        },
        {
            id: 2,
            title: "Optimize Duplicate Check",
            description: `
The code checks duplicates in an array using O(n^2) loops. Optimize it to O(n) using HashSet.
        `,
            starterCode: `
public class DuplicateFinder {
    public static void main(String[] args) {
        int[] arr = {1,2,3,2,4,5,1};
        for (int i = 0; i < arr.length; i++) {
            for (int j = i+1; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    System.out.println("Duplicate: " + arr[i]);
                }
            }
        }
    }
}
        `,
            hint: "Use HashSet to track seen numbers in a single pass.",
            solution: `
import java.util.HashSet;
 
public class DuplicateFinder {
    public static void main(String[] args) {
        int[] arr = {1,2,3,2,4,5,1};
        HashSet<Integer> seen = new HashSet<>();
        for (int num : arr) {
            if (!seen.add(num)) {
                System.out.println("Duplicate: " + num);
            }
        }
    }
}
        `
        }
    ],
 
    unitTests: [
        {
            id: 1,
            title: "Fix Calculator Tests",
            description: `
You have a Calculator class with add and divide methods.
Unit tests are broken. Fix them using JUnit.
        `,
            starterCode: `
// Calculator.java
public class Calculator {
    public int add(int a, int b) { return a+b; }
    public int divide(int a, int b) { return a/b; }
}
 
// CalculatorTest.java
import org.junit.jupiter.api.Test;
 
import static org.junit.jupiter.api.Assertions.*;
 
public class CalculatorTest {
    @Test
    public void testAdd() {
        Calculator c = new Calculator();
        assertEquals(10, c.add(2,3)); // Wrong expected
    }
 
    @Test
    public void testDivide() {
        Calculator c = new Calculator();
        assertEquals(2, c.divide(10,5));
    }
}
        `,
            hint: "Fix expected value in add test. Add divide by zero test.",
            solution: `
// CalculatorTest.java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
 
public class CalculatorTest {
    @Test
    public void testAdd() {
        Calculator c = new Calculator();
        assertEquals(5, c.add(2,3));
    }
 
    @Test
    public void testDivide() {
        Calculator c = new Calculator();
        assertEquals(2, c.divide(10,5));
    }
 
    @Test
    public void testDivideByZero() {
        Calculator c = new Calculator();
        assertThrows(ArithmeticException.class, () -> c.divide(10,0));
    }
}
        `
        }
    ]
};
 
export default javaQuestions;
 
