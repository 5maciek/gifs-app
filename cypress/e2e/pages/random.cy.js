describe('random page', () => {
    it('should show one random gif', () => {
        cy.visit('http://localhost:3000/random')
        cy.wait(500);
        cy.get("li").should("exist");
    })

    it('should change gif when click random button', () => {
        cy.visit('http://localhost:3000/random')
        cy.wait(500);
        let imgSrc = "";
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