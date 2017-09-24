module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "airbnb"],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "require-default-props": [
          "error",
          "never"
        ]
    }
};
