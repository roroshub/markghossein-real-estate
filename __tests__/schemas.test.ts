import { describe, it, expect } from 'vitest'
import {
  contactSchema,
  serviceSchema,
  listingSchema,
  testimonialSchema,
  toolSchema,
  stepSchema,
} from '@/lib/schemas'

describe('contactSchema', () => {
  it('accepts a valid full payload', () => {
    const result = contactSchema.safeParse({
      firstName: 'Jane',
      lastName:  'Doe',
      email:     'jane@example.com',
      phone:     '+1 416 000 0000',
      interest:  'Buying a Home',
      message:   'Hello there',
    })
    expect(result.success).toBe(true)
  })

  it('accepts a minimal payload (only required fields)', () => {
    const result = contactSchema.safeParse({
      firstName: 'Jane',
      lastName:  'Doe',
      email:     'jane@example.com',
    })
    expect(result.success).toBe(true)
  })

  it('rejects an empty first name', () => {
    const result = contactSchema.safeParse({
      firstName: '',
      lastName:  'Doe',
      email:     'jane@example.com',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.firstName).toBeDefined()
    }
  })

  it('rejects an invalid email', () => {
    const result = contactSchema.safeParse({
      firstName: 'Jane',
      lastName:  'Doe',
      email:     'not-an-email',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined()
    }
  })

  it('rejects an invalid interest value', () => {
    const result = contactSchema.safeParse({
      firstName: 'Jane',
      lastName:  'Doe',
      email:     'jane@example.com',
      interest:  'Illegal Interest',
    })
    expect(result.success).toBe(false)
  })

  it('coerces empty phone to undefined', () => {
    const result = contactSchema.safeParse({
      firstName: 'Jane',
      lastName:  'Doe',
      email:     'jane@example.com',
      phone:     '',
    })
    expect(result.success).toBe(true)
  })
})

describe('serviceSchema', () => {
  it('parses a valid service', () => {
    const result = serviceSchema.safeParse({
      id: 'buyer',
      title: 'Buyer Representation',
      description: 'We help buyers.',
      bullets: ['Item 1', 'Item 2'],
      cta: { label: 'Start', href: '#contact' },
    })
    expect(result.success).toBe(true)
  })

  it('rejects a service with no bullets', () => {
    const result = serviceSchema.safeParse({
      id: 'buyer',
      title: 'Buyer',
      description: 'desc',
      cta: { label: 'Go', href: '#' },
    })
    expect(result.success).toBe(false)
  })
})

describe('listingSchema', () => {
  const validListing = {
    id: 'test-1',
    status: 'for-sale',
    price: '$1,000,000',
    address: '1 Main St',
    city: 'Toronto, Ontario',
    beds: 3,
    baths: 2,
    sqft: 1500,
    featured: false,
  }

  it('parses a valid listing', () => {
    expect(listingSchema.safeParse(validListing).success).toBe(true)
  })

  it('rejects invalid status', () => {
    expect(listingSchema.safeParse({ ...validListing, status: 'rented' }).success).toBe(false)
  })

  it('rejects non-positive beds', () => {
    expect(listingSchema.safeParse({ ...validListing, beds: 0 }).success).toBe(false)
  })
})

describe('testimonialSchema', () => {
  it('parses a valid testimonial', () => {
    const result = testimonialSchema.safeParse({
      id: 't1',
      quote: 'Great agent!',
      name: 'John D.',
      detail: 'Bought in Toronto',
      initials: 'JD',
      rating: 5,
    })
    expect(result.success).toBe(true)
  })

  it('rejects a rating above 5', () => {
    const result = testimonialSchema.safeParse({
      id: 't1',
      quote: 'q',
      name: 'n',
      detail: 'd',
      initials: 'ND',
      rating: 6,
    })
    expect(result.success).toBe(false)
  })

  it('rejects initials longer than 2 chars', () => {
    const result = testimonialSchema.safeParse({
      id: 't1',
      quote: 'q',
      name: 'n',
      detail: 'd',
      initials: 'ABC',
      rating: 5,
    })
    expect(result.success).toBe(false)
  })
})

describe('toolSchema', () => {
  it('parses a valid tool', () => {
    const result = toolSchema.safeParse({
      id: 'homeworth',
      title: 'HomeWorth',
      description: 'Get a valuation.',
      cta: 'Get Valuation',
    })
    expect(result.success).toBe(true)
  })
})

describe('stepSchema', () => {
  it('parses a valid step', () => {
    const result = stepSchema.safeParse({
      number: '01',
      title: 'Clarity Session',
      description: 'We plan.',
    })
    expect(result.success).toBe(true)
  })
})
