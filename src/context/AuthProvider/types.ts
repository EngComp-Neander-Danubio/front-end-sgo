import { ReactNode } from 'react'

export interface IUser {
  email?: string
  token?: string
  user?: string
  matricula?: string
  nome?: string,
  id?: string
}

export interface IContext extends IUser {
  authenticate: (email: string, token: string) => Promise<void>
  isTokenValid: (token?: string) => boolean
  logout: () => void
}

export interface IAuthProvider {
  children: ReactNode
}

export interface IDecodedToken {
  sub: string
  iat: number
  exp: number
}
