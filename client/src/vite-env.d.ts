/// <reference types="vite/client" />

declare global {
  interface Window {
    ethereum: import('ethers').providers.ExternalProvider
  }
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_CONTRACT_ADDRESS: string
    }
  }
}

export {}