import { Component, OnInit } from '@angular/core';
import { DataService, Student } from '../data-service.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
})
export class AnalysisComponent implements OnInit {
  students: Student[] = [];
  selectedStudentIds: number[] = [];
  selectedSubjects: string[] = [];

  // Initialize the data for the three tables
  studentsGradesOverTime: { id: number, grades: number[] }[] = [];
  studentsAverages: { id: number, average: number }[] = [];
  subjectsAverages: { subject: string, average: number }[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.students = this.dataService.getAllStudents();
    this.calculateData();
  }

  onStudentIdSelected(event: Event): void {
    const selectedId = parseInt((event.target as HTMLSelectElement).value, 10);
    if (!this.selectedStudentIds.includes(selectedId)) {
      this.selectedStudentIds.push(selectedId);
      this.calculateData();
    }
  }

  onSubjectSelected(event: Event): void {
    const selectedSubject = (event.target as HTMLSelectElement).value;
    if (!this.selectedSubjects.includes(selectedSubject)) {
      this.selectedSubjects.push(selectedSubject);
      this.calculateData();
    }
  }

  // Method to calculate data for the three tables
  calculateData(): void {
    console.log('Calculating data...');
    
    // Table 1: Grades average over time
    this.studentsGradesOverTime = this.selectedStudentIds.map(id => {
      const student = this.dataService.getStudentById(id);
      return { id, grades: [student?.Grade || 0] };
    });
    console.log('Students Grades Over Time:', this.studentsGradesOverTime);
    
    // Table 2: Students averages
    this.studentsAverages = this.selectedStudentIds.map(id => {
      const student = this.dataService.getStudentById(id);
      const gradesSum = student ? student.Grade : 0;
      return { id, average: gradesSum / this.selectedStudentIds.length };
    });
    console.log('Students Averages:', this.studentsAverages);
    
    // Table 3: Grades averages per subject
    const subjectsGrades: { [subject: string]: number[] } = {};
    this.selectedSubjects.forEach(subject => {
      subjectsGrades[subject] = this.students
        .filter(student => student.subject === subject)
        .map(student => student.Grade);
    });
    
    this.subjectsAverages = Object.keys(subjectsGrades).map(subject => {
      const grades = subjectsGrades[subject];
      const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
      return { subject, average };
    });
    console.log('Subjects Averages:', this.subjectsAverages);
  }
}