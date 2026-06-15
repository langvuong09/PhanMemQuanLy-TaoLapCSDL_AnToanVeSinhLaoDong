import { InputHTMLAttributes } from "react";

type CheckboxLengendProps = {
    isChecked?: boolean;
    onChange?: () => void;

    checkbox: InputHTMLAttributes<HTMLInputElement>
}

const CheckboxLengend = ({
   isChecked, onChange, checkbox
}: CheckboxLengendProps) => {

    return (
        <div className="checkbox-wrapper-64">
            <label className="switch">
                <input type="checkbox" disabled={checkbox.disabled} checked={isChecked} onChange={onChange} />
                <span className={`slider ${checkbox.disabled && "disable"}`}></span>
            </label>
        </div>
    )
}

export default CheckboxLengend;