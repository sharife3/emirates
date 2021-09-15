import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { FrontendComponents } from '@emirates/frontend-components';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <FrontendComponents />
        <title>Welcome to flights-ui!</title>
      </Head>
      <div className="app">
        <header className="flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nx-logo-white.svg" alt="Nx logo" width="75" height="50" />
          <h1>Welcome to flights-ui!</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default CustomApp;
