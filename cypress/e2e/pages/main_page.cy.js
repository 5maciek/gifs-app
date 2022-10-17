/// <reference types="cypress" />

describe('main page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should load default gifs', () => {
    cy.get("ul").should('exist')
  })

  it('should click on nav link', () => {
    cy.get("[aria-label=random]").should('exist')
    cy.get("[aria-label=random]").click()
    cy.wait(500)
    cy.url().should('eq', 'http://localhost:3000/random')
  })

  it('should search gif by input value', () => {
    cy.get("input").type('kittens')
    cy.get("input").type("{enter}")
    cy.wait(500)
    cy.get("li").should('exist').should('have.length', 5)
  })

  it('should scroll and load more gifs', () => {
    cy.wait(1000)
    cy.get('[aria-label=lastGif]').scrollIntoView({ duration: 0 })
    cy.wait(500)
    cy.get("li").should('exist').should('have.length', 10)
  })
})
