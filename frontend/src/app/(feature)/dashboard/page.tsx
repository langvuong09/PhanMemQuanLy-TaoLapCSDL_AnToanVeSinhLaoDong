import TopHero from "@/src/components/TopHero";

const DashboardPage = () => {
    return (
        <main>
            <TopHero lable="Dashboard" />
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-3xl font-bold text-blue-600">0</div>
                            <div className="ml-4">
                                <p className="text-gray-600 text-sm">Tổng người dùng</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-3xl font-bold text-green-600">0</div>
                            <div className="ml-4">
                                <p className="text-gray-600 text-sm">Tổng doanh nghiệp</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-3xl font-bold text-yellow-600">0</div>
                            <div className="ml-4">
                                <p className="text-gray-600 text-sm">Tổng vai trò</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-3xl font-bold text-red-600">0</div>
                            <div className="ml-4">
                                <p className="text-gray-600 text-sm">Tổng cảnh báo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DashboardPage;
