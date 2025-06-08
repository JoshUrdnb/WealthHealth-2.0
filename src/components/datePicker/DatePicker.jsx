import './datePicker.css'
import { useRef } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function CustomDatePicker({
    selected,
    onChange,
    placeholder,
    className = "",
    label
}) {
    const years = []
    for (let y = 1950; y <= 2050; y++) years.push(y)

    // Ref pour accéder aux méthodes internes du calendrier
    const datePickerRef = useRef(null)

    // Fonction pour ramener le calendrier sur aujourd'hui sans modifier la sélection
    const goToToday = () => {
        onChange(null)
        if (datePickerRef.current && datePickerRef.current.setPreSelection) {
            datePickerRef.current.setPreSelection(new Date())
        }
    }

    return (
        <div className="datepicker-container">
            {label && <label className="datepicker-label">{label}</label>}
            <DatePicker
                ref={datePickerRef}
                selected={selected}
                onChange={onChange}
                dateFormat="MM/dd/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                minDate={new Date(1950, 0, 1)}
                maxDate={new Date(2050, 11, 31)}
                placeholderText={placeholder}
                className={`custom-datepicker-input ${className}`}
                calendarClassName="custom-datepicker-calendar"
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled
                }) => (
                    <div className="custom-datepicker-header">
                        <button
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                            type="button"
                            className="custom-datepicker-arrow"
                            aria-label="Previous month"
                        >
                            {"◄"}
                        </button>
                        <button
                            onClick={goToToday}
                            type="button"
                            className="custom-datepicker-home"
                            title="Today"
                        >
                            🏠︎
                        </button>
                        <select
                            className="custom-datepicker-select select-month"
                            value={date.getMonth()}
                            onChange={({ target: { value } }) => changeMonth(Number(value))}
                            aria-label="Select month"
                        >
                            {[
                                "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ].map((month, idx) => (
                                <option key={month} value={idx}>{month}</option>
                            ))}
                        </select>
                        <select
                            className="custom-datepicker-select"
                            value={date.getFullYear()}
                            onChange={({ target: { value } }) => changeYear(Number(value))}
                            aria-label="Select year"
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <button
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                            type="button"
                            className="custom-datepicker-arrow"
                            aria-label="Next month"
                        >
                            {"►"}
                        </button>
                    </div>
                )}
            />
        </div>
    )
}
