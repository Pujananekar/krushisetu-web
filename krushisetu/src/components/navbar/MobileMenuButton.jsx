const MobileMenuButton = ({ isOpen, onClick }) => {
    return (
        <button type="button" className="ml-auto flex lg:hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F1F7F1] text-[#185C22] text-2xl hover:scale-[1.02] active:scale-100 transition-all duration-200 border border-gray-300" aria-label={isOpen ? "Close menu" : "Open menu"} onClick={onClick}>
            {isOpen ? "✕" : "☰"}
        </button>
    )
}

export default MobileMenuButton