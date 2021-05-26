using System;

namespace CB.Domain.Request.Teacher
{
    public class SaveTeacherReq
    {
        public int TeacherId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Dob { get; set; }
        public bool Gender { get; set; }
        public string Address { get; set; }
        public string AvatarName { get; set; }
        //public IFormFile Avatar { get; set; }
        public string SubjectIds { get; set; }
        public bool isUpdateAvatar { get; set; }
    }
}
