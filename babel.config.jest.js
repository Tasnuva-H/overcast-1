// Jest-only Babel config (used by babel-jest for unit tests).
// Do not rename to babel.config.js or Next.js will try to use Babel and require babel-loader.
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ],
};
