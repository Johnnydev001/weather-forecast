import { mountSuspended } from '@nuxt/test-utils/runtime';
import { shallowMount } from '@vue/test-utils';
import {it, describe, expect, vi} from 'vitest'
import { a } from 'vitest/dist/chunks/suite.B2jumIFP.js';
import WeatherStatusComponent from '~/components/weather-status/weather-status.vue';


describe('Weather status tests', () => {


    it('should match the snapshot when not redirected', async () => {

        const props = 'paris';

        const weatherStatus = await mountSuspended(WeatherStatusComponent, {
            data() {
                return {
                    address: {
                        country: 'FR',
                        city: 'Paris',
                        name: 'Paris'
                    },
                    lat: 10,
                    lon: 10
                }
            },
            props: {
                locationToFind: props
            },
           
        })

console.log(weatherStatus.html())
        expect(weatherStatus.html()).toMatchSnapshot()


    })

})