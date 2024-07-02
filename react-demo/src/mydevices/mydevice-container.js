import React, { Component } from 'react';
import { Card, CardHeader, Col, Row } from 'reactstrap';
import DeviceTable from '../device/components/device-table';

import APIResponseErrorMessage from '../commons/errorhandling/api-response-error-message';
import * as API_DEVICES from "./api/mydevice-api";

class MyDeviceContainer extends Component {
    constructor(props) {
        super(props);
        this.fetchUserDevices = this.fetchUserDevices.bind(this);
        this.state = {
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            isDeleteFormVisible: false,
            isEditFormVisible: false,
            editingDeviceId: null,
            username: '',
            userId: null,
        };
    }

    componentDidMount() {
        const { state } = this.props.location;
        if (state && state.userId) {
            this.setState({ userId: state.userId }, () => {
                this.fetchUserDevices();
            });
        } else {
            console.error('UserID is missing.');
        }
    }


    fetchUserDevices() {
        console.log('UserId in MyDeviceContainer:', this.state.userId);

        if (!this.state.userId) {
            console.error('UserID is missing.');
            return;
        }

        return API_DEVICES.getDevices((result, status, err) => { // Use API_DEVICES to fetch devices

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState({
                    errorStatus: status,
                    error: err
                });
            }
        });
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong>View My Devices</strong>
                </CardHeader>
                <Card>
                    <br />
                    <Row>
                        <Col sm={{ size: '9', offset: 1 }}>
                            {this.state.isLoaded ? (
                                <DeviceTable tableData={this.state.tableData} />
                            ) : (
                                'Loading data...'
                            )}
                            {this.state.errorStatus > 0 && (
                                <APIResponseErrorMessage
                                    errorStatus={this.state.errorStatus}
                                    error={this.state.error}
                                />
                            )}
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default MyDeviceContainer;
