import { mountSuspended } from "@nuxt/test-utils/runtime"
import footerComponent from "~/components/footer/footer.vue"
import {describe, it, expect } from 'vitest'

describe('Footer component tests', () => {
    it('should match the footer component snapshot', async () => {
        const footer = await mountSuspended(footerComponent)
    
        expect(footer.text()).toMatchSnapshot(`
            <p class="copyright">&copy; 
                <a href="https://www.linkedin.com/in/jo%C3%A3o-saraiva-ab662b197/">
                    João Saraiva - 2024
                </a>
            </p>   
            `)
    })
})
