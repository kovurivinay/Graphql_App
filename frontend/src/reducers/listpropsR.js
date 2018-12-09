import { LOCATION_INFO, DETAILS_INFO, BOOKINGOPS_INFO, PHOTOS_INFO, PRICING_INFO } from "../actions/types";

const init = {
    
    propData:{owner: localStorage.getItem('email'),
    amenities: "",},
    // property_name: "",

    // country: "",
    // street: "",
    // city: "",
    // state: "",
    // zipcode: "",

    // headline: "",
    // description: "",
    // property_type: "",
    // bedrooms: "",
    // accomodations: "",
    // bathrooms: "",

    // photos: "",

    // price: "",
    // amenities: "",
    // startdate: "",
    // enddate: "",

}

export default function (state = init, action) {

    switch (action.type) {
        case LOCATION_INFO:
            // console.log(action.payload.street)
            return {
                ...state,
                // country: action.payload.country,
                // street: action.payload.street,
                // city: action.payload.city,
                // state: action.payload.state,
                // zipcode: action.payload.zipcode,
                propData:Object.assign({},state.propData,action.payload)
            }
        case DETAILS_INFO:
            return {
                ...state,
                propData:Object.assign({},state.propData,action.payload),
                // headline: action.payload.headline,
                // description: action.payload.description,
                // property_type: action.payload.property_type,
                // bedrooms: action.payload.bedrooms,
                // accomodations: action.payload.accomodations,
                // bathrooms: action.payload.bathrooms,
            }
        case PHOTOS_INFO:
            return {
                ...state,
                propData:Object.assign({},state.propData,action.payload),
            }
        case LOCATION_INFO:
            return {
                ...state,
                propData:Object.assign({},state.propData,action.payload),
            }
        case PRICING_INFO:
            return {
                ...state,
                propData:Object.assign({},state.propData,action.payload),
            }
        default:
            return state;

    }
}