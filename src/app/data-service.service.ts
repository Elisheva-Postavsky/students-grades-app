import { Injectable } from '@angular/core';

export interface Student {
  id: number; 
  name: string;
  grade: number;
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
  isEditStudent:boolean = false 
  private students: Student[] = [
    { id: 1, name: 'Alice', grade: 85, email: 'alice@example.com', dateJoined: new Date(), address: '123 Main St', city: 'Cityville', country: 'Countryland', zip: 12345, subject: 'Math' },
    { id: 2, name: 'Bob', grade: 75, email: 'bob@example.com', dateJoined: new Date(), address: '456 Elm St', city: 'Townsville', country: 'Countryland', zip: 54321, subject: 'Science' },
    { id: 3, name: 'Charlie', grade: 90, email: 'charlie@example.com', dateJoined: new Date(), address: '789 Oak St', city: 'Villageville', country: 'Countryland', zip: 67890, subject: 'History' },
    { id: 4, name: 'David', grade: 80, email: 'david@example.com', dateJoined: new Date(), address: '101 Pine St', city: 'Hamletville', country: 'Countryland', zip: 98765, subject: 'English' },
    { id: 5, name: 'Eve', grade: 70, email: 'eve@example.com', dateJoined: new Date(), address: '111 Willow St', city: 'Metropolis', country: 'Countryland', zip: 13579, subject: 'Art' },
    { id: 6, name: 'Frank', grade: 95, email: 'frank@example.com', dateJoined: new Date(), address: '222 Birch St', city: 'Harborville', country: 'Countryland', zip: 24680, subject: 'Physics' },
    { id: 7, name: 'Grace', grade: 88, email: 'grace@example.com', dateJoined: new Date(), address: '333 Cedar St', city: 'Beachtown', country: 'Countryland', zip: 57931, subject: 'Chemistry' },
    { id: 8, name: 'Hank', grade: 82, email: 'hank@example.com', dateJoined: new Date(), address: '444 Maple St', city: 'Mountainville', country: 'Countryland', zip: 80246, subject: 'Biology' },
    { id: 9, name: 'Ivy', grade: 78, email: 'ivy@example.com', dateJoined: new Date(), address: '555 Rose St', city: 'Rivertown', country: 'Countryland', zip: 64927, subject: 'Geography' },
    { id: 10, name: 'Jack', grade: 85, email: 'jack@example.com', dateJoined: new Date(), address: '666 Daisy St', city: 'Valleyville', country: 'Countryland', zip: 31748, subject: 'Computer Science' },
    { id: 11, name: 'Anna', grade: 30, email: 'anna@example.com', dateJoined: new Date(), address: '668 Daisy St', city: 'Valleyville', country: 'Countryland', zip: 31740, subject: 'Math' },
    { id: 3, name: 'Alice', grade: 92, email: 'alice@example.com', dateJoined: new Date(), address: '123 Main St', city: 'Cityville', country: 'Countryland', zip: 12345, subject: 'Geography' },

  ];

  getAllStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  getStudentByid(id: number): Student | undefined {
    return this.students.find(student => student.id === id);
  }

  updateStudent(updatedStudent: Student) {
    const index = this.students.findIndex(student => student.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
    }
  }

  removeStudent(id: number): void {
    const index = this.students.findIndex(student => student.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
    }
  }
  setIsEditStudent(a: boolean):void{
    this.isEditStudent = a;
  }
  getIsEditStudent():boolean{
    return this.isEditStudent;
  }
  
}
