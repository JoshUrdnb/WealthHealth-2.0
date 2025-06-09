import './employees.css'
import Table from '../../components/table/Table'
import { useEmployee } from '../../context/UseEmployee.jsx'

const EmployeeList = () => {

    const { employees } = useEmployee()

    const columns = [
        { header: 'First Name', accessorKey: 'firstName' },
        { header: 'Last Name', accessorKey: 'lastName' },
        { header: 'Start Date', accessorKey: 'startDate' },
        { header: 'Department', accessorKey: 'department' },
        { header: 'Date of Birth', accessorKey: 'dateOfBirth' },
        { header: 'Street', accessorKey: 'street' },
        { header: 'City', accessorKey: 'city' },
        { header: 'State', accessorKey: 'state' },
        { header: 'Zip Code', accessorKey: 'zipCode' },
    ]

    return (
        <div className="form-container">
            <h1>Current Employees</h1>
            <div className="table-employee-wrapper">
                <Table data={employees} columns={columns} />
            </div>
        </div>
    )
}

export default EmployeeList
