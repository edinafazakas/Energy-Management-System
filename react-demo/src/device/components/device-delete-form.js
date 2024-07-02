import React from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import * as API_DEVICES from "../../device/api/device-api";
import validate from "./validators/device-validators";

class DeviceDeleteForm extends React.Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);

        this.state = {
            errorStatus: 0,
            error: null,
            formIsValid: false,
            formControls: {
                id: {
                    value: '',
                    placeholder: 'Device ID',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                    },
                },
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({ collapseForm: !this.state.collapseForm });
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

    deleteDevice = () => {
        const deviceID = this.state.formControls.id.value;
        const token = sessionStorage.getItem('userToken'); // Change to 'userToken'
        const secretKey = sessionStorage.getItem('secretKey');

        API_DEVICES.deleteDevice(deviceID, token, secretKey)
            .then(({ result, status, error }) => {
                if (result !== null && (status === 200 || status === 201)) {
                    const response = { message: 'Successfully deleted device with ID: ' + deviceID };
                    alert(response.message);
                    console.log("Successfully deleted device with ID: " + deviceID);
                    this.reloadHandler(); // If this is sufficient to update your component, use it
                    window.location.reload(); // Use this line if you want to refresh the entire page
                } else {
                    this.setState({
                        errorStatus: status,
                        error: error,
                    });
                }
            })
            .catch(error => {
                console.error('Error deleting device:', error);
            });
    };


    handleSubmit = (event) => {
        event.preventDefault();
        this.deleteDevice();
    };

    render() {
        return (
            <div>
                <FormGroup id='id'>
                    <Label for='id'> Device ID: </Label>
                    <Input
                        name='id' // Adding the name attribute
                        id='id'
                        type='text'
                        placeholder={this.state.formControls.id.placeholder}
                        onChange={this.handleChange}
                        value={this.state.formControls.id.value}
                        valid={this.state.formControls.id.valid}
                        required
                    />
                </FormGroup>

                <Row>
                    <Col sm={{ size: '4', offset: 8 }}>
                        <Button type="submit" disabled={!this.state.formIsValid} onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DeviceDeleteForm;
