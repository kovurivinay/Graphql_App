const graphql = require('graphql');
const _ = require('lodash');
var { Users } = require('../models/user');
var bcrypt = require('bcryptjs');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


// const BookType = new GraphQLObjectType({
//     name: 'Book',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         genre: { type: GraphQLString },
//         author: {
//             type: AuthorType,
//             resolve(parent, args) {
//                 return _.find(authors, { id: parent.authorId });
//             }
//         }
//     })
// });

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        first: { type: GraphQLString },
        last: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        aboutme: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        company: { type: GraphQLString },
        school: { type: GraphQLString },
        homtown: { type: GraphQLString },
        languages: { type: GraphQLString },
        gender: { type: GraphQLString }
    })
})

const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        first: { type: GraphQLString },
        last: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        aboutme: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        company: { type: GraphQLString },
        school: { type: GraphQLString },
        homtown: { type: GraphQLString },
        languages: { type: GraphQLString },
        gender: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        User: {
            type: UserType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args) {
                return Users.findOne({
                    email: args.email
                })
            }
        },
        Users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return Users.find()
            }
        },
        Owner: {
            type: OwnerType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args) {
                return Owners.findOne({
                    email: args.email
                })
            }
        },
        Owners: {
            type: new GraphQLList(OwnerType),
            resolve(parent, args) {
                return Owners.find()
            }
        }
    }
});

var count = 10;
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                first: { type: GraphQLString },
                last: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                var salt = bcrypt.genSaltSync(10);
                // Hash the password with the salt
                var hash = bcrypt.hashSync(args.password, salt);
                let user = new Users({
                    first: args.first,
                    last: args.last,
                    email: args.email,
                    password: hash
                })
                return user.save()
            }
        },
        addOwner: {
            type: OwnerType,
            args: {
                first: { type: GraphQLString },
                last: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                var salt = bcrypt.genSaltSync(10);
                // Hash the password with the salt
                var hash = bcrypt.hashSync(args.password, salt);
                let Owner = new Owners({
                    first: args.first,
                    last: args.last,
                    email: args.email,
                    password: hash
                })
                return Owner.save()
            }
        },
        // addBook: {
        //     type: BookType,
        //     args: {
        //         name: { type: GraphQLString },
        //         genre: { type: GraphQLString },
        //         authorId: { type: GraphQLID },
        //     },
        //     resolve(parent, args) {
        //         let book = {
        //             name: args.name,
        //             genre: args.genre,
        //             authorId: args.authorId,
        //             id: count++
        //         }
        //         books.push(book);
        //         return book;
        //     }
        // }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});