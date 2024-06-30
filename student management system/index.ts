class Student {
    name: string;
    id: string;
    courses: Course[] = [];
    balance: number | undefined;

    constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    }

    enroll(course: Course) {
       
    }

    viewBalance() {
        // prints out the student's balance
    }

    payTuition(amount: number) {
        // reduces the balance by the given amount
    }

    showStatus() {
        // prints out the student's name, id, the courses they're enrolled in, and their balance
    }
}
class Course {
    name: string;
    cost: number;

    constructor(name: string, cost: number) {
        this.name = name;
        this.cost = cost;
    }
}
class StudentManagementSystem {
    students: Student[] = [];

    addStudent(student: Student) {
        // adds the student to the list of students
        // generates a unique id for the student
    }
}
const sms = new StudentManagementSystem();

// interact with the user
// for example, add new students, enroll students in courses, etc.
