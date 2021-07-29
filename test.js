const micro = require('micro')
const got = require('got')
const listen = require('test-listen')
const consola = require('consola')

const app = require('./app')

const fn = jest.fn()

let url = ''
let server

beforeEach(async () => {
  consola.mockTypes(() => fn)

  server = micro(app)
  url = await listen(server)
})

afterEach(() => {
  server.close()

  fn.mockClear()
})

test('should output get request', async () => {
  const response = await got.get(url)

  expect(response.body).toBe('success')

  expect(fn.mock.calls).toHaveLength(1)

  const [text, payload] = fn.mock.calls[0]

  expect(text).toBe('==> GET /')
  expect(payload).toEqual({
    method: 'GET',
    url: '/',
    headers: {},
    query: {},
    body: {},
  })
})

test('should output url of get request', async () => {
  const response = await got.get(`${url}/api/debug`)

  expect(response.body).toBe('success')

  expect(fn.mock.calls).toHaveLength(1)

  const [text, payload] = fn.mock.calls[0]

  expect(text).toBe('==> GET /api/debug')
  expect(payload).toEqual({
    method: 'GET',
    url: '/api/debug',
    headers: {},
    query: {},
    body: {},
  })
})

test('should output query of get request', async () => {
  const response = await got.get(`${url}?a=1&b=2`)

  expect(response.body).toBe('success')

  expect(fn.mock.calls).toHaveLength(1)

  const [text, payload] = fn.mock.calls[0]

  expect(text).toBe('==> GET /?a=1&b=2')
  expect(payload).toEqual({
    method: 'GET',
    url: '/',
    headers: {},
    query: {
      a: '1',
      b: '2',
    },
    body: {},
  })
})

test('should output searchParams of get request', async () => {
  const response = await got.get(url, {
    searchParams: {
      query: 'a b',
    },
  })

  expect(response.body).toBe('success')

  expect(fn.mock.calls).toHaveLength(1)

  const [text, payload] = fn.mock.calls[0]

  expect(text).toBe('==> GET /?query=a+b')
  expect(payload).toEqual({
    method: 'GET',
    url: '/',
    headers: {},
    query: {
      query: 'a b',
    },
    body: {},
  })
})

test('should output headers of get request', async () => {
  const response = await got.get(url, {
    headers: {
      'request-id': 'e1034572-58f9-42b1-b06f-bfcbcb6e2ac4',
    },
  })

  expect(response.body).toBe('success')

  expect(fn.mock.calls).toHaveLength(1)

  const [text, payload] = fn.mock.calls[0]

  expect(text).toBe('==> GET /')
  expect(payload).toEqual({
    method: 'GET',
    url: '/',
    headers: {
      'request-id': 'e1034572-58f9-42b1-b06f-bfcbcb6e2ac4',
    },
    query: {},
    body: {},
  })
})

test('should output json body of post request', async () => {
  const response = await got.post(url, {
    json: {
      a: 1,
    },
  })

  expect(response.body).toBe('success')

  expect(fn.mock.calls).toHaveLength(1)

  const [text, payload] = fn.mock.calls[0]

  expect(text).toBe('==> POST /')
  expect(payload).toEqual({
    method: 'POST',
    url: '/',
    headers: {},
    query: {},
    body: {
      a: 1,
    },
  })
})

test('should output text body of post request', async () => {
  const response = await got.post(url, {
    body: 'hello',
  })

  expect(response.body).toBe('success')

  expect(fn.mock.calls).toHaveLength(1)

  const [text, payload] = fn.mock.calls[0]

  expect(text).toBe('==> POST /')
  expect(payload).toEqual({
    method: 'POST',
    url: '/',
    headers: {},
    query: {},
    body: 'hello',
  })
})
