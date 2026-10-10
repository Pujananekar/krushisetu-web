import { lazy, Suspense } from "react";
import ReactLenis from "lenis/react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import EmergencyBanner from "./components/common/EmergencyBanner";

// Public pages: lazy-loaded
const HomePage = lazy(() => import("./pages/home/HomePage"));

const Department = lazy(() => import("./pages/departments/Department"));
const DepartmentDetails = lazy(() => import("./pages/departments/DepartmentDetails"));

const About = lazy(() => import("./pages/about/About"));
const Founder = lazy(() => import("./pages/about/Founder"));

const Resources = lazy(() => import("./pages/resources/Resources"));
const ResourceDetails = lazy(() => import("./pages/resources/ResourceDetails"));

const Schemes = lazy(() => import("./pages/schemes/Schemes"));
const SchemeDetails = lazy(() => import("./pages/schemes/SchemeDetails"));

const Training = lazy(() => import("./pages/training/Training"));
const TrainingDetails = lazy(() => import("./pages/training/TrainingDetails"));

const Projects = lazy(() => import("./pages/projects/Projects"));
const ProjectDetails = lazy(() => import("./pages/projects/ProjectDetails"));

const Impact = lazy(() => import("./pages/impact/Impact"));

const SuccessStories = lazy(() => import("./pages/successStories/SuccessStories"));
const SuccessStoryDetails = lazy(() =>
    import("./pages/successStories/SuccessStoriesDetails")
);

const Partnerships = lazy(() => import("./pages/partnerships/Partnerships"));

const Gallery = lazy(() => import("./pages/gallery/Gallery"));
const GalleryNewsDetails = lazy(() =>
    import("./components/gallery/GalleryNewsDetails")
);

const Contact = lazy(() => import("./pages/contact/Contact"));

const Apply = lazy(() => import("./pages/apply/Apply"));
const ApplyFormPage = lazy(() => import("./pages/apply/ApplyFormPage"));

const NotFound = lazy(() => import("./pages/NotFound"));

// Legal pages: lazy-loaded if enabled later
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Disclaimer = lazy(() => import("./pages/legal/Disclaimer"));
const Accessibility = lazy(() => import("./pages/legal/Accissibility"));

// Partner pages
const PartnerDetails = lazy(() => import("./pages/home/PartnerDetails"));
const Partners = lazy(() => import("./pages/partners/Partners"));

// Admin routes: separate from the public layout
const AdminRoutes = lazy(() => import("./admin/AdminRoutes"));

const PageLoader = () => (
    <div className="flex min-h-[50vh] items-center justify-center">
        <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-green-700/20 border-t-green-700"
            role="status"
            aria-label="Loading page"
        />
    </div>
);

const PublicLayout = () => {
    return (
        <ReactLenis root options={{ duration: 1.2 }}>
            <div>
                <ScrollToTop />

                <Navbar />

                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />

                        <Route path="/partners" element={<Partners />} />
                        <Route path="/partners/:slug" element={<PartnerDetails />} />

                        <Route path="/about" element={<About />} />
                        <Route path="/about/founder" element={<Founder />} />

                        <Route path="/departments" element={<Department />} />
                        <Route path="/departments/:slug" element={<DepartmentDetails />} />

                        <Route path="/resources" element={<Resources />} />
                        <Route path="/resources/:slug" element={<ResourceDetails />} />

                        <Route path="/schemes" element={<Schemes />} />
                        <Route path="/schemes/:slug" element={<SchemeDetails />} />

                        <Route path="/training-events" element={<Training />} />
                        <Route path="/training-events/:slug" element={<TrainingDetails />} />

                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:slug" element={<ProjectDetails />} />

                        <Route path="/impact" element={<Impact />} />

                        <Route path="/success-stories" element={<SuccessStories />} />
                        <Route
                            path="/success-stories/:slug"
                            element={<SuccessStoryDetails />}
                        />

                        <Route path="/partnerships" element={<Partnerships />} />

                        <Route path="/gallery" element={<Gallery />} />
                        <Route
                            path="/gallery/news/:slug"
                            element={<GalleryNewsDetails />}
                        />

                        <Route path="/apply" element={<Apply />} />
                        <Route path="/apply/:type" element={<ApplyFormPage />} />

                        <Route path="/contact" element={<Contact />} />

                        {/* Uncomment these routes if needed:
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/disclaimer" element={<Disclaimer />} />
                        <Route path="/accessibility" element={<Accessibility />} />
                        */}

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>

                <Footer />
                <EmergencyBanner />
            </div>
        </ReactLenis>
    );
};

const App = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/*" element={<PublicLayout />} />
            </Routes>
        </Suspense>
    );
};

export default App;