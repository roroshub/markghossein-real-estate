import { describe, it, expect } from 'vitest'
import {
  servicesArraySchema,
  listingsArraySchema,
  testimonialsArraySchema,
  toolsArraySchema,
  stepsArraySchema,
} from '@/lib/schemas'

import servicesData     from '@/content/services.json'
import listingsData     from '@/content/listings.json'
import testimonialsData from '@/content/testimonials.json'
import toolsData        from '@/content/tools.json'
import stepsData        from '@/content/steps.json'

describe('Content JSON files validate against schemas', () => {
  it('services.json is valid', () => {
    const result = servicesArraySchema.safeParse(servicesData)
    expect(result.success).toBe(true)
  })

  it('listings.json is valid', () => {
    const result = listingsArraySchema.safeParse(listingsData)
    expect(result.success).toBe(true)
  })

  it('testimonials.json is valid', () => {
    const result = testimonialsArraySchema.safeParse(testimonialsData)
    expect(result.success).toBe(true)
  })

  it('tools.json is valid', () => {
    const result = toolsArraySchema.safeParse(toolsData)
    expect(result.success).toBe(true)
  })

  it('steps.json is valid', () => {
    const result = stepsArraySchema.safeParse(stepsData)
    expect(result.success).toBe(true)
  })

  it('services.json has at least one service with required cta', () => {
    const parsed = servicesArraySchema.parse(servicesData)
    expect(parsed.length).toBeGreaterThan(0)
    parsed.forEach((s) => {
      expect(s.cta.label).toBeTruthy()
      expect(s.cta.href).toBeTruthy()
    })
  })

  it('listings.json statuses are all valid enum values', () => {
    const parsed = listingsArraySchema.parse(listingsData)
    const validStatuses = ['for-sale', 'sold', 'new']
    parsed.forEach((l) => {
      expect(validStatuses).toContain(l.status)
    })
  })

  it('steps.json numbers are two-digit strings', () => {
    const parsed = stepsArraySchema.parse(stepsData)
    parsed.forEach((s) => {
      expect(s.number).toMatch(/^\d{2}$/)
    })
  })
})
