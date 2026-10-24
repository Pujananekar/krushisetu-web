
import { useState } from "react";
import { Languages, ChevronDown } from "lucide-react";
import GoogleTranslate from "./GoogleTranslate";

const languages = [
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी" },
  { code: "hi", label: "हिन्दी" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  const translateTo = (language) => {
    if (language === "en") {
      // Reset Google Translate and return to the original page.
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" +
        window.location.hostname;

      window.location.reload();
      return;
    }

    const select = document.querySelector(".goog-te-combo");

    if (!select) {
      console.warn("Google Translate is not ready yet.");
      return;
    }

    select.value = language;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    setIsOpen(false);
  };

  return (
    <>
      <GoogleTranslate />

      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Select language"
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/70 px-3 py-2 text-sm font-medium text-gray-800 transition hover:bg-white"
        >
          <Languages size={18} />
          <span className="hidden sm:inline">Language</span>
          <ChevronDown
            size={15}
            className={`transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full z-[110] mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-xl">
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() => translateTo(language.code)}
                className="block w-full px-4 py-3 text-left text-sm text-gray-800 transition hover:bg-gray-100"
              >
                {language.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
