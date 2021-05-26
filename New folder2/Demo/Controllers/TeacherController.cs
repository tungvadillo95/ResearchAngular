using CB.BAL.Interface;
using CB.Domain.Request.Teacher;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Demo.Controllers
{
    //[Route("api/teacher")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService teacherService;

        public TeacherController(ITeacherService teacherService)
        {
            this.teacherService = teacherService;
        }
        [HttpGet]
        [Route("api/teacher/gets")]
        public async Task<OkObjectResult> Gets()
        {
            var teachers = await teacherService.Gets();
            return Ok(teachers);
        }
        [HttpGet]
        [Route("api/teacher/get/{teacherId}")]
        public async Task<OkObjectResult> Get(int teacherId)
        {
            var teacher = await teacherService.Get(teacherId);
            return Ok(teacher);
        }

        [HttpPost]
        [Route("api/teacher/save")]
        public async Task<OkObjectResult> Save(SaveTeacherReq req)
        {
            if ((req.AvatarName == null || req.AvatarName == "") && !req.isUpdateAvatar)
            {
                req.AvatarName = "none_avatar.png";
            }
            else if(req.isUpdateAvatar)
            {
                req.AvatarName = $"{Guid.NewGuid()}_{req.AvatarName}";
            }
            var result = await teacherService.Save(req);
            return Ok(result);
        }

        [Route("api/teacher/saveFile/{avatarName}/{oldAvatarName}")]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> SaveFile(string avatarName, string oldAvatarName)
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Photos");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fullPath = Path.Combine(pathToSave, avatarName);
                    var dbPath = Path.Combine(folderName, avatarName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    if (!string.IsNullOrEmpty(oldAvatarName) && (oldAvatarName != "none_avatar.png"))
                    {
                        string delFile = Path.Combine(pathToSave, oldAvatarName);
                        System.IO.File.Delete(delFile);
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpPatch]
        [Route("api/teacher/delete/{teacherId}")]
        public async Task<OkObjectResult> Delete(int teacherId)
        {
            var result = await teacherService.Delete(teacherId);
            return Ok(result);
        }
    }
}
