import { mountSuspended } from '@nuxt/test-utils/runtime'
import {it, describe, expect, vi, beforeEach} from 'vitest'
import { SpyModule } from 'vitest/browser.js'
import WeatherForecastItemComponent from '~/components/weather-forecast/weather-forecast-item.vue'

describe('Weather forecast item tests', () => {

    vi.mock('@/utils/utils', () => ({
        getImageUrlByWeatherStatus: vi.fn().mockReturnValue('/assets/imgs/cloudy.svg'),
        capitalizeWord: vi.fn().mockReturnValue('WORD')
    }))

    it('should match the snapshot', async () => {

        const item = {
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


        const weatherForecastItem = await mountSuspended(WeatherForecastItemComponent,{
            props: item,
            
        })

        await weatherForecastItem.vm.$nextTick()

        expect(weatherForecastItem.html).toMatchSnapshot()

    })


})