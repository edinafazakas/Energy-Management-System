import React, { Component } from 'react';
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
} from 'reactstrap';

import DeviceForm from './components/device-form';
import * as API_DEVICES from './api/device-api';
import DeviceTable from './components/device-table';
import DeviceDeleteForm from './components/device-delete-form';
import DeviceEditForm from './components/device-edit-form';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";

class DeviceContainer extends Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleEditForm = this.toggleEditForm.bind(this);
        this.toggleDeleteDeviceForm = this.toggleDeleteDeviceForm.bind(this);

        this.reload = this.reload.bind(this);
        this.state = {
            selected: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            isDeleteFormVisible: false,
            isEditFormVisible: false,
            editingDeviceId: null,
            isChatVisible: false,
        };
    }

    componentDidMount() {
        this.fetchDevices();
    }

    fetchDevices() {
        const token = sessionStorage.getItem('userToken');
        const secretKey = sessionStorage.getItem('secretKey');

        API_DEVICES.getDevices((result) => {
            if (result.result !== null) {
                if (result.status === 200) {
                    console.log("Data received:", result.result);
                    this.setState({
                        tableData: result.result,
                        isLoaded: true,
                    });
                } else {
                    this.setState({
                        errorStatus: result.status,
                        error: result.err,
                    });
                }
            } else {
                console.error("Received empty or invalid JSON response:", result.result);
            }
        }, token, secretKey);
    }

    toggleForm() {
        this.setState({ selected: !this.state.selected });
    }

    toggleEditForm() {
        this.setState({
            isEditFormVisible: !this.state.isEditFormVisible,
        });
    }

    toggleDeleteDeviceForm() {
        this.setState({ isDeleteFormVisible: !this.state.isDeleteFormVisible });
    }

    reload() {
        this.setState({
            isLoaded: false,
        });
        this.toggleForm();
        this.fetchDevices();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Devices Management </strong>
                </CardHeader>
                <Card>
                    <br />
                    <Row>
                        <Col sm={{ size: '8', offset: 1 }}>
                            <Button color="primary" onClick={this.toggleForm}>
                                Add Device
                            </Button>{' '}
                            <Button color="danger" onClick={this.toggleDeleteDeviceForm}>
                                Delete Device
                            </Button>{' '}
                            <Button color="info" onClick={this.toggleEditForm}>
                                Edit Device
                            </Button>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={{ size: '9', offset: 1 }}>
                            {this.state.isLoaded && (
                                <DeviceTable
                                    tableData={this.state.tableData}
                                    onSelectDevice={(deviceId) =>
                                        this.setState({ editingDeviceId: deviceId })
                                    }
                                />
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

                <Modal isOpen={this.state.selected} toggle={this.toggleForm} className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}>Add Device:</ModalHeader>
                    <ModalBody>
                        <DeviceForm reloadHandler={this.reload} />
                    </ModalBody>
                </Modal>

                <Modal
                    isOpen={this.state.isDeleteFormVisible}
                    toggle={this.toggleDeleteDeviceForm}
                    className={this.props.className}
                    size="lg"
                >
                    <ModalHeader toggle={this.toggleDeleteDeviceForm}>Delete Device:</ModalHeader>
                    <ModalBody>
                        <DeviceDeleteForm reloadHandler={this.reload} />
                    </ModalBody>
                </Modal>

                <Modal
                    isOpen={this.state.isEditFormVisible}
                    toggle={this.toggleEditForm}
                    className={this.props.className}
                    size="lg"
                >
                    <ModalHeader toggle={this.toggleEditForm}>Edit Device:</ModalHeader>
                    <ModalBody>
                        <DeviceEditForm deviceID={this.state.editingDeviceId} reloadHandler={this.reload} />
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

export default DeviceContainer;
