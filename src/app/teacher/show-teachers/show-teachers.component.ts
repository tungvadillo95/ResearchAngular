import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from "../../service/teacher.service";
import { AddEditTeacherComponent } from '../add-edit-teacher/add-edit-teacher.component';

@Component({
  selector: 'app-show-teachers',
  templateUrl: './show-teachers.component.html',
  styleUrls: ['./show-teachers.component.css']
})
export class ShowTeachersComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  @ViewChild(AddEditTeacherComponent) myChild: any;
  TeacherList: any = [];
  cp: number = 1;
  ipp: number = 5;
  message: string = '';
  showMessage: boolean = false;
  ModalTitle: string = '';
  ActivateAddEditTeacher: boolean = false;
  teacher: any;
  constructor(private service: TeacherService) { }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.service.getTeacherList().subscribe(data => {
      this.TeacherList = data;
    });
  }

  closeClick() {
    this.ActivateAddEditTeacher = false;
    this.showMessage = false;
    this.message = '';
    this.loadTeachers();
  }

  addClick() {
    this.teacher = {
      teacherId: 0,
      fullName: null,
      email: null,
      phoneNumber: null,
      dob: null,
      gender: null,
      address: null,
      avatarName: null,
      subjectIds: []
    };
    this.ModalTitle = "THÊM GIÁO VIÊN";
    this.ActivateAddEditTeacher = true;
    this.showMessage = false;
    this.message = '';
  }

  updateClick(teacherId: number) {
    this.ModalTitle = "CẬP NHẬT GIÁO VIÊN";
    this.showMessage = false;
    this.message = '';
    this.getTeacher(teacherId);
    this.ActivateAddEditTeacher = true;
  }

  getTeacher(teacherId: number) {
    if (teacherId > 0) {
      this.service.getTeacher(teacherId).subscribe(data => {
        this.myChild.initUser(data);
      });
    }
  }

  closeModal(event: any) {
    if(event == undefined){
      this.showMessage = false;
      this.closebutton.nativeElement.click();
    }else if (!event?.showMessage) {
      this.closebutton.nativeElement.click();
      this.showMessage = true;
      this.message = event?.message;
    }
  }

  deletedTeacher(teacherId:number, teacherName: string){
    if(confirm("Bạn có chắc muốn xóa Giáo viên : " + teacherName)) {
      this.service.deletedTeacher(teacherId).subscribe(data => {
        this.showMessage = true;
        this.message = data.message;
        this.loadTeachers();
      });
    }
  }

}
