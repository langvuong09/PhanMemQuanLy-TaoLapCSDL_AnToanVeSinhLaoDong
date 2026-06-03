import clsx from "clsx"
import FormField from "./FormField"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

type PasswordInput = {
  label: string,
  required?: boolean,
  classname?: string
}

export default function PasswordInput({
  label,
  required,
  classname
}: PasswordInput) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      label={label}
      required={required}
    >
      <div className="flex justify-between items-center px-2 pb-1">
        <input
          placeholder="Nhập mật khẩu"
          className={clsx("outline-none py-1", classname)}
          type={showPassword ? "text" : "password"}
        />

        <button
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye
              size={20}
              className="cursor-pointer text-primary"
            />
          ) : (
            <EyeOff
              size={20}
              className="cursor-pointer text-primary"
            />
          )}
        </button>
      </div>
    </FormField>
  )
}