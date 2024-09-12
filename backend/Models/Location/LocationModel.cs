using System.Text.Json.Serialization;

public class LocationModel
{
    public AddressModel address {get; set;}

}

public class AddressModel {
    
    public string city { get; set; }

    public string state { get; set; }

    public string country { get; set; }
}