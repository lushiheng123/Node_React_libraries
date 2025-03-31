import { useTranslation } from 'react-i18next';
import React from "react";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className='items-center justify-center flex flex-col w-[100vw] h-[100vh]'>
      <div className='bg-yellow-200 text-red-500 p-4 rounded'>
        <div>{t('welcome')}</div>
        <div>{t('greeting', { name: 'Alice' })}</div>
        <div>{t('items', { count: 0 })}</div>
        <div>{t('items', { count: 1 })}</div>
        <div>{t('items', { count: 5 })}</div>
        <select
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
          className='mt-2 p-1 border rounded'
        >
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
      </div>
    </div>
  );
}

export default App;