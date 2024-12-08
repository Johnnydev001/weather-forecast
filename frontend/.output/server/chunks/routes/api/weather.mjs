import { d as defineEventHandler, r as readBody, c as createError } from '../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';

const requestData = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: true
};
async function getCurrentWeather(queryParams) {
  const {
    lat = "",
    lon = "",
    lang = "pt",
    units = "metric"
  } = queryParams;
  try {
    const oneCallWeatherRequest = await fetch(`http://localhost:80/current-weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}`, requestData);
    if ((oneCallWeatherRequest == null ? void 0 : oneCallWeatherRequest.status) === 200 || (oneCallWeatherRequest == null ? void 0 : oneCallWeatherRequest.ok)) {
      return await (oneCallWeatherRequest == null ? void 0 : oneCallWeatherRequest.json());
    }
    return null;
  } catch (error) {
    console.error("Error calling the weather service due to: ", error);
  }
}

const weather = defineEventHandler(async (event) => {
  return await callGetCurrentWeather(event);
});
const callGetCurrentWeather = async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const bodyFromRequest = await readBody(event);
  try {
    const weatherResponse = await getCurrentWeather(bodyFromRequest);
    if (!weatherResponse || !Object.entries(weatherResponse).length) {
      return createError({
        status: 404,
        statusMessage: "No weather data was found for the given location"
      });
    }
    return {
      temperature: (_a = weatherResponse == null ? void 0 : weatherResponse.current) == null ? void 0 : _a.temp,
      feelsLikeTemperature: (_b = weatherResponse == null ? void 0 : weatherResponse.current) == null ? void 0 : _b.feels_like,
      windSpeed: (_c = weatherResponse == null ? void 0 : weatherResponse.current) == null ? void 0 : _c.wind_speed,
      humidity: (_d = weatherResponse == null ? void 0 : weatherResponse.current) == null ? void 0 : _d.humidity,
      pressure: (_e = weatherResponse == null ? void 0 : weatherResponse.current) == null ? void 0 : _e.pressure,
      cloudsPercentage: (_f = weatherResponse == null ? void 0 : weatherResponse.current) == null ? void 0 : _f.clouds,
      weatherMainStatus: (_h = (_g = weatherResponse == null ? void 0 : weatherResponse.current) == null ? void 0 : _g.weather[0]) == null ? void 0 : _h.main,
      weatherDescription: (_j = (_i = weatherResponse == null ? void 0 : weatherResponse.current) == null ? void 0 : _i.weather[0]) == null ? void 0 : _j.description,
      daily: weatherResponse == null ? void 0 : weatherResponse.daily
    };
  } catch (error) {
    return createError({
      status: (error == null ? void 0 : error.statusCode) || (error == null ? void 0 : error.status),
      statusMessage: "Failed to get the weather data"
    });
  }
};

export { weather as default };
//# sourceMappingURL=weather.mjs.map
