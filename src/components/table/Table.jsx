import './table.css'
import React from 'react'

// Importation des hooks et fonctions utilitaires de React Table
import {
    useReactTable,              // Hook principal pour créer une instance de table
    getCoreRowModel,            // Gère les lignes de base (sans tri, filtre, etc.)
    getSortedRowModel,          // Gère le tri des lignes
    getPaginationRowModel,      // Gère la pagination
    getFilteredRowModel,        // Import du modèle de filtrage (recherche)
    flexRender,                 // Fonction pour rendre dynamiquement les cellules
} from '@tanstack/react-table'

const Table = ({ data, columns }) => {
    const [sorting, setSorting] = React.useState([]) // État local pour suivre le tri appliqué
    const [globalFilter, setGlobalFilter] = React.useState('') // État pour la recherche

    // Création de l'instance de la table
    const table = useReactTable({
        data,                   // Données à afficher
        columns,                // Colonnes (définies dans EmployeeList)
        state: {
            sorting,           // État de tri (contrôlé par React)
            globalFilter,      // État de recherche (contrôleur par React) Appliquer le filtre global
        },
        onSortingChange: setSorting,              // Callback pour mettre à jour le tri
        onGlobalFilterChange: setGlobalFilter,    // Callback de changement de filtre (recherche)
        getCoreRowModel: getCoreRowModel(),       // Modèle de base
        getSortedRowModel: getSortedRowModel(),   // Modèle après tri
        getPaginationRowModel: getPaginationRowModel(), // Modèle avec pagination
        getFilteredRowModel: getFilteredRowModel(),     // Utiliser le modèle de filtrage (recherche)
    })

    return (
        <>
            <div className='header-form'>
                {/* Ajout du sélecteur de nombre de lignes à afficher par page */}
                <div className="page-size-selector">
                    <label className='show-entries' htmlFor="page-size-select">Show entries:</label>
                    <select
                        id="page-size-select"
                        value={table.getState().pagination.pageSize}
                        onChange={e => table.setPageSize(Number(e.target.value))}
                    >
                        {[5, 10, 25, 50, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Champ de recherche */}
                <input className='search-input'
                    type="text"
                    placeholder="Search..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </div>
            <div className="table-wrapper">
                {/* Table HTML */}
                <table border="1" cellPadding="5" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        {/* Boucle sur les groupes d'en-têtes (utile si colonnes imbriquées) */}
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()} // Gestion du tri au clic
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {/* Rendu du nom de colonne (header) */}
                                        {flexRender(header.column.columnDef.header, header.getContext())}

                                        {/* Indicateur de tri (flèche montante/descendante) */}
                                        <span className={header.column.getIsSorted() ? "table-sort-icon active" : "table-sort-icon"}>
                                            {{
                                                asc: '↑',
                                                desc: '↓',
                                            }[header.column.getIsSorted()] || '↕'}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {/* Boucle sur les lignes à afficher */}
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {/* Boucle sur les cellules visibles de chaque ligne */}
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {/* Rendu de la cellule (texte ou composant) */}
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='footer-form'>
                {/* Affichage de la pagination : nombre d'entrées visibles */}
                {/* Affichage des informations de pagination : indique le numéro de la première et dernière ligne affichée, ainsi que le total de lignes filtrées. */}
                <div className='showing' style={{ marginTop: '8px' }}>
                    <span>
                        Showing {table.getRowModel().rows.length > 0 ? table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1 : 0}
                        {' to '}
                        {Math.min(
                            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                            table.getFilteredRowModel().rows.length
                        )}{' '}
                        of {table.getFilteredRowModel().rows.length} entries
                    </span>
                </div>

                {/* Boutons de navigation pour la pagination */}
                <div className='pagination-controls' style={{ marginTop: '8px' }}>
                    <button className='pagination-btn'
                        onClick={() => table.previousPage()}                    // Aller à la page précédente
                        disabled={!table.getCanPreviousPage()}                 // Désactive le bouton s'il n'y a pas de page précédente
                    >
                        Previous
                    </button>

                    <div className="page-numbers">
                        {/* Boucle pour créer un bouton pour chaque page */}
                        {Array.from({ length: table.getPageCount() }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => table.setPageIndex(i)}
                                // Ajoute la classe 'active' si le bouton correspond à la page actuelle
                                className={`pagination-page-btn ${table.getState().pagination.pageIndex === i ? 'active' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button className='pagination-btn'
                        onClick={() => table.nextPage()} // Aller à la page suivante
                        disabled={!table.getCanNextPage()} // Désactive le bouton s'il n'y a pas de page suivante
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default Table
