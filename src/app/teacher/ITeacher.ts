export interface ITeacher {
    teacherId: number,
    fullName: string,
    email: string,
    phoneNumber: string,
    dob: Date,
    gender?: boolean,
    address : string,
    avatarName?: string,
    subjectIds: [],
    subjectsName: string,
    dobStr: string,
    dobVal: string
  }