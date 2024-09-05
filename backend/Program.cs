var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => {
    options.AddPolicy("AllowSpecificOrigins", policy => {
        policy.WithOrigins("http://localhost:5177").AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowSpecificOrigins");
app.mapWeatherRoutes(builder.Configuration);

app.Run();

