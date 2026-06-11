'use client'

import { useMemo, useState } from 'react'
import TopHero from '@/src/components/TopHero'
import BusinessIndustryModal from '@/src/components/modals/BusinessIndustryModal'
import { BusinessIndustry, IndustryLevel, businessIndustriesMock } from '@/src/mocks/business-industries'

const GRID_COLS = 'grid-cols-[40px_40px_100px_1fr_120px]'

function getLevelPrefix(level: IndustryLevel) {
  const map: Record<IndustryLevel, string> = {
    1: '',
    2: '– ',
    3: '— ',
    4: '—— ',
  }
  return map[level]
}

function getLevelLabel(level: IndustryLevel) {
  return `Cấp ${level}`
}

export default function BusinessIndustriesPage() {
  const [data, setData] = useState<BusinessIndustry[]>(businessIndustriesMock)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<BusinessIndustry | null>(null)
  const [form, setForm] = useState({ code: '', name: '', parentId: '' })
  const [errors, setErrors] = useState({ code: '', name: '' })
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // Filter states
  const [filterCode, setFilterCode] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterLevel, setFilterLevel] = useState('')

  // Pagination
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const openNew = () => {
    setEditingItem(null)
    setForm({ code: '', name: '', parentId: '' })
    setErrors({ code: '', name: '' })
    setIsModalOpen(true)
  }

  const openEdit = (item: BusinessIndustry) => {
    setEditingItem(item)
    setForm({
      code: item.code,
      name: item.name,
      parentId: item.parentId !== null ? String(item.parentId) : '',
    })
    setErrors({ code: '', name: '' })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const validate = () => {
    const nextErrors = { code: '', name: '' }
    if (!form.code.trim()) nextErrors.code = 'Mã ngành là bắt buộc'
    if (!form.name.trim()) nextErrors.name = 'Tên ngành là bắt buộc'
    setErrors(nextErrors)
    return !nextErrors.code && !nextErrors.name
  }

  const handleSave = () => {
    if (!validate()) return

    const parentId = form.parentId ? Number(form.parentId) : null
    let level: IndustryLevel = 1
    if (parentId !== null) {
      const parent = data.find((d) => d.id === parentId)
      if (parent) {
        level = Math.min(4, parent.level + 1) as IndustryLevel
      }
    }

    if (editingItem) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? { ...item, code: form.code, name: form.name, parentId, level }
            : item
        )
      )
    } else {
      const nextItem: BusinessIndustry = {
        id: Math.max(0, ...data.map((item) => item.id)) + 1,
        code: form.code,
        name: form.name,
        level,
        parentId,
      }
      setData((prev) => [...prev, nextItem])
    }

    closeModal()
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? paginatedRows.map((r) => r.id) : [])
  }

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const filteredRows = useMemo(() => {
    return data.filter((item) => {
      const matchCode = filterCode ? item.code.toLowerCase().includes(filterCode.toLowerCase()) : true
      const matchName = filterName ? item.name.toLowerCase().includes(filterName.toLowerCase()) : true
      const matchLevel = filterLevel ? item.level === Number(filterLevel) : true
      return matchCode && matchName && matchLevel
    })
  }, [data, filterCode, filterName, filterLevel])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const allSelected = paginatedRows.length > 0 && paginatedRows.every((r) => selectedIds.includes(r.id))

  return (
    <main className="h-screen flex flex-col py-2">
      {/* TopHero */}
      <TopHero
        title="Danh sách ngành nghề kinh doanh"
        actions={
          <div className="flex gap-2">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors"
            >
              <i className="fa-solid fa-upload text-xs text-primary" />
              <span>Thêm từ file</span>
            </button>
            <button
              type="button"
              onClick={openNew}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded hover:opacity-90 transition-opacity"
            >
              <i className="fa-solid fa-plus text-xs" />
              <span>Thêm mới</span>
            </button>
          </div>
        }
        className="shrink-0"
      />

      {/* Table Container */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden mt-2">

        {/* Table Search / Filter Header */}
        <div className="shrink-0 border-b border-gray-200">
          {/* Column titles */}
          <div className={`grid ${GRID_COLS} text-xs text-gray-500 font-medium`}>
            <div />
            <div />
            <div className="px-3 py-2">Mã ngành</div>
            <div className="px-3 py-2">Tên ngành nghề</div>
            <div className="px-3 py-2">Cấp</div>
          </div>

          {/* Filter inputs */}
          <div className={`grid ${GRID_COLS} pb-2`}>
            <div />
            <div />
            <div className="px-3">
              <input
                type="text"
                placeholder=""
                value={filterCode}
                onChange={(e) => { setFilterCode(e.target.value); setCurrentPage(1) }}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="px-3">
              <input
                type="text"
                placeholder=""
                value={filterName}
                onChange={(e) => { setFilterName(e.target.value); setCurrentPage(1) }}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="px-3">
              <select
                value={filterLevel}
                onChange={(e) => { setFilterLevel(e.target.value); setCurrentPage(1) }}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm outline-none focus:border-primary transition-colors bg-white"
              >
                <option value="">Tất cả</option>
                <option value="1">Cấp 1</option>
                <option value="2">Cấp 2</option>
                <option value="3">Cấp 3</option>
                <option value="4">Cấp 4</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Body - Scrollable */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {paginatedRows.map((item) => (
            <div
              key={item.id}
              className={`grid ${GRID_COLS} border-b border-gray-100 hover:bg-blue-50/40 transition-colors text-sm text-gray-700`}
            >
              {/* Checkbox */}
              <div className="flex items-center justify-center py-2.5">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 accent-primary cursor-pointer"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleSelectOne(item.id)}
                />
              </div>

              {/* Edit icon */}
              <div className="flex items-center justify-center py-2.5">
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="text-gray-400 hover:text-primary transition-colors"
                  title="Chỉnh sửa"
                >
                  <i className="fa-solid fa-pen text-xs" />
                </button>
              </div>

              {/* Code */}
              <div className="flex items-center px-3 py-2.5">
                {item.code}
              </div>

              {/* Name */}
              <div className="flex items-center px-3 py-2.5">
                <span>
                  {getLevelPrefix(item.level)}
                  {item.level === 1 ? (
                    <span className="font-semibold uppercase">{item.name}</span>
                  ) : (
                    item.name
                  )}
                </span>
              </div>

              {/* Level */}
              <div className="flex items-center px-3 py-2.5">
                {getLevelLabel(item.level)}
              </div>
            </div>
          ))}

          {/* Empty state */}
          {paginatedRows.length === 0 && (
            <div className="flex items-center justify-center py-12 text-sm text-gray-400">
              Không có dữ liệu
            </div>
          )}
        </div>

        {/* Pagination - Fixed at bottom */}
        <div className="shrink-0 flex items-center justify-end gap-4 px-5 py-3 border-t border-gray-200 text-sm text-gray-500">
          {/* Page size selector */}
          <div className="flex items-center gap-1.5">
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1) }}
              className="border border-gray-300 rounded px-2 py-1 text-sm outline-none cursor-pointer bg-white hover:border-gray-400 transition-colors"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          {/* Page info */}
          <span className="text-gray-500 tabular-nums">
            {filteredRows.length === 0
              ? '0'
              : `${(currentPage - 1) * pageSize + 1} - ${Math.min(currentPage * pageSize, filteredRows.length)}`
            } of {filteredRows.length}
          </span>

          {/* Navigation buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fa-solid fa-chevron-left text-xs" />
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fa-solid fa-chevron-right text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <BusinessIndustryModal
        isOpen={isModalOpen}
        editingItem={editingItem}
        allIndustries={data}
        form={form}
        errors={errors}
        onClose={closeModal}
        onSave={handleSave}
        onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
      />
    </main>
  )
}
