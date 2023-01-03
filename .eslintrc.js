module.exports = {
  plugins: ["react"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: "@babel/eslint-parser",
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },

  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".json"],
      },
    },
    react: {
      pragma: "React",
      version: "18",
    }
  },
};
