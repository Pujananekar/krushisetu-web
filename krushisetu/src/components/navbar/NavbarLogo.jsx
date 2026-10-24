
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useSiteSettings from "../../hooks/useSiteSettings.js";

const NavbarLogo = ({ onClick }) => {
  const { data: settings } = useSiteSettings();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const detectLanguage = () => {
      const match = document.cookie.match(
        /(?:^|;\s*)googtrans=([^;]+)/
      );

      if (match) {
        const parts = decodeURIComponent(match[1]).split("/");
        const selectedLanguage = parts[parts.length - 1];

        setLanguage(
          ["en", "mr", "hi"].includes(selectedLanguage)
            ? selectedLanguage
            : "en"
        );
      } else {
        setLanguage("en");
      }
    };

    detectLanguage();

    const interval = window.setInterval(detectLanguage, 500);

    return () => window.clearInterval(interval);
  }, []);

  const siteName =
    language === "mr"
      ? settings?.marathiName || "कृषीसेतू"
      : language === "hi"
        ? settings?.hindiName || "कृषिसेतु"
        : settings?.englishName || "Krushisetu";

  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex shrink-0 items-center gap-3"
    >
      <img
        className="h-11 w-11 shrink-0 object-contain"
        src={`${import.meta.env.BASE_URL}images/leaf_img.png`}
        alt={siteName}
      />

      <h1
        translate="no"
        className="notranslate whitespace-nowrap text-xl font-bold tracking-[-0.03em] text-green-900 md:text-2xl"
      >
        {siteName}
      </h1>
    </Link>
  );
};

export default NavbarLogo;
