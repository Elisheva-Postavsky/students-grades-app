import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DataService, Student } from '../data-service.service';



@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnChanges{
  @Input() selectedStudent: Student | null = null;
  @Input() editMode: boolean = false;
  @Input() editedStudent: Student | null = null;
  @Input() addMode: boolean = false;
  @Input() addedStudent: Student | null = null;
  @Output() saveStudent = new EventEmitter<Student>();
  @Output() editStudent = new EventEmitter<Student>();


  onSave() {
    if (this.editedStudent) {
      this.editStudent.emit(this.editedStudent);
      this.selectedStudent = this.editedStudent; // Update the selectedStudent only after saving
    }
    if(this.addedStudent){
      this.saveStudent.emit(this.addedStudent);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedStudent']) {
      const newStudent = changes['selectedStudent'].currentValue;
      this.editedStudent = newStudent;
    }
  }
}
