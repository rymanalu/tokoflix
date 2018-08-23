describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Beranda')
    cy.contains('h3', 'Sedang Tayang')
  })
})
