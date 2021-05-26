using CB.Domain.Request.Teacher;
using CB.Domain.Respone.Teacher;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CB.BAL.Interface
{
    public interface ITeacherService
    {
        Task<IEnumerable<TeacherView>> Gets();
        Task<TeacherView> Get(int teacherId);
        Task<SaveTeacherRes> Save(SaveTeacherReq req);
        Task<SaveTeacherRes> Delete(int teacherId);
    }
}
