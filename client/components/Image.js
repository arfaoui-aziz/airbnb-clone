import { urlFor } from "../sanity";

export default function Image({ identifier, image }) {
  return (
    <div className={identifier}>
      <img src={urlFor(image).auto("format")} />
    </div>
  );
}
