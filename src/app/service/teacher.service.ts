import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  progress: number = 0;
  constructor(private http: HttpClient) { }
  getTeacherList(): Observable<any[]> {
    return this.http.get<any>(environment.url_back_end + '/teacher/gets');
  }

  getSubjects(): Observable<any[]> {
    return this.http.get<any>(environment.url_back_end + '/subject/gets');
  }

  saveTeacher(val: any): Observable<any> {
    return this.http.post(environment.url_back_end + '/teacher/save', val);
  }

  getTeacher(teacherId: number): Observable<any> {
    return this.http.get<any>(environment.url_back_end + '/teacher/get/' + teacherId);
  }

  deletedTeacher(teacherId: number): Observable<any> {
    return this.http.patch(environment.url_back_end + '/teacher/delete/' + teacherId, null);
  }

  async uploadFile(files: any, avatarName: string, oldAvatarName: string) {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    await this.http.post(environment.url_back_end + '/teacher/saveFile/' + avatarName + '/' + oldAvatarName, formData).toPromise();
  }
}
