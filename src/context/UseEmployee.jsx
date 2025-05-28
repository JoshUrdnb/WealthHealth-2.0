import { useContext } from 'react'
import { EmployeeContext } from './EmployeeContext.jsx'

export function useEmployee() {
    // Utilisation du contexte
    const context = useContext(EmployeeContext)
    if (!context) {
        throw new Error('useEmployee must be used within an EmployeeProvider')
    }
    return context
}
