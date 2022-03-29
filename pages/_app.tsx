import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "amp-ad" : {
        width : string,
        children : Element,
        height : string,
        type : string,
        "data-ad-client" : string,
        "data-ad-slot" : string,
        "data-auto-format" : string,
        "data-full-width" : string
      };
    }
  }
}

function MyApp({
  Component,
  pageProps
} : AppProps) {
  useEffect(() => {
  }, []);

  return <Component { ...pageProps } />;
}

export default MyApp;
