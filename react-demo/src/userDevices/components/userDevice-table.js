import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        width: 350
    },
    {
        Header: 'User ID',
        accessor: 'userid',
        width: 350
    },
    {
        Header: 'Device ID',
        accessor: 'deviceid',
        width: 350
    },

];

const filters = [
    {
        accessor: 'id',
    }
];

class UserDeviceTable extends React.Component {
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
            onSelectUser(row.id); // Notify the parent component with the selected user's ID
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

export default UserDeviceTable;
