import type {
  LocationByCoordinatesRequestType,
  LocationByCoordinatesResponseType,
  LocationRequestType,
  LocationResponseType,
} from "~/types/location/location-types";

const requestData = {
  method: "GET",
  "Content-Type": "application/json",
  Accept: "application/json",
  withCredentials: true,
};

export async function getLocationFromLocationQuery(
  queryParams: LocationRequestType
): Promise<LocationResponseType | undefined | null> {
  try {
    const { query = "" } = queryParams;

    const baseEndpoint = `${process?.env?.VITE_BASE_URL}/${process?.env?.VITE_LOCATION_QUERY_URL}?query=${query}`;
    const locationResponse = await fetch(baseEndpoint, requestData);

    if (locationResponse?.ok && locationResponse?.status == 200) {
      const locationResponseJson = await locationResponse.json();

      if (locationResponseJson?.length) {
        return (
          (await locationResponseJson[0]) ?? {
            address: {
              city: "",
              country: "",
              name: "",
            },
            lat: "",
            lon: "",
          }
        );
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

export async function getLocationFromLocationCoordinates(
  requestParams: LocationByCoordinatesRequestType
): Promise<LocationByCoordinatesResponseType | undefined | null> {
  try {
    const { lat = "", lon = "" } = requestParams;

    const baseEndpoint = `${process?.env?.VITE_BASE_URL}/${process?.env?.VITE_LOCATION_COORDINATES_URL}?lat=${lat}&lon=${lon}`;

    const locationResponse = await fetch(baseEndpoint, requestData);

    if (locationResponse?.ok && locationResponse?.status == 200) {
      return await locationResponse.json();
    }
    return null;
  } catch (e) {
    console.log(
      "Error fetching the location data by coordinates from the backend"
    );
  }
}
