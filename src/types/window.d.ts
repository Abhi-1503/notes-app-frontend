// src/types/window.d.ts
export {};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement | null,
            options: { theme: string; size: string; width: string }
          ) => void;
        };
      };
    };
  }
}
