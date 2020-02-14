describe('OfferingList Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display `no offering found` when no offerings are return from backend', async () => {
    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();

    await waitFor(element(by.id('no-offering-found'))).toBeVisible().withTimeout(10 * 1000);

  });

});