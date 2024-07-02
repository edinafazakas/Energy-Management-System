// energy-api.js
import {HOST} from "./commons/hosts";

const endpoint = {
    getDeviceIds: '/getDeviceIds',
    getDailyData: '/daily',
};

HOST.backend_energy = "http://localhost:7070";

function getDeviceIds(token, secretKey) {
    const url = HOST.backend_energy + endpoint.getDeviceIds;

    console.log('Token:', token);
    console.log('Secret Key:', secretKey);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Secret-Key': secretKey,
        },
    })
        .then(response => {
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error(`Failed to fetch device IDs. Status: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            console.log('Device IDs:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching device IDs:', error.message);
            throw error;
        });
}



function getDailyData(selectedDevice, formattedDate, token, secretKey) {
    const url = `${HOST.backend_energy}${endpoint.getDailyData}/${selectedDevice}/${formattedDate}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Secret-Key': secretKey,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .catch(error => {
            console.error('Error fetching daily energy data:', error);
            throw error;
        });
}

export {
    getDeviceIds,
    getDailyData,
};
