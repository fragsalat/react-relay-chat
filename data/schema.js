import {
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

import {
    mutationWithClientMutationId,
} from 'graphql-relay';

import {
    getRoom,
    getMessage,
    addMessage,
    editMessage,
    deleteMessage,
    getMessages,
} from './database';

/**
 * Definition of a single message
 */
var MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: {type: GraphQLID},
        text: {type: GraphQLString},
        time: {type: GraphQLFloat},
        roomId: {
            type: GraphQLID,
            resolve: message => message.room.id
        }
    })
});

/**
 * Definition of a single room which has many messages
 */
var RoomType = new GraphQLObjectType({
    name: 'Room',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        messages: {
            type: new GraphQLList(MessageType),
            resolve: room => getMessages(room.id)
        }
    })
});

/**
 * Mutation to add a new message
 */
var MessageAddMutation = mutationWithClientMutationId({
    name: 'MessageAdd',
    inputFields: () => ({
        roomId: {type: new GraphQLNonNull(GraphQLString)},
        text: {type: new GraphQLNonNull(GraphQLString)}
    }),
    outputFields: () => ({
        room: {
            type: RoomType,
            resolve: message => message.room
        }
    }),
    mutateAndGetPayload: ({roomId, text}) => addMessage(roomId, text)
});

/**
 * Mutation to edit a existing message
 */
var MessageEditMutation = mutationWithClientMutationId({
    name: 'MessageEdit',
    inputFields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        text: {type: new GraphQLNonNull(GraphQLString)}
    }),
    outputFields: () => ({
        message: {
            type: MessageType,
            resolve: message => message
        }
    }),
    mutateAndGetPayload: ({id, text}) => editMessage(id, text)
});

/**
 * Mutation to delete a existing message
 */
var MessageDeleteMutation = mutationWithClientMutationId({
    name: 'MessageDelete',
    inputFields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)}
    }),
    outputFields: () => ({
        room: {
            type: RoomType,
            resolve: message => message.room
        },
        deletedMessageId: {
            type: GraphQLInt,
            resolve: message => message.id
        }
    }),
    mutateAndGetPayload: ({id}) => deleteMessage(id)
});

/**
 * GraphQL schema definition
 */
export const Schema = new GraphQLSchema({
    // Query to retrieve data from GraphQL store
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            room: {
                type: RoomType,
                args: {
                    id: {type: GraphQLString}
                },
                resolve: (root, args) => getRoom(args.id)
            }
        })
    }),
    // Mutate to change data in GraphQL store
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            addMessage: MessageAddMutation,
            editMessage: MessageEditMutation,
            deleteMessage: MessageDeleteMutation
        })
    })
});