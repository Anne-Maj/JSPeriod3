import { removeObjectFields } from '@graphql-tools/utils';
import { Friends } from './dbConnectors';


// Resolver map
export const resolvers = { 
    Query: {
        getFriend: (_, { id }) => {
            return Friends.findById(id);
         },
         allFriends: () => {
           return Friends.find({})
         }

    },
    Mutation: {
        createFriend: (root, { input }) => {
            const newFriend = new Friends({
                firstName: input.firstName,
                lastName: input.lastName,
                gender: input.gender,
                email: input.email,
                language: input.language,
                age: input.age,
                contacts: input.contacts
            });

        newFriend.id = newFriend._id;
        return newFriend.save();
 
        },   

        updateFriend: (root, { input }) => {
            return Friends.findOneAndUpdate({ _id: input.id }, input, { new: true });
          },
        
        deleteFriend: async (root, { id }) => {
            const res = await Friends.deleteOne({ _id: id })
            if(res.deletedCount ===1){
              return "Friend deleted"
            }
            throw new Error("Could not delete a friend with that id")
            
          }
        },
  
};
