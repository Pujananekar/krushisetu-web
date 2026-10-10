import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "./AdminLayout";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";

// Authentication pages
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgetPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));

// Dashboard and applications
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Applications = lazy(() => import("./pages/Applications"));
const ApplicationDetails = lazy(() => import("./pages/ApplicationDetails"));
const ApplicationEditor = lazy(() => import("./pages/ApplicationEditor"));

// Other administration pages
const Controls = lazy(() => import("./pages/Controls"));

// Content management
const Departments = lazy(() => import("./pages/content/Departments"));
const DepartmentEditor = lazy(() => import("./pages/content/DepartmentEditor"));
const DepartmentDetails = lazy(() => import("./pages/content/DepartmentDetails"));

const Schemes = lazy(() => import("./pages/content/Schemes"));
const SchemeEditor = lazy(() => import("./pages/content/SchemeEditor"));
const SchemeDetails = lazy(() => import("./pages/content/SchemeDetails"));

const TrainingEvents = lazy(() => import("./pages/content/TrainingEvents"));
const TrainingEventEditor = lazy(() => import("./pages/content/TrainingEventEditor"));
const TrainingEventDetails = lazy(() => import("./pages/content/TrainingEventDetails"));

const Resources = lazy(() => import("./pages/content/Resources"));
const ResourceEditor = lazy(() => import("./pages/content/ResourceEditor"));
const ResourceDetails = lazy(() => import("./pages/content/ResourceDetails"));

const Projects = lazy(() => import("./pages/content/Projects"));
const ProjectEditor = lazy(() => import("./pages/content/ProjectEditor"));
const ProjectDetails = lazy(() => import("./pages/content/ProjectDetails"));

const Impact = lazy(() => import("./pages/content/Impact"));
const ImpactEditor = lazy(() => import("./pages/content/ImpactEditor"));
const ImpactDetails = lazy(() => import("./pages/content/ImpactDetails"));

const SuccessStories = lazy(() => import("./pages/content/SuccessStories"));
const SuccessStoryEditor = lazy(() => import("./pages/content/SuccessStoryEditor"));
const SuccessStoryDetails = lazy(() => import("./pages/content/SuccessStoryDetails"));

const News = lazy(() => import("./pages/content/News"));
const NewsEditor = lazy(() => import("./pages/content/NewsEditor"));
const NewsDetails = lazy(() => import("./pages/content/NewsDetails"));

const Gallery = lazy(() => import("./pages/content/Gallery"));
const GalleryEditor = lazy(() => import("./pages/content/GalleryEditor"));
const GalleryDetails = lazy(() => import("./pages/content/GalleryDetails"));

// CRM
const Enquiries = lazy(() => import("./pages/crm/Enquiries"));
const EnquiryDetails = lazy(() => import("./pages/crm/EnquiryDetails.jsx"));

// Administration
const AdminUsers = lazy(() => import("./pages/administration/AdminUsers"));
const AdminUserDetails = lazy(() => import("./pages/administration/AdminUserDetails.jsx"));
const AdminUserEditor = lazy(() => import("./pages/administration/AdminUserEditor"));
const Roles = lazy(() => import("./pages/administration/Roles"));
const RoleDetails = lazy(() => import("./pages/administration/RoleDetails.jsx"));
const RoleEditor = lazy(() => import("./pages/administration/RoleEditor"));
const Settings = lazy(() => import("./pages/administration/Settings"));
const AuditLogs = lazy(() => import("./pages/administration/AuditLogs"));

const AdminPageLoader = () => (
    <div className="flex min-h-[50vh] items-center justify-center">
        <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-green-700/20 border-t-green-700"
            role="status"
            aria-label="Loading admin page"
        />
    </div>
);

const AdminRoutes = () => {
    return (
        <Suspense fallback={<AdminPageLoader />}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route element={<AdminProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />

                        <Route path="applications" element={<Applications />} />
                        <Route
                            path="applications/:id/edit"
                            element={<ApplicationEditor />}
                        />
                        <Route
                            path="applications/:id"
                            element={<ApplicationDetails />}
                        />

                        <Route path="controls" element={<Controls />} />

                        <Route path="content/departments" element={<Departments />} />
                        <Route
                            path="content/departments/:id/edit"
                            element={<DepartmentEditor />}
                        />
                        <Route
                            path="content/departments/:id"
                            element={<DepartmentDetails />}
                        />

                        <Route path="content/schemes" element={<Schemes />} />
                        <Route
                            path="content/schemes/new"
                            element={<SchemeEditor />}
                        />
                        <Route
                            path="content/schemes/:id/edit"
                            element={<SchemeEditor />}
                        />
                        <Route
                            path="content/schemes/:id"
                            element={<SchemeDetails />}
                        />

                        <Route path="content/training" element={<TrainingEvents />} />
                        <Route
                            path="content/training/new"
                            element={<TrainingEventEditor />}
                        />
                        <Route
                            path="content/training/:id/edit"
                            element={<TrainingEventEditor />}
                        />
                        <Route
                            path="content/training/:id"
                            element={<TrainingEventDetails />}
                        />

                        <Route path="content/resources" element={<Resources />} />
                        <Route
                            path="content/resources/new"
                            element={<ResourceEditor />}
                        />
                        <Route
                            path="content/resources/:id/edit"
                            element={<ResourceEditor />}
                        />
                        <Route
                            path="content/resources/:id"
                            element={<ResourceDetails />}
                        />

                        <Route path="content/projects" element={<Projects />} />
                        <Route
                            path="content/projects/new"
                            element={<ProjectEditor />}
                        />
                        <Route
                            path="content/projects/:id/edit"
                            element={<ProjectEditor />}
                        />
                        <Route
                            path="content/projects/:id"
                            element={<ProjectDetails />}
                        />

                        <Route path="content/impact" element={<Impact />} />
                        <Route
                            path="content/impact/new"
                            element={<ImpactEditor />}
                        />
                        <Route
                            path="content/impact/:id/edit"
                            element={<ImpactEditor />}
                        />
                        <Route
                            path="content/impact/:id"
                            element={<ImpactDetails />}
                        />

                        <Route
                            path="content/success-stories"
                            element={<SuccessStories />}
                        />
                        <Route
                            path="content/success-stories/new"
                            element={<SuccessStoryEditor />}
                        />
                        <Route
                            path="content/success-stories/:id/edit"
                            element={<SuccessStoryEditor />}
                        />
                        <Route
                            path="content/success-stories/:id"
                            element={<SuccessStoryDetails />}
                        />

                        <Route path="content/news" element={<News />} />
                        <Route
                            path="content/news/new"
                            element={<NewsEditor />}
                        />
                        <Route
                            path="content/news/:id/edit"
                            element={<NewsEditor />}
                        />
                        <Route
                            path="content/news/:id"
                            element={<NewsDetails />}
                        />

                        <Route path="content/gallery" element={<Gallery />} />
                        <Route
                            path="content/gallery/new"
                            element={<GalleryEditor />}
                        />
                        <Route
                            path="content/gallery/:id/edit"
                            element={<GalleryEditor />}
                        />
                        <Route
                            path="content/gallery/:id"
                            element={<GalleryDetails />}
                        />

                        <Route path="crm/enquiries" element={<Enquiries />} />
                        <Route
                            path="crm/enquiries/:id"
                            element={<EnquiryDetails />}
                        />

                        <Route
                            path="administration/users"
                            element={<AdminUsers />}
                        />
                        <Route
                            path="administration/users/new"
                            element={<AdminUserEditor />}
                        />
                        <Route
                            path="administration/users/:id/edit"
                            element={<AdminUserEditor />}
                        />
                        <Route
                            path="administration/users/:id"
                            element={<AdminUserDetails />}
                        />

                        <Route
                            path="administration/roles"
                            element={<Roles />}
                        />
                        <Route
                            path="administration/roles/:role/edit"
                            element={<RoleEditor />}
                        />
                        <Route
                            path="administration/roles/:role"
                            element={<RoleDetails />}
                        />

                        <Route
                            path="administration/audit-logs"
                            element={<AuditLogs />}
                        />
                        <Route
                            path="administration/settings"
                            element={<Settings />}
                        />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AdminRoutes;