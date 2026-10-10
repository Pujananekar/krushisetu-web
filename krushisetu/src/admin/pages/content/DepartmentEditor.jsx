import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
    ArrowLeft,
    Building2,
    CheckCircle2,
    Clock3,
    FileDown,
    FileText,
    HelpCircle,
    ListChecks,
    Pencil,
    Plus,
    Save,
    Trash2,
    UsersRound,
    Wrench,
    AlertCircle,
    X,
} from "lucide-react"

import {
    getAdminDepartmentById,
    updateAdminDepartment,
    addBeneficiary,
    updateBeneficiary,
    deleteBeneficiary,
    addService,
    updateService,
    deleteService,
    addProcessStep,
    updateProcessStep,
    deleteProcessStep,
    addFaq,
    updateFaq,
    deleteFaq,
    addDownload,
    updateDownload,
    deleteDownload,
    addSuccessStory,
    updateSuccessStory,
    deleteSuccessStory,
    addRelatedTraining,
    updateRelatedTraining,
    deleteRelatedTraining,
} from "../../api/adminDepartmentsApi.js"

const DepartmentEditor = () => {
    const { id } = useParams()
    const queryClient = useQueryClient()

    const [description, setDescription] = useState("")
    const [savedMessage, setSavedMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [validationErrors, setValidationErrors] = useState({})

    const [modal, setModal] = useState(null)
    const [form, setForm] = useState({})

    const modalInputRef = useRef(null)

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin", "department", id],
        queryFn: () => getAdminDepartmentById(id),
        enabled: Boolean(id),
    })

    const department = data?.data

    useEffect(() => {
        if (department) {
            setDescription(department.description || "")
        }
    }, [department])

    useEffect(() => {
        if (!modal) return

        const timer = setTimeout(() => {
            modalInputRef.current?.focus()
        }, 50)

        return () => clearTimeout(timer)
    }, [modal])

    const refreshDepartment = async () => {
        await queryClient.invalidateQueries({
            queryKey: ["admin", "department", id],
        })

        await queryClient.invalidateQueries({
            queryKey: ["admin", "departments"],
        })
    }

    /* =========================================================
       DEPARTMENT
    ========================================================= */

    const departmentMutation = useMutation({
        mutationFn: ({ id, data }) => updateAdminDepartment({ id, data }),
        onSuccess: async (response) => {
            setSavedMessage(
                response?.message || "Department updated successfully."
            )
            setErrorMessage("")
            await refreshDepartment()
        },
        onError: (mutationError) => {
            setSavedMessage("")
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to update department."
            )
        },
    })

    /* =========================================================
       BENEFICIARIES
    ========================================================= */

    const beneficiaryAddMutation = useMutation({
        mutationFn: addBeneficiary,
        onSuccess: async () => {
            closeModal()
            await refreshDepartment()
        },
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to add beneficiary."
            )
        },
    })

    const beneficiaryUpdateMutation = useMutation({
        mutationFn: updateBeneficiary,
        onSuccess: async () => {
            closeModal()
            await refreshDepartment()
        },
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to update beneficiary."
            )
        },
    })

    const beneficiaryDeleteMutation = useMutation({
        mutationFn: deleteBeneficiary,
        onSuccess: refreshDepartment,
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to delete beneficiary."
            )
        },
    })

    /* =========================================================
       SERVICES
    ========================================================= */

    const serviceAddMutation = useMutation({
        mutationFn: addService,
        onSuccess: async () => {
            closeModal()
            await refreshDepartment()
        },
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to add service."
            )
        },
    })

    const serviceUpdateMutation = useMutation({
        mutationFn: updateService,
        onSuccess: async () => {
            closeModal()
            await refreshDepartment()
        },
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to update service."
            )
        },
    })

    const serviceDeleteMutation = useMutation({
        mutationFn: deleteService,
        onSuccess: refreshDepartment,
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to delete service."
            )
        },
    })

    /* =========================================================
       PROCESS
    ========================================================= */

    const processAddMutation = useMutation({
        mutationFn: addProcessStep,
        onSuccess: async () => {
            closeModal()
            await refreshDepartment()
        },
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to add process step."
            )
        },
    })

    const processUpdateMutation = useMutation({
        mutationFn: updateProcessStep,
        onSuccess: async () => {
            closeModal()
            await refreshDepartment()
        },
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to update process step."
            )
        },
    })

    const processDeleteMutation = useMutation({
        mutationFn: deleteProcessStep,
        onSuccess: refreshDepartment,
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to delete process step."
            )
        },
    })

    /* =========================================================
       FAQ
    ========================================================= */

    const faqAddMutation = useMutation({
        mutationFn: addFaq,
        onSuccess: async () => {
            closeModal()
            await refreshDepartment()
        },
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to add FAQ."
            )
        },
    })

    const faqUpdateMutation = useMutation({
        mutationFn: updateFaq,
        onSuccess: async () => {
            closeModal()
            await refreshDepartment()
        },
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to update FAQ."
            )
        },
    })

    const faqDeleteMutation = useMutation({
        mutationFn: deleteFaq,
        onSuccess: refreshDepartment,
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to delete FAQ."
            )
        },
    })

    /* =========================================================
       DOWNLOADS
    ========================================================= */

    const downloadAddMutation = useMutation({
        mutationFn: addDownload,
        onSuccess: async () => {
            closeModal()
            await refreshDepartment()
        },
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to add download."
            )
        },
    })

    const downloadUpdateMutation = useMutation({
        mutationFn: updateDownload,
        onSuccess: async () => {
            closeModal()
            await refreshDepartment()
        },
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to update download."
            )
        },
    })

    const downloadDeleteMutation = useMutation({
        mutationFn: deleteDownload,
        onSuccess: refreshDepartment,
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to delete download."
            )
        },
    })

    /* =========================================================
       SUCCESS STORIES
    ========================================================= */

    const storyAddMutation = useMutation({
        mutationFn: addSuccessStory,
        onSuccess: async () => {
            closeModal()
            await refreshDepartment()
        },
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to add success story."
            )
        },
    })

    const storyUpdateMutation = useMutation({
        mutationFn: updateSuccessStory,
        onSuccess: async () => {
            closeModal()
            await refreshDepartment()
        },
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to update success story."
            )
        },
    })

    const storyDeleteMutation = useMutation({
        mutationFn: deleteSuccessStory,
        onSuccess: refreshDepartment,
        onError: (mutationError) => {
            setErrorMessage(
                mutationError?.response?.data?.message ||
                    "Failed to delete success story."
            )
        },
    })

    /* =========================================================
       RELATED TRAINING
    ========================================================= */

    // const relatedTrainingAddMutation = useMutation({
    //     mutationFn: addRelatedTraining,
    //     onSuccess: async () => {
    //         closeModal()
    //         await refreshDepartment()
    //     },
    //     onError: (mutationError) => {
    //         setErrorMessage(
    //             mutationError?.response?.data?.message ||
    //                 "Failed to add related training."
    //         )
    //     },
    // })

    // const relatedTrainingUpdateMutation = useMutation({
    //     mutationFn: updateRelatedTraining,
    //     onSuccess: async () => {
    //         closeModal()
    //         await refreshDepartment()
    //     },
    //     onError: (mutationError) => {
    //         setErrorMessage(
    //             mutationError?.response?.data?.message ||
    //                 "Failed to update related training."
    //         )
    //     },
    // })

    // const relatedTrainingDeleteMutation = useMutation({
    //     mutationFn: deleteRelatedTraining,
    //     onSuccess: refreshDepartment,
    //     onError: (mutationError) => {
    //         setErrorMessage(
    //             mutationError?.response?.data?.message ||
    //                 "Failed to delete related training."
    //         )
    //     },
    // })

    /* =========================================================
       SAVE DEPARTMENT
    ========================================================= */

    const handleSave = () => {
        setSavedMessage("")
        setErrorMessage("")

        if (!description.trim()) {
            setErrorMessage("Department description is required.")
            return
        }

        departmentMutation.mutate({
            id,
            data: {
                description: description.trim(),
            },
        })
    }

    /* =========================================================
       MODAL
    ========================================================= */

    const openModal = (type, item = null) => {
        setErrorMessage("")
        setValidationErrors({})

        if (type === "beneficiary") {
            setForm({
                beneficiary: item?.beneficiary || "",
            })
        }


        if (type === "relatedTraining") {
            setForm({
                training: item?.training || "",
            })
        }

        if (type === "service") {
            setForm({
                service: item?.service || "",
            })
        }

        if (type === "process") {
            setForm({
                step: item?.step || "",
            })
        }

        if (type === "faq") {
            setForm({
                question: item?.question || "",
                answer: item?.answer || "",
            })
        }

        if (type === "download") {
            setForm({
                title: item?.title || "",
                url: item?.url || "",
            })
        }

        if (type === "successStory") {
            setForm({
                title: item?.title || "",
                description: item?.description || "",
            })
        }

        setModal({
            type,
            item,
        })
    }

    const closeModal = () => {
        setModal(null)
        setForm({})
        setErrorMessage("")
        setValidationErrors({})
    }

    const clearFieldError = (field) => {
        if (!validationErrors[field]) return

        setValidationErrors((previous) => {
            const next = { ...previous }
            delete next[field]
            return next
        })

        if (Object.keys(validationErrors).length <= 1) {
            setErrorMessage("")
        }
    }

    /* =========================================================
       MODAL SUBMIT
    ========================================================= */

    const handleModalSubmit = () => {
        if (!modal) return

        const itemId = modal.item?.id
        const errors = {}

        if (modal.type === "beneficiary") {
            if (!form.beneficiary?.trim()) {
                errors.beneficiary = "Beneficiary is required."
            }
        }


        if (modal.type === "relatedTraining") {
            if (!form.training?.trim()) {
                errors.training = "Related training is required."
            }
        }

        if (modal.type === "service") {
            if (!form.service?.trim()) {
                errors.service = "Service is required."
            }
        }

        if (modal.type === "process") {
            if (!form.step?.trim()) {
                errors.step = "Process step is required."
            }
        }

        if (modal.type === "faq") {
            if (!form.question?.trim()) {
                errors.question = "Question is required."
            }

            if (!form.answer?.trim()) {
                errors.answer = "Answer is required."
            }
        }

        if (modal.type === "download") {
            if (!form.title?.trim()) {
                errors.title = "Download title is required."
            }

            if (!form.url?.trim()) {
                errors.url = "Download URL is required."
            }
        }

        if (modal.type === "successStory") {
            if (!form.title?.trim()) {
                errors.title = "Success story title is required."
            }

            if (!form.description?.trim()) {
                errors.description = "Success story description is required."
            }
        }

        setValidationErrors(errors)

        if (Object.keys(errors).length > 0) {
            setErrorMessage("Please fill in all required fields.")
            return
        }

        setErrorMessage("")

        if (modal.type === "beneficiary") {
            if (itemId) {
                beneficiaryUpdateMutation.mutate({
                    id,
                    beneficiaryId: itemId,
                    beneficiary: form.beneficiary.trim(),
                })
            } else {
                beneficiaryAddMutation.mutate({
                    id,
                    beneficiary: form.beneficiary.trim(),
                })
            }
            return
        }


        if (modal.type === "relatedTraining") {
            if (itemId) {
                relatedTrainingUpdateMutation.mutate({
                    id,
                    trainingId: itemId,
                    training: form.training.trim(),
                })
            } else {
                relatedTrainingAddMutation.mutate({
                    id,
                    training: form.training.trim(),
                })
            }
            return
        }

        if (modal.type === "service") {
            if (itemId) {
                serviceUpdateMutation.mutate({
                    id,
                    serviceId: itemId,
                    service: form.service.trim(),
                })
            } else {
                serviceAddMutation.mutate({
                    id,
                    service: form.service.trim(),
                })
            }
            return
        }

        if (modal.type === "process") {
            if (itemId) {
                processUpdateMutation.mutate({
                    id,
                    processId: itemId,
                    step: form.step.trim(),
                })
            } else {
                processAddMutation.mutate({
                    id,
                    step: form.step.trim(),
                })
            }
            return
        }

        if (modal.type === "faq") {
            if (itemId) {
                faqUpdateMutation.mutate({
                    id,
                    faqId: itemId,
                    question: form.question.trim(),
                    answer: form.answer.trim(),
                })
            } else {
                faqAddMutation.mutate({
                    id,
                    question: form.question.trim(),
                    answer: form.answer.trim(),
                })
            }
            return
        }

        if (modal.type === "download") {
            if (itemId) {
                downloadUpdateMutation.mutate({
                    id,
                    downloadId: itemId,
                    title: form.title.trim(),
                    url: form.url.trim(),
                })
            } else {
                downloadAddMutation.mutate({
                    id,
                    title: form.title.trim(),
                    url: form.url.trim(),
                })
            }
            return
        }

        if (modal.type === "successStory") {
            if (itemId) {
                storyUpdateMutation.mutate({
                    id,
                    storyId: itemId,
                    title: form.title.trim(),
                    description: form.description.trim(),
                })
            } else {
                storyAddMutation.mutate({
                    id,
                    title: form.title.trim(),
                    description: form.description.trim(),
                })
            }
        }
    }

    const isModalSaving =
        beneficiaryAddMutation.isPending ||
        beneficiaryUpdateMutation.isPending ||
        serviceAddMutation.isPending ||
        serviceUpdateMutation.isPending ||
        processAddMutation.isPending ||
        processUpdateMutation.isPending ||
        faqAddMutation.isPending ||
        faqUpdateMutation.isPending ||
        downloadAddMutation.isPending ||
        downloadUpdateMutation.isPending ||
        storyAddMutation.isPending ||
        storyUpdateMutation.isPending 
        

    /* =========================================================
       DELETE
    ========================================================= */

    const confirmDelete = (type, item) => {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            return
        }

        if (type === "beneficiary") {
            beneficiaryDeleteMutation.mutate({
                id,
                beneficiaryId: item.id,
            })
        }

        if (type === "service") {
            serviceDeleteMutation.mutate({
                id,
                serviceId: item.id,
            })
        }

        if (type === "process") {
            processDeleteMutation.mutate({
                id,
                processId: item.id,
            })
        }

        if (type === "faq") {
            faqDeleteMutation.mutate({
                id,
                faqId: item.id,
            })
        }

        if (type === "download") {
            downloadDeleteMutation.mutate({
                id,
                downloadId: item.id,
            })
        }

        if (type === "successStory") {
            storyDeleteMutation.mutate({
                id,
                storyId: item.id,
            })
        }


        if (type === "relatedTraining") {
            relatedTrainingDeleteMutation.mutate({
                id,
                trainingId: item.id,
            })
        }
    }

    /* =========================================================
       LOADING
    ========================================================= */

    if (isLoading) {
        return (
            <section className="min-h-full bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-375">
                    <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <Clock3 size={22} className="animate-pulse" />
                        </div>

                        <h2 className="text-lg font-bold text-green-950">
                            Loading department...
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Fetching department information from the backend.
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    /* =========================================================
       ERROR
    ========================================================= */

    if (isError || !department) {
        return (
            <section className="min-h-full bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-375">
                    <div className="rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <AlertCircle size={22} />
                        </div>

                        <h2 className="text-lg font-bold text-gray-900">
                            Department not found
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {error?.response?.data?.message ||
                                "Unable to fetch this department from the backend."}
                        </p>

                        <Link
                            to="/admin/content/departments"
                            className="kr-hover-button mt-6 inline-flex h-11 items-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                        >
                            <ArrowLeft size={17} />
                            Back to Departments
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-full bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-375 space-y-6">
                {/* HEADER */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/departments"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft size={18} />
                        </Link>

                        <div>
                            <div className="mb-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                                <span>Content</span>
                                <span>/</span>
                                <span>Departments</span>
                                <span>/</span>
                                <span className="font-medium text-green-700">
                                    Edit
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Edit Department
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage department information and related content.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Link
                            to={`/admin/content/departments/${id}`}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <Building2 size={17} />
                            View Department
                        </Link>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={departmentMutation.isPending}
                            className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save size={17} />
                            {departmentMutation.isPending
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </div>

                {/* MESSAGES */}

                {savedMessage && (
                    <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                            <CheckCircle2 size={17} />
                        </div>

                        <div>
                            <p className="font-bold">Changes saved</p>
                            <p className="mt-0.5 text-xs text-green-700/80">
                                {savedMessage}
                            </p>
                        </div>
                    </div>
                )}

                {errorMessage && !modal && (
                    <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                            <AlertCircle size={17} />
                        </div>

                        <div>
                            <p className="font-bold">
                                Unable to complete the operation
                            </p>

                            <p className="mt-0.5 text-xs text-red-700/80">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                    <div className="space-y-6">
                        {/* BASIC INFORMATION */}

                        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <FileText size={19} />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-gray-900">
                                            Basic Information
                                        </h2>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Department information fetched directly from the backend.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5 p-5 sm:p-6">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Department Name
                                    </label>

                                    <input
                                        type="text"
                                        value={department.title || ""}
                                        readOnly
                                        className="h-12 w-full cursor-not-allowed rounded-2xl border border-gray-200 bg-gray-100 px-4 text-sm font-medium text-gray-600 outline-none"
                                    />

                                    <p className="mt-1.5 text-xs text-gray-400">
                                        Department name is read-only.
                                    </p>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        URL Slug
                                    </label>

                                    <div className="flex overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                                        <span className="flex items-center bg-gray-200/70 px-4 text-sm text-gray-400">
                                            /departments/
                                        </span>

                                        <input
                                            type="text"
                                            value={department.slug || ""}
                                            readOnly
                                            className="h-12 min-w-0 flex-1 cursor-not-allowed bg-gray-100 px-3 font-mono text-sm text-gray-600 outline-none"
                                        />
                                    </div>

                                    <p className="mt-1.5 text-xs text-gray-400">
                                        URL slug is read-only.
                                    </p>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between gap-3">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Department Description
                                        </label>

                                        <span className="text-xs text-gray-400">
                                            {description.length} characters
                                        </span>
                                    </div>

                                    <textarea
                                        value={description}
                                        onChange={(event) => {
                                            setDescription(event.target.value)
                                            setSavedMessage("")
                                            setErrorMessage("")
                                        }}
                                        rows={10}
                                        placeholder="Write the full department description..."
                                        className="w-full resize-y rounded-2xl border border-gray-200 bg-white px-4 py-4 text-sm leading-7 text-gray-800 outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-100"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DEPARTMENT INFORMATION */}

                        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <Building2 size={19} />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-gray-900">
                                            Department Information
                                        </h2>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Additional information currently stored for this department.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                                <InfoItem
                                    label="Icon"
                                    value={department.icon}
                                    icon={<Building2 size={17} />}
                                />

                                <InfoItem
                                    label="CTA Text"
                                    value={department.cta}
                                />
                            </div>
                        </div>

                        {/* BENEFICIARIES */}

                        <ContentSection
                            title="Beneficiaries"
                            description="Manage the beneficiaries associated with this department."
                            icon={<UsersRound size={19} />}
                            onAdd={() => openModal("beneficiary")}
                        >
                            {department.beneficiaries?.length ? (
                                <div className="space-y-3">
                                    {department.beneficiaries.map((item) => (
                                        <EditableRow
                                            key={item.id}
                                            text={item.beneficiary}
                                            onEdit={() =>
                                                openModal("beneficiary", item)
                                            }
                                            onDelete={() =>
                                                confirmDelete(
                                                    "beneficiary",
                                                    item
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState text="No beneficiaries added yet." />
                            )}
                        </ContentSection>



                        {/* RELATED TRAINING temporarily disabled

                        <ContentSection
                            title="Related Training"
                            description="Manage training programs related to this department."
                            icon={<CheckCircle2 size={19} />}
                            onAdd={() => openModal("relatedTraining")}
                        >
                            {department.relatedTraining?.length ? (
                                <div className="space-y-3">
                                    {department.relatedTraining.map((item) => (
                                        <EditableRow
                                            key={item.id}
                                            text={item.training}
                                            onEdit={() =>
                                                openModal(
                                                    "relatedTraining",
                                                    item
                                                )
                                            }
                                            onDelete={() =>
                                                confirmDelete(
                                                    "relatedTraining",
                                                    item
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState text="No related training added yet." />
                            )}
                        </ContentSection>
                        */}

                        {/* SERVICES */}

                        <ContentSection
                            title="Services"
                            description="Manage services provided by this department."
                            icon={<Wrench size={19} />}
                            onAdd={() => openModal("service")}
                        >
                            {department.services?.length ? (
                                <div className="space-y-3">
                                    {department.services.map((item) => (
                                        <EditableRow
                                            key={item.id}
                                            text={item.service}
                                            onEdit={() =>
                                                openModal("service", item)
                                            }
                                            onDelete={() =>
                                                confirmDelete(
                                                    "service",
                                                    item
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState text="No services added yet." />
                            )}
                        </ContentSection>

                        {/* PROCESS */}

                        <ContentSection
                            title="Process"
                            description="Manage the steps followed by beneficiaries."
                            icon={<ListChecks size={19} />}
                            onAdd={() => openModal("process")}
                        >
                            {department.process?.length ? (
                                <div className="space-y-3">
                                    {department.process.map((item, index) => (
                                        <EditableRow
                                            key={item.id}
                                            number={index + 1}
                                            text={item.step}
                                            onEdit={() =>
                                                openModal("process", item)
                                            }
                                            onDelete={() =>
                                                confirmDelete(
                                                    "process",
                                                    item
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState text="No process steps added yet." />
                            )}
                        </ContentSection>

                        {/* FAQs temporarily disabled

                        <ContentSection
                            title="FAQs"
                            description="Manage frequently asked questions for this department."
                            icon={<HelpCircle size={19} />}
                            onAdd={() => openModal("faq")}
                        >
                            {department.faqs?.length ? (
                                <div className="space-y-4">
                                    {department.faqs.map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-2xl border border-gray-100 bg-[#F6FAF7] p-4"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-gray-900">
                                                        {item.question}
                                                    </p>

                                                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                                                        {item.answer}
                                                    </p>
                                                </div>

                                                <ActionButtons
                                                    onEdit={() =>
                                                        openModal(
                                                            "faq",
                                                            item
                                                        )
                                                    }
                                                    onDelete={() =>
                                                        confirmDelete(
                                                            "faq",
                                                            item
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState text="No FAQs added yet." />
                            )}
                        </ContentSection>
                        */}

                        {/* DOWNLOADS temporarily disabled

                        <ContentSection
                            title="Downloads"
                            description="Manage downloadable resources associated with this department."
                            icon={<FileDown size={19} />}
                            onAdd={() => openModal("download")}
                        >
                            {department.downloads?.length ? (
                                <div className="space-y-3">
                                    {department.downloads.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-[#F6FAF7] p-4"
                                        >
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-900">
                                                    {item.title}
                                                </p>

                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="mt-1 block truncate text-sm text-green-700 hover:text-green-900"
                                                >
                                                    {item.url}
                                                </a>
                                            </div>

                                            <ActionButtons
                                                onEdit={() =>
                                                    openModal(
                                                        "download",
                                                        item
                                                    )
                                                }
                                                onDelete={() =>
                                                    confirmDelete(
                                                        "download",
                                                        item
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState text="No downloads added yet." />
                            )}
                        </ContentSection>
                        */}

                        {/* SUCCESS STORIES temporarily disabled

                        <ContentSection
                            title="Success Stories"
                            description="Manage success stories associated with this department."
                            icon={<CheckCircle2 size={19} />}
                            onAdd={() => openModal("successStory")}
                        >
                            {department.successStories?.length ? (
                                <div className="space-y-4">
                                    {department.successStories.map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-2xl border border-gray-100 bg-[#F6FAF7] p-4"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-gray-900">
                                                        {item.title}
                                                    </p>

                                                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                <ActionButtons
                                                    onEdit={() =>
                                                        openModal(
                                                            "successStory",
                                                            item
                                                        )
                                                    }
                                                    onDelete={() =>
                                                        confirmDelete(
                                                            "successStory",
                                                            item
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState text="No success stories added yet." />
                            )}
                        </ContentSection>
                        */}
                    </div>

                    {/* SIDEBAR */}

                    <aside className="space-y-6">
                        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 px-5 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <Save size={18} />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-gray-900">
                                            Save Changes
                                        </h2>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Save the department description.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 p-5">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={departmentMutation.isPending}
                                    className="kr-hover-button flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-green-700 text-sm font-bold text-white shadow-lg shadow-green-900/10 hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Save size={17} />
                                    {departmentMutation.isPending
                                        ? "Saving..."
                                        : "Save Description"}
                                </button>

                                <Link
                                    to={`/admin/content/departments/${id}`}
                                    className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white text-sm font-bold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                >
                                    <ArrowLeft size={17} />
                                    Cancel
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-green-100 bg-green-50 p-5">
                            <div className="flex gap-3">
                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-green-700"
                                />

                                <div>
                                    <h3 className="text-sm font-semibold text-green-900">
                                        Backend Connected
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-green-800/80">
                                        Department information and the currently enabled content sections
                                        are connected to MySQL.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-900">
                                Content Summary
                            </h3>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <SummaryItem
                                    label="Beneficiaries"
                                    value={
                                        department.beneficiaries?.length || 0
                                    }
                                />



                                {/* Related Training summary temporarily disabled
                                <SummaryItem
                                    label="Related Training"
                                    value={
                                        department.relatedTraining?.length || 0
                                    }
                                />
                                */}

                                <SummaryItem
                                    label="Services"
                                    value={department.services?.length || 0}
                                />

                                <SummaryItem
                                    label="Process"
                                    value={department.process?.length || 0}
                                />

                                {/* FAQs summary temporarily disabled
                                <SummaryItem
                                    label="FAQs"
                                    value={department.faqs?.length || 0}
                                />
                                */}

                                {/* Downloads summary temporarily disabled
                                <SummaryItem
                                    label="Downloads"
                                    value={department.downloads?.length || 0}
                                />
                                */}

                                {/* Stories summary temporarily disabled
                                <SummaryItem
                                    label="Stories"
                                    value={
                                        department.successStories?.length || 0
                                    }
                                />
                                */}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-900">
                                Read-only information
                            </h3>

                            <div className="mt-4 space-y-3">
                                <ReadOnlyItem
                                    label="Department ID"
                                    value={`#${department.id}`}
                                />

                                <ReadOnlyItem
                                    label="Created"
                                    value={formatDate(
                                        department.created_at
                                    )}
                                />

                                <ReadOnlyItem
                                    label="Last Updated"
                                    value={formatDate(
                                        department.updated_at
                                    )}
                                />
                            </div>
                        </div>
                    </aside>
                </div>

                {/* FOOTER */}

                <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <Link
                        to="/admin/content/departments"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        <ArrowLeft size={17} />
                        Back to Departments
                    </Link>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={departmentMutation.isPending}
                        className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Save size={17} />
                        {departmentMutation.isPending
                            ? "Saving..."
                            : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* MODAL */}

            {modal && (
                <Modal
                    title={`${modal.item ? "Edit" : "Add"} ${getModalTitle(
                        modal.type
                    )}`}
                    onClose={closeModal}
                    onSubmit={handleModalSubmit}
                    isPending={isModalSaving}
                    errorMessage={errorMessage}
                >
                    {modal.type === "beneficiary" && (
                        <Field
                            inputRef={modalInputRef}
                            label="Beneficiary"
                            value={form.beneficiary || ""}
                            error={validationErrors.beneficiary}
                            onChange={(value) => {
                                setForm((previous) => ({
                                    ...previous,
                                    beneficiary: value,
                                }))
                                clearFieldError("beneficiary")
                            }}
                            placeholder="Enter beneficiary"
                        />
                    )}


                    {modal.type === "relatedTraining" && (
                        <Field
                            inputRef={modalInputRef}
                            label="Related Training"
                            value={form.training || ""}
                            error={validationErrors.training}
                            onChange={(value) => {
                                setForm((previous) => ({
                                    ...previous,
                                    training: value,
                                }))
                                clearFieldError("training")
                            }}
                            placeholder="Enter related training"
                        />
                    )}

                    {modal.type === "service" && (
                        <Field
                            inputRef={modalInputRef}
                            label="Service"
                            value={form.service || ""}
                            error={validationErrors.service}
                            onChange={(value) => {
                                setForm((previous) => ({
                                    ...previous,
                                    service: value,
                                }))
                                clearFieldError("service")
                            }}
                            placeholder="Enter service"
                        />
                    )}

                    {modal.type === "process" && (
                        <Field
                            inputRef={modalInputRef}
                            label="Process Step"
                            value={form.step || ""}
                            error={validationErrors.step}
                            onChange={(value) => {
                                setForm((previous) => ({
                                    ...previous,
                                    step: value,
                                }))
                                clearFieldError("step")
                            }}
                            placeholder="Enter process step"
                        />
                    )}

                    {modal.type === "faq" && (
                        <>
                            <Field
                                inputRef={modalInputRef}
                                label="Question"
                                value={form.question || ""}
                                error={validationErrors.question}
                                onChange={(value) => {
                                    setForm((previous) => ({
                                        ...previous,
                                        question: value,
                                    }))
                                    clearFieldError("question")
                                }}
                                placeholder="Enter question"
                            />

                            <TextAreaField
                                label="Answer"
                                value={form.answer || ""}
                                error={validationErrors.answer}
                                onChange={(value) => {
                                    setForm((previous) => ({
                                        ...previous,
                                        answer: value,
                                    }))
                                    clearFieldError("answer")
                                }}
                                placeholder="Enter answer"
                            />
                        </>
                    )}

                    {modal.type === "download" && (
                        <>
                            <Field
                                inputRef={modalInputRef}
                                label="Title"
                                value={form.title || ""}
                                error={validationErrors.title}
                                onChange={(value) => {
                                    setForm((previous) => ({
                                        ...previous,
                                        title: value,
                                    }))
                                    clearFieldError("title")
                                }}
                                placeholder="Enter download title"
                            />

                            <Field
                                label="URL"
                                value={form.url || ""}
                                error={validationErrors.url}
                                onChange={(value) => {
                                    setForm((previous) => ({
                                        ...previous,
                                        url: value,
                                    }))
                                    clearFieldError("url")
                                }}
                                placeholder="https://example.com/file.pdf"
                            />
                        </>
                    )}

                    {modal.type === "successStory" && (
                        <>
                            <Field
                                inputRef={modalInputRef}
                                label="Title"
                                value={form.title || ""}
                                error={validationErrors.title}
                                onChange={(value) => {
                                    setForm((previous) => ({
                                        ...previous,
                                        title: value,
                                    }))
                                    clearFieldError("title")
                                }}
                                placeholder="Enter success story title"
                            />

                            <TextAreaField
                                label="Description"
                                value={form.description || ""}
                                error={validationErrors.description}
                                onChange={(value) => {
                                    setForm((previous) => ({
                                        ...previous,
                                        description: value,
                                    }))
                                    clearFieldError("description")
                                }}
                                placeholder="Enter success story description"
                            />
                        </>
                    )}
                </Modal>
            )}
        </section>
    )
}

/* =============================================================
   CONTENT SECTION
============================================================= */

const ContentSection = ({
    title,
    description,
    icon,
    onAdd,
    children,
}) => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            {icon}
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                {title}
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {description}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onAdd}
                        className="kr-hover-button inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 text-sm font-semibold text-white shadow-md shadow-green-900/10 hover:bg-green-800"
                    >
                        <Plus size={16} />
                        Add
                    </button>
                </div>
            </div>

            <div className="p-5 sm:p-6">
                {children}
            </div>
        </div>
    )
}

/* =============================================================
   EDITABLE ROW
============================================================= */

const EditableRow = ({
    number,
    text,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#F6FAF7] p-4">
            {number && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-green-100 text-sm font-bold text-green-800">
                    {number}
                </div>
            )}

            <p className="min-w-0 flex-1 text-sm font-medium text-gray-800">
                {text}
            </p>

            <ActionButtons
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </div>
    )
}

/* =============================================================
   ACTION BUTTONS
============================================================= */

const ActionButtons = ({
    onEdit,
    onDelete,
}) => {
    return (
        <div className="flex shrink-0 items-center gap-2">
            <button
                type="button"
                onClick={onEdit}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                title="Edit"
            >
                <Pencil size={15} />
            </button>

            <button
                type="button"
                onClick={onDelete}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                title="Delete"
            >
                <Trash2 size={15} />
            </button>
        </div>
    )
}

/* =============================================================
   INFO ITEM
============================================================= */

const InfoItem = ({
    label,
    value,
    icon,
}) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
                {label}
            </label>

            <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-100 px-4">
                {icon && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                        {icon}
                    </div>
                )}

                <span className="whitespace-nowrap text-sm font-semibold text-gray-600">
                    {value || "—"}
                </span>
            </div>
        </div>
    )
}

/* =============================================================
   SUMMARY ITEM
============================================================= */

const SummaryItem = ({
    label,
    value,
}) => {
    return (
        <div className="rounded-2xl bg-[#F6FAF7] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {label}
            </p>

            <p className="mt-2 text-2xl font-black text-green-900">
                {value}
            </p>
        </div>
    )
}

/* =============================================================
   READ ONLY ITEM
============================================================= */

const ReadOnlyItem = ({
    label,
    value,
}) => {
    return (
        <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-medium text-gray-700">
                {value}
            </p>
        </div>
    )
}

/* =============================================================
   EMPTY STATE
============================================================= */

const EmptyState = ({
    text,
}) => {
    return (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center">
            <p className="text-sm text-gray-500">
                {text}
            </p>
        </div>
    )
}

/* =============================================================
   FIELD
============================================================= */

const Field = ({
    label,
    value,
    onChange,
    placeholder,
    inputRef,
    error,
}) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
                {label}
            </label>

            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder={placeholder}
                className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm text-gray-800 outline-none transition focus:ring-4 ${
                    error
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:border-green-400 focus:ring-green-100"
                }`}
            />

            {error && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <AlertCircle size={13} />
                    {error}
                </p>
            )}
        </div>
    )
}

/* =============================================================
   TEXT AREA FIELD
============================================================= */

const TextAreaField = ({
    label,
    value,
    onChange,
    placeholder,
    error,
}) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
                {label}
            </label>

            <textarea
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder={placeholder}
                rows={6}
                className={`w-full resize-y rounded-2xl border bg-white px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition focus:ring-4 ${
                    error
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:border-green-400 focus:ring-green-100"
                }`}
            />

            {error && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <AlertCircle size={13} />
                    {error}
                </p>
            )}
        </div>
    )
}

/* =============================================================
   MODAL
============================================================= */

const Modal = ({
    title,
    onClose,
    onSubmit,
    isPending,
    errorMessage,
    children,
}) => {
    const handleKeyDown = (event) => {
        if (event.key !== "Enter") {
            return
        }

        if (event.target.tagName === "TEXTAREA") {
            return
        }

        event.preventDefault()

        if (!isPending) {
            onSubmit()
        }
    }

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-gray-950/40 px-4 py-6"
            onKeyDown={handleKeyDown}
        >
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-200 bg-white shadow-2xl">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-5 sm:px-6">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            {title}
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            Enter the required information below.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                    {errorMessage && (
                        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                                <AlertCircle size={17} />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-red-800">
                                    Please check the form
                                </p>

                                <p className="mt-0.5 text-xs leading-5 text-red-700">
                                    {errorMessage}
                                </p>
                            </div>
                        </div>
                    )}

                    {children}
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="h-11 rounded-2xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onSubmit}
                        disabled={isPending}
                        className="h-11 rounded-2xl bg-green-700 px-5 text-sm font-semibold text-white shadow-md shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isPending ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    )
}

/* =============================================================
   MODAL TITLE
============================================================= */

const getModalTitle = (type) => {
    if (type === "beneficiary") return "Beneficiary"
    if (type === "relatedTraining") return "Related Training"
    if (type === "service") return "Service"
    if (type === "process") return "Process Step"
    if (type === "faq") return "FAQ"
    if (type === "download") return "Download"
    if (type === "successStory") return "Success Story"

    return "Content"
}

/* =============================================================
   DATE FORMAT
============================================================= */

const formatDate = (date) => {
    if (!date) {
        return "—"
    }

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return "—"
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

export default DepartmentEditor
