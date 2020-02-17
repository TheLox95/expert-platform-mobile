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

  it.skip('should show toast when there are offering on list and fetch to API return no new offerings', async () => {
    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();

    await element(by.id('fab-button')).tap();

    await element(by.id('create-offering-input-name')).typeText('Travel to  the Tibet');
    await element(by.id('create-offering-input-description')).typeText('# a fun travel to the tibet');
    await element(by.id('create-offering-create-button')).tap();

    await waitFor(element(by.id('offering-name'))).toBeVisible().withTimeout(10 * 1000);
    await waitFor(element(by.text('Travel to  the Tibet'))).toBeVisible().withTimeout(10 * 1000);

    if (device.getPlatform() === 'android') {
      await device.pressBack(); // Android only
    } else {
      await element(by.traits(['button']))
        .atIndex(0)
        .tap();
    }

    /* we need to simulate a pull to refresh on the main list but the swipe method from the Detox API
    is not long enough to trigger the event, we nned to find a way to simulate this event */

  });

});