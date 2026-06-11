export type IndustryLevel = 1 | 2 | 3 | 4

export type BusinessIndustry = {
  id: number
  code: string
  name: string
  level: IndustryLevel
  parentId: number | null
}

export const businessIndustriesMock: BusinessIndustry[] = [
  // A - NÔNG NGHIỆP, LÂM NGHIỆP VÀ THUỶ SẢN
  { id: 1, code: 'A', name: 'NÔNG NGHIỆP, LÂM NGHIỆP VÀ THUỶ SẢN', level: 1, parentId: null },
  { id: 2, code: '01', name: 'Nông nghiệp và hoạt động dịch vụ có liên quan', level: 2, parentId: 1 },
  { id: 3, code: '011', name: 'Trồng cây hàng năm', level: 3, parentId: 2 },
  { id: 4, code: '0111', name: 'Trồng lúa', level: 4, parentId: 3 },
  { id: 5, code: '0112', name: 'Trồng ngô và cây lương thực có hạt khác', level: 4, parentId: 3 },
  { id: 6, code: '0113', name: 'Trồng cây lấy củ có chất bột', level: 4, parentId: 3 },
  { id: 7, code: '012', name: 'Trồng cây lâu năm', level: 3, parentId: 2 },
  { id: 8, code: '0121', name: 'Trồng cây ăn quả', level: 4, parentId: 7 },
  { id: 9, code: '0122', name: 'Trồng cây lấy quả chứa dầu', level: 4, parentId: 7 },
  { id: 10, code: '013', name: 'Nhân và chăm sóc cây giống nông nghiệp', level: 3, parentId: 2 },
  { id: 11, code: '014', name: 'Chăn nuôi', level: 3, parentId: 2 },
  { id: 12, code: '0141', name: 'Chăn nuôi trâu, bò', level: 4, parentId: 11 },
  { id: 13, code: '0142', name: 'Chăn nuôi ngựa, lừa, la', level: 4, parentId: 11 },
  { id: 14, code: '0143', name: 'Chăn nuôi lợn', level: 4, parentId: 11 },
  { id: 15, code: '0144', name: 'Chăn nuôi gia cầm', level: 4, parentId: 11 },
  { id: 16, code: '02', name: 'Lâm nghiệp và hoạt động dịch vụ có liên quan', level: 2, parentId: 1 },
  { id: 17, code: '021', name: 'Trồng rừng và chăm sóc rừng', level: 3, parentId: 16 },
  { id: 18, code: '022', name: 'Khai thác gỗ', level: 3, parentId: 16 },
  { id: 19, code: '023', name: 'Thu nhặt, thu hái sản phẩm từ rừng', level: 3, parentId: 16 },
  { id: 20, code: '03', name: 'Khai thác, nuôi trồng thuỷ sản', level: 2, parentId: 1 },
  { id: 21, code: '031', name: 'Khai thác thuỷ sản', level: 3, parentId: 20 },
  { id: 22, code: '032', name: 'Nuôi trồng thuỷ sản', level: 3, parentId: 20 },

  // B - KHAI KHOÁNG
  { id: 23, code: 'B', name: 'KHAI KHOÁNG', level: 1, parentId: null },
  { id: 24, code: '05', name: 'Khai thác than cứng và than non', level: 2, parentId: 23 },
  { id: 25, code: '051', name: 'Khai thác và thu gom than cứng', level: 3, parentId: 24 },
  { id: 26, code: '052', name: 'Khai thác và thu gom than non', level: 3, parentId: 24 },
  { id: 27, code: '06', name: 'Khai thác dầu thô và khí đốt tự nhiên', level: 2, parentId: 23 },
  { id: 28, code: '07', name: 'Khai thác quặng kim loại', level: 2, parentId: 23 },
  { id: 29, code: '071', name: 'Khai thác quặng sắt', level: 3, parentId: 28 },
  { id: 30, code: '072', name: 'Khai thác quặng kim loại không chứa sắt', level: 3, parentId: 28 },
  { id: 31, code: '08', name: 'Khai khoáng khác', level: 2, parentId: 23 },
  { id: 32, code: '081', name: 'Khai thác đá, cát, sỏi, đất sét', level: 3, parentId: 31 },
  { id: 33, code: '089', name: 'Khai khoáng chưa được phân vào đâu', level: 3, parentId: 31 },

  // C - CÔNG NGHIỆP CHẾ BIẾN, CHẾ TẠO
  { id: 34, code: 'C', name: 'CÔNG NGHIỆP CHẾ BIẾN, CHẾ TẠO', level: 1, parentId: null },
  { id: 35, code: '10', name: 'Sản xuất chế biến thực phẩm', level: 2, parentId: 34 },
  { id: 36, code: '101', name: 'Chế biến, bảo quản thịt và các sản phẩm từ thịt', level: 3, parentId: 35 },
  { id: 37, code: '102', name: 'Chế biến, bảo quản thuỷ sản và sản phẩm từ thuỷ sản', level: 3, parentId: 35 },
  { id: 38, code: '103', name: 'Chế biến và bảo quản rau quả', level: 3, parentId: 35 },
  { id: 39, code: '104', name: 'Sản xuất dầu, mỡ động, thực vật', level: 3, parentId: 35 },
  { id: 40, code: '105', name: 'Chế biến sữa và các sản phẩm từ sữa', level: 3, parentId: 35 },
  { id: 41, code: '11', name: 'Sản xuất đồ uống', level: 2, parentId: 34 },
  { id: 42, code: '111', name: 'Chưng, tinh cất và pha chế các loại rượu', level: 3, parentId: 41 },
  { id: 43, code: '112', name: 'Sản xuất bia và mạch nha ủ men bia', level: 3, parentId: 41 },
  { id: 44, code: '12', name: 'Sản xuất sản phẩm thuốc lá', level: 2, parentId: 34 },
  { id: 45, code: '13', name: 'Dệt', level: 2, parentId: 34 },
  { id: 46, code: '131', name: 'Sản xuất sợi', level: 3, parentId: 45 },
  { id: 47, code: '132', name: 'Dệt vải', level: 3, parentId: 45 },
  { id: 48, code: '14', name: 'Sản xuất trang phục', level: 2, parentId: 34 },
  { id: 49, code: '141', name: 'May trang phục (trừ trang phục từ da lông thú)', level: 3, parentId: 48 },

  // D - SẢN XUẤT VÀ PHÂN PHỐI ĐIỆN, KHÍ ĐỐT
  { id: 50, code: 'D', name: 'SẢN XUẤT VÀ PHÂN PHỐI ĐIỆN, KHÍ ĐỐT, NƯỚC NÓNG, HƠI NƯỚC VÀ ĐIỀU HOÀ KHÔNG KHÍ', level: 1, parentId: null },
  { id: 51, code: '35', name: 'Sản xuất và phân phối điện, khí đốt, hơi nước', level: 2, parentId: 50 },
  { id: 52, code: '351', name: 'Sản xuất, truyền tải và phân phối điện', level: 3, parentId: 51 },
  { id: 53, code: '352', name: 'Sản xuất ga; phân phối nhiên liệu khí', level: 3, parentId: 51 },

  // E - CUNG CẤP NƯỚC
  { id: 54, code: 'E', name: 'CUNG CẤP NƯỚC; HOẠT ĐỘNG QUẢN LÝ VÀ XỬ LÝ RÁC THẢI, NƯỚC THẢI', level: 1, parentId: null },
  { id: 55, code: '36', name: 'Khai thác, xử lý và cung cấp nước', level: 2, parentId: 54 },
  { id: 56, code: '37', name: 'Thoát nước và xử lý nước thải', level: 2, parentId: 54 },
  { id: 57, code: '38', name: 'Hoạt động thu gom, xử lý và tiêu huỷ rác thải', level: 2, parentId: 54 },

  // F - XÂY DỰNG
  { id: 58, code: 'F', name: 'XÂY DỰNG', level: 1, parentId: null },
  { id: 59, code: '41', name: 'Xây dựng nhà các loại', level: 2, parentId: 58 },
  { id: 60, code: '42', name: 'Xây dựng công trình kỹ thuật dân dụng', level: 2, parentId: 58 },
  { id: 61, code: '421', name: 'Xây dựng công trình đường sắt và đường bộ', level: 3, parentId: 60 },
  { id: 62, code: '422', name: 'Xây dựng công trình công ích', level: 3, parentId: 60 },
  { id: 63, code: '43', name: 'Hoạt động xây dựng chuyên dụng', level: 2, parentId: 58 },

  // G - BÁN BUÔN VÀ BÁN LẺ
  { id: 64, code: 'G', name: 'BÁN BUÔN VÀ BÁN LẺ; SỬA CHỮA Ô TÔ, MÔ TÔ, XE MÁY VÀ XE CÓ ĐỘNG CƠ KHÁC', level: 1, parentId: null },
  { id: 65, code: '45', name: 'Bán, sửa chữa ô tô, mô tô, xe máy và xe có động cơ khác', level: 2, parentId: 64 },
  { id: 66, code: '46', name: 'Bán buôn (trừ ô tô, mô tô, xe máy và xe có động cơ khác)', level: 2, parentId: 64 },
  { id: 67, code: '47', name: 'Bán lẻ (trừ ô tô, mô tô, xe máy và xe có động cơ khác)', level: 2, parentId: 64 },

  // H - VẬN TẢI KHO BÃI
  { id: 68, code: 'H', name: 'VẬN TẢI KHO BÃI', level: 1, parentId: null },
  { id: 69, code: '49', name: 'Vận tải đường sắt, đường bộ và vận tải đường ống', level: 2, parentId: 68 },
  { id: 70, code: '50', name: 'Vận tải đường thuỷ', level: 2, parentId: 68 },
  { id: 71, code: '51', name: 'Vận tải hàng không', level: 2, parentId: 68 },
  { id: 72, code: '52', name: 'Kho bãi và các hoạt động hỗ trợ cho vận tải', level: 2, parentId: 68 },

  // I - DỊCH VỤ LƯU TRÚ VÀ ĂN UỐNG
  { id: 73, code: 'I', name: 'DỊCH VỤ LƯU TRÚ VÀ ĂN UỐNG', level: 1, parentId: null },
  { id: 74, code: '55', name: 'Dịch vụ lưu trú', level: 2, parentId: 73 },
  { id: 75, code: '56', name: 'Dịch vụ ăn uống', level: 2, parentId: 73 },

  // J - THÔNG TIN VÀ TRUYỀN THÔNG
  { id: 76, code: 'J', name: 'THÔNG TIN VÀ TRUYỀN THÔNG', level: 1, parentId: null },
  { id: 77, code: '58', name: 'Hoạt động xuất bản', level: 2, parentId: 76 },
  { id: 78, code: '59', name: 'Hoạt động điện ảnh, sản xuất chương trình truyền hình', level: 2, parentId: 76 },
  { id: 79, code: '61', name: 'Viễn thông', level: 2, parentId: 76 },
  { id: 80, code: '62', name: 'Lập trình máy vi tính, dịch vụ tư vấn và các hoạt động khác liên quan đến máy vi tính', level: 2, parentId: 76 },
]
