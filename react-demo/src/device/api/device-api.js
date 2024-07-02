import { HOST } from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    device: '/getDevices',
    deleteDevice: '/deleteDevice',
    createDevice: '/createDevice',
    editDevice: '/updateDevice'
};

function getDevices(callback, token, secretKey) {
    const url = HOST.backend_devices + endpoint.device;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Secret-Key': secretKey,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            callback({ result: data, status: 200, err: null });
        })
        .catch(error => {
            console.error('Error fetching devices:', error);
            callback({ result: null, status: 500, err: error }); // Adjust the status code as needed
        });
}


function createDevice(device, callback, token, secretKey) {
    const url = HOST.backend_devices + endpoint.createDevice;

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Secret-Key': secretKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Device created:', data);
            callback({ result: data, status: 201, err: null });
        })
        .catch(error => {
            console.error('Error creating device:', error);
            callback({ result: null, status: 500, err: error });
        });
}



function deleteDevice(id, token, secretKey) {
    const url = HOST.backend_devices + endpoint.deleteDevice + '/' + id;

    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Secret-Key': secretKey,
        },
    })
        .then(response => {
            console.log('Delete Device Response:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .catch(error => {
            console.error('Error deleting device:', error);
            throw error;
        });
}

function editDevice(id, device, secretKey) {
    const token = sessionStorage.getItem('userToken');
    const url = HOST.backend_devices + endpoint.editDevice + `/` + id;

    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Secret-Key': secretKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .catch(error => {
            console.error('Error editing device:', error);
            throw error;
        });
}

export {
    getDevices,
    createDevice,
    deleteDevice,
    editDevice
};
