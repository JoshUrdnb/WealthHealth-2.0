import { useState, useEffect } from 'react'
import { EmployeeContext } from './EmployeeContext.jsx'

// Clé pour localStorage
const LS_KEY = 'employees'

// Fournisseur de context
export function EmployeeProvider({ children }) {
    // Initialisation depuis localStorage
    const [employees, setEmployees] = useState(() => {
        const stored = window.localStorage.getItem(LS_KEY)
        return stored ? JSON.parse(stored) : []
    })

    // Sauvegarde automatique à chaque changement
    useEffect(() => {
        window.localStorage.setItem(LS_KEY, JSON.stringify(employees))
    }, [employees])

    // Fonction pour ajouter un nouvel employé
    const addEmployee = (newEmployee) => {
        setEmployees(prev => [...prev, newEmployee]);
    }

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    )
}