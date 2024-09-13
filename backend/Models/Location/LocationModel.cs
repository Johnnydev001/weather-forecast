public class AddressModel
{

    public string city { get; set; }

    public string country { get; set; }

}

public class LocationModel
{
    public AddressModel address { get; set; }
}

