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

describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should menampilkan halaman login dengan form yang benar', () => {
    cy.get('input[placeholder="Masukkan email Anda"]').should('be.visible');
    cy.get('input[placeholder="Masukkan password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain.text', 'Masuk Sekarang');
    cy.contains('Selamat Datang').should('be.visible');
  });

  it('should menampilkan pesan error validasi saat submit form kosong', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Email wajib diisi').should('be.visible');
  });

  it('should menampilkan error validasi password kurang dari 6 karakter', () => {
    cy.get('input[placeholder="Masukkan email Anda"]').type('user@test.com');
    cy.get('input[placeholder="Masukkan password"]').type('123');
    cy.get('button[type="submit"]').click();

    cy.contains('Password minimal 6 karakter').should('be.visible');
  });

  it('should berhasil login dengan kredensial yang valid dan redirect ke halaman utama', () => {
    cy.get('input[placeholder="Masukkan email Anda"]').type(Cypress.env('TEST_EMAIL') || 'dimasmd@example.com');
    cy.get('input[placeholder="Masukkan password"]').type(Cypress.env('TEST_PASSWORD') || 'password123');
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', `${Cypress.config('baseUrl')  }/`);
    cy.get('nav').should('be.visible');
  });

  it('should menampilkan error saat login dengan kredensial yang salah', () => {
    cy.get('input[placeholder="Masukkan email Anda"]').type('salah@example.com');
    cy.get('input[placeholder="Masukkan password"]').type('passwordsalah');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (text) => {
      expect(text).to.include('salah');
    });
  });

  it('should dapat logout setelah berhasil login', () => {
    cy.get('input[placeholder="Masukkan email Anda"]').type(Cypress.env('TEST_EMAIL') || 'dimasmd@example.com');
    cy.get('input[placeholder="Masukkan password"]').type(Cypress.env('TEST_PASSWORD') || 'password123');
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', `${Cypress.config('baseUrl')  }/`);

    // Tunggu navbar muncul dan avatar user tampil (tanda sudah login)
    cy.get('nav').should('be.visible');

    // Klik tombol logout via title attribute (lebih reliable dari text yang hidden di mobile)
    cy.get('button[title="Keluar"]').should('be.visible').click();

    cy.url().should('include', '/login');
  });
});