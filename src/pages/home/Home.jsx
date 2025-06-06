import './home.css'
import { useState } from "react"
import { useEmployee } from '../../context/UseEmployee.jsx'
import InputField from "../../components/inputField/InputField.jsx"
import SelectField from "../../components/selectField/SelectField.jsx"
import stateOptions from "../../data/usStates.json"
// import Modal from "../../components/modal/Modal.jsx"
import Modal from "react-modal-plugin-oc"
import "react-modal-plugin-oc/modalPlugin.css"

const listDepts = [
    { label: "Sales", value: "Sales" },
    { label: "Marketing", value: "Marketing" },
    { label: "Engineering", value: "Engineering" },
    { label: "Human Resources", value: "Human Resources" },
    { label: "Legal", value: "Legal" }
]

export default function Home() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [startDate, setStartDate] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [department, setDepartment] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false)
    const { addEmployee } = useEmployee()

    const handleSubmit = (e) => {
        e.preventDefault()

        const newEmployee = {
            firstName,
            lastName,
            dateOfBirth,
            startDate,
            street,
            city,
            state,
            zipCode,
            department
        }

        addEmployee(newEmployee)
        // console.log("New Employee:", newEmployee)
        setIsModalOpen(true)
    }

    return (
        <div className="homepage">
            <div className="container">
                <h1>Create Employee</h1>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="First Name"
                        id="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <InputField
                        label="Last Name"
                        id="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <InputField
                        label="Date of Birth"
                        id="date-of-birth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />

                    <InputField
                        label="Start Date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <InputField
                            label="Street"
                            id="street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />

                        <InputField
                            label="City"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <SelectField
                            label="State"
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            options={stateOptions}
                        />

                        <InputField
                            label="Zip Code"
                            id="zip-code"
                            type="number"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </fieldset>

                    <SelectField
                        label="Department"
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        options={listDepts}
                    />

                    <button type="submit" className="form-btn">Save</button>
                </form>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <p>Employee created successfully!</p>
                </Modal>
            </div>
        </div>
    )
}
