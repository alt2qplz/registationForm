import React, { CSSProperties } from 'react'

import Select from 'react-select'

const customStyles: any = {
  option: (provided: CSSProperties, state: { isSelected: boolean, isFocus: boolean, isHover: boolean }) => ({
    borderBottom: 'none',
    color: '#756F86',
    backgroundColor: state.isSelected || state.isFocus || state.isHover ? '#EBF4F8' : '#fff',
    width: '398px',
    height: '44px',
    padding: '12px 15px'
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    backgroundColor: 'white',
    width: '366px',
    height: '20px',
    borderRadius: '6px',
    padding: '16px',
    backgroundImage: 'url(../assets/Icon.png)',
    backgroundPositionY: 'center',
    backgroundPositionX: 'calc(100% - 11px)',
    backgroundRepeat: 'no-repeat',
    marginBottom: '8px',
    fontSize: '16px',
    color: '#7C9CBF',
    lineHeight: '21px',
    border: '1px solid #DBE2EA',
    boxShadow: '0px 4px 8px rgba(44, 39, 56, 0.04)',
    boxSizing: 'content-box',
    focus: {
      padding: '15px',
      border: '2px solid #0880AE'
    }

  }),
  singleValue: (provided: CSSProperties, state: { isDisabled: boolean }) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    return { ...provided, opacity, transition }
  }
}

export const CustomSelect: React.FC<any> = (props) => {
  const { setFieldValue, options, handleBlur } = props
  return (
    <Select
      label="Язык"
      type={'text'}
      onChange={option => setFieldValue('lang', option?.value)}
      options={options}
      onBlur={handleBlur}
      styles={customStyles}
    />
  )
}
