using FormulaOneDll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace WebApiProject.DTO
{
    [DataContract(Name = "team")]
    public class TeamSimple
    {
        [DataMember(Name = "id")]
        private readonly int id;
        [DataMember(Name = "name")]
        private string name;
        [DataMember(Name = "country")]
        private string country;
        [DataMember(Name = "logo")]
        private string logo;
        [DataMember(Name = "firstdriver")]
        private string firstdriver;
        [DataMember(Name = "seconddriver")]
        private string seconddriver;
        [DataMember(Name = "img")]
        private string img;

        public TeamSimple(Team t)
        {
            this.id = t.ID;
            this.name = t.Name;
            this.country = t.Country.CountryName;
            this.logo = t.Logo;
            this.firstdriver = t.FirstDriver.Lastname;
            this.seconddriver = t.SecondDriver.Lastname;
            this.img = t.Img;
        }
    }
}