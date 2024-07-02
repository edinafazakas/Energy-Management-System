import React, { Component } from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import validate from "./validators/person-validators";
import * as API_USERS from "../api/person-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";

class PersonEditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorStatus: 0,
            error: null,
            formIsValid: false,
            formControls: {
                id: {
                    value: '',
                    placeholder: 'User ID...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                name: {
                    value: '',
                    placeholder: 'What is your name?...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                username: {
                    value: '',
                    placeholder: 'Username...',
                    valid: false,
                    touched: false,
                },
                password: {
                    value: '',
                    placeholder: 'Password...',
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

        const { formControls } = this.state;
        const userId = formControls.id.value;

        const editedUser = {
            name: formControls.name.value,
            username: formControls.username.value,
            password: formControls.password.value,
        };

        const token = sessionStorage.getItem('userToken'); // Assuming you store the token in sessionStorage

        API_USERS.editUser(userId, editedUser, (result, status, error) => {
            if (status === 200) {
                alert("User information updated successfully.");
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
                    <Label for="name">Name</Label>
                    <Input
                        name="name"
                        type="text"
                        placeholder={this.state.formControls.name.placeholder}
                        onChange={this.handleChange}
                        value={this.state.formControls.name.value}
                        valid={this.state.formControls.name.valid}
                        required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid && (
                        <div className={"error-message"}> * This field is required and should have at least 3 characters. </div>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        name="username"
                        type="text"
                        placeholder={this.state.formControls.username.placeholder}
                        onChange={this.handleChange}
                        value={this.state.formControls.username.value}
                        valid={this.state.formControls.username.valid}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        name="password"
                        type="text"
                        placeholder={this.state.formControls.password.placeholder}
                        onChange={this.handleChange}
                        value={this.state.formControls.password.value}
                        valid={this.state.formControls.password.valid}
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

export default PersonEditForm;
