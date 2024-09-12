using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNuxtApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Allow Nuxt.js frontend
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials(); // Optional if your app needs to send cookies/authentication
        });
});

var app = builder.Build();

app.UseCors("AllowNuxtApp");
app.mapWeatherRoutes(builder.Configuration);
app.mapLocationRoutes(builder.Configuration);

app.Run();



