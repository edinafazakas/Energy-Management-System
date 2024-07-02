import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    person: '/users',
    createUser: '/postUser',
    deleteUser: '/deleteUser',
    editUser: '/updateUser',
};

function getPersons(callback, token) {
    console.log("token: ", token);
    let request = new Request(HOST.backend_api + endpoint.person, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the headers
        },
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

function getUserByUsername(username, callback) {
    let request = new Request(HOST.backend_api + '/findByUsername/' + username, {
        method: 'GET',
    });
    RestApiClient.performRequest(request, callback);
}


// function getUserById(params, callback){
//     let request = new Request(HOST.backend_api + endpoint.person + params.id, {
//         method: 'GET'
//     });
//
//     console.log(request.url);
//     RestApiClient.performRequest(request, callback);
// }

function deletePerson(id, callback, token) {
    let request = new Request(HOST.backend_api + endpoint.deleteUser + '/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function createUser(user, callback, token) {
    let request = new Request(HOST.backend_api + endpoint.createUser, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}


function editUser(id, user, callback, token) {
    let request = new Request(HOST.backend_api + endpoint.editUser + `/` + id, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    RestApiClient.performRequest(request, callback);
}


export {
    getPersons,
    deletePerson,
    createUser,
    editUser,
    getUserByUsername
};
