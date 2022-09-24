declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_CONTRACT_ADDRESS: string
    }
  }
}

export {}