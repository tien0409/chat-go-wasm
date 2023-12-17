export const API_URL = 'https://ab18-171-251-90-158.ngrok-free.app'
export const IMAGE_URL = API_URL + '/api/v1/file/get?fileId='
export const SOCKET_URL = 'wss://ab18-171-251-90-158.ngrok-free.app'
export const ACCESS_TOKEN_KEY = 'access_token'
export const CHAT_PREFIX = 'chat_'
export const CHAT_FILE = 'chat.json'
export const RATCHET_FILE = 'ratchet.json'
// export const AUTH_FILE = 'auth.json'
export const AUTH_FILE = 'auth2.json'
export const AVATAR_FILE = 'avatar'

export const TEXT_TYPE = 'CHAT_TEXT' as const
export const FILE_TYPE = 'CHAT_FILE' as const

export const MESSAGE_EVENT = 'CHAT_TEXT'
export const CHAT_NEW_EVENT = 'CHAT_NEW'

export const AVATAR_DEFAULT = 'https://source.unsplash.com/RZrIJ8C0860'
