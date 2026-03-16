/**
 * Test Skenario End-to-End untuk alur Login:
 *
 * - should menampilkan halaman login dengan form yang benar
 * - should menampilkan pesan error validasi saat submit form kosong
 * - should menampilkan error validasi password kurang dari 6 karakter
 * - should berhasil login dengan kredensial yang valid dan redirect ke halaman utama
 * - should menampilkan error saat login dengan kredensial yang salah
 * - should dapat logout setelah berhasil login
 */

const fakeToken = 'fake-token-cypress-test-123';
const fakeUser = {
  id: 'user-cypress-1',
  name: 'Cypress Tester',
  email: 'cypress@test.com',
  avatar: 'https://ui-avatars.com/api/?name=Cypress+Tester',
};

describe('Login Flow', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('should menampilkan halaman login dengan form yang benar', () => {
    cy.intercept('GET', '**/users/me', {
      statusCode: 401,
      body: { status: 'fail', message: 'Unauthorized' },
    });

    cy.visit('/login');
    cy.get('input[placeholder="Masukkan email Anda"]').should('be.visible');
    cy.get('input[placeholder="Masukkan password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain.text', 'Masuk Sekarang');
    cy.contains('Selamat Datang').should('be.visible');
  });

  it('should menampilkan pesan error validasi saat submit form kosong', () => {
    cy.intercept('GET', '**/users/me', {
      statusCode: 401,
      body: { status: 'fail', message: 'Unauthorized' },
    });

    cy.visit('/login');
    cy.get('button[type="submit"]').click();
    cy.contains('Email wajib diisi').should('be.visible');
  });

  it('should menampilkan error validasi password kurang dari 6 karakter', () => {
    cy.intercept('GET', '**/users/me', {
      statusCode: 401,
      body: { status: 'fail', message: 'Unauthorized' },
    });

    cy.visit('/login');
    cy.get('input[placeholder="Masukkan email Anda"]').type('user@test.com');
    cy.get('input[placeholder="Masukkan password"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.contains('Password minimal 6 karakter').should('be.visible');
  });

  it('should berhasil login dengan kredensial yang valid dan redirect ke halaman utama', () => {
    cy.intercept('GET', '**/users/me', {
      statusCode: 401,
      body: { status: 'fail', message: 'Unauthorized' },
    }).as('preload');

    cy.visit('/login');
    cy.wait('@preload');

    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { token: fakeToken } },
    }).as('loginRequest');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { user: fakeUser } },
    }).as('profileRequest');

    cy.intercept('GET', '**/threads', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { threads: [] } },
    });

    cy.intercept('GET', '**/users', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { users: [] } },
    });

    cy.get('input[placeholder="Masukkan email Anda"]').type('cypress@test.com');
    cy.get('input[placeholder="Masukkan password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.wait('@profileRequest');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    cy.get('nav').should('be.visible');
  });

  it('should menampilkan error saat login dengan kredensial yang salah', () => {
    cy.intercept('GET', '**/users/me', {
      statusCode: 401,
      body: { status: 'fail', message: 'Unauthorized' },
    });

    cy.visit('/login');

    cy.intercept('POST', '**/login', {
      statusCode: 400,
      body: { status: 'fail', message: 'email atau password salah' },
    }).as('loginFailed');

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('input[placeholder="Masukkan email Anda"]').type('salah@example.com');
    cy.get('input[placeholder="Masukkan password"]').type('passwordsalah');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFailed');
    cy.then(() => {
      expect(alertStub).to.have.been.calledWithMatch(/salah/i);
    });
  });

  it('should dapat logout setelah berhasil login', () => {
    cy.intercept('GET', '**/users/me', {
      statusCode: 401,
      body: { status: 'fail', message: 'Unauthorized' },
    }).as('preload');

    cy.visit('/login');
    cy.wait('@preload');

    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { token: fakeToken } },
    }).as('loginRequest');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { user: fakeUser } },
    }).as('profileRequest');

    cy.intercept('GET', '**/threads', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { threads: [] } },
    });

    cy.intercept('GET', '**/users', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { users: [] } },
    });

    cy.get('input[placeholder="Masukkan email Anda"]').type('cypress@test.com');
    cy.get('input[placeholder="Masukkan password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.wait('@profileRequest');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);

    cy.get('button[title="Keluar"]').should('be.visible').click();
    cy.url().should('include', '/login');
  });
});