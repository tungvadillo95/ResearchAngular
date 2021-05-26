import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TeacherService } from "../../service/teacher.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Output, EventEmitter } from '@angular/core';

function validDob(dob: FormControl) {
  let dobArr = dob.value.split('-');
  let yearNow = (new Date).getFullYear();
  if (yearNow - parseInt(dobArr[0]) > 59 || yearNow - dobArr[0] < 19) {
    return { validateDob: true };
  }
  return null;
}

@Component({
  selector: 'app-add-edit-teacher',
  templateUrl: './add-edit-teacher.component.html',
  styleUrls: ['./add-edit-teacher.component.css']
})
export class AddEditTeacherComponent implements OnInit {
  @Input() teacher: any;
  @Output() closeTeacherModal = new EventEmitter<{}>();
  @ViewChild('saveButton') saveButton: any;

  formAddEditTeacher: FormGroup = new FormGroup({});
  dataFrom: any;
  subjectIds: string = '';
  fileName: any;
  photoFileName: string = 'Chọn file';
  oldAvatar: string = '';

  messageError: string = '';
  isShowMessageError: boolean = false;

  dropdownList: any = [];
  subjects: any = [];
  dropdownSettings: IDropdownSettings = {};

  imageSrc: any;
  selectedItems: any = [];

  constructor(private teacherService: TeacherService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initSubjects();
    this.formAddEditTeacher = this.fb.group({
      teacherId: 0,
      fullName: ['', [Validators.required]],
      subjects: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required, validDob]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/((09|03|07|08|05)+([0-9]{8}))$/)]],
      address: ['', [Validators.required]],
      fileAvatar: []
    });
    this.dropdownSettings = {
      idField: 'subjectId',
      textField: 'subjectName',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn',
      allowSearchFilter: true,
      searchPlaceholderText: 'Tìm kiếm'
    };
  }
  submit() {
    this.getFileName();
    this.getSubjectIds()

    if (this.formAddEditTeacher.valid) {
      if (this.formAddEditTeacher.value.teacherId == 0) {
        this.addTeacher();
      } else {
        this.updateTeacher();
      }
    } else {
      this.formAddEditTeacher.markAllAsTouched();
    }
  }

  initSubjects() {
    this.teacherService.getSubjects().subscribe((data: any) => {
      this.dropdownList = data;
    })
  }

  addTeacher() {
    let data = this.getData();
    this.teacherService.saveTeacher(data).subscribe((data: any) => {
      let dataForm = this.formAddEditTeacher.value;
      if (data.teacherId > 0) {
        let respone = {
          showMessage: false,
          message: data.message
        }
        if (dataForm.fileAvatar != null && data.teacherId > 0) {
          this.saveFileAvatar(this.saveButton.nativeElement.files, data.avatarName, 'none_avatar.png').then(() => {
            this.closeTeacherModal.emit(respone);
          });
        } else {
          this.closeTeacherModal.emit(respone);
        }
      } else {
        this.messageError = data.message;
        this.isShowMessageError = true;
      }
    });
  }

  getData() {
    let dataForm = this.formAddEditTeacher.value;
    let data = {
      teacherId: dataForm.teacherId,
      fullName: dataForm.fullName,
      email: dataForm.email,
      phoneNumber: dataForm.phoneNumber,
      dob: dataForm.dob,
      gender: dataForm.gender == 'true' ? true : false,
      address: dataForm.address,
      subjectIds: this.subjectIds.toString(),
      avatarName: this.fileName,
      isUpdateAvatar: this.formAddEditTeacher.controls.fileAvatar.value == null ? false : true
    }
    return data;
  }

  initUser(teacher: any) {
    this.formAddEditTeacher.setValue({
      teacherId: teacher.teacherId,
      fullName: teacher.fullName,
      gender: teacher.gender ? 'true' : 'false',
      dob: teacher.dobVal,
      email: teacher.email,
      phoneNumber: teacher.phoneNumber,
      address: teacher.address,
      subjects: teacher.subjectIds,
      fileAvatar: []
    });
    this.oldAvatar = teacher.avatarName;
    this.selectedItems = teacher.subjectIds;
    this.photoFileName = teacher.avatarName;
    this.imageSrc = 'https://localhost:44317/Photos/' + teacher.avatarName;
  }

  getFileName() {
    let dataForm = this.formAddEditTeacher.value;
    if (dataForm.fileAvatar == null) {
      this.fileName = "none_avatar.png";
    } else {
      this.fileName = this.photoFileName;
    }
  }

  getSubjectIds() {
    let dataForm = this.formAddEditTeacher.value;
    let subjects: any[] = dataForm.subjects;
    this.subjectIds = '';
    if (subjects.length > 0) {
      this.subjectIds = subjects[0].subjectId;
      for (let i = 1; i < subjects.length; i++) {
        this.subjectIds += ',' + subjects[i].subjectId;
      }
    }
  }

  updateTeacher() {
    let data = this.getData();
    data.isUpdateAvatar = this.formAddEditTeacher.value.fileAvatar.length > 0 ? true : false;
    this.teacherService.saveTeacher(data).subscribe((data: any) => {
      let dataForm = this.formAddEditTeacher.value;
      if (data.teacherId > 0) {
        let respone = {
          showMessage: false,
          message: data.message
        }
        if (dataForm.fileAvatar != null && data.teacherId > 0 && this.formAddEditTeacher.value.fileAvatar.length != 0) {
          this.saveFileAvatar(this.saveButton.nativeElement.files, data.avatarName, this.oldAvatar).then(() => {
            this.closeTeacherModal.emit(respone);
          });
        } else {
          this.closeTeacherModal.emit(respone);
        }
      } else {
        this.messageError = data.message;
        this.isShowMessageError = true;
      }
    });
  }

  readURL(event: any): void {
    let path = this.formAddEditTeacher.controls.fileAvatar?.value;
    this.photoFileName = (path.split('\\'))[path.split('\\').length - 1];
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

  saveFileAvatar(files: any, avatarName: string, oldAvatarName: string) {
    return new Promise(resolve => {
      resolve(this.teacherService.uploadFile(files, avatarName, oldAvatarName));
    });
  }

  closeModal() {
    this.closeTeacherModal.emit();
  }

}
