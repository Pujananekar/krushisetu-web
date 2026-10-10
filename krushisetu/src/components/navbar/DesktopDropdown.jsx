import { Link } from "react-router-dom"

const DesktopDropdown = ({ items = [], parent, pathname }) => {
    const parentActive = parent.path && pathname === parent.path

    return (
        <div className="absolute left-1/2 top-full z-999 w-64 -translate-x-1/2 pt-3 opacity-0 invisible pointer-events-none translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 ">
            <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl shadow-gray-900/40">
                
                {parent.path && (
                    <Link to={parent.path} className={`group/item flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${parentActive ? "bg-green-100 text-green-900" : "text-gray-700 hover:bg-green-50 hover:text-green-800"}`}>
                        {parentActive && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-700 shadow-sm shadow-green-700/40" />}
                        <span>{parent.name}</span>
                        <span className="ml-auto text-gray-400 opacity-0 transition-all duration-200 group-hover/item:translate-x-1 group-hover/item:text-green-700 group-hover/item:opacity-100">
                            →
                        </span>
                    </Link>
                )}

                {parent.path && items.length > 0 && (
                    <div className="my-1.5 h-px bg-gray-100" />
                )}

                {items.map((item) => {
                    const childActive = pathname === item.path

                    return (
                        <Link key={item.path} to={item.path} className={`group/item flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${childActive ? "bg-green-100 text-green-900" : "text-gray-700 hover:bg-green-50 hover:text-green-800"}`}>
                            {childActive && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-700 shadow-sm shadow-green-700/40" />}
                            <span>{item.name}</span>
                            <span className="ml-auto text-gray-400 opacity-0 transition-all duration-200 group-hover/item:translate-x-1 group-hover/item:text-green-700 group-hover/item:opacity-100">
                                →
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default DesktopDropdown
