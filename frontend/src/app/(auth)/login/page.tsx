'use client'

import PasswordInput from "@/src/components/form/PasswordInput";
import TextInput from "@/src/components/form/TextInput";
import Button from "@/src/components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="shadow-lg p-4 flex flex-col justify-center items-center rounded-2xl">

        {/* logo */}
        <div className="h-20 w-20">
          <img
            className="h-full w-full"
            src="quochuy.png"
            alt="quochuy"
          />

        </div>

        {/* title */}
        <div className="flex flex-col items-center font-bold py-3 text-2xl">
          <h1>Phần Mềm Quản Lý - Tạo Lập Cơ Sở Dữ Liệu</h1>
          <h1>An Toàn Vệ Sinh Lao Động</h1>
        </div>


        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-primary font-bold text-xl">Đăng nhập</h2>

          <TextInput
            label="Tài khoản"
            placeholder="Nhập tài khoản"
            required={true}
          />

          <PasswordInput
            label="Mật khẩu"
            required={true}
          />

          <div className="flex justify-between ">
            <div className="flex gap-3">
              <input type="checkbox" name="" id="" />
              <p>Nhớ đăng nhập</p>
            </div>

            <Link
              className="text-primary font-medium"
              href={'/forget'}
            >
              Quên mật khẩu
            </Link>
          </div>

          {/* buttons */}
          <div className="flex flex-col gap-2 py-3">
            <Button
              variant="primary"
              type="button"
            >Đăng nhập</Button>

            <Button
              variant="outline"
              type="button"
            >Đăng ký tài khoản doanh nghiệp</Button>
          </div>
        </div>
      </div>
    </div>
  )
}