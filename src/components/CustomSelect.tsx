import React, { useState } from 'react'
import cn from 'classnames'
import style from './CustomSelect.module.scss'

type PropsType = {
  languages: Array<{ label: string, value: string }>
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const CustomSelect: React.FC<PropsType> = ({ languages, setFieldValue }) => {
  const [selectOpen, setSelectOpen] = useState<boolean>(false)
  const [selectLang, setSelectLang] = useState<{ label: string, value: string} | null>(null)

  const chooseLangHandler = (lang: {label: string, value: string}) => {
    setSelectLang(lang)
    setFieldValue('lang', lang.value)
    setSelectOpen(false)
  }

  const nonChooseHandler = () => {
    setSelectOpen(false)
    setFieldValue('lang', null)
  }

  return (
    <div className={cn(style.customSelectWrapper)}>
      <div
        className={selectOpen ? cn(style.select, style.selectOpen) : cn(style.select)}
        onClick={() => setSelectOpen(true)}
      >
        <p className={selectLang ? cn(style.selectLang) : ''}>{selectLang ? selectLang.label : 'Выберите язык'}</p>
      </div>
      {selectOpen
        ? <ul className={cn(style.optionWrapper)} onPointerLeave={nonChooseHandler}>
          {languages.map(lang => {
            return <li key={lang.value}
                       className={cn(style.option)}
                       onClick={() => chooseLangHandler(lang)}
            >{lang.label}</li>
          })}
        </ul>
        : null
      }

    </div>
  )
}
