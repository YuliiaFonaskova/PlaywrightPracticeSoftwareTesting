// Returns an environment variable or stops the test run with a clear error.
function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

// Keep test data in one place and read it from environment variables.
const testData = {
  user: {
    email: getRequiredEnv("USER_EMAIL"),
    password: getRequiredEnv("USER_PASSWORD"),
    invalidEmail: getRequiredEnv("INVALID_EMAIL"),
    invalidPassword: getRequiredEnv("INVALID_PASSWORD"),
  },

  // Use default product values when the corresponding environment variables are missing or empty.
  product: {
    searchRequest: process.env.SEARCH_REQUEST || "hammer",
    name: process.env.PRODUCT_NAME || "Hammer",
  },

  messages: {
    loginError: "Invalid email or password",
  },
};

module.exports = testData;
