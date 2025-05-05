/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 其他環境變量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __dirname: string; 