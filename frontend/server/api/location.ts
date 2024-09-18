import locationService from "~/services/location/location-service";
import { LocationResponseType } from "~/types/location/location-types";

export default defineEventHandler(async (event) => {

    const queryFromPath = getQuery(event);

    let locationResponseJson: LocationResponseType = {
        address: {
            country: '',
            city: '',
            name: ''
        },
        lat: '',
        lon: '',
    }

    try {
        const locationResponse = await locationService.getLocationFromLocationQuery({ query: queryFromPath.query });

        if (locationResponse) {
            locationResponseJson.address = {
                country: locationResponse?.address?.country,
                city: locationResponse?.address?.city,
          
                name: locationResponse.address?.name
            }
            locationResponseJson.lat = locationResponse?.lat;
            locationResponseJson.lon = locationResponse?.lon;
        }
        return locationResponseJson;

    } catch (error) {
        console.log('Failed to get the location data from the service due to: ', error);
    }


})