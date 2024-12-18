export const getImageUrlByWeatherStatus = (weatherMainStatus: string | undefined, isIcon: boolean) => {

    switch (weatherMainStatus && weatherMainStatus?.toLowerCase()) {
        case 'clouds':
            return isIcon ? '/assets/imgs/cloudy.svg' : '/assets/imgs/background-cloudy.jpg';
    
        case 'windy':
            return isIcon ? '/assets/imgs/wind.svg' : '/assets/imgs/background-windy.jpg';

        case 'sunny':
            return isIcon ? '/assets/imgs/sun.svg' : '/assets/imgs/background-sunny.jpg';

        case 'rain':
            return isIcon ? '/assets/imgs/cloud-rain.svg' : '/assets/imgs/background-rainy.jpg';

        case 'snow':
            return isIcon ? '/assets/imgs/snowflake.svg' : '/assets/imgs/background-snowy.jpg';

        case 'thunderstorm':
            return isIcon ? '/assets/imgs/cloud-lightning.svg' : '/assets/imgs/background-thunder.jpg';

        case 'clear':
            return isIcon ? '/assets/imgs/sun.svg' : '/assets/imgs/background-sunny.jpg';

        case 'drizzle':
            return isIcon ? '/assets/imgs/cloud-rain.svg' : '/assets/imgs/background-drizzle.jpg';
    
        default:
               return isIcon ? '/assets/imgs/sun.svg' : '/assets/imgs/background-sunny.jpg';;
    }
}

export const capitalizeWord = (word: string) => {
    return word.charAt(0)?.toUpperCase() + word.slice(1);
}