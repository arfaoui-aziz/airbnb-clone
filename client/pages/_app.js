import Head from "next/head";
import NavBar from "../components/NavBar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Airbnb Clone</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Airbnb clone using Next.js and Sanity.io"
        />
        <meta property="og:title" content="Airbnb Clone" />
        <meta property="og:image" content="../images/airbnb-logo.png" />
      </Head>
      <NavBar />
      <Component {...pageProps} />{" "}
    </>
  );
}

export default MyApp;
