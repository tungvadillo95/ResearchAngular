using CB.Domain.Request.Subject;
using CB.Domain.Respone.Subject;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CB.BAL.Interface
{
    public interface ISubjectService
    {
        Task<IEnumerable<SubjectView>> Gets();
        //Task<IEnumerable<SubjectView>> Get(int teacherId);
        Task<SaveSubjectRes> Save(SaveSubjectReq request);
        Task<SaveSubjectRes> Deleted(int id);
    }
}
