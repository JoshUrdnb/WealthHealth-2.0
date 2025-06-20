export default function SelectField({ label, id, value, onChange, options, className = "" }) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <select id={id} value={value} onChange={onChange} className={className}>
                <option value="">Select your {label.toLowerCase()}</option>
                {options.map(({ label, value }) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
        </>
    )
}
