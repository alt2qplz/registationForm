import React, { CSSProperties } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import cn from 'classnames'
import * as Yup from 'yup'
import style from './Register.module.scss'
import { CustomSelect } from './CustomSelect'

interface MyFormValues {
  name: string
  email: string
  phone: string
  lang: string
  check: boolean
}

const nameRegExp = /^[A-zA-я\s-]+$/
const phoneRegExp = /^(\+?\d?(\(\d{3}\)|\d{3}))?\d{3}-?\d{2}-?\d{2}$/
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegExp, 'Введите правильное имя')
    .min(2, 'Слишком короткое')
    .max(30, 'Слишком длинное')
    .required('Введите имя'),
  email: Yup.string().email('Некорректный email').required('Введите email'),
  phone: Yup.string().matches(phoneRegExp, 'Некорректный номер').required('Введите телефон'),
  lang: Yup.string().required('Выберите язык'),
  check: Yup.boolean().equals([true]).required('')
})

export const Register: React.FC = () => {

  //Например список языков пришел из store
  const languages = [
    { value: 'russian', label: 'Русский' },
    { value: 'english', label: 'Английский' },
    { value: 'spanish', label: 'Испанский' },
    { value: 'chinese', label: 'Китайский' }
  ]

  const initialValues: MyFormValues = {
    name: 'sam',
    email: 'sam@m.r',
    phone: '1234567',
    lang: '',
    check: false
  }
  return (
    <div className={cn(style.wrap)}>
      <div className={cn(style.container)}>
        <h2>Регистрация</h2>
        <p className={cn(style.haveAcc)}>Уже есть аккаунт? <a href="/">Войти</a></p>
        <div className={cn(style.formContainer)}>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log(values)
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
              resetForm()
            }}
          >
            {({ isValid, dirty, handleSubmit, handleBlur, setFieldValue, setErrors }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <label htmlFor="name" className={cn(style.fieldName)}>Имя</label>
                  <Field name="name" placeholder='Введите Ваше имя'/>
                  <div className={cn(style.error)}><ErrorMessage name="name" component="p"/></div>

                  <label htmlFor="email" className={cn(style.fieldName)}>Еmail</label>
                  <Field type="email" name="email" placeholder='Введите ваш email'/>
                  <div className={cn(style.error)}><ErrorMessage name="email" component="p"/></div>

                  <label htmlFor="phone" className={cn(style.fieldName)}>Номер телефона</label>
                  <Field name="phone" placeholder='Введите ваш телефон'/>
                  <div className={cn(style.error)}><ErrorMessage name="phone" component="p"/></div>


                  <label htmlFor="lang" className={cn(style.fieldName)}>Язык</label>
                  <Field
                    as="select"
                    name='lang'
                    component={CustomSelect}
                    languages={languages}
                    setFieldValue={setFieldValue}
                    handlerBlur={handleBlur}
                  />
                  <div className={cn(style.error)}><ErrorMessage name="lang" component="p"/></div>


                  {/*// <Field name="lang" className={cn(style.select)}>*/}
                  {/*// <option value="" style={{ display: 'none' }} defaultChecked={true}>Язык</option>*/}
                  {/*// {languages.map(lang => {*/}
                  {/*//   return <option*/}
                  {/*//     key={lang.value}*/}
                  {/*//     value={lang.label}*/}
                  {/*//     // className={cn(style.option)}*/}
                  {/*//   >*/}
                  {/*//     {lang.label}*/}
                  {/*//   </option>*/}
                  {/*//   </Field>}*/}

                  <div className={cn(style.checkBoxWrap)}>
                    <Field type="checkbox" name="check" id="check" className={cn(style.customCheckbox)}/>
                    <label htmlFor="check"></label>
                    <p>Принимаю <a href="/">условия</a> использования</p>
                  </div>

                  <button
                    type="submit"
                    disabled={!(dirty && isValid)}
                  >
                    Зарегистрироваться
                  </button>
                </Form>
                )
                }}
                </Formik>
                </div>
            </div>
            </div>
            )
            }
