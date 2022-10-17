describe('random page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/random')
        cy.intercept({
            method: "GET",
            url: `https://api.giphy.com/v1/gifs/random?api_key=${process.env.REACT_APP_API_KEY}`
        }).as("dataGetFirst");
        cy.wait("@dataGetFirst");
    })

    it("should contain a gif in the page", () => {
        cy.get("img").should("exist");
    })

    it('should change gif when click random button', () => {
        let imgSrc = "";
        cy.wait(2000);
        cy.document().then((doc) => {
            imgSrc = doc.querySelector("img").src;
        })
        cy.get("button").click();
        cy.wait(500);
        cy.document().then((doc) => {
            cy.get("img").invoke("attr", "src").should("not.eq", imgSrc);
        })
    })
})