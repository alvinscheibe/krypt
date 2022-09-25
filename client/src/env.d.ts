/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTRACT_ADDRESS: string;
  readonly VITE_GIPHY_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
