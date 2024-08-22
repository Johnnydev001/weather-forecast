var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

WeatherRequestModel weatherRequestModel = new(){
    lat = "",
    lon = "",
    lang = "",
    units = ""
};


app.mapWeatherRoutes(builder.Configuration, weatherRequestModel);

app.Run();
