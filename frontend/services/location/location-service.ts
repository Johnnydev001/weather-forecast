export default {


    async getLocationFromLatAndLon(queryParams = {lat : '', lon : ''}){

        try {
            
            const {
                lat = '',
                lon = ''
            } = queryParams;

            const requestData = {
                method: 'GET',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                withCredentials: true

            }

            const baseEndpoint = `${process?.env?.BASE_URL}/${process?.env?.LOCATION_API_URL}?lat=${lat}&lon=${lon}`;

            const locationResponse = await fetch(baseEndpoint, requestData);

            if(locationResponse.ok && locationResponse.status == 200){
                const {address} = await locationResponse.json();

                return address;
            }

            return null;


        } catch(e){
            console.log("Error fetching the location data from the latitude and longitude")
        }

    }


}