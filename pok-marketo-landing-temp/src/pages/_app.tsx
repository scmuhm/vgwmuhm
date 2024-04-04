import Head from "next/head";
import React from "react";
import { AppProps } from "next/app";
import '../styles/global.css';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="title" content={pageProps.h1} />
                <meta name="description" content={pageProps.intro} />
                <meta property="og:title" content={pageProps.h1} />
                <meta property="og:description" content={pageProps.intro} />
                <meta property="og:type" content="website" />
                <meta name="robots" content="noindex, nofollow" />
                <title>{`Global Poker ${pageProps.h1}`}</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default App;
