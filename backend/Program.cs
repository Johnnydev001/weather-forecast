var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.mapWeatherRoutes(builder.Configuration);

app.Run();
