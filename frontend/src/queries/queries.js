import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;
const getPropsQuery = gql`
    {
        Properties{
        owner,
        bedrooms,
        bathrooms,
        startdate,
        enddate,
        description
    }
    }
`;


const getPropertyDetails = gql`
    query Property($_id:ID){
        Property(_id:$_id){
            _id,
            owner,
            country,
            street,
            city,
            state,
            zipcode,
            headline,
            description,
            property_type,
            bedrooms,
            accomodations,
            bathrooms,
            price,
            amenities,
            startdate,
            enddate,
    }
}
`;
const getOwnerProfile = gql`
    query Owner($email:String){
        Owner(email:$email){
        first,
        last,
        email,
        password,
        aboutme,
        city,
        country,
        company,
        school,
        homtown,
        languages,
        gender
    }
  }
`;

const getUserProfile = gql`
    query getUserProfile($email:String){
        getUserProfile(email:$email){
        first,
        last,
        email,
        password,
        aboutme,
        city,
        country,
        company,
        school,
        homtown,
        languages,
        gender
    }
  }
`;

const checkOEmail = gql`
    query Owner($email:String, $password:String){
        Owner(email:$email,password:$password){
        email
    }
  }
`;

const checkUEmail = gql`
    query User($email:String, $password:String){
        User(email:$email,password:$password){
        email
    }
  }
`;
const getOwnerProps = gql`
    query getOwnerProps($email:String){
        getOwnerProps(email:$email){
            _id,
            owner,
            country,
            street,
            city,
            state,
            zipcode,
            headline,
            description,
            property_type,
            bedrooms,
            accomodations,
            bathrooms,
            price,
            amenities,
            startdate,
            enddate,
            Booked_dates,
            Customer_name
    }
  }
`;

const getCustomerProps = gql`
    query getCustomerProps($email:String){
        getCustomerProps(email:$email){
            _id,
            owner,
            country,
            street,
            city,
            state,
            zipcode,
            headline,
            description,
            property_type,
            bedrooms,
            accomodations,
            bathrooms,
            price,
            amenities,
            startdate,
            enddate,
            Booked_dates,
            Customer_name
    }
  }
`;

export { getPropertyDetails, getPropsQuery, getOwnerProfile, getUserProfile, checkOEmail, checkUEmail, getOwnerProps, getCustomerProps };