declare module "@react-three/fiber" {
  const value: any;
  export = value;
}

declare module "@react-three/drei" {
  const value: any;
  export = value;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};


