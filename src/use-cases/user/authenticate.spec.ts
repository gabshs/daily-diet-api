import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcrypt'
import 'reflect-metadata'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateUseCase } from './authenticate'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('AuthenticateUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to authenticate a user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123123', 6),
    })
    const { user } = await sut.execute({
      email: 'john.doe@email.com',
      password: '123123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a user with wrong email', async () => {
    const promise = sut.execute({
      email: 'john.doe@email.com',
      password: '123123',
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
    await expect(promise).rejects.toThrowError('Invalid credentials error.')
  })

  it('should not be able to authenticate a user with wrong email', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123123', 6),
    })

    const promise = sut.execute({
      email: 'john.doe@email.com',
      password: 'wrong_password',
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
    await expect(promise).rejects.toThrowError('Invalid credentials error.')
  })
})
