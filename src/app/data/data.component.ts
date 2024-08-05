import { Component, OnInit } from '@angular/core';
import { DataService, Student } from '../data-service.service';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  students: Student[];
  filteredStudents: Student[];
  selectedStudent!: Student;
  editMode = false;
  addMode = false;
  editedStudent: Student | null = null;
  addedStudent: Student | null = null;

  constructor(private dataService: DataService, private filterService: FilterService) {
    this.students = this.dataService.getAllStudents();
    this.filteredStudents = this.students;
  }

  ngOnInit() {
    const filterCriteria = this.filterService.getFilterCriteria();
    if (filterCriteria) {
      this.filterDataWithCriteria(filterCriteria);
    }
  }

  filterData(event: Event) {
    const inputElement = (event.target as HTMLInputElement)?.value?.trim().toLowerCase();

    if (!inputElement) {
      this.filteredStudents = this.students;
      localStorage.removeItem('filterCriteria');
      return;
    }

    const filters = inputElement.split(':').map(s => s.trim());
    const column = filters[0];
    const searchTerms = filters[1].split(/\s+/).map(s => s.trim());

    const filterCriteria = `${column}:${searchTerms.join(' ')}`;
    localStorage.setItem('filterCriteria', filterCriteria);
    this.filterDataWithCriteria(filterCriteria);
  }

  filterDataWithCriteria(filterCriteria: string) {
    this.filteredStudents = this.students.filter(student => {
      return this.doesStudentMatchCriteria(student, filterCriteria);
    });
  }

  doesStudentMatchCriteria(student: Student, filterCriteria: string): boolean {
    const [column, searchTerm] = filterCriteria.split(':');
    const value = student[column as keyof Student].toString().toLowerCase();
    return value.includes(searchTerm.toLowerCase());
  }

  showStudentDetails(student: Student) {
    this.selectedStudent = student;
  }

  

  addNewStudent() {
    this.addedStudent = {
      ID: 0,
      Name: '',
      email: '',
      Grade: 0,
      dateJoined: new Date(),
      address: '',
      city: '',
      country: '',
      zip: 0,
      subject: ''
    };
    this.addMode = true;
  }
  
  saveNewStudent() {
    if (this.addedStudent) {
      this.dataService.addStudent(this.addedStudent);
      this.students.push(this.addedStudent);
      this.addMode = false;
      this.addedStudent = null;
    }
  }

  removeSelectedStudent(): void {
    // Implement removing a selected student logic
  }
  editStudentDetails
  (student: Student) {
    this.editMode = true;
    this.editedStudent = { ...student }; // Create a deep copy of the selected student
  }
  
  saveEditedStudent() {
    if (this.editedStudent) {
      const index = this.students.findIndex(student => student.ID === this.editedStudent!.ID);
      if (index !== -1) {
        // this.students[index] = { ...this.editedStudent };
        this.dataService.updateStudent(this.editedStudent); // Save the edited student details
      }
  
      this.editMode = false;
      this.editedStudent = null;
    }
  }
}