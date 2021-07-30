const querystring = require('querystring')
const _ = require('lodash')
const consola = require('consola')
const { text, json } = require('micro')

const reporter =
  process.env.NODE_ENV === 'development'
    ? new consola.FancyReporter()
    : new consola.JSONReporter()

consola.setReporters(reporter)

module.exports = async (req, res) => {
  const { method, headers } = req

  let url = req.url

  let query = {}

  if (url.indexOf('?') !== -1) {
    const i = url.indexOf('?')
    const qs = url.substring(i + 1)

    url = url.substring(0, i)
    query = _.assign({}, querystring.parse(qs))
  }

  let body = ''

  try {
    const result = await json(req)

    body = JSON.stringify(result)
  } catch (err) {
    try {
      const txt = await text(req)

      if (txt) {
        body = txt
      }
    } catch (err) {}
  }

  const payload = {
    method,
    url,
    headers,
    query,
    body,
  }

  consola.info(`==> ${method} ${req.url}`, payload)

  return 'success'
}
