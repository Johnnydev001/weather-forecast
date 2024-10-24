public class Weather {
   public string main {get; set;}

   public string description {get; set;}
}

public class CurrentModel {

   public float temp { get; set; }

   public float feels_like { get; set; }

   public float pressure { get; set; }

   public float uvi { get; set; }

   public float clouds { get; set; }

   public float wind_speed { get; set; }

   public float humidity { get; set; }

   public IList<Weather?> weather {get; set;}
}

public class WeatherModel
{
   public CurrentModel current {get; set;}
   
}

