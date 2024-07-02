import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'userID',
        accessor: 'userID',
        width: 350
    },
    {
        Header: 'Name',
        accessor: 'name',
        width: 200
    },
    {
        Header: 'Role',
        accessor: 'role',
    },
    {
        Header: 'Username',
        accessor: 'username',
    },
    {
        Header: 'Password',
        accessor: 'password',
    },
];

const filters = [
    {
        accessor: 'userID',
    }
];

class PersonTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            selectedRow: this.props.selectedRow, // Pass selectedRow from props
        };
    }

    handleRowClick = (row) => {
        const { onSelectUser } = this.props;
        if (onSelectUser) {
            onSelectUser(row.userID); // Notify the parent component with the selected user's ID
        }
    };

    render() {
        const { tableData, selectedRow } = this.state;

        const centeredTableStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        };

        return (
            <div>
                <div style={centeredTableStyle}>
                    <Table
                        data={tableData}
                        columns={columns}
                        search={filters}
                        pageSize={5}
                        selectedRow={selectedRow}
                        onRowClick={this.handleRowClick}
                    />
                </div>
            </div>
        );
    }
}

export default PersonTable;
