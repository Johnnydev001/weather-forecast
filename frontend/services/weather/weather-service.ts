export default {

    async getOneCallWeather() {

        const requestData = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        
        }

        try {
            const oneCallWeatherResponse = await fetch('http://localhost:5177/onecall?lat=1&lon=2', requestData );

            const responseData = await oneCallWeatherResponse.json()

            console.log(responseData)

        } catch (error) {
            console.log('error serivce side', error)
        }

    }



}