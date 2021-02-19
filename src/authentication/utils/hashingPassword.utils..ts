import * as bcrypt from 'bcrypt'

const BCRYPT_SALT = 10

export const hashUserPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, BCRYPT_SALT)
}

export const compareUserPassword = async (
  candidatePassword: string,
  passwordFromCredentials: string,
): Promise<boolean> => {
  return bcrypt.compare(passwordFromCredentials, candidatePassword)
}
