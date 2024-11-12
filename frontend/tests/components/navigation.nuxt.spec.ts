import { mount } from '@vue/test-utils'
import navigationComponent from "~/components/navigation/navigation.vue"
import { describe, it, expect } from "vitest"

describe('Navigation component tests', () => {
  it('should match the snapshot and have a total of 3 links', async () => {

    const navigation = await mount(navigationComponent,{
      global: {
        stubs:{
          RouterLink: true
        }
      }
    })

    const links = navigation.findAll('ul li a')
    expect(links).toHaveLength(3)

    expect(navigation.html()).toMatchSnapshot();

})
})

