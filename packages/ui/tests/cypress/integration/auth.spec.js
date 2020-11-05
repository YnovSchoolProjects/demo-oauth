describe('Login', () => {
  before(() => {
    cy.bootstrapApp();
  });

  it('should be able to visit login route', () => {
    cy.visit('/login');
    cy.get('[data-testid="login:container"]').should('exist');
  });

  it('should be able to authenticate into application ', () => {
    cy.login('guillaume.marmorat@gmail.com', 'password');

    cy.url().should('eq', 'http://localhost:8080/');
    cy.getStore().then((store) => {
      expect(store.getters['auth/isUserLogged']).to.be.true;
      expect(store.getters['auth/getUser']).to.deep.equal({
        id: 1,
        firstname: 'guillaume',
        lastname: 'marmorat',
        email: 'guillaume.marmorat@gmail.com',
        roles: ['ROLE_USER'],
      });
    });
  });

  it('should bea ble to logout', () => {
    cy.getStore().then((store) => {
      expect(store.getters['auth/isUserLogged']).to.be.true;
    });

    cy.get('[data-testid="logout:button"]').should('exist');
    cy.visit('/logout');

    cy.url().should('eq', 'http://localhost:8080/');

    cy.getStore().then((store) => {
      expect(store.getters['auth/isUserLogged']).to.be.false;
    });
  });
});
