export default {

    async getOneCallWeather(queryParams = {lat : '', lon : '', lang: '', units: ''}) {

        const {
            lat,
            lon,
            lang, 
            units
        } = queryParams;

        const requestData = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            withCredentials: true
        }

        let baseEndpoint = `${process?.env?.BASE_URL}/${process?.env?.ONE_CALL_WEATHER_API_URL}?lat=${lat}&lon=${lon}`;

        if(lang){
            baseEndpoint += `&lang=${lang}`
        }
        if(units){
            baseEndpoint += `&units=${units}`
        }

        try {
            const oneCallWeatherRequest = await fetch(baseEndpoint, requestData );

            if(oneCallWeatherRequest.status === 200 || oneCallWeatherRequest.ok){
                const {current = {}}  = await oneCallWeatherRequest.json();

                return current;
            }



        } catch (error) {
            console.log('Error calling the weather service', error)
        }

    }



}