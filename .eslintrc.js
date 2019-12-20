module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb-base",
        "prettier"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },

    plugins: ['prettier'],

    "rules": {
      "class-methods-use-this": "off",
      "no-param-reassign": "off",
      "camelcase": "off",
      "no-unused-vars": ["error", {argsIgnorePattern: "next"}],
      "prettier/prettier": "error",
      "no-console": "off",
      "no-restricted-syntax":
      [
        "error",
        {
          "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
          "message": "Unexpected property on console object was called"
        }
      ]

    }
};
