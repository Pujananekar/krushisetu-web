import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    Activity,
    BarChart3,
    BookOpen,
    Building2,
    ChevronDown,
    ClipboardList,
    FileCheck2,
    Mail,
    FolderKanban,
    GalleryHorizontal,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    Newspaper,
    PanelsTopLeft,
    Settings,
    ShieldCheck,
    Sprout,
    UserCog,
    UsersRound,
    X,
} from "lucide-react";

import { adminLogout } from "../api/adminAuthApi.js";
import useAdminPermissions from "../hooks/useAdminPermissions.js";


const AdminSidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        hasPermission,
        isLoading,
    } = useAdminPermissions();

    const [openSections, setOpenSections] = useState({
        content: true,
        applications: true,
        administration: true,
    });


    const toggleSection = (section) => {
        setOpenSections((current) => ({
            ...current,
            [section]: !current[section],
        }));
    };


    const isActive = (path) => {
        if (path === "/admin/dashboard") {
            return location.pathname === path;
        }

        return (
            location.pathname === path ||
            location.pathname.startsWith(`${path}/`)
        );
    };


    const closeMobileSidebar = () => {
        if (onClose) {
            onClose();
        }
    };


    const handleLogout = async () => {
        try {
            await adminLogout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            closeMobileSidebar();

            navigate("/admin/", {
                replace: true,
            });
        }
    };


    /*
     * Keep the sidebar structure intact while
     * permissions are being loaded.
     */
    if (isLoading) {
        return (
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >
                {/* Brand */}
                <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 px-5">
                    <Link
                        to="/admin/dashboard"
                        className="flex min-w-0 items-center gap-3"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/10">
                            <Sprout className="h-6 w-6" />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-base font-bold text-gray-900">
                                Krushisetu
                            </p>

                            <p className="truncate text-xs font-medium text-green-700">
                                Admin Panel
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-green-700" />
                </div>
            </aside>
        );
    }


    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${isOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                }`}
        >

            {/* Brand */}
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 px-5">

                <Link
                    to="/admin/dashboard"
                    onClick={closeMobileSidebar}
                    className="flex min-w-0 items-center gap-3"
                >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/10">
                        <Sprout className="h-6 w-6" />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-base font-bold text-gray-900">
                            Krushisetu
                        </p>

                        <p className="truncate text-xs font-medium text-green-700">
                            Admin Panel
                        </p>
                    </div>
                </Link>


                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close sidebar"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 lg:hidden"
                >
                    <X className="h-5 w-5" />
                </button>

            </div>


            {/* Navigation */}
            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 scrollbar-thin [scrollbar-color:#d1d5db_transparent]">

                <nav className="space-y-5">


                    {/* =====================================================
                        MAIN
                    ====================================================== */}

                    {hasPermission("dashboard.view") && (
                        <SidebarGroup title="Main">

                            <SidebarItem
                                to="/admin/dashboard"
                                label="Dashboard"
                                icon={LayoutDashboard}
                                active={isActive(
                                    "/admin/dashboard"
                                )}
                                onClick={closeMobileSidebar}
                            />

                        </SidebarGroup>
                    )}


                    {/* =====================================================
                        CONTENT
                    ====================================================== */}

                    <SidebarSection
                        title="Content"
                        icon={PanelsTopLeft}
                        open={openSections.content}
                        onToggle={() =>
                            toggleSection("content")
                        }
                    >

                        {/* Departments */}

                        {hasPermission("departments.view") && (
                            <SidebarItem
                                to="/admin/content/departments"
                                label="Departments"
                                icon={Building2}
                                active={isActive(
                                    "/admin/content/departments"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}


                        {/* Government Schemes */}

                        {hasPermission("schemes.view") && (
                            <SidebarItem
                                to="/admin/content/schemes"
                                label="Goverment Schemes"
                                icon={FileCheck2}
                                active={isActive(
                                    "/admin/content/schemes"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}


                        {/* Training & Events */}

                        {hasPermission("training.view") && (
                            <SidebarItem
                                to="/admin/content/training"
                                label="Training & Events"
                                icon={GraduationCap}
                                active={isActive(
                                    "/admin/content/training"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}


                        {/* Resources */}

                        {hasPermission("resources.view") && (
                            <SidebarItem
                                to="/admin/content/resources"
                                label="Resources"
                                icon={BookOpen}
                                active={isActive(
                                    "/admin/content/resources"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}


                        {/* Projects */}

                        {hasPermission("projects.view") && (
                            <SidebarItem
                                to="/admin/content/projects"
                                label="Projects"
                                icon={FolderKanban}
                                active={isActive(
                                    "/admin/content/projects"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}


                        {/* Impact */}

                        {hasPermission("impact.view") && (
                            <SidebarItem
                                to="/admin/content/impact"
                                label="Impact"
                                icon={BarChart3}
                                active={isActive(
                                    "/admin/content/impact"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}


                        {/* Success Stories */}

                        {hasPermission("success_stories.view") && (
                            <SidebarItem
                                to="/admin/content/success-stories"
                                label="Success Stories"
                                icon={UsersRound}
                                active={isActive(
                                    "/admin/content/success-stories"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}


                        {/* News & Announcements */}

                        {hasPermission("news.view") && (
                            <SidebarItem
                                to="/admin/content/news"
                                label="News & Announcements"
                                icon={Newspaper}
                                active={isActive(
                                    "/admin/content/news"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}


                        {/* Gallery / Media */}

                        {hasPermission("gallery.view") && (
                            <SidebarItem
                                to="/admin/content/gallery"
                                label="Gallery / Media"
                                icon={GalleryHorizontal}
                                active={isActive(
                                    "/admin/content/gallery"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}

                    </SidebarSection>


                    {/* =====================================================
                        APPLICATIONS
                    ====================================================== */}

                    <SidebarSection
                        title="Applications"
                        icon={ClipboardList}
                        open={openSections.applications}
                        onToggle={() =>
                            toggleSection("applications")
                        }
                    >
                        {hasPermission("applications.view") && (
                            <SidebarItem
                                to="/admin/applications"
                                label="All Applications"
                                icon={ClipboardList}
                                active={isActive(
                                    "/admin/applications"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}

                        {hasPermission("applications.view") && (
                            <SidebarItem
                                to="/admin/crm/enquiries"
                                label="Enquiries"
                                icon={Mail}
                                active={isActive(
                                    "/admin/crm/enquiries"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}
                    </SidebarSection>


                    {/* =====================================================
                        ADMINISTRATION
                    ====================================================== */}

                    <SidebarSection
                        title="Administration"
                        icon={ShieldCheck}
                        open={openSections.administration}
                        onToggle={() =>
                            toggleSection("administration")
                        }
                    >

                        {/* Admin Users */}

                        {hasPermission("users.view") && (
                            <SidebarItem
                                to="/admin/administration/users"
                                label="Admin Users"
                                icon={UserCog}
                                active={isActive(
                                    "/admin/administration/users"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}


                        {/* Roles & Permissions */}

                        {hasPermission("permissions.view") && (
                            <SidebarItem
                                to="/admin/administration/roles"
                                label="Roles & Permissions"
                                icon={ShieldCheck}
                                active={isActive(
                                    "/admin/administration/roles"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}


                        {/* Settings */}

                        {hasPermission("settings.view") && (
                            <SidebarItem
                                to="/admin/administration/settings"
                                label="Settings"
                                icon={Settings}
                                active={isActive(
                                    "/admin/administration/settings"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}


                        {/* Audit Logs */}

                        {hasPermission("audit_logs.view") && (
                            <SidebarItem
                                to="/admin/administration/audit-logs"
                                label="Audit Logs"
                                icon={Activity}
                                active={isActive(
                                    "/admin/administration/audit-logs"
                                )}
                                onClick={closeMobileSidebar}
                            />
                        )}

                    </SidebarSection>

                </nav>

            </div>


            {/* Footer */}
            <div className="shrink-0 border-t border-gray-200 bg-white p-3">

                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                        <LogOut className="h-4 w-4" />
                    </span>

                    <span>
                        Logout
                    </span>
                </button>

            </div>

        </aside>
    );
};


/* =========================================================
   SIDEBAR GROUP
========================================================= */

const SidebarGroup = ({
    title,
    children,
}) => {
    return (
        <div>

            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                {title}
            </p>

            <div className="space-y-1">
                {children}
            </div>

        </div>
    );
};


/* =========================================================
   SIDEBAR SECTION
========================================================= */

const SidebarSection = ({
    title,
    icon: Icon,
    open,
    onToggle,
    children,
}) => {
    return (
        <div>

            <button
                type="button"
                onClick={onToggle}
                className="mb-2 flex w-full items-center justify-between rounded-xl px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
            >

                <span className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5" />
                    {title}
                </span>

                <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${open
                            ? "rotate-0"
                            : "-rotate-90"
                        }`}
                />

            </button>


            <div
                className={`grid transition-all duration-200 ${open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
            >

                <div className="min-h-0 overflow-hidden">

                    <div className="space-y-1">
                        {children}
                    </div>

                </div>

            </div>

        </div>
    );
};


/* =========================================================
   SIDEBAR ITEM
========================================================= */

const SidebarItem = ({
    to,
    label,
    icon: Icon,
    active,
    onClick,
}) => {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active
                    ? "bg-green-700 text-white shadow-lg shadow-green-900/10"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-800"
                }`}
        >

            <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${active
                        ? "bg-white/15 text-white"
                        : "bg-gray-50 text-gray-500 group-hover:bg-green-100 group-hover:text-green-700"
                    }`}
            >
                <Icon className="h-4 w-4" />
            </span>

            <span className="truncate">
                {label}
            </span>

        </Link>
    );
};


export default AdminSidebar;