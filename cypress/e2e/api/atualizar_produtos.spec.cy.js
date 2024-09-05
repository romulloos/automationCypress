describe("atualização de produtos", () => {
    let token = 0;
    let userId = 0;
    let email = "romeu@gmail.com";
    let loginPassword = "12345qQ";
    let loginUser = "romeu";


    before(() => {

        cy.request({
            method: 'POST',
            headers: {
                accept: "*/*",
                'Content-Type': "application/json",
            },
            body: {
                email: email,
                loginPassword: loginPassword,
                loginUser: loginUser,
            },
        }).then((response) => {
            expect(response.status).to.be.equal(200);
            expect(response.body.reason).to.be.contains("Login Successful");
            token = response.body.token;
            userId = response.body.userId;
        });

    });

    it("Validar atualização de imagem de produto", () => {
        let source = "local";
        let color = "black";
        let name = "H2310"
        let quantityPerEachCategory = -1;
        let productId = 0;
        let productImageId = 0;

        cy.request({
            method: 'GET',
            url: `https://www.advantageonlineshopping.com/catalog/api/v1/products/search?name=${name}&quantityPerEachCategory=${quantityPerEachCategory}`,
            headers: {
                accept: "*/*",
            },
        }).then((response) => {
            expect(response.status).to.equal(200);
            response.body.products.forEach(products => {
                if (products.productId === 12) {
                    expect(products.productId).to.be.equal(12);
                    productId = products.productId;
                }
            });
        });

        cy.request({
            method: 'GET',
            url: `https://www.advantageonlineshopping.com/catalog/api/v1/products/${productId}`,
            headers: {
                accept: "*/*",
            },
        }).then((response) => {
            expect(response.status).to.be.equal(200);
            const imageslist = response.body.images;
            expect(imageslist).to.include("custom_image_local_362e7f36-6879-4ba2-970d-f86cfa8d0bd9");
        });

        const imagePath = 'headphoneback.jpg';
        cy.fixture(imagePath, 'binary').then((fileContent) => {
            const formData = new FormData();
            const blob = Cypress.Blob.binaryStringToBlob(fileContent, 'image/jpeg');
            formData.append('file', blob, imagePath);

            cy.request({
                method: "PUT",
                url: `https://www.advantageonlineshopping.com/catalog/api/v1/product/image/${userId}/${source}/${color}?product_id=${productId}`,
                headers: {
                    token: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
                form: false,
                json: false,
            }).then((response) => {
                expect(response.status).to.be.equal(200);
                expect(response.body.success).to.be.true
                expect(response.body.imageId).not.to.equal(productImageId);
            })
        });
    });
});