import { useState } from "react"
import { Outlet } from "react-router-dom"

import AdminSidebar from "./components/AdminSidebar"
import AdminTopbar from "./components/AdminTopbar"

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-[#F6FAF7] text-gray-800">
            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-gray-950/30 lg:hidden"
                />
            )}

            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-72">
                <AdminTopbar
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="min-h-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout