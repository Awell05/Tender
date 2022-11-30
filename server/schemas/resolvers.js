const { AuthenticationError } = require('apollo-server-express');
const { Parent, Sitter, SitterReq } = require('../models');

const resolvers = {
    Query: {
        sitters: async () => {
            return Sitter.find().sort({ createdAt: -1 })
        },

        sitter: async () => {
            return Sitter.findOne({ username: sitterUsername });
        },

        parents: async () => {
            return Parent.find().sort({ createdAt: -1 })
        },

        parent: async () => {
            return Parent.findOne({ username: parentUsername })
        },

        sitterReqs: async () => {
            return SitterReq.find().sort({ createdAt: -1 })
        },

        sitterReq: async () => {
            return SitterReq.findOne({ _id: sitterReqID })
        }
    },
    Mutation: {
        addParent: async (parent, {username, password, email, firstName, lastName, city, state, aboutUs} ) => {
            
            return await Parent.create({username, password, email, firstName, lastName, city, state, aboutUs});
        },
        addSitter: async (parent, {username, password, email, firstName, lastName, city, state, aboutMe}) => {
            return await Sitter.create({username, password, email, firstName, lastName, city, state, aboutMe});
        },
        addSitterReq: async(parent, {submittedBy, date, time, price, city, state, specialRequests}) => {
            return await SitterReq.create({submittedBy, date, time, price, city, state, specialRequests});
        },
    
        loginParent: async (parent, {username, password}) => {
            const user = await Parent.findOne({username});

            if (!user) {
                throw new AuthenticationError('No parent user found with this username')
            }

            const correctPW = await parent.isCorrectPassword(password)

            if (!correctPW) {
                throw new AuthenticationError('Password is incorrect');
            }

            return {user};
        },

        loginSitter: async (parent, {username, password}) => {
            const sitter = await Sitter.findOne({username});

            if (!sitter) {
                throw new AuthenticationError('No parent user found with this username')
            }

            const correctPW = await sitter.isCorrectPassword(password)

            if (!correctPW) {
                throw new AuthenticationError('Password is incorrect');
            }

            return {sitter};
        },

        updateSitterReq: async (parent, {id, date, time, price,city, state, matched, specialRequests } ) => {
            return await SitterReq.findOneAndUpdate(
                {sitterReqID: id},
                {date, time, price, city, state, matched, specialRequests}, 
                {new:true}
                );
        },

        removeSitterReq: async (parent, {sitterReqID}) => {
            console.log(sitterReqID);
            return SitterReq.findOneAndDelete ( { _id: sitterReqID});
        }
    }
}
module.exports = resolvers;