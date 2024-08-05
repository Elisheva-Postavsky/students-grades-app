import { Component, OnInit } from '@angular/core';
import { DataService, Student } from '../data-service.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
})
export class AnalysisComponent implements OnInit {
  students: Student[] = [];
  selectedStudentIds: number[] = [];
  selectedSubjects: string[] = [];

  studentsGradesOverTime: { id: number, grades: number[] }[] = [];
  studentsAverages: { id: number, average: number }[] = [];
  subjectsAverages: { subject: string, average: number }[] = [];

  tables = [this.studentsGradesOverTime, this.studentsAverages, this.subjectsAverages];
  hiddenChartVisible: boolean = false;

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
  // onDropTable(event: CdkDragDrop<any[]>): void {
  //   moveItemInArray(this.tables, event.previousIndex, event.currentIndex);
  // }

  // onDropHiddenChart(event: CdkDragDrop<any[]>): void {
  //   if (event.currentIndex < this.tables.length) {
  //     moveItemInArray(this.tables, this.tables.findIndex(t => t.name === 'Hidden Chart Button'), event.currentIndex);
  //   }
  // }

  calculateData(): void {
    console.log('Calculating data...');
    
    // Table 1: Grades average over time
    const studentsGradesOverTime: { id: number, grades: number[] }[] = [];

    this.selectedStudentIds.forEach(id => {
    const students = this.dataService.getAllStudents().filter(student => student.id === id);

    students.forEach(student => {
    studentsGradesOverTime.push({ id: student.id, grades: [student.grade] });
    });
    });
    console.log('Students Grades Over Time:', studentsGradesOverTime);

    // Table 2: Students averages
    const studentsGrades: { [id: number]: number[] } = {};
    this.selectedStudentIds.forEach(id => {
      studentsGrades[id] = this.dataService.getAllStudents()
        .filter(student => student.id === id)
        .map(student => student.grade);
    });

    this.studentsAverages = Object.keys(studentsGrades).map(id => {
    const grades = studentsGrades[parseInt(id)];
    const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    return { id: parseInt(id), average };
    });
    console.log('Students Averages:', this.studentsAverages);
    
    // Table 3: Grades averages per subject
    const subjectsGrades: { [subject: string]: number[] } = {};
    this.selectedSubjects.forEach(subject => {
      subjectsGrades[subject] = this.students
        .filter(student => student.subject === subject)
        .map(student => student.grade);
    });
    
    this.subjectsAverages = Object.keys(subjectsGrades).map(subject => {
      const grades = subjectsGrades[subject];
      const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
      return { subject, average };
    });
    console.log('Subjects Averages:', this.subjectsAverages);

    // Add the hidden chart button entry
    // if (!this.hiddenChartVisible) {
    //   this.tables.push({ name: 'Hidden Chart Button', data: [] });
    //   this.hiddenChartVisible = true;
    // }
  }

  
}

