import { useState, useEffect } from 'react'
import { EmployeeContext } from './EmployeeContext.jsx'
import jsonData from '../data/employees_data.json' // 1. Importer les données JSON

// Fournisseur de contexte
export function EmployeeProvider({ children }) {
    // 2. Initialiser l'état (peut rester vide au départ)
    const [employees, setEmployees] = useState([])

    // 3. Utiliser useEffect pour charger les données initiales une seule fois
    useEffect(() => {
        // On charge les employés depuis le fichier JSON au premier rendu du composant
        setEmployees(jsonData.employeesData)
    }, []) // Le tableau de dépendances vide [] assure que cet effet ne s'exécute qu'une seule fois

    // Fonction pour ajouter un nouvel employé
    const addEmployee = (newEmployee) => {
        // Le nouvel employé est placé en premier, suivi par les anciens.
        setEmployees(prevEmployees => [newEmployee, ...prevEmployees])
    }

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    )
}
