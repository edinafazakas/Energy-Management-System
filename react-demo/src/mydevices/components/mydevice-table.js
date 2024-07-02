import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'Device ID',
        accessor: 'deviceID',
        width: 350
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
    {
        Header: 'Address',
        accessor: 'address',
    },
    {
        Header: 'Maximum consumption',
        accessor: 'max_consumption',
        width: 200
    },

];

const filters = [
    {
        accessor: 'deviceID',
    }
];

class MyDeviceTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };

    }
    render() {
        const centeredTableStyle = {
            justifyContent: 'center',
        };

        return (
            <div style={centeredTableStyle}>
                <Table
                    data={this.state.tableData}
                    columns={columns}
                    search={filters}
                    pageSize={5}
                />
            </div>
        )
    }
}

export default MyDeviceTable;
