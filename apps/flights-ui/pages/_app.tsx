import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import Header from '../components/header/header';
import { ReactElement } from 'react';

function CustomApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <Head>
        <title>Welcome to flights-ui!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="Keywords" content="Flights Application" />
        <meta name="Description" content="Flights Application" />
      </Head>
      <div className="app" role="application">
        {/* <header className="flex">
          <h1>Welcome to flights-ui!</h1>
        </header> */}
        <Header title="FlightScanner" />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default CustomApp;

