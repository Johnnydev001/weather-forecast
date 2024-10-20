import {getLocationFromLocationQuery, getLocationFromLocationCoordinates} from "~/services/location/location-service";
import { LocationByCoordinatesRequestType, LocationResponseType } from "~/types/location/location-types";

export default defineEventHandler(async (event) => {


    const method = event.method ?? 'GET';

    switch (method) {
        case 'GET':
            return await getLocationFromQuery(event);

        case 'POST':
            return await getLocationFromCoordinates(event);

        default:
            break;

    }



})

async function getLocationFromQuery(event: any) {

    const queryFromPath = await getQuery(event);

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
        const locationResponse = await getLocationFromLocationQuery({ query: queryFromPath.query });

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
        console.log('Failed to get the location data through query from the service due to: ', error);
    }
}

async function getLocationFromCoordinates(event: any) {

    const body = await readBody(event)

    console.log('debug',body)

    const requestParams: LocationByCoordinatesRequestType = {
        lat: body?.lat ?? '',
        lon: body?.lon ?? ''
    }

    let locationResponseJson: LocationResponseType = {
        address: {
            country: '',
            city: '',
            name: ''
        },
    }

    try {
        const locationResponse = await getLocationFromLocationCoordinates(requestParams );

        if (locationResponse) {
            locationResponseJson.address = {
                country: locationResponse?.address?.country,
                city: locationResponse?.address?.city,
            }
        }
        return locationResponseJson;

    } catch (error) {
        console.log('Failed to get the location data through coordinates from the service due to: ', error);
    }
}