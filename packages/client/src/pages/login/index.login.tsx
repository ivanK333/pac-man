import React from 'react'
import { ValidationEntry } from '../../commonTypes'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import Input from '../../components/InputWithLabel'
import SubmitButton from '../../components/Button'

const validation: Record<string, ValidationEntry> = {
  login: {
    required: 'Логин необходим',
    minLength: { value: 3, message: 'не менее 3-х сиволов' },
    maxLength: { value: 20, message: 'не более 20-ти символов' },
    pattern: {
      value: /^[a-zA-Z0-9-]{3,20}$/,
      message: `только латиница, цифры, но не состоять из них, без пробелов, 
      без спецсимволов (допустимы дефис и нижнее подчёркивание)`,
    },
  },
  password: {
    required: 'Пароль необходим',
    minLength: { value: 8, message: 'не менее 8-ми сиволов' },
    maxLength: { value: 40, message: 'не более 40 символов' },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
      message: 'обязательно хотя бы одна заглавная буква и цифра',
    },
  },
}

type FormValues = {
  login: string
  password: string
}

export const LoginForm: React.FC = () => {
  const methods = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data)

  return (
    <div className="form-container">
      <h2>Логин</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            label="Логин"
            type="text"
            name="login"
            placeholder="Введите логин"
            autoFocus={true}
            validation={validation.login}
          />
          <Input
            label="Пароль"
            type="password"
            name="password"
            placeholder="Введите пароль"
            validation={validation.password}
          />
          <SubmitButton label="Логин" />
        </form>
      </FormProvider>
    </div>
  )
}
