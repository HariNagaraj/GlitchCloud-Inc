import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

// GlitchCloud OS — production environment.
// Signs in with the example Founder credentials (which have full access to all
// navigation) and verifies the primary in-app views load.
const PROD_URL = "https://glitchcloud-in.web.app";

async function loginAsFounder(testdriver) {
  await testdriver.provision.chrome({ url: PROD_URL });
  await testdriver.wait(6000);

  const username = await testdriver.find(
    "the username / corporate email input field",
  );
  await username.click();
  await testdriver.pressKeys(["ctrl", "a"]);
  await testdriver.type("Founder");

  const password = await testdriver.find("the password input field");
  await password.click();
  await testdriver.pressKeys(["ctrl", "a"]);
  await testdriver.type("Founder");

  const signIn = await testdriver.find("the 'Sign In to Portal' button");
  await signIn.click();
  await testdriver.wait(5000);
}

describe("GlitchCloud — Navigation", () => {
  it("lands on the dashboard after signing in", async (context) => {
    const testdriver = TestDriver(context);

    await loginAsFounder(testdriver);

    const onDashboard = await testdriver.assert(
      "the GlitchCloud dashboard is visible with a sidebar navigation and dashboard content (stat cards, charts, or overview widgets)",
    );
    expect(onDashboard).toBeTruthy();
  });

  it("navigates from the dashboard to the Team page", async (context) => {
    const testdriver = TestDriver(context);

    await loginAsFounder(testdriver);

    const teamNav = await testdriver.find(
      "the 'Team' navigation item in the sidebar",
    );
    await teamNav.click();
    await testdriver.wait(4000);

    const onTeam = await testdriver.assert(
      "the Team page is visible (a list of team members / employees or team-related content)",
    );
    expect(onTeam).toBeTruthy();
  });
});
