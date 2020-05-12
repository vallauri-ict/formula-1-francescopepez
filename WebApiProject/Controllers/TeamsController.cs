using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FormulaOneDll;
using WebApiProject.DTO;

namespace WebApiProject.Controllers
{
    [RoutePrefix("api/teams")]
    public class teamsController : ApiController
    {
        DbTools db = new DbTools();

        public IEnumerable<Team> GetAllTeams()
        {
            db.GetTeams();
            return db.Teams.Values;
        }
        [Route("list")]
        public IEnumerable<TeamSimple> GetAllSimpleDrivers()
        {
            db.GetTeams();
            List<TeamSimple> t = new List<TeamSimple>();
            db.Teams.Values.ToList().ForEach(team => t.Add(new TeamSimple(team)));
            return t;
        }
        [Route("{id:int}")]
        public IHttpActionResult GetTeam(int id)
        {
            db.GetTeams();
            if (db.Teams[id] == null)
                return NotFound();

            return Ok(db.Teams[id]);
        }
    }
}
