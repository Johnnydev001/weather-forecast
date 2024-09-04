 const months: Array<string> = ['January', 'February','March','April','May','June','July','August','September','October','November','December']

export const monthsMappedToNumbers = months.map((elem, index) => {
    return {
        index,
        elem
    }
})
