using CB.BAL.Interface;
using CB.DAL.Interface;
using CB.Domain.Request.Subject;
using CB.Domain.Respone.Subject;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CB.BAL.Implement
{
    public class SubjectService : ISubjectService
    {
        private readonly ISubjectRepository subjectRepository;

        public SubjectService(ISubjectRepository subjectRepository)
        {
            this.subjectRepository = subjectRepository;
        }
        public async Task<IEnumerable<SubjectView>> Gets()
        {
            return await subjectRepository.Gets();
        }
        //public async Task<SubjectView> Get(int teacherId)
        //{
        //    return await subjectRepository.Get(teacherId);
        //}
        public async Task<SaveSubjectRes> Save(SaveSubjectReq request)
        {
            return await subjectRepository.Save(request);
        }
        public async Task<SaveSubjectRes> Deleted(int id)
        {
            return await subjectRepository.Deleted(id);
        }
    }
}
