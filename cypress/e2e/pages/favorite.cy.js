describe('favorite page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/favorite')
    })

    it('should show text when local storage is empty', () => {
        localStorage.setItem("favorite", JSON.stringify(""));
        cy.get("p").contains("You don't have any favorite Gifs yet");
    })
})

describe('favorite page', () => {
    const testIds = ["rYItGMExSlMyMsyYU5", "KdC9XVrVYOVu6zZiMH"];

    before(() => {
        cy.visit('http://localhost:3000/favorite')
        localStorage.setItem("favorite", JSON.stringify(testIds));
    })

    it('should show as much gifs are in local storage ids', () => {
        cy.wait(2500);
        cy.get("li").should("have.length", testIds.length);
    })
})