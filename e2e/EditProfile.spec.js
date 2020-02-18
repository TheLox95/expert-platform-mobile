describe('Edit Expert Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display expert data', async () => {
    await expect(element(by.id('login-username-input'))).toBeVisible();

    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();
    await element(by.id('side-menu-button')).tap();
    await element(by.id('sidemenu-expert-button')).tap();
    await element(by.id('expert-edit-button')).tap()

    await waitFor(element(by.text('nick'))).toBeVisible().withTimeout(10 * 1000);
  });

  it('should navigate to `profile screen` when editing is successful', async () => {
    await expect(element(by.id('login-username-input'))).toBeVisible();

    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();
    await element(by.id('side-menu-button')).tap();
    await element(by.id('sidemenu-expert-button')).tap();
    await element(by.id('expert-edit-button')).tap()

    await element(by.id('edit-expert-username')).clearText();
    await element(by.id('edit-expert-username')).typeText('nicholas');

    await element(by.id('edit-expert-button')).tap();

    await waitFor(element(by.text('Nicholas'))).toBeVisible().withTimeout(10 * 1000);
  });

  it('should validate form data', async () => {
    await expect(element(by.id('login-username-input'))).toBeVisible();

    await element(by.id('login-username-input')).typeText('nick@mail.com');
    await element(by.id('login-password-input')).typeText('nick123');
    await element(by.id('login-send-button')).tap();
    await element(by.id('side-menu-button')).tap();
    await element(by.id('sidemenu-expert-button')).tap();
    await element(by.id('expert-edit-button')).tap()

    await element(by.id('edit-expert-username')).clearText();
    await element(by.id('edit-expert-aboutme')).clearText();

    await element(by.id('edit-expert-button')).tap();

    await expect(element(by.id('edit-expert-username-error'))).toBeVisible();
    await expect(element(by.id('edit-expert-aboutme-error'))).toBeVisible();

  });

});