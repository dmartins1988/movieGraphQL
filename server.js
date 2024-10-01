const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

const app = express()
const movies = [
    { id: 1, name: 'Matrix', thumb: "<https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg>" },
    { id: 2, name: 'Jason Bourne', thumb: "<https://upload.wikimedia.org/wikipedia/en/b/b2/Jason_Bourne_%28film%29.jpg>" },
    { id: 3, name: 'Interstellar', thumb: "<https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg>" },
    { id: 4, name: 'The International', thumb: "<https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/The_International_poster.jpg/220px-The_International_poster.jpg>" },
    { id: 5, name: 'Star Trek Into Darkness', thumb: "<https://upload.wikimedia.org/wikipedia/en/thumb/5/50/StarTrekIntoDarkness_FinalUSPoster.jpg/220px-StarTrekIntoDarkness_FinalUSPoster.jpg>" },
    { id: 6, name: 'Dead Poets Society', thumb: "<https://upload.wikimedia.org/wikipedia/en/4/49/Dead_poets_society.jpg>" },
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    description: 'This represents a movie',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        thumb: { type: GraphQLNonNull(GraphQLString) },
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        movies: {
            type: new GraphQLList(MovieType),
            description: 'List of All Movies',
            resolve: () => movies
        },
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

app.use('/movie', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000, () => console.log('Server running'));
