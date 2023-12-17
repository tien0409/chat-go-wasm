import crypto from 'crypto'

const algorithm = {
  name: 'AES-CBC',
  iv: new Uint8Array(16)
}

function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

export async function encryptblob(blob, rawKey) {
  const key = await crypto.subtle.importKey('raw', base64ToArrayBuffer(rawKey), 'AES-CBC', true, [
    'encrypt',
    'decrypt'
  ])
  const data = await blob.arrayBuffer()
  const result = await crypto.subtle.encrypt(algorithm, key, data)
  return new Blob([result])
}

export async function decryptblob(encblob, rawKey) {
  const key = await crypto.subtle.importKey('raw', base64ToArrayBuffer(rawKey), 'AES-CBC', true, [
    'encrypt',
    'decrypt'
  ])
  const data = await encblob.arrayBuffer()
  const decryptedData = await crypto.subtle.decrypt(algorithm, key, data)
  return new Blob([decryptedData])
}
