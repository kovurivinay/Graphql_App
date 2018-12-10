
import { gql } from 'apollo-boost';


const updateProfile = gql`
    mutation AddBook($name: String, $genre: String, $authorId: ID){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

const addUser = gql`
    mutation AddBook($name: String, $genre: String, $authorId: ID){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;
const addProperty = gql`
    mutation AddBook($name: String, $genre: String, $authorId: ID){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;
const addOwner = gql`
mutation AddBook($name: String, $genre: String, $authorId: ID){
    addBook(name: $name, genre: $genre, authorId: $authorId){
        name
        id
    }
}
`;
export {addOwner,addProperty,addUser,updateProfile};