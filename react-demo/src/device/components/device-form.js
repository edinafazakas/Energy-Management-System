import React from 'react';
import validate from "./validators/device-validators";
import Button from "react-bootstrap/Button";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import * as API_DEVICES from "../api/device-api";



class DeviceForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                description: {
                    value: '',
                    placeholder: 'Device description',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                address: {
                    value: '',
                    placeholder: 'Address',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                max_consumption: {
                    value: '',
                    placeholder: 'Maximum consumption',
                    valid: false,
                    touched: false,
                }

            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    handleSubmit = () => {
        const device = {
            description: this.state.formControls.description.value,
            address: this.state.formControls.address.value,
            max_consumption: this.state.formControls.max_consumption.value,
        };

        const token = sessionStorage.getItem('userToken'); // Change to 'userToken'
        const secretKey = sessionStorage.getItem('secretKey');

        API_DEVICES.createDevice(device, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Device created:", result);
                window.location.reload();
            } else {
                console.error('Error creating device:', error);
            }
        }, token, secretKey);
    };



    render() {
        return (
            <div>

                <FormGroup id='description'>
                    <Label for='descriptionField'> Description: </Label>
                    <Input
                        name='description'
                        id='descriptionField'
                        placeholder={this.state.formControls.description.placeholder}
                        onChange={this.handleChange}
                        defaultValue={this.state.formControls.description.value}
                        touched={this.state.formControls.description.touched ? 1 : 0}
                        valid={this.state.formControls.description.valid}
                        required
                    />
                    {this.state.formControls.description.touched && !this.state.formControls.description.valid &&
                        <div className={"error-message row"}> * Description must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input
                        name='address'
                        id='addressField'
                        placeholder={this.state.formControls.address.placeholder}
                        onChange={this.handleChange}
                        defaultValue={this.state.formControls.address.value}
                        touched={this.state.formControls.address.touched ? 1 : 0}
                        valid={this.state.formControls.address.valid}
                    />
                </FormGroup>


                <FormGroup id='max_consumption'>
                    <Label for='maxConsumptionField'> Maximum Consumption: </Label>
                    <Input
                        name='max_consumption'
                        id='maxConsumptionField'
                        placeholder={this.state.formControls.max_consumption.placeholder}
                        onChange={this.handleChange}
                        defaultValue={this.state.formControls.max_consumption.value}
                        touched={this.state.formControls.max_consumption.touched ? 1 : 0}
                        valid={this.state.formControls.max_consumption.valid}
                    />
                </FormGroup>


                <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                        </Col>
                    </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default DeviceForm;
