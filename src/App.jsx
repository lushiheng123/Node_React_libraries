import { useTranslation } from 'react-i18next';
import React from "react"
function App() {
  const { t, i18n } = useTranslation();

  // 切换语言的函数
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={toggleLanguage}>{t('switch_language')}</button>
    </div>
  );
}

export default App;