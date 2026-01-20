export const authSchema = `
type LoginResponse {
  token: String
  success: Boolean!
}

type RegisterResponse {
  token: String
  user: UserAuth
  success: Boolean!
}

type UserAuth {
  id: String,
  email: String,
  role: String
}

input LoginInput {
  email: String
  password: String
}

input RegisterInput {
  email: String
  password: String
  role: String
}

extend type Mutation {
  login(input: LoginInput): LoginResponse!
  register(input: RegisterInput): RegisterResponse!
}
`