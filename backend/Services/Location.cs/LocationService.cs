
public class LocationService : LocationInterface
{

    private static readonly HttpClient httpClient = new();

    public static async Task<LocationModel?> GetLocationByLatAndLon(string lat = "", string lon = "", string locationApiBaseUrl = "", string locationApiKey = "")
    {

        string locationApiFullUrl = $"{locationApiBaseUrl}?key={locationApiKey}&lat={lat}&lon={lon}&format=json";

        try
        {   
            var response = await httpClient.GetAsync(locationApiFullUrl);

            Console.WriteLine(response);

            if(response.IsSuccessStatusCode){
                return await response.Content.ReadFromJsonAsync<LocationModel>();
            }
            return null;
        }
        catch (Exception exception)
        {
            
            throw new Exception("Failed to fetch the location data from the API due to: ", exception);
        }
    }
}