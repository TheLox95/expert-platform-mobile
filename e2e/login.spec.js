describe('Login Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should login fine', async () => {
    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();

    await waitFor(element(by.id('search-button'))).toBeVisible().withTimeout(10 * 1000);
    await waitFor(element(by.id('fab-button'))).toBeVisible().withTimeout(10 * 1000);
  });

  it('should login fine', async () => {
    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('maria@mail.com');
    await element(by.id('login-password-input')).typeText('maria123');
    await element(by.id('login-send-button')).tap();

    await waitFor(element(by.id('search-button'))).toBeVisible().withTimeout(10 * 1000);
    await expect(element(by.id('fab-button'))).toBeNotVisible();
  });

});