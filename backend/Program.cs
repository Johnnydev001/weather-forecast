var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var apiKey = builder.Configuration["WeatherApiKey"];

app.MapGet("/", () => apiKey);

app.Run();
