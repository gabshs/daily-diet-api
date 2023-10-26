import 'reflect-metadata'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'
import { compare } from 'bcrypt'

let usersRepository: InMemoryUsersRepository
let regiserUserUseCase: RegisterUseCase

describe('RegiserUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    regiserUserUseCase = new RegisterUseCase(usersRepository)
  })
  it('should be able to register a user', async () => {
    const { user } = await regiserUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to hash user password upon registration', async () => {
    const { user } = await regiserUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123123',
    })

    const isPasswordCorrectlyHashed = compare('123123', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to register a user twice', async () => {
    await regiserUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123123',
    })

    const result = regiserUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123123',
    })

    await expect(result).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
    await expect(result).rejects.toThrowError('User already exists.')
  })
})
