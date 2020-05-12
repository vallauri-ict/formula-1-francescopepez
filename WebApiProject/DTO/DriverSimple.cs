using FormulaOneDll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace WebApiProject.DTO
{
    [DataContract(Name = "driver")]
    public class DriverSimple
    {
        [DataMember(Name = "id")]
        private readonly int id;
        [DataMember(Name = "firstname")]
        private string firstname;
        [DataMember(Name = "lastname")]
        private string lastname;
        [DataMember(Name = "countrycode")]
        private string countrycode;
        [DataMember(Name = "img")]
        private string img;

        public DriverSimple(Driver d)
        {
            this.id = d.ID;
            this.firstname = d.Firstname;
            this.lastname= d.Lastname;
            this.countrycode = d.Country.CountryCode;
            this.img = d.Img;
        }
    }
}