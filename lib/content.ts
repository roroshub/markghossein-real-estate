import { cache } from 'react'
import {
  servicesArraySchema,
  listingsArraySchema,
  testimonialsArraySchema,
  toolsArraySchema,
  stepsArraySchema,
  type Service,
  type Listing,
  type Testimonial,
  type Tool,
  type Step,
} from './schemas'

async function loadJSON(filename: string): Promise<unknown> {
  const mod = await import(`@/content/${filename}.json`)
  return (mod as { default: unknown }).default
}

export const getServices = cache(async (): Promise<Service[]> => {
  const raw = await loadJSON('services')
  return servicesArraySchema.parse(raw)
})

export const getListings = cache(async (): Promise<Listing[]> => {
  const raw = await loadJSON('listings')
  return listingsArraySchema.parse(raw)
})

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const raw = await loadJSON('testimonials')
  return testimonialsArraySchema.parse(raw)
})

export const getTools = cache(async (): Promise<Tool[]> => {
  const raw = await loadJSON('tools')
  return toolsArraySchema.parse(raw)
})

export const getSteps = cache(async (): Promise<Step[]> => {
  const raw = await loadJSON('steps')
  return stepsArraySchema.parse(raw)
})
