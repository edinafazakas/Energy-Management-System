import React from 'react';
import validate from "./validators/person-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/person-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class PersonForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
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

    registerPerson(person) {
        const token = sessionStorage.getItem('userToken'); // Assuming you store the token in sessionStorage

        return API_USERS.createUser(person, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                const response = { message: 'Successfully inserted person with name: ' + result.name };
                alert(response.message);
                console.log("Successfully inserted person with id: " + result);
                window.location.reload();
                this.props.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        }, token);
    }

    handleSubmit() {
        let person = {
            name: this.state.formControls.name.value,
            username: this.state.formControls.username.value, // Update to use "username"
            password: this.state.formControls.password.value, // Update to use "password"
        };

        console.log(person);
        this.registerPerson(person);
    }


    render() {
        return (
            <div>

                <FormGroup id='name'>
                    <Label for='name'> Name: </Label>
                    <Input
                        name='name'
                        id='name'
                        placeholder={this.state.formControls.name.placeholder}
                        onChange={this.handleChange}
                        value={this.state.formControls.name.value} // Use "value" instead of "defaultValue"
                        touched={this.state.formControls.name.touched ? 1 : 0}
                        valid={this.state.formControls.name.valid}
                        required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                        <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='username'>
                    <Label for='username'> Username: </Label>
                    <Input
                        name='username' // Change "email" to "username"
                        id='username'
                        placeholder={this.state.formControls.username.placeholder} // Use "username" instead of "email"
                        onChange={this.handleChange}
                        value={this.state.formControls.username.value} // Use "value" instead of "defaultValue"
                        touched={this.state.formControls.username.touched ? 1 : 0} // Change "email" to "username"
                        valid={this.state.formControls.username.valid} // Change "email" to "username"
                        required
                    />
                    {this.state.formControls.username.touched && !this.state.formControls.username.valid && // Change "email" to "username"
                        <div className={"error-message"}> * Wrong username</div>}
                </FormGroup>

                <FormGroup id='password'>
                    <Label for='password'> Password: </Label>
                    <Input
                        name='password'
                        id='password'
                        placeholder={this.state.formControls.password.placeholder} // Use "password" instead of "age"
                        min={0}
                        max={100}
                        type="number"
                        onChange={this.handleChange}
                        value={this.state.formControls.password.value} // Use "value" instead of "defaultValue"
                        touched={this.state.formControls.password.touched ? 1 : 0}
                        valid={this.state.formControls.password.valid}
                        required
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

export default PersonForm;
