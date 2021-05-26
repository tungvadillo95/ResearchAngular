using CB.DAL.Interface;
using CB.Domain.Request.Teacher;
using CB.Domain.Respone.Teacher;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace CB.DAL.Implement
{
    public class TeacherRepository : BaseRepository, ITeacherRepository
    {
        public async Task<IEnumerable<TeacherView>> Gets()
        {
            try
            {
                var result = await SqlMapper.QueryAsync<TeacherView>(cnn: connection,
                                                                sql: "sp_GetTeachers",
                                                                commandType: CommandType.StoredProcedure);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<TeacherView> Get(int teacherId)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TeacherId", teacherId);
                var result = await SqlMapper.QueryFirstOrDefaultAsync<TeacherView>(cnn: connection,
                                                                                sql: "sp_GetTeacher",
                                                                                param: parameters,
                                                                                commandType: CommandType.StoredProcedure);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<SaveTeacherRes> Save(SaveTeacherReq req)
        {
            var result = new SaveTeacherRes()
            {
                Message = "Đã xảy ra sự cố, vui lòng liên hệ với administrator."
            };
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TeacherId", req.TeacherId);
                parameters.Add("@FullName", req.FullName);
                parameters.Add("@Email", req.Email);
                parameters.Add("@PhoneNumber", req.PhoneNumber);
                parameters.Add("@Gender", req.Gender);
                parameters.Add("@Dob", req.Dob);
                parameters.Add("@AvatarName", req.AvatarName);
                parameters.Add("@SubjectIds", req.SubjectIds);
                parameters.Add("@Address", req.Address);
                result = await SqlMapper.QueryFirstOrDefaultAsync<SaveTeacherRes>(cnn: connection,
                                                                                sql: "sp_SaveTeacher",
                                                                                param: parameters,
                                                                                commandType: CommandType.StoredProcedure);
                return result;
            }
            catch
            {
                return result;
            }
        }
        public async Task<SaveTeacherRes> Delete(int teacherId)
        {
            var result = new SaveTeacherRes()
            {
                Message = "Đã xảy ra sự cố, vui lòng liên hệ với administrator."
            };
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TeacherId", teacherId);
                result = await SqlMapper.QueryFirstOrDefaultAsync<SaveTeacherRes>(cnn: connection,
                                                                                sql: "sp_DeletedTeacher",
                                                                                param: parameters,
                                                                                commandType: CommandType.StoredProcedure);
                return result;
            }
            catch
            {
                return result;
            }
        }
    }
}
