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
    const [showErrors, setShowErrors] = useState(false)
    const { addEmployee } = useEmployee()

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowErrors(true) // J'affiche les erreurs si les champs sont vides

        // Je vérifie si un champ est vide
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !dateOfBirth.trim() ||
            !startDate.trim() ||
            !street.trim() ||
            !city.trim() ||
            !state.trim() ||
            !zipCode.trim() ||
            !department.trim()
        ) {
            return
        }

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

        // Je réinitialise tous les champs après soumission
        setFirstName("")
        setLastName("")
        setDateOfBirth("")
        setStartDate("")
        setStreet("")
        setCity("")
        setState("")
        setZipCode("")
        setDepartment("")
        setShowErrors(false) // Je cache les erreurs après soumission
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
                        className={showErrors && !firstName.trim() ? "error" : ""}
                        placeholder={showErrors && !firstName.trim() ? "Field required" : ""}
                    />

                    <InputField
                        label="Last Name"
                        id="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={showErrors && !lastName.trim() ? "error" : ""}
                        placeholder={showErrors && !lastName.trim() ? "Field required" : ""}
                    />

                    <InputField
                        label="Date of Birth"
                        id="date-of-birth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className={showErrors && !dateOfBirth.trim() ? "error" : ""}
                        placeholder={showErrors && !dateOfBirth.trim() ? "Field required" : ""}
                    />

                    <InputField
                        label="Start Date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={showErrors && !startDate.trim() ? "error" : ""}
                        placeholder={showErrors && !startDate.trim() ? "Field required" : ""}
                    />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <InputField
                            label="Street"
                            id="street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className={showErrors && !street.trim() ? "error" : ""}
                            placeholder={showErrors && !street.trim() ? "Field required" : ""}
                        />

                        <InputField
                            label="City"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className={showErrors && !city.trim() ? "error" : ""}
                            placeholder={showErrors && !city.trim() ? "Field required" : ""}
                        />

                        <SelectField
                            label="State"
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            options={stateOptions}
                            className={showErrors && !state.trim() ? "error" : ""}
                        />

                        <InputField
                            label="Zip Code"
                            id="zip-code"
                            type="number"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className={showErrors && !zipCode.trim() ? "error" : ""}
                            placeholder={showErrors && !zipCode.trim() ? "Field required" : ""}
                        />
                    </fieldset>

                    <SelectField
                        label="Department"
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        options={listDepts}
                        className={showErrors && !department.trim() ? "error" : ""}
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
