import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    userDevices: '/getUserDevices',
    createUser: '/postUser',
    deleteUser: '/deleteUser',
    editUser: '/updateUser',
};

function getUserDevices(callback) {
    let request = new Request(HOST.backend_devices + endpoint.userDevices, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

// function getPersonById(params, callback){
//     let request = new Request(HOST.backend_api + endpoint.person + params.id, {
//        method: 'GET'
//     });
//
//     console.log(request.url);
//     RestApiClient.performRequest(request, callback);
// }
//
// function getUserById(params, callback){
//     let request = new Request(HOST.backend_api + endpoint.person + params.id, {
//         method: 'GET'
//     });
//
//     console.log(request.url);
//     RestApiClient.performRequest(request, callback);
// }
//
// function deletePerson(id, callback) {
//     let request = new Request(HOST.backend_api + endpoint.deleteUser + '/' + id, {
//         method: 'DELETE',
//     });
//
//     console.log("URL: " + request.url);
//
//     RestApiClient.performRequest(request, callback);
// }
//
// function createUser(user, callback) {
//     let request = new Request(HOST.backend_api + endpoint.createUser, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user), // Ensure that the user object matches the expected format
//     });
//
//     console.log("URL: " + request.url);
//
//     RestApiClient.performRequest(request, callback);
// }
//
//
// function editUser(id, user, callback) {
//     let request = new Request(HOST.backend_api + endpoint.editUser + `/` + id, {
//         method: 'PATCH',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//     });
//
//     RestApiClient.performRequest(request, callback);
// }


export {
    getUserDevices,
    // getPersonById,
    // deletePerson,
    // createUser,
    // editUser
};
