/// <reference types="vite/client" />

// Only needed if your project complains specifically about CSS ?url imports:
declare module "*.css?url" {
  const href: string;
  export default href;
}
