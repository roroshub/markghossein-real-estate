import { z } from 'zod'

/* ─── Content schemas ─────────────────────────────────────────────────────── */

export const serviceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  bullets: z.array(z.string()),
  cta: z.object({ label: z.string(), href: z.string() }),
})

export const listingSchema = z.object({
  id: z.string(),
  status: z.enum(['for-sale', 'sold', 'new']),
  price: z.string(),
  address: z.string(),
  city: z.string(),
  beds: z.number().int().positive(),
  baths: z.number().int().positive(),
  sqft: z.number().int().positive(),
  featured: z.boolean().default(false),
})

export const testimonialSchema = z.object({
  id: z.string(),
  quote: z.string(),
  name: z.string(),
  detail: z.string(),
  initials: z.string().max(2),
  rating: z.number().min(1).max(5),
})

export const toolSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  cta: z.string(),
})

export const stepSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
})

/* ─── Collections ─────────────────────────────────────────────────────────── */

export const servicesArraySchema  = z.array(serviceSchema)
export const listingsArraySchema  = z.array(listingSchema)
export const testimonialsArraySchema = z.array(testimonialSchema)
export const toolsArraySchema     = z.array(toolSchema)
export const stepsArraySchema     = z.array(stepSchema)

/* ─── Contact form ────────────────────────────────────────────────────────── */

export const interestValues = [
  'Buying a Home',
  'Selling My Home',
  'Upsizing / Downsizing',
  'Home Valuation',
  'Investment Property',
  'Just Exploring',
] as const

export const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(80),
  lastName:  z.string().min(1, 'Last name is required').max(80),
  email:     z.string().email('Please enter a valid email address'),
  phone:     z.string().max(30).optional().or(z.literal('')),
  interest:  z.enum(interestValues).optional(),
  message:   z.string().max(2000).optional(),
})

/* ─── Inferred types ──────────────────────────────────────────────────────── */

export type Service     = z.infer<typeof serviceSchema>
export type Listing     = z.infer<typeof listingSchema>
export type Testimonial = z.infer<typeof testimonialSchema>
export type Tool        = z.infer<typeof toolSchema>
export type Step        = z.infer<typeof stepSchema>
export type ContactForm = z.infer<typeof contactSchema>
