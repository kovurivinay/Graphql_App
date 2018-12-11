const graphql = require('graphql');
const _ = require('lodash');
var { Users } = require('../models/user');
var { Owners } = require('../models/owner');
var { Property } = require('../models/property');
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

var loginVar;

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

// const StatusType = new GraphQLObjectType({
//     name: "status",
//     fields: () => ({
//         code: {type:GraphQLInt}
//     })
// })
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

const PropertyType = new GraphQLObjectType({
    name: 'Property',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        owner: { type: GraphQLString },
        country: { type: GraphQLString },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        headline: { type: GraphQLString },
        description: { type: GraphQLString },
        property_type: { type: GraphQLString },
        bedrooms: { type: GraphQLInt },
        accomodations: { type: GraphQLInt },
        bathrooms: { type: GraphQLInt },
        photos: { type: GraphQLString },
        price: { type: GraphQLString },
        amenities: { type: GraphQLString },
        startdate: { type: GraphQLString },
        enddate: { type: GraphQLString },
        owner: { type: GraphQLString },
        Customer_name: { type: GraphQLString },
        Booked_dates: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        User: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Users.findOne({
                    email: args.email
                }, function (err, result) {
                    if (err) {
                        loginVar = err
                    } else if (result) {
                        console.log(result)
                        if (bcrypt.compareSync(args.password, result.password)) {
                            loginVar = result;
                        }
                        else {
                            loginVar = "Invalid Login"
                        }
                    }
                    return loginVar;
                })
            }
    },
    Users: {
        type: new GraphQLList(UserType),
        resolve(parent, args) {
            return Users.find()
        }
    },
    getUserProfile:{
        type: UserType,
        args: {
            email:{type:GraphQLString}
        },
        resolve(parent,args){
            return Users.findOne({
                email: args.email
            })
        }
    },
    getOwnerProfile:{
        type: OwnerType,
        args: {
            email:{type:GraphQLString}
        },
        resolve(parent,args){
            return Owners.findOne({
                email: args.email
            })
        }
    },
    Owner: {
        type: OwnerType,
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString }
        },

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
    },
    Properties: {
        type: GraphQLList(PropertyType),
        resolve(parent, args) {
            return Property.find()
        }
    },
    Property: {
        type: PropertyType,
        args: { _id: { type: GraphQLID } },
        resolve(parent, args) {
            return Property.findOne({ _id: args._id })
        }
    },
    getOwnerProps: {
        type: new GraphQLList(PropertyType),
        args: { email: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args.email)
            return Property.find({ owner: args.email })
        }
    },
    getCustomerProps: {
        type: new GraphQLList(PropertyType),
        args: { email: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args.email)
            return Property.find({ Customer_name: args.email })
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
        addProperty: {
            type: PropertyType,
            args: {
                _id: {
                    type: GraphQLID
                },
                owner: { type: GraphQLString },
                country: { type: GraphQLString },
                street: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                zipcode: { type: GraphQLString },
                headline: { type: GraphQLString },
                description: { type: GraphQLString },
                property_type: { type: GraphQLString },
                bedrooms: { type: GraphQLInt },
                accomodations: { type: GraphQLInt },
                bathrooms: { type: GraphQLInt },
                //photos: { type: GraphQLString },
                price: { type: GraphQLString },
                amenities: { type: GraphQLString },
                startdate: { type: GraphQLString },
                enddate: { type: GraphQLString },
                owner: { type: GraphQLString },
                Customer_name: { type: GraphQLString },
                Booked_dates: { type: GraphQLString }
            },
            resolve(parent, args) {
                var property = new Property({
                    _id: count,
                    owner: args.owner,
                    country: args.country,
                    street: args.street,
                    city: args.city,
                    state: args.state,
                    zipcode: args.zipcode,
                    headline: args.headline,
                    description: args.description,
                    property_type: args.property_type,
                    bedrooms: args.bedrooms,
                    accomodations: args.accomodations,
                    bathrooms: args.bathrooms,
                    //photos: b,
                    price: args.price,
                    amenities: args.amenities,
                    startdate: args.startdate,
                    enddate: args.enddate,
                    Customer_name: "",
                    Booked_dates: ""
                });
                count += 1;
                property.save().then((user) => {
                    console.log("Property added : ", user);
                    return user
                    res.sendStatus(200).end();
                    //req.session.user = user;
                }, (err) => {
                    console.log("Error Creating User");
                    console.log(err)
                    return err
                    res.sendStatus(400).end();
                })

            }
        },
        updateUserProfile: {
            type: UserType,
            args: {
                first: { type: GraphQLString },
                last: { type: GraphQLString },
                email: { type: GraphQLString },
                aboutme: { type: GraphQLString },
                city: { type: GraphQLString },
                country: { type: GraphQLString },
                company: { type: GraphQLString },
                school: { type: GraphQLString },
                homtown: { type: GraphQLString },
                languages: { type: GraphQLString },
                gender: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Users.updateOne({
                    email: args.email
                }, { ...args }, function (err, result) {
                    if (err) {
                        console.log(err)
                    }
                    else if (result) {
                        console.log(result)
                    }
                })
            },
            updateOwnerProfile: {
                type: OwnerType,
                args: {
                    first: { type: GraphQLString },
                    last: { type: GraphQLString },
                    email: { type: GraphQLString },
                    aboutme: { type: GraphQLString },
                    city: { type: GraphQLString },
                    country: { type: GraphQLString },
                    company: { type: GraphQLString },
                    school: { type: GraphQLString },
                    homtown: { type: GraphQLString },
                    languages: { type: GraphQLString },
                    gender: { type: GraphQLString }
                },
                resolve(parent, args) {
                    return Owners.updateOne({
                        email: args.email
                    }, { ...args }, function (err, result) {
                        if (err) {
                            console.log(err)
                        }
                        else if (result) {
                            console.log(result)
                        }
                    })
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});