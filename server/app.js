const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
// for development purposes
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

mongoose.connect(
  "mongodb+srv://<username>:<password>@cluster0.qclm9yp.mongodb.net/?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connected to mongoose");
});

app.use(cors(corsOptions));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("listening for requests on port 4000");
});
