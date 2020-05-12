using FormulaOneDll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApiProject.Controllers
{
    public class racesscoresController : ApiController
    {
        DbTools db = new DbTools();

        public IEnumerable<RacesScore> GetAllCountries()
        {
            db.GetRacesScores();
            return db.RacesScores.Values;
        }
        public IHttpActionResult GetRacesScore(int id)
        {
            db.GetRacesScores();
            if (db.RacesScores[id] == null)
                return NotFound();

            return Ok(db.RacesScores[id]);
        }
    }
}
