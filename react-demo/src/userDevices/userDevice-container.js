import React from "react";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
} from "reactstrap";
import * as API_USERDEVICES from "./api/userDevice-api";
import UserDeviceTable from "./components/userDevice-table";
import PersonForm from "../person/components/person-form";

class UserDeviceContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchUserDevices();
    }

    fetchUserDevices() {
        API_USERDEVICES.getUserDevices((result, status, err) => {
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
        });
    }

    toggleForm = () => {
        this.setState({ selected: !this.state.selected });
    }

    reload = () => {
        this.setState({
            isLoaded: false,
        });
        this.toggleForm();
        this.fetchUserDevices();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> User Devices Management </strong>
                </CardHeader>
                <Card>
                    <br />
                    <Row>
                        <Col sm={{ size: "9", offset: 1 }}>
                            {this.state.isLoaded && (
                                <UserDeviceTable
                                    tableData={this.state.tableData}
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
            </div>
        );
    }
}

export default UserDeviceContainer;
