public class AddressModel
{
    public string? name { get; set; }

    public string? city { get; set; }

    public string? country { get; set; }

}

public class LocationModel
{
    public AddressModel address { get; set; }

    public string? lat {get; set;}

    public string? lon {get; set;}
}