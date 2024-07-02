import React from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import validate from "./validators/person-validators";
import * as API_USERS from "../api/person-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";

class PersonDeleteForm extends React.Component {
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
                    placeholder: 'User ID',
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

        const updatedControls = { ...this.state.formControls }; // Create a shallow copy

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

    deletePerson = () => {
        const personId = this.state.formControls.id.value;

        const token = sessionStorage.getItem('userToken'); // Assuming you store the token in sessionStorage

        API_USERS.deletePerson(personId, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                const response = { message: 'Successfully deleted user with ID: ' + personId };
                alert(response.message);
                console.log("Successfully deleted user with ID: " + personId);
                window.location.reload();
                this.props.reloadHandler();
            } else {
                this.setState({
                    errorStatus: status,
                    error: error,
                });
            }
        }, token);
    };

    handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission

        this.deletePerson();
    };

    render() {
        return (
            <div>
                <FormGroup id='id'>
                    <Label for='id'> Person ID: </Label>
                    <Input
                        name='id'
                        id='id'
                        type='text' // Specify the input type
                        placeholder={this.state.formControls.id.placeholder}
                        onChange={this.handleChange}
                        value={this.state.formControls.id.value}
                        valid={this.state.formControls.id.valid}
                        required
                    />
                    {this.state.formControls.id.touched && !this.state.formControls.id.valid && (
                        <div className={"error-message row"}> * This field is required. </div>
                    )}
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

export default PersonDeleteForm;
