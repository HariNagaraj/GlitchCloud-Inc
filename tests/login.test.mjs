import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

// GlitchCloud OS — production environment.
// The login form ships with example Founder credentials pre-filled
// (username "Founder" / password "Founder"), which the app accepts via its
// built-in demo/mock auth path (see src/context/AuthContext.jsx).
const PROD_URL = "https://glitchcloud-in.web.app";

describe("GlitchCloud — Authentication", () => {
  it("renders the login portal", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: PROD_URL });

    // The React app renders into #root; give the bundle time to hydrate.
    await testdriver.wait(6000);

    const rendered = await testdriver.assert(
      "the GlitchCloud login portal is visible with a username/email field, a password field, and a 'Sign In to Portal' button",
    );
    expect(rendered).toBeTruthy();
  });

  it("signs in with the example Founder credentials", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: PROD_URL });
    await testdriver.wait(6000);

    // Username field — clear and type the example credential.
    const username = await testdriver.find(
      "the username / corporate email input field",
    );
    await username.click();
    await testdriver.pressKeys(["ctrl", "a"]);
    await testdriver.type("Founder");

    // Password field.
    const password = await testdriver.find("the password input field");
    await password.click();
    await testdriver.pressKeys(["ctrl", "a"]);
    await testdriver.type("Founder");

    // Submit.
    const signIn = await testdriver.find("the 'Sign In to Portal' button");
    await signIn.click();
    await testdriver.wait(5000);

    const loggedIn = await testdriver.assert(
      "the login form is no longer shown and the GlitchCloud dashboard / main application is visible",
    );
    expect(loggedIn).toBeTruthy();
  });
});
