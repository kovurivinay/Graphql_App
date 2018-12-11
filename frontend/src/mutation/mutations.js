
import { gql } from 'apollo-boost';


const updateUserProfile = gql`
    mutation updateUserProfile($first:String,
        $last:String,
        $email:String,
        $aboutme:String,
        $city:String,
        $country:String,
        $company:String,
        $school:String,
        $homtown:String,
        $languages:String,
        $gender:String){
        updateUserProfile(first: $first,
            last: $last,
            email: $email,
            aboutme: $aboutme,
            city: $city,
            country: $country,
            company: $company,
            school: $school,
            homtown: $homtown,
            languages: $languages,
            gender: $gender){
            email
        }
    }
`;

const updateOwnerProfile = gql`
    mutation updateOwnerProfile($first:String,
        $last:String,
        $email:String,
        $aboutme:String,
        $city:String,
        $country:String,
        $company:String,
        $school:String,
        $homtown:String,
        $languages:String,
        $gender:String){
        updateOwnerProfile(first: $first,
            last: $last,
            email: $email,
            aboutme: $aboutme,
            city: $city,
            country: $country,
            company: $company,
            school: $school,
            homtown: $homtown,
            languages: $languages,
            gender: $gender){
            email
        }
    }
`;


const addUser = gql`
    mutation addUser($email: String, $first: String, $last: String, $password:String){
        addUser(email: $email, first: $first, last: $last,password:$password){
            email

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
    mutation addOwner($email: String, $first: String, $last: String, $password:String){
        addOwner(email: $email, first: $first, last: $last,password:$password){
            email

        }
    }
`;
export { addOwner, addUser, updateUserProfile, updateOwnerProfile };