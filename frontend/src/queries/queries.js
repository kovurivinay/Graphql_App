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

export { getPropertyDetails, getPropsQuery };