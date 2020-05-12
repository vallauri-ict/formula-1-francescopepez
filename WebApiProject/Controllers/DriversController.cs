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
    [RoutePrefix("api/drivers")]
    public class driversController : ApiController
    {
        DbTools db = new DbTools();

        public IEnumerable<Driver> GetAllDrivers()
        {
            db.GetDrivers();
            return db.Drivers.Values;
        }

        [Route("list")]
        public IEnumerable<DriverSimple> GetAllSimpleDrivers()
        {
            db.GetDrivers();
            List<DriverSimple> d = new List<DriverSimple>();
            db.Drivers.Values.ToList().ForEach(driver => d.Add(new DriverSimple(driver)));
            return d;
        }
        [Route("{id:int}")]
        public IHttpActionResult GetDriver(int id)
        {
            db.GetDrivers();
            if (db.Drivers[id] == null)
                return NotFound();

            return Ok(db.Drivers[id]);
        }
    }
}
