import { d as defineEventHandler, g as getQuery, r as readBody } from '../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';

const requestData = {
  method: "GET",
  "Content-Type": "application/json",
  "Accept": "application/json",
  withCredentials: true
};
async function getLocationFromLocationQuery(queryParams) {
  var _a;
  try {
    const { query = "" } = queryParams;
    const locationResponse = await fetch(
      `http://localhost:80/location-by-query?query=${query}`,
      requestData
    );
    if ((locationResponse == null ? void 0 : locationResponse.ok) && (locationResponse == null ? void 0 : locationResponse.status) == 200) {
      const locationResponseJson = await locationResponse.json();
      if (locationResponseJson == null ? void 0 : locationResponseJson.length) {
        return (_a = await locationResponseJson[0]) != null ? _a : {
          address: {
            city: "",
            country: "",
            name: ""
          },
          lat: "",
          lon: ""
        };
      }
    }
    return null;
  } catch (e) {
    console.error(
      "Error fetching the location data by query from the backend due to",
      e
    );
  }
}
async function getLocationFromLocationCoordinates(requestParams) {
  try {
    const { lat = "", lon = "" } = requestParams;
    const locationResponse = await fetch(
      `http://localhost:80/location-by-coordinates?lat=${lat}&lon=${lon}`,
      requestData
    );
    if ((locationResponse == null ? void 0 : locationResponse.ok) && (locationResponse == null ? void 0 : locationResponse.status) == 200) {
      return await locationResponse.json();
    }
    return null;
  } catch (e) {
    console.log("Error fetching the location data by coordinates from the backend");
  }
}

const location = defineEventHandler(async (event) => {
  var _a;
  const method = (_a = event == null ? void 0 : event.method) != null ? _a : "GET" /* GET */;
  switch (method) {
    case "GET" /* GET */:
      return await getLocationFromQuery(event);
    case "POST" /* POST */:
      return await getLocationFromCoordinates(event);
  }
});
async function getLocationFromQuery(event) {
  var _a, _b, _c;
  const queryFromPath = getQuery(event);
  let locationResponseJson = {
    address: {
      country: "",
      city: "",
      name: ""
    },
    lat: "",
    lon: ""
  };
  try {
    const locationResponse = await getLocationFromLocationQuery({ query: queryFromPath == null ? void 0 : queryFromPath.query });
    if (locationResponse) {
      locationResponseJson.address = {
        country: (_a = locationResponse == null ? void 0 : locationResponse.address) == null ? void 0 : _a.country,
        city: (_b = locationResponse == null ? void 0 : locationResponse.address) == null ? void 0 : _b.city,
        name: (_c = locationResponse.address) == null ? void 0 : _c.name
      };
      locationResponseJson.lat = locationResponse == null ? void 0 : locationResponse.lat;
      locationResponseJson.lon = locationResponse == null ? void 0 : locationResponse.lon;
    }
    return locationResponseJson;
  } catch (error) {
    console.error("Failed to get the location data through query from the service due to: ", error);
  }
}
async function getLocationFromCoordinates(event) {
  var _a, _b, _c, _d, _e;
  const body = await readBody(event);
  const requestParams = {
    lat: (_a = body == null ? void 0 : body.lat) != null ? _a : "",
    lon: (_b = body == null ? void 0 : body.lon) != null ? _b : ""
  };
  let locationResponseJson = {
    country: "",
    city: "",
    name: ""
  };
  try {
    const locationResponse = await getLocationFromLocationCoordinates(requestParams);
    if (locationResponse) {
      locationResponseJson = {
        name: (_c = locationResponse == null ? void 0 : locationResponse.address) == null ? void 0 : _c.name,
        country: (_d = locationResponse == null ? void 0 : locationResponse.address) == null ? void 0 : _d.country,
        city: (_e = locationResponse == null ? void 0 : locationResponse.address) == null ? void 0 : _e.city
      };
    }
    return locationResponseJson;
  } catch (error) {
    console.log("Failed to get the location data through coordinates from the service due to: ", error);
  }
}

export { location as default };
//# sourceMappingURL=location.mjs.map
