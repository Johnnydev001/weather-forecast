using System.Text.Json.Serialization;
public class WeatherModel
{

   [JsonPropertyName("temperature")]
   public float temp { get; set; }

   [JsonPropertyName("feelsLikeTemperature")]
   public float feels_like { get; set; }

   public float pressure { get; set; }

   [JsonPropertyName("uvIndex")]
   public float uvi { get; set; }

   [JsonPropertyName("cloudsPercentage")]
   public float clouds { get; set; }

   [JsonPropertyName("windSpeed")]
   public float wind_speed { get; set; }

   public float humidity { get; set; }

   public required string weather_status {get; set;}
}
