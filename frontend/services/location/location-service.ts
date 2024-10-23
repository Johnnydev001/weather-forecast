import type { LocationByCoordinatesRequestType, LocationByCoordinatesResponseType, LocationRequestType, LocationResponseType } from "~/types/location/location-types";

export async function getLocationFromLocationQuery(queryParams: LocationRequestType): Promise<LocationResponseType | undefined | null>{

        try {
            
            const {
                query = '',
            } = queryParams;

            const requestData = {
                method: 'GET',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                withCredentials: true

            }

           // const baseEndpoint = `${process?.env?.BASE_URL}/${process?.env?.LOCATION_API_URL}?lat=${lat}&lon=${lon}`;

            const locationResponse = await fetch(`http://localhost:5177/location-by-query?query=${query}`, requestData);

            if(locationResponse.ok && locationResponse.status == 200){

                const locationResponseJson = await locationResponse.json();

                if(locationResponseJson?.length){
                    return await locationResponseJson[0] ?? {
                        address: {
                            city: '',
                            country: '',
                            name: '',
                        },
                        lat: '',
                        lon: ''
                        
                    }
                }

            }
            return null;
            
        } catch(e){
            console.log("Error fetching the location data by query from the backend")
        }
}

export async function getLocationFromLocationCoordinates(requestParams: LocationByCoordinatesRequestType): Promise<LocationByCoordinatesResponseType | undefined | null>{

    try {
        
        const {
            lat = "",
            lon = ""
        } = requestParams;

        const requestData = {
            method: 'GET',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            withCredentials: true
        
        }

       // const baseEndpoint = `${process?.env?.BASE_URL}/${process?.env?.LOCATION_API_URL}?lat=${lat}&lon=${lon}`;

        const locationResponse = await fetch(`http://localhost:5177/location-by-coordinates?lat=${lat}&lon=${lon}`, requestData);

        if(locationResponse.ok && locationResponse.status == 200){

            return await locationResponse.json();

        }
        return null;
        
    } catch(e){
        console.log("Error fetching the location data by coordinates from the backend")
    }




}