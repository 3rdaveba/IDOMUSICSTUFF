export type LocaleTree = { [key: string]: string | LocaleTree | Array<string | LocaleTree> }

export function setLocaleValue(root: LocaleTree, key: string, value: string) {
  const parts = key.split(/\.|\[(\d+)\]/).filter(Boolean)
  if (!parts.length || parts.some(part => ['__proto__', 'prototype', 'constructor'].includes(part))) {
    throw new Error(`Unsafe locale key: ${key}`)
  }
  let current = root
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    if (!Object.hasOwn(current, part)) current[part] = /^\d+$/.test(parts[i + 1]) ? [] : {}
    const child = current[part]
    if (typeof child === 'string') throw new Error(`Locale key conflicts with a string: ${key}`)
    current = child as LocaleTree
  }
  current[parts[parts.length - 1]] = value
}

export function unflattenLocale(flat: Record<string, string>): LocaleTree {
  const result: LocaleTree = {}
  for (const [key, value] of Object.entries(flat)) setLocaleValue(result, key, value)
  return result
}
