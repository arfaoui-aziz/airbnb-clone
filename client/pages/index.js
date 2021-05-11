import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { sanityClient, urlFor } from "../sanity";
import { isPlural } from "../utils";
export default function Home({ properties }) {
  console.log(properties);
  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>Places to stay near you </h1>
            <div className="feed" >
              {properties.map((property) => (
                <Link
                  
                  href={`property/${property.slug.current}`}
                >
                  <div key={property._id} className="card">
                    <img
                      src={urlFor(property.mainImage)}
                      alt={property.title}
                    />
                    <p>
                      {property.reviews?.length} review
                      {isPlural(property.reviews?.length)}
                    </p>
                    <h3>{property.title}</h3>
                    <h3>
                      <b>${property.pricePerNight}/per Night</b>
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="map"></div>
          </div>
        </div>
      )}
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
