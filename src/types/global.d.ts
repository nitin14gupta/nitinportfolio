declare module "@react-three/fiber" {
  const value: unknown;
  export = value;
}

declare module "@react-three/drei" {
  const value: unknown;
  export = value;
}

declare global {
  namespace JSX {
    // Fall back to unknown to satisfy strict linters while allowing custom tags
    interface IntrinsicElements {
      [elemName: string]: unknown;
    }
  }
}

export {};


