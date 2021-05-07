import express from 'express';
//import dotenv from "dotenv";
require('dotenv').config({ path: _dirname + '/env'})
//dotenv.config
console.log("CONNECTION-", process.env.CONNECTION)
import { graphqlHTTP } from 'express-graphql';
import { schema } from './data/schema';
import cors from "cors";


const app = express();
app.use(cors())


app.get('/', (req, res) => {
    res.send('GraphQL is working');
});



app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(8080, () => console.log('running on server port localhost:8080/graphql'));
