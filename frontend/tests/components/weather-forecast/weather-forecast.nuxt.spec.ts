import { mountSuspended } from '@nuxt/test-utils/runtime';
import { it, describe, expect, vi} from 'vitest';
import WeatherForecastComponent from '~/components/weather-forecast/weather-forecast.vue';

describe('Weather forecast tests', () => {

    vi.mock('@/utils/utils', () => ({
        getImageUrlByWeatherStatus: vi.fn().mockReturnValue('/assets/imgs/cloudy.svg'),
        capitalizeWord: vi.fn().mockReturnValue('WORD')
    }))

    it('should match the snapshot', async () => {


        const props = [
            {
                dt: new Date().toString(),
                temp: {
                    min: 10,
                    max: 20
                },
                weather: [
                    {
                        main: 'cloudy',
                        description: 'Cloudy'
                    }
                ]
            }
        ]


        const weatherForecast = await mountSuspended(WeatherForecastComponent, {
            props: {
                weatherForecast: props
            }
        })

        expect(weatherForecast.html()).toMatchSnapshot()


    })

})
