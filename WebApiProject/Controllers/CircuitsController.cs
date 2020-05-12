using FormulaOneDll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApiProject.Controllers
{
    [RoutePrefix("api/circuits")]
    public class circuitsController : ApiController
    {

        DbTools db = new DbTools();

        [Route("list")]
        public IEnumerable<Circuit> GetAllCountries()
        {
            db.GetCircuits();
            return db.Circuits.Values;
        }
        
        public IHttpActionResult GetCircuit(int id)
        {
            db.GetCircuits();
            if (db.Circuits[id] == null)
                return NotFound();

            return Ok(db.Circuits[id]);
        }
    }
}
