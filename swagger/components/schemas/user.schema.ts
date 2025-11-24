export const UserSchema = {
  User: {
    type: 'object',
    required: ['id', 'email', 'role'],
    properties: {
      id: {
        type: 'string',
        example: 'id-212121121221',
      },
      email: {
        type: 'string',
        example: 'test@test.com',
      },
      role: {
        type: 'string',
        example: 'admin',
      },
    },
  },
};

export const NewUserSchema = {
  NewUser: {
    type: 'object',
    required: ['email', 'password', 'role'],
    properties: {
      email: {
        type: 'string',
        example: 'test@test.com',
      },
      password: {
        type: 'string',
        example: 'xyz',
      },
      role: {
        type: 'string',
        example: 'admin',
      },
    },
  },
};

export const LoginSchema = {
  Login: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        example: 'test@test.com',
      },
      password: {
        type: 'string',
        example: 'xyz',
      },
    },
  },
};

export const TokenResponseSchema = {
  TokenResponse: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  },
};

export const AuthResponseSchema = {
  AuthResponse: {
    type: 'object',
    properties: {
      user: {
        $ref: '#/components/schemas/User',
      },
      token: {
        type: 'string',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  },
};
