import {lib} from './helpers/lib';

export const config = {
    // apiEndpointDomain: 'https://peaceful-woodland-61112.herokuapp.com'
    apiEndpointDomain: process.env['REACT_APP_API_ENDPOINT_DOMAIN']
    // apiEndpointDomain: lib.exists(process.env['API_ENDPOINT_DOMAIN']) ? process.env['API_ENDPOINT_DOMAIN'] : 'http://localhost:1337'
}