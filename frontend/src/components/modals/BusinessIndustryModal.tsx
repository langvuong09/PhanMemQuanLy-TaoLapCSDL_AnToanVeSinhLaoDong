'use client'

import type { BusinessIndustry } from '@/src/mocks/business-industries'
import InputLegend from '@/src/components/InputLegend'
import SelectLegend from '@/src/components/SelectLegend'

type BusinessIndustryModalProps = {
  isOpen: boolean
  editingItem: BusinessIndustry | null
  allIndustries: BusinessIndustry[]
  form: { code: string; name: string; parentId: string }
  errors: { code: string; name: string }
  onClose: () => void
  onSave: () => void
  onChange: (field: string, value: string) => void
}

export default function BusinessIndustryModal({
  isOpen,
  editingItem,
  allIndustries,
  form,
  errors,
  onClose,
  onSave,
  onChange,
}: BusinessIndustryModalProps) {
  if (!isOpen) return null

  const parentOptions = allIndustries.filter((i) =>
    editingItem ? i.id !== editingItem.id : true
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="bg-primary px-6 py-4">
          <h2 className="text-white text-base font-semibold">
            {editingItem ? 'Cập nhật ngành nghề kinh doanh' : 'Thêm mới ngành nghề kinh doanh'}
          </h2>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 gap-5">
            <InputLegend
              label="Mã ngành"
              require={true}
              input={{
                type: 'text',
                placeholder: 'Nhập mã ngành',
                value: form.code,
                onChange: (e) => onChange('code', (e.target as HTMLInputElement).value),
              }}
              errorMess={errors.code}
            />

            <InputLegend
              label="Tên ngành nghề"
              require={true}
              input={{
                type: 'text',
                placeholder: 'Nhập tên ngành nghề',
                value: form.name,
                onChange: (e) => onChange('name', (e.target as HTMLInputElement).value),
              }}
              errorMess={errors.name}
            />

            <SelectLegend
              label="Nhóm ngành cha"
              select={{
                value: form.parentId,
                onChange: (e) => onChange('parentId', (e.target as HTMLSelectElement).value),
              }}
            >
              <option value="">-- Không có (Cấp 1) --</option>
              {parentOptions.map((opt) => (
                <option key={opt.id} value={String(opt.id)}>
                  {opt.code} - {opt.name}
                </option>
              ))}
            </SelectLegend>
          </div>
        </div>

        <div className="px-6 pb-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <i className="fa-solid fa-floppy-disk text-xs" />
            Lưu
          </button>
        </div>
      </div>
    </div>
  )
}
