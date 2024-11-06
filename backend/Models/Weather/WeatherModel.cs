public class TemperatureModel
{
   public float min { get; set; }
   public float max { get; set; }
}

public class Weather
{
   public string main { get; set; }

   public string description { get; set; }
}

public class CurrentModel
{

   public float temp { get; set; }

   public float feels_like { get; set; }

   public float pressure { get; set; }

   public float uvi { get; set; }

   public float clouds { get; set; }

   public float wind_speed { get; set; }

   public float humidity { get; set; }

   public IList<Weather?> weather { get; set; }
}

public class DailyWeatherModel
{
   public int dt { get; set; }
   public TemperatureModel temp { get; set; }

   public IList<Weather?> weather { get; set; }

}

public class CurrentWeatherModel
{
   public CurrentModel current { get; set; }
   public IList<DailyWeatherModel?>? daily { get; set; }

}

public class ForecastWeather
{
   public IList<Weather?> weather { get; set; }

   public TemperatureModel main { get; set; }

   public int dt { get; set; }
}

public class ForecastWeatherModel
{

   public IList<ForecastWeather?> list { get; set; }

}




