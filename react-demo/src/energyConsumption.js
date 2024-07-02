import React, { useState, useEffect } from 'react';
import CalendarComponent from './calendarComponent';
import LineChart from './lineChart.js';
import {getDailyData, getDeviceIds} from "./energy-api";

const EnergyConsumption = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceIds, setDeviceIds] = useState([]);
    const [energyData, setEnergyData] = useState([]);
    const [token, setToken] = useState(sessionStorage.getItem('userToken')); // Retrieve token from sessionStorage
    const [secretKey, setSecretKey] = useState(sessionStorage.getItem('secretKey')); // Retrieve secretKey from sessionStorage


    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleDeviceSelect = (event) => {
        setSelectedDevice(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deviceIdsData = await getDeviceIds(token, secretKey);
                const ids = deviceIdsData.map(device => device.deviceID);
                setDeviceIds(ids);
                setSelectedDevice(ids.length > 0 ? ids[0] : null);
                console.log("Device IDs fetched successfully:", ids);
            } catch (error) {
                console.error('Error fetching device IDs:', error.message);
                // Handle the error, e.g., show an error message to the user
            }
        };
        fetchData();
    }, [token, secretKey]);


    const handleGenerateChart = async () => {
        try {
            if (!selectedDate || !selectedDevice) {
                console.error('Selected date or device is null.');
                return;
            }

            const formattedDate = selectedDate.toISOString().split('T')[0];
            const energyData = await getDailyData(selectedDevice, formattedDate, token, secretKey);
            setEnergyData(energyData);
        } catch (error) {
            console.error('Error fetching energy consumption data:', error);
        }
    };

    return (
        <div>
            <h2>Energy Consumption Chart</h2>

            <div>
                <label>Select Date: </label>
                <CalendarComponent onDateSelect={handleDateSelect} />
            </div>

            <div>
                <label>Select Device: </label>
                <select onChange={handleDeviceSelect} value={selectedDevice}>
                    {deviceIds.map((deviceId, index) => (
                        <option key={index} value={deviceId}>
                            {deviceId}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleGenerateChart}>Generate Chart</button>

            {selectedDate && selectedDevice && (
                <div>
                    <h3>Selected Date: {selectedDate.toDateString()}</h3>
                    <h3>Selected Device ID: {selectedDevice}</h3>
                    <LineChart data={energyData} />
                </div>
            )}
        </div>
    );
};

export default EnergyConsumption;
