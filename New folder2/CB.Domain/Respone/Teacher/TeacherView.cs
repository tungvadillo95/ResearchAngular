using CB.Domain.Respone.Subject;
using System;
using System.Collections.Generic;

namespace CB.Domain.Respone.Teacher
{
    public class TeacherView
    {
        public int TeacherId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Dob { get; set; }
        public string DobStr { get; set; }
        public string DobVal { get; set; }
        public bool Gender { get; set; }
        public string Address { get; set; }
        public string AvatarName { get; set; }
        public string SubjectsName { get; set; }
        public IEnumerable<SubjectView> SubjectIds { get; set; }
    }
}
