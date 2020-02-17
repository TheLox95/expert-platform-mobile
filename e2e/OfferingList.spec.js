const axios = require('axios');

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

  it('should show toast when there are offering on list and fetch to API return no new offerings', async () => {
    await axios('http://localhost:1337/test/seedOfferings')

    await expect(element(by.id('login-username-input'))).toBeVisible();
      
    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();

    /* we need to simulate a pull to refresh on the main list but the swipe method from the Detox API
    is not long enough to trigger the event, we need to find a way to simulate this event */

    await element(by.text('Mcdaniel Massey')).swipe('down', 'fast', 1.0);
  });

});