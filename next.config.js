/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")()

const NextConfig = {
  reactStrictMode: true,
}

module.exports = (phase, { defaultConfig }) => {
  return removeImports({
    ...defaultConfig,
    ...NextConfig,
  })
}
