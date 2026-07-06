const testData = {
  user: {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD,
    invalidEmail: process.env.INVALID_EMAIL,
    invalidPassword: process.env.INVALID_PASSWORD,
  },

  product: {
    searchRequest: process.env.SEARCH_REQUEST,
    name: process.env.PRODUCT_NAME,
  },
};

module.exports = testData;
