
public class WeatherService : IWeatherInterface
{

    private readonly HttpClient httpClient;

    private readonly string weatherApiKey =  "ASdads";

    private readonly string weatherApiUrl = "https://api.openweathermap.org/data/3.0/onecall";

    public async Task<IEnumerable<WeatherModel>> GetWeatherConditions(string lat, string lon, string? lang, string? units)
    {

        try
        {
            var response = await httpClient.GetAsync($"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&lang={lang}&units={units}");
            response.EnsureSuccessStatusCode();

            var weatherConditions = await response.Content.ReadFromJsonAsync<WeatherModel>()
           
            return (IEnumerable<WeatherModel>)weatherConditions;
        
        }
        catch (System.Exception)
        {

            throw;
        }
    }
}