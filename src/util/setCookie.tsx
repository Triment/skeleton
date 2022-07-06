import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

/**
 * This sets `cookie` using the `res` object
 */
/**
 * 
 * @param {NextApiResponse} res 
 * @param {string} name 
 * @param {unknown} value 
 * @param {CookieSerializeOptions} options 
 */
export const setCookie = (
  res,
  name,
  value,
  options = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}
