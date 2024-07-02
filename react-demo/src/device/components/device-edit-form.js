import React, { Component } from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import validate from "./validators/device-validators";
import * as API_DEVICES from "../../device/api/device-api";

class DeviceEditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorStatus: 0,
            error: null,
            formIsValid: false,
            formControls: {
                id: {
                    value: '',
                    placeholder: 'Device ID...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                description: {
                    value: '',
                    placeholder: 'Description...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                address: {
                    value: '',
                    placeholder: 'Address...',
                    valid: false,
                    touched: false,
                },
                max_consumption: {
                    value: '',
                    placeholder: 'Max consumption...',
                    valid: false,
                    touched: false,
                },
            }
        };
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = { ...this.state.formControls };
        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let formElementName in updatedControls) {
            formIsValid = updatedControls[formElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { reloadHandler } = this.props;
        const { formControls } = this.state;

        const deviceID = formControls.id.value;

        const editedDevice = {
            address: formControls.address.value,
            description: formControls.description.value,
            max_consumption: formControls.max_consumption.value,
        };

        const token = sessionStorage.getItem('userToken'); // Change to 'userToken'
        const secretKey = sessionStorage.getItem('secretKey');

        API_DEVICES.editDevice(deviceID, editedDevice, token, secretKey)
            .then(({ result, status, error }) => {
                if (status === 200) {
                    alert("Device information updated successfully.");
                    reloadHandler();
                    window.location.reload(); // Reload the page
                } else {
                    this.setState({
                        errorStatus: status,
                        error: error,
                    });
                }
            })
            .catch(error => {
                console.error('Error editing device:', error);
            });
    };

    render() {
        return (
            <div>
                <FormGroup>
                    <Label for="id">User ID</Label>
                    <Input
                        name="id"
                        type="text"
                        placeholder={this.state.formControls.id.placeholder}
                        onChange={this.handleChange}
                        value={this.state.formControls.id.value}
                        valid={this.state.formControls.id.valid}
                        required
                    />
                    {this.state.formControls.id.touched && !this.state.formControls.id.valid && (
                        <div className={"error-message"}> * This field is required and should have at least 3 characters. </div>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                        name="description"
                        type="text"
                        placeholder={this.state.formControls.description.placeholder}
                        onChange={this.handleChange}
                        value={this.state.formControls.description.value}
                        valid={this.state.formControls.description.valid}
                        required
                    />
                    {this.state.formControls.description.touched && !this.state.formControls.description.valid && (
                        <div className={"error-message"}> * This field is required and should have at least 3 characters. </div>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                        name="address"
                        type="text"
                        placeholder={this.state.formControls.address.placeholder}
                        onChange={this.handleChange}
                        value={this.state.formControls.address.value}
                        valid={this.state.formControls.address.valid}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="max_consumption">Maximum Consumption</Label>
                    <Input
                        name="max_consumption"
                        type="text"
                        placeholder={this.state.formControls.max_consumption.placeholder}
                        onChange={this.handleChange}
                        value={this.state.formControls.max_consumption.value}
                        valid={this.state.formControls.max_consumption.valid}
                    />
                </FormGroup>

                <Row>
                    <Col sm={{ size: '4', offset: 8 }}>
                        <Button type="submit" disabled={!this.state.formIsValid} onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Col>
                </Row>

                {this.state.errorStatus > 0 && (
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error} />
                )}
            </div>
        );
    }
}

export default DeviceEditForm;
