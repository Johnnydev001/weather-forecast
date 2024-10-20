
public class LocationService : LocationInterface
{

    private static readonly HttpClient httpClient = new();

    public static async Task<List<LocationModel>?> GetLocationByLocationQuery(string query = "", string locationApiBaseUrl = "", string locationApiKey = "")
    {

        string locationApiFullUrl = $"{locationApiBaseUrl}?key={locationApiKey}&q={query}&limit={1}&dedupe={1}&format=json";

        try
        {
            var response = await httpClient.GetAsync(locationApiFullUrl);

            if (response.IsSuccessStatusCode){


                List<LocationModel> locationModelList = [];

                LocationModel[]? locationResponse = await response.Content.ReadFromJsonAsync<LocationModel[]>();

                foreach (LocationModel obj in locationResponse)
                {
     
                    LocationModel locationModel = new()
                    {
                        address = obj.address,
                        lat = obj.lat,
                        lon = obj.lon
                    };

                    locationModelList.Add(locationModel);
                }
                return locationModelList;


            }
            return null;
        }
        catch (Exception exception)
        {

            throw new Exception("Failed to fetch the location data from the API due to: ", exception);
        }
    }

    public static async Task<List<LocationModel>?> GetLocationByLocationCoordinates(string lat = "", string lon = "", string locationApiBaseUrl = "", string locationApiKey = "")
    {

        string locationApiFullUrl = $"{locationApiBaseUrl}?key={locationApiKey}&lat={lat}&lon={lon}&format=json";

        Console.WriteLine(locationApiFullUrl);


        try
        {
            var response = await httpClient.GetAsync(locationApiFullUrl);

            if (response.IsSuccessStatusCode){


                List<LocationModel> locationModelList = [];

                LocationModel[]? locationResponse = await response.Content.ReadFromJsonAsync<LocationModel[]>();

                foreach (LocationModel obj in locationResponse)
                {
    
                    LocationModel locationModel = new()
                    {
                        address = obj.address,
                        lat = obj.lat,
                        lon = obj.lon
                    };

                    locationModelList.Add(locationModel);
                }
                return locationModelList;


            }
            return null;
        }
        catch (Exception exception)
        {

            throw new Exception("Failed to fetch the location data from the API due to: ", exception);
        }
    }


}