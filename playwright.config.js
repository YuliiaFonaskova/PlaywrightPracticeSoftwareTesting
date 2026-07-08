// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  retries: 2,

  workers: 2,

  reporter: [["list"], ["html"]],

  use: {
    baseURL: "https://practicesoftwaretesting.com",

    headless: true,

    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",

      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",

      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",

      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
});
