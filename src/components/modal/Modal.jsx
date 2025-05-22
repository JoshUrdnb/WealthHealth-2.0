import "./modal.css"

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null

    const handleClickOutside = (e) => {
        if (e.target.className === "modal-overlay") {
            onClose()
        }
    };

    return (
        <div className="modal-overlay" onClick={handleClickOutside}>
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>⊗</button>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    )
}