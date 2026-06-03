export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex justify-center h-screen">
      {/* hinh minh hoa */}
      <div className="">
        <img
          className="w-full h-full"
          src="login.png"
          alt="login image"
        />
      </div>

      {/* pages (login/signup)*/}
      {children}
    </div>
  )
}