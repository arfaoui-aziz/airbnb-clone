import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { sanityClient } from "../sanity";
export default function Home({ properties }) {
  console.log(properties);
  return (
    <>
      <h1>Home</h1>
    </>
  );
}

export const getServerSideProps = async () => {
  //* Sanity query language GROQ (Graph-Relational Object Queries)
  const query = "*[_type == 'property' ]";
  const properties = await sanityClient.fetch(query);
  if (!properties.length) {
    return { props: { properties: [] } };
  } else {
    return { props: { properties } };
  }
};
