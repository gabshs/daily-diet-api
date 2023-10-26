export class ResourceAlreadyExists extends Error {
  constructor(resource: string) {
    super(`${resource} already exists.`)
  }
}
