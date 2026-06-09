import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Trang không tìm thấy</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Xin lỗi, trang bạn tìm kiếm không tồn tại hoặc có thể đã được di chuyển.
        </p>
        <div className="space-x-4">
          <Link 
            href="/permissions" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Quay lại trang chính
          </Link>
          <Link 
            href="/" 
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  )
}
