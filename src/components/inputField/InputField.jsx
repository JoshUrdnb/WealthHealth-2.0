export default function InputField({ label, id, type = "text", value, onChange }) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
            />
        </>
    )
}
