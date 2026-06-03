import clsx from "clsx"
import FormField from "./FormField"

type TextInputProps = {
  label: string,
  required?: boolean,
  placeholder?: string,
  classname?: string
}

export default function TextInput({
  label,
  required,
  placeholder,
  classname
}: TextInputProps) {
  return (
    <FormField
      label={label}
      required={required}
    >
      <input
        placeholder={placeholder}
        className={clsx("outline-none px-2 py-1", classname)}
      />
    </FormField>
  )
}