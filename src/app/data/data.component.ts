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
  selectedStudent: Student | null = null;
  editMode = false;
  addMode = false;
  editedStudent: Student | null = null;
  addedStudent: Student | null = null;
  isEdit = false;

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
    console.log(column, searchTerms)
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
    this.dataService.setIsEditStudent(true);
    this.selectedStudent = student;
  }

  addNewStudent() {
    this.dataService.setIsEditStudent(false);
    this.addedStudent = {
      id: 0,
      name: '',
      email: '',
      grade: 0,
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
      this.addMode = false;
      this.addedStudent = null;
    }
  }

  removeSelectedStudent(): void {
    if (this.selectedStudent) {
      this.students = this.students.filter(student => student.id !== this.selectedStudent!.id);
  
      this.dataService.removeStudent(this.selectedStudent.id);
  
      this.selectedStudent = null;
      this.editMode = false;
    }
  }
  editStudentDetails (student: Student) {
    this.dataService.setIsEditStudent(true);
    this.editMode = true;
    this.editedStudent = { ...student }; 
    this.editedStudent = null;

  }
  
  saveEditedStudent() {
    if (this.editedStudent) {
      const index = this.students.findIndex(student => student.id === this.editedStudent!.id);
      if (index !== -1) {
        this.dataService.updateStudent(this.editedStudent); 
      }
  
      this.editMode = false;
      this.editedStudent = null;
    }
  }
}