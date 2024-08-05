import { Injectable } from '@angular/core';

export interface Student {
  ID: number; 
  Name: string;
  Grade: number;
  email: string;
  dateJoined: Date;
  address: string;
  city: string;
  country: string;
  zip: number;
  subject: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private students: Student[] = [
    { ID: 1, Name: 'Alice', Grade: 85, email: 'alice@example.com', dateJoined: new Date(), address: '123 Main St', city: 'Cityville', country: 'Countryland', zip: 12345, subject: 'Math' },
    { ID: 2, Name: 'Bob', Grade: 75, email: 'bob@example.com', dateJoined: new Date(), address: '456 Elm St', city: 'Townsville', country: 'Countryland', zip: 54321, subject: 'Science' },
    { ID: 3, Name: 'Charlie', Grade: 90, email: 'charlie@example.com', dateJoined: new Date(), address: '789 Oak St', city: 'Villageville', country: 'Countryland', zip: 67890, subject: 'History' },
    { ID: 4, Name: 'David', Grade: 80, email: 'david@example.com', dateJoined: new Date(), address: '101 Pine St', city: 'Hamletville', country: 'Countryland', zip: 98765, subject: 'English' },
    { ID: 5, Name: 'Eve', Grade: 70, email: 'eve@example.com', dateJoined: new Date(), address: '111 Willow St', city: 'Metropolis', country: 'Countryland', zip: 13579, subject: 'Art' },
    { ID: 6, Name: 'Frank', Grade: 95, email: 'frank@example.com', dateJoined: new Date(), address: '222 Birch St', city: 'Harborville', country: 'Countryland', zip: 24680, subject: 'Physics' },
    { ID: 7, Name: 'Grace', Grade: 88, email: 'grace@example.com', dateJoined: new Date(), address: '333 Cedar St', city: 'Beachtown', country: 'Countryland', zip: 57931, subject: 'Chemistry' },
    { ID: 8, Name: 'Hank', Grade: 82, email: 'hank@example.com', dateJoined: new Date(), address: '444 Maple St', city: 'Mountainville', country: 'Countryland', zip: 80246, subject: 'Biology' },
    { ID: 9, Name: 'Ivy', Grade: 78, email: 'ivy@example.com', dateJoined: new Date(), address: '555 Rose St', city: 'Rivertown', country: 'Countryland', zip: 64927, subject: 'Geography' },
    { ID: 10, Name: 'Jack', Grade: 85, email: 'jack@example.com', dateJoined: new Date(), address: '666 Daisy St', city: 'Valleyville', country: 'Countryland', zip: 31748, subject: 'Computer Science' }
  ];

  getAllStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  getStudentById(id: number): Student | undefined {
    return this.students.find(student => student.ID === id);
  }

  updateStudent(updatedStudent: Student) {
    const index = this.students.findIndex(student => student.ID === updatedStudent.ID);
    if (index !== -1) {
      this.students[index] = updatedStudent;
    }
  }
}
