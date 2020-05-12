using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FormulaOneDll
{
    public class RacesScore
    {
        private int id;
        private Driver driver;
        private Scores pos;
        private Race race;
        private string fastestLap;

        public RacesScore(int id, Driver driver, Scores pos, Race race, string fastestLap)
        {
            this.ID = id;
            this.Driver = driver;
            this.Pos = pos;
            this.Race = race;
            this.FastestLap = fastestLap;
        }

        public int ID { get => id; set => id = value; }
        public Driver Driver { get => driver; set => driver = value; }
        public Scores Pos { get => pos; set => pos = value; }
        public Race Race { get => race; set => Race = value; }
        public string FastestLap { get => fastestLap; set => fastestLap = value; }
    }
}
