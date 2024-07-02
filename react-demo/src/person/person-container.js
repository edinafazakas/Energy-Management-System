import React from "react";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
} from "reactstrap";
import PersonForm from "./components/person-form";
import PersonTable from "./components/person-table";
import * as API_USERS from "./api/person-api";
import PersonDeleteForm from "./components/person-delete-form";
import PersonEditForm from "./components/person-edit-form";

class PersonContainer extends React.Component {
    constructor(props) {
        super(props);

        this.toggleForm = this.toggleForm.bind(this);
        this.toggleDeleteForm = this.toggleDeleteForm.bind(this);
        this.toggleEditForm = this.toggleEditForm.bind(this);

        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            selectedUserId: null,
            isDeleteFormVisible: false,
            isEditFormVisible: false,
            editingUserId: null,
        };
    }

    componentDidMount() {
        this.fetchPersons();
    }

    fetchPersons() {
        const token = sessionStorage.getItem('userToken'); // Assuming you store the token in sessionStorage
        API_USERS.getPersons((result, status, err) => {
            if (status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true,
                });
            } else {
                this.setState({
                    errorStatus: status,
                    error: err,
                });
            }
        }, token);
    }

    toggleForm() {
        this.setState({ selected: !this.state.selected });
    }

    toggleDeleteForm = () => {
        this.setState({ isDeleteFormVisible: !this.state.isDeleteFormVisible });
    };

    toggleEditForm() {
        this.setState({
            isEditFormVisible: !this.state.isEditFormVisible,
        });
    }

    reload() {
        this.setState({
            isLoaded: false,
        });
        this.toggleForm();
        this.fetchPersons();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Users Management </strong>
                </CardHeader>
                <Card>
                    <br />
                    <Row>
                        <Col sm={{ size: "8", offset: 1 }}>
                            <Button color="primary" onClick={this.toggleForm}>
                                Add User
                            </Button>{" "}
                            <Button color="danger" onClick={this.toggleDeleteForm}>
                                Delete User
                            </Button>{" "}
                            <Button color="info" onClick={this.toggleEditForm}>
                                Edit User
                            </Button>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={{ size: "9", offset: 1 }}>
                            {this.state.isLoaded && (
                                <PersonTable
                                    tableData={this.state.tableData}
                                    onSelectUser={(userId) =>
                                        this.setState({ selectedUserId: userId })
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

                <Modal
                    isOpen={this.state.selected}
                    toggle={this.toggleForm}
                    className={this.props.className}
                    size="lg"
                >
                    <ModalHeader toggle={this.toggleForm}>Add User:</ModalHeader>
                    <ModalBody>
                        <PersonForm reloadHandler={this.reload} />
                    </ModalBody>
                </Modal>

                <Modal
                    isOpen={this.state.isDeleteFormVisible}
                    toggle={this.toggleDeleteForm}
                    className={this.props.className}
                    size="lg"
                >
                    <ModalHeader toggle={this.toggleDeleteForm}>Delete User:</ModalHeader>
                    <ModalBody>
                        <PersonDeleteForm reloadHandler={this.reload} />
                    </ModalBody>
                </Modal>

                <Modal
                    isOpen={this.state.isEditFormVisible}
                    toggle={this.toggleEditForm}
                    className={this.props.className}
                    size="lg"
                >
                    <ModalHeader toggle={this.toggleEditForm}>Edit User:</ModalHeader>
                    <ModalBody>
                        {/* Pass the user ID to the Edit User form */}
                        <PersonEditForm
                            userId={this.state.editingUserId}
                            reloadHandler={this.reload}
                        />
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

export default PersonContainer;