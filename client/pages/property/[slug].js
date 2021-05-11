import React from "react";
import { sanityClient } from "../../sanity";
import { isPlural } from "../../utils";
import Image from "../../components/Image";
import Review from "../../components/Review";
import Link from "next/link";
export default function Property({
  title,
  location,
  propertyType,
  mainImage,
  images,
  pricePerNight,
  bedrooms,
  description,
  host,
  reviews,
}) {
  const reviewAmount = reviews?.length;
  return (
    //     <div className="container">
    //       <h1>
    //         <b>{title}</b>
    //       </h1>
    //       <p>
    //         {reviews?.length} review{isPlural(reviews?.length)}
    //       </p>
    //       <div className="images-section">
    //         <Image identifier="main-image" image={mainImage} />
    //         <div className="sub-images-section">
    //           {images?.map((i, image) => (
    //             <Image identifier="image" image={image} key={i} />
    //           ))}
    //         </div>
    //       </div>

    //       <div className="section">
    //         <div className="information">
    //           <h2>
    //             <b>
    //               {propertyType} hosted by {host?.name}
    //             </b>
    //           </h2>
    //           <h4>
    //             {bedrooms} bedroom{isPlural(bedrooms)}
    //           </h4>
    //           <hr />
    //           <h4>
    //             <b>Enhanced Clean</b>
    //           </h4>
    //           <p>
    //             This host is commited to Airbnb's 5-step enhanced cleaning process.
    //           </p>
    //           <h4>
    //             <b>Amenities for everyday living</b>
    //           </h4>
    //           <p>
    //             The host has equipped this place for long stays - kitchen,
    //             shampo,conditioner
    //           </p>
    //           <h4>
    //             <b>House rules</b>
    //           </h4>
    //           <p>
    //             This place isn't suitable for pets and the host does not allow
    //             parties or smoking
    //           </p>
    //         </div>

    //         <div className="price-box">
    //           <h2>$ {pricePerNight}</h2>
    //           <h4>
    //             {reviews?.length} review{isPlural(reviews?.length)}
    //           </h4>
    //           <div className="button" onClick={() => {}}>
    //             Change Dates
    //           </div>
    //         </div>
    //       </div>

    //       <hr />
    //       <h4>{description}</h4>
    //       <hr />
    //       <h2>
    //         {reviews?.length} review{isPlural(reviews?.length)}
    //       </h2>
    //       {reviews?.length > 0 &&
    //         reviews.map((review) => <Review key={review._key} review={review} />)}
    //     </div>
    //   );
    <div className="container">
      <h1>
        <b>{title}</b>
      </h1>
      <p>
        {reviewAmount} review{isPlural(reviewAmount)}
      </p>
      <div className="images-section">
        <Image identifier="main-image" image={mainImage} />
        <div className="sub-images-section">
          {images?.map(({ _key, asset }, image) => (
            <Image key={_key} identifier="image" image={asset} />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="information">
          <h2>
            <b>
              {propertyType} hosted by {host?.name}
            </b>
          </h2>
          <h4>
            {bedrooms} bedroom{isPlural(bedrooms)}
          </h4>
          <hr />
          <h4>
            <b>Enhanced Clean</b>
          </h4>
          <p>
            This host is committed to Airbnb's 5-step enhanced cleaning process.
          </p>
          <h4>
            <b>Amenities for everyday living</b>
          </h4>
          <p>
            The host has equipped this place for long stays - kitchen, shampoo,
            conditioner, hairdryer included.
          </p>
          <h4>
            <b>House rules</b>
          </h4>
          <p>
            This place isn't suitable for pets andthe host does not allow
            parties or smoking.
          </p>
        </div>
        <div className="price-box">
          <h2>£{pricePerNight}</h2>
          <h4>
            {reviewAmount} review{isPlural(reviewAmount)}
          </h4>
          <Link href="/">
            <div className="button">Change Dates</div>
          </Link>
        </div>
      </div>

      <hr />

      <h4>{description}</h4>

      <hr />

      <h2>
        {reviewAmount} review{isPlural(reviewAmount)}
      </h2>
      {reviews?.map((review) => (
        <Review key={review._key} review={review} />
      ))}

      <hr />

      <h2>Location</h2>
      {/* <Map location={location}></Map> */}
    </div>
  );
}

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  const query = `*[_type == "property" && slug.current == $pageSlug][0]{
      title,
      location,
      propertyType,
      mainImage,
      pricePerNight,
      bedrooms,
      description,
      host->{
          _id,
          name,
          slug,
          image
      },
      reviews[]{
          ...,
          traveller->{
              _id,
              name,
              slug,
              image
          }
      }
  }`;

  const property = await sanityClient.fetch(query, { pageSlug });

  if (!property) {
    return { props: null, notFound: true };
  } else {
    return { props: property };
  }
};
