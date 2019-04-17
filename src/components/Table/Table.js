import React, { Component, useState, useEffect } from 'react';
import { addRow, deleteRow, updateRow, getTable } from "../../api";
import './Table.css';
import Loading from '../Loading/Loading';
import refreshsvg from "../../assets/refresh.svg";
import closesvg from '../../assets/close.svg';
import oksvg from '../../assets/ok.svg';
import editsvg from '../../assets/edit.svg';
import deletesvg from '../../assets/delete.svg';
import addsvg from '../../assets/add.svg';

class Table extends Component {
    addRow(table, values) {
        const { setTableData, setError, setLoading } = this.props;
        setLoading(true);
        addRow(table, values)
            .then(data => {
                setLoading(false);
                if (data.sqlMessage) throw new Error(data.sqlMessage)
                setTableData(data)
            })
            .catch(error => setError(error.message));
    }
    updateRow(table, row, newvalues) {
        const { setTableData, setError, setLoading } = this.props;
        setLoading(true)
        updateRow(table, row, newvalues)
            .then(data => {
                setLoading(false);
                if (data.sqlMessage) throw new Error(data.sqlMessage)
                setTableData(data)
            })
            .catch(error => setError(error.message));
    }
    deleteRow(table, row) {
        const { setTableData, setError, setLoading } = this.props;
        setLoading(true);
        deleteRow(table, row)
            .then(data => {
                setLoading(false);
                if (data.sqlMessage) throw new Error(data.sqlMessage);
                setTableData(data)
            })
            .catch(error => setError(error.message));
    }
    refresh() {
        const { setTableData, currentTable, setLoading, setError } = this.props;
        setLoading(true);
        getTable(currentTable).then(data => {
            setLoading(false);
            if (data.sqlMessage) throw new Error(data.sqlMessage)
            if (data) {
                setTableData(data);
            }
        })
            .catch(error => setError(error.message));
    }
    render() {
        const { tableData, currentTable, loading } = this.props;
        return (
            <div className="Table-container">
                <h1 className="Table-title">Table: {currentTable} {currentTable && <RefreshButton click={this.refresh.bind(this)}/>}</h1>
                {loading ? <Loading /> : (
                    <table className="Table-table">
                        <tbody className="Table-body">
                            <TableHeader {...this.props} />
                            <InputRow {...this.props} addRow={this.addRow.bind(this)} />
                            {Array.isArray(tableData) && tableData.map((row, key) => {
                                return <Row key={key} {...this.props} row={row} onUpdate={this.updateRow.bind(this)} onDelete={this.deleteRow.bind(this)} />
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

const TableHeader = ({ getRows, sort, setQueryParams }) => {
    return <tr>{getRows().map((item, key) => <td className="Table-column-title" key={key}>{item} <input type="checkbox" onChange={(e) => { setQueryParams(item, e.target.checked) }} /></td>)}</tr>
}

const Row = ({ row, ...props }) => {
    const [change, setChange] = useState(false);
    const [values, setValues] = useState({});
    useEffect(() => setChange(false), [row]);
    if (change) return <UpdateRow {...props} row={row} values={values} setValues={setValues} setChange={setChange} />
    return <tr>
        {Object.values(row).map((item, key) => <td key={key}>{item}</td>)}
        <td><SettingsButton {...props} setChange={setChange} row={row} /></td>
    </tr>
}

const UpdateRow = ({ values, setChange, onUpdate, setValues, row, currentTable, }) => {
    return (
        <tr>
            {Object.entries(row).map(([key, value]) => <td key={key}><input type="text" placeholder={value} onChange={(e) => { setValues(Object.assign({}, values, { [key]: e.target.value })); }} /></td>)}
            <td> 
                <AcceptButton click={() => { onUpdate(currentTable, row, values) }}/>
                <ResetButton click={() => { setChange(false) }}/>
            </td>
        </tr>
    )
}

const InputRow = ({ getRows, currentTable, addRow }) => {
    const [values, setValues] = useState({})
    if (!currentTable) return <tr></tr>;
    return (
        <tr>
            {getRows().map((item, key) => <td key={key}><input type="text" onChange={(e) => { setValues(Object.assign({}, values, { [item]: e.target.value })); }} /></td>)}
            <td><AddButton click={() => { addRow(currentTable, values) }}/></td>
        </tr>
    )
}

const SettingsButton = ({ onDelete, currentTable, row, setChange }) => {
    return (
        <>
            <DeleteButton click={() => { onDelete(currentTable, row) }}/>
            <UpdateButton click={() => { setChange(true) }}/>
        </>
    )
}

const AddButton = ({ click }) => (
    <div className="Table-svg" onClick={click}>
        <img src={addsvg} alt="add" />
    </div>
)

const UpdateButton = ({ click }) => (
    <div className="Table-svg" onClick={click}>
        <img src={editsvg} alt="update" />
    </div>
)

const DeleteButton = ({ click }) => (
    <div className="Table-svg" onClick={click}>
        <img src={deletesvg} alt="update" />
    </div>
)

const AcceptButton = ({ click }) => (
    <div className="Table-svg" onClick={click}>
        <img src={oksvg} alt="accept" />
    </div>
)

const ResetButton = ({ click }) => (
    <div className="Table-svg" onClick={click}>
        <img src={closesvg} alt="reset" />
    </div>
)

const RefreshButton = ({ click }) => (
    <div className="Table-svg Table-refresh" onClick={click}>
        <img src={refreshsvg} alt="refresh" />
    </div>
)

export default Table;