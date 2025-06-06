export default function InputField({ label, id, type = "text", value, onChange, className = "", placeholder={placeholder} }) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className={className}
                placeholder={placeholder}
            />
        </>
    )
}
