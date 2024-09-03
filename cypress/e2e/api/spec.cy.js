describe('template spec', () => {
  it('passes', () => {
    let name="HP%20H2310%20In-ear%20Headset"
    let quantityPerEachCategory=-1;
    cy.request({
      method: 'GET',
      url: `https://www.advantageonlineshopping.com/catalog/api/v1/products/search?name=${name}&quantityPerEachCategory=${quantityPerEachCategory}`,
      headers: {
        accept: "*/*",
      }, 
    }).then((response) => {
      expect(response.status).to.equal(200);
    })
  })
})