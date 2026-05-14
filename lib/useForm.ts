'use client'

import { useState, useCallback, type ChangeEvent, type FormEvent } from 'react'
import { contactSchema, type ContactForm } from './schemas'
import { ZodError } from 'zod'

type Fields = {
  firstName: string
  lastName:  string
  email:     string
  phone:     string
  interest:  string
  message:   string
}

type Errors = Partial<Record<keyof Fields, string>>

const initialFields: Fields = {
  firstName: '',
  lastName:  '',
  email:     '',
  phone:     '',
  interest:  '',
  message:   '',
}

export function useForm() {
  const [fields, setFields]           = useState<Fields>(initialFields)
  const [errors, setErrors]           = useState<Errors>({})
  const [isSubmitting, setSubmitting] = useState(false)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }, [])

  const validate = useCallback((): ContactForm | null => {
    const result = contactSchema.safeParse({
      ...fields,
      interest: fields.interest || undefined,
      phone:    fields.phone    || undefined,
      message:  fields.message  || undefined,
    })
    if (!result.success) {
      const flat = result.error.flatten().fieldErrors
      const mapped: Errors = {}
      for (const [k, v] of Object.entries(flat)) {
        if (v?.[0]) mapped[k as keyof Fields] = v[0]
      }
      setErrors(mapped)
      return null
    }
    return result.data
  }, [fields])

  const handleSubmit = useCallback(
    (onValid: (data: ContactForm) => Promise<void>) =>
      async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = validate()
        if (!data) return
        setSubmitting(true)
        try {
          await onValid(data)
        } finally {
          setSubmitting(false)
        }
      },
    [validate],
  )

  return { fields, errors, handleChange, handleSubmit, isSubmitting }
}
