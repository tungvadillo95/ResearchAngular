using CB.BAL.Interface;
using CB.Domain.Request.Subject;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Demo.Controllers
{
    //[Route("api/subject")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectService subjectService;

        public SubjectController(ISubjectService subjectService)
        {
            this.subjectService = subjectService;
        }
        [HttpGet("api/subject/gets")]
        public async Task<OkObjectResult> Gets()
        {
            var subjects = await subjectService.Gets();
            return Ok(subjects);
        }
        //[HttpGet("api/subject/get/{id}")]
        //public async Task<OkObjectResult> Get(int id)
        //{
        //    var subject = await subjectService.Get(id);
        //    return Ok(subject);
        //}
        [HttpPost]
        [Route("api/subject/save")]
        public async Task<OkObjectResult> SaveCourse(SaveSubjectReq request)
        {
            var result = await subjectService.Save(request);
            return Ok(result);
        }
        [HttpPatch]
        [Route("api/subject/deleted/{id}")]
        public async Task<OkObjectResult> Deleted(int id)
        {
            var result = await subjectService.Deleted(id);
            return Ok(result);
        }
    }
}
