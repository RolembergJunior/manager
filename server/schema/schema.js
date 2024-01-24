const { projects, clients } = require('../sampleData');
const  Project = require('../models/Project');
const  Client  = require('../models/Client');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');

//Client Type
const ClientType = new GraphQLObjectType({
    name: 'Clients',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type:GraphQLString },
        phone: { type:GraphQLString }
    })
});

//Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Projects',
    fields: () => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        clientId: { type: GraphQLID },
        description: { type: GraphQLString },
        status: { type:GraphQLString },
        client:{
            type: ClientType,
            resolve(parents, args) {
                return Client.findById(parents.clientId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parents, args){
                return Client.find();
            }
        },
        client:{
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args){
                return Client.findById(args.id);
            }
        },
        project:{
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args){
                return Project.findById(args.id);
            }
        },
        projects:{
            type: new GraphQLList(ProjectType),
            args: { id: { type: GraphQLID } },
            resolve(parents, args){
                return Project.find();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
})
