import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentAdmin } from "../api/adminAuthApi.js";



const AdminProtectedRoute = () => {
    const location = useLocation();

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin-me"],
        queryFn: getCurrentAdmin,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });


    /*
     * Wait until the existing /admin/me
     * endpoint finishes checking the session.
     */
    if (isLoading) {
        return (
            <div className="flex min-h-dvh items-center justify-center bg-[#F6FAF7]">

                <div className="flex flex-col items-center gap-4">

                    <div className="h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-green-700" />

                    <p className="text-sm font-medium text-gray-500">
                        Verifying admin session...
                    </p>

                </div>

            </div>
        );
    }


    /*
     * No valid session.
     */
    if (
        isError &&
        (
            error?.response?.status === 401 ||
            error?.response?.status === 403
        )
    ) {
        return (
            <Navigate
                to="/admin/"
                replace
                state={{
                    from:
                        location.pathname +
                        location.search,
                }}
            />
        );
    }


    /*
     * Unexpected backend error.
     *
     * Don't silently redirect because this
     * could hide a real server/database problem.
     */
    if (isError) {
        return (
            <div className="flex min-h-dvh items-center justify-center bg-[#F6FAF7] px-5">

                <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">

                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        !
                    </div>

                    <h1 className="text-lg font-bold text-gray-900">
                        Unable to verify session
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        We couldn't verify your admin session.
                        Please try again.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            window.location.reload()
                        }
                        className="mt-6 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }


    /*
     * Session is valid.
     *
     * Render the requested protected admin route.
     */
    if (data?.success && data?.admin) {
        return <Outlet />;
    }


    /*
     * Safety fallback.
     */
    return (
        <Navigate
            to="/admin/"
            replace
            state={{
                from:
                    location.pathname +
                    location.search,
            }}
        />
    );
};


export default AdminProtectedRoute;