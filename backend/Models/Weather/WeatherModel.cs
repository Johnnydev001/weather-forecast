using System.Text.Json.Serialization; 
 public class CurrentWeather {
    [JsonPropertyName("temperature")]

   public float temp { get; set; }

   [JsonPropertyName("feelsLike")]
    public float feels_like { get; set; }

    public float pressure {get; set;}

   [JsonPropertyName("uvIndex")]
    public float uvi { get; set; }

   [JsonPropertyName("cloudsPercentage")]
    public float clouds {get; set;}

[  JsonPropertyName("windSpeed")]
    public float wind_speed {get; set;}

    public float humidity {get; set;}
}  
 public class WeatherModel {
    public CurrentWeather current {get; set;}
 }
