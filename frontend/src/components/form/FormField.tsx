import { ReactNode } from "react"

type FormFieldProps = {
  label: string,
  required?: boolean,
  children: ReactNode
}

export default function FormField({
  label,
  required,
  children
}: FormFieldProps) {
  return (
    <fieldset className="border border-gray-400 rounded text-sm">
      <legend className="ml-1.5 px-1 text-gray-500">
        {label}
        {required && (
          <span className="text-red-500">*</span>
        )}
      </legend>

      {children}
    </fieldset>
  )
}