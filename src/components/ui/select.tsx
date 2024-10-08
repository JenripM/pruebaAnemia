import React from "react";

interface Option {
    id: string;
    label: string;
}

interface SelecteProps {
    label: string
    placeholder: string;
    id: string,
    data: Option[];
    selected: string;
    // eslint-disable-next-line unused-imports/no-unused-vars
    onChange: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
}

const Select: React.FC<SelecteProps> = ({ data, label, selected, onChange, disabled, placeholder, required, id }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <select
                id={id}   
                name={id}
                value={selected}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"
                disabled={disabled}
                required={required}
            >
                <option value="">
                    {placeholder}
                </option>
                {data.map((option : Option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default Select;
