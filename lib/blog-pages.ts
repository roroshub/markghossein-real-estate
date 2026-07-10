// Client-safe (no DB import): the service pages a post can be attached to.
export const TARGET_PAGES: { key: string; label: string }[] = [
  { key: 'buyers',     label: 'Buyer Representation' },
  { key: 'sellers',    label: 'Seller Representation' },
  { key: 'upsizing',   label: 'Upsizing' },
  { key: 'downsizing', label: 'Downsizing' },
  { key: 'investment', label: 'Investment Strategy' },
  { key: 'probate',    label: 'Probate & Estate Sales' },
]
