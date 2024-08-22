
public class WeatherService : WeatherInterface
{

    private static readonly HttpClient httpClient = new();

    public static async Task<object> GetOneCallWeatherConditions(string lat, string lon, string? lang, string? units, string? weatherApiKey = "", string? weatherApiUrl = "" )
    {

        try
        {

            var response = await httpClient.GetAsync($"{weatherApiUrl}?lat={lat}&lon={lon}&lang={lang}&units={units}&appid={weatherApiKey}");
            response.EnsureSuccessStatusCode();

            var weatherConditions = await response.Content.ReadFromJsonAsync<object>();
           
           
            return weatherConditions;
        
        }
        catch (System.Exception)
        {

            throw;
        }
    }
}