const withRemoveImports = require("next-remove-imports")()

/** @type {import('next').NextConfig} */
const NextConfig = {
  reactStrictMode: true,
}

module.exports = withRemoveImports(NextConfig)
