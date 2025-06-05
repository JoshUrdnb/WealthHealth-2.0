import { useState } from 'react'
import { EmployeeContext } from './EmployeeContext.jsx'

// Fournisseur de context
export function EmployeeProvider({ children }) {
    // Initialisation en mémoire uniquement
    const [employees, setEmployees] = useState([])

    // Fonction pour ajouter un nouvel employé
    const addEmployee = (newEmployee) => {
        setEmployees(prev => [...prev, newEmployee])
    }

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    )
}
