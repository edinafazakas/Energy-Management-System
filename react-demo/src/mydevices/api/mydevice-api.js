import { HOST } from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    device: '/getDevices',
    deleteDevice: '/deleteDevice',
    createDevice: '/createDevice',
    editDevice: '/updateDevice',
    getClientsDevices: '/getClientsDevices'
};

function getDevices(callback) {
    let request = new Request(HOST.backend_devices + endpoint.device, {
        method: 'GET',
    });
    RestApiClient.performRequest(request, callback);
}

function getDeviceById(params, callback) {
    let request = new Request(HOST.backend_devices + endpoint.device + params.id, {
        method: 'GET',
    });
    RestApiClient.performRequest(request, callback);
}

function postDevice(user, callback) {
    let request = new Request(HOST.backend_devices + endpoint.createDevice, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    RestApiClient.performRequest(request, callback);
}

function deleteDevice(id, callback) {
    let request = new Request(HOST.backend_devices + endpoint.deleteDevice + '/' + id, {
        method: 'DELETE',
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function getMyDevices(userId, callback) {
    let request = new Request(`${HOST.backend_devices}/getMyDevices/` + userId, {
        method: 'GET',
    });
    RestApiClient.performRequest(request, callback);
}

function editDevice(id, device, callback) {
    let request = new Request(HOST.backend_devices + endpoint.editDevice + `/` + id ,{
        method: 'PATCH', // Use the PATCH method for updating
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device),
    });
    RestApiClient.performRequest(request, callback);
}

function getClientsDevices(userId, callback) {
    let request = new Request(HOST.backend_devices + endpoint.getClientsDevices + `/` + userId, {
        method: 'GET',
    });

    RestApiClient.performRequest(request, callback);
}


export {
    getDevices,
    getDeviceById,
    postDevice,
    deleteDevice,
    editDevice,
    getMyDevices,
    getClientsDevices
};
