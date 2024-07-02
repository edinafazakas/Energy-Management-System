import React from "react";
import Table from "../../commons/tables/table";

const columns = [
    {
        Header: 'Device ID',
        accessor: 'deviceID',
        width: 350,
    },
    {
        Header: 'Description',
        accessor: 'description',
        width: 200,
    },
    {
        Header: 'Address',
        accessor: 'address',
        width: 200,
    },
    {
        Header: 'Max Consumption',
        accessor: 'max_consumption',
    },
];

const filters = [
    {
        accessor: 'deviceID',
    }
];

class DeviceTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            selectedRow: this.props.selectedRow,
        };
    }

    handleRowClick = (row) => {
        const { onSelectDevice } = this.props;
        if (onSelectDevice) {
            onSelectDevice(row.deviceID);
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

export default DeviceTable;
