// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import property from "./property";
import propertyImage from "./propertyImage";
import host from "./host";
import review from "./review";
import traveller from "./traveller";
import person from "./person";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    property,
    propertyImage,
    host,
    review,
    traveller,
    person,
  ]),
});
