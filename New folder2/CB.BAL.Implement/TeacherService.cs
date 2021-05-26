using CB.BAL.Interface;
using CB.DAL.Interface;
using CB.Domain.Request.Teacher;
using CB.Domain.Respone.Teacher;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CB.BAL.Implement
{
    public class TeacherService : ITeacherService
    {
        private readonly ITeacherRepository teacherRepository;
        private readonly ISubjectRepository subjectRepository;

        public TeacherService(ITeacherRepository teacherRepository,
                                ISubjectRepository subjectRepository)
        {
            this.teacherRepository = teacherRepository;
            this.subjectRepository = subjectRepository;
        }

        public async Task<SaveTeacherRes> Delete(int teacherId)
        {
            return await teacherRepository.Delete(teacherId);
        }

        public async Task<TeacherView> Get(int teacherId)
        {
            var result = await teacherRepository.Get(teacherId);
            result.SubjectIds = await subjectRepository.Get(teacherId);
            return result;
        }

        public async Task<IEnumerable<TeacherView>> Gets()
        {
            return await teacherRepository.Gets();
        }

        public async Task<SaveTeacherRes> Save(SaveTeacherReq req)
        {
            return await teacherRepository.Save(req);
        }
    }
}
