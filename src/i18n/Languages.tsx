import React from "react";
import i18n from "./i18next";

type languageType = {
  id: number;
  code: string;
  name: string;
  flag: string;
};

const Languages = () => {
  const storeLng = localStorage.getItem("i18nextLng") || "en";
  const languages: Array<languageType> = [
    {
      id: 1,
      code: "en",
      name: "English",
      flag: "usa",
    },
    {
      id: 2,
      code: "fr",
      name: "Français",
      flag: "fr",
    },
  ];

  const selectedLng = (languages || []).find(
    (language: languageType) => language.code === storeLng
  );

  return (
    <div className="nav-item dropdown-menu-lg mt-3">
      <div className="dropdown">
        <div className="form-control">
          {selectedLng ? (
            <>
              <i
                className={`sl-flag flag-${selectedLng && selectedLng.flag}`}
              />
              <span>{selectedLng && selectedLng.name}</span>
            </>
          ) : (
            <>
              <i className="sl-flag flag-usa" />
              <span>English</span>
            </>
          )}
        </div>
        <div className="dropdown-content">
          {languages.map((language: languageType) => {
            return (
              <div
                key={language.id}
                onClick={() => i18n.changeLanguage(language.code)}
              >
                <i className={`sl-flag flag-${language.flag}`} />
                <span>{language.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Languages;
