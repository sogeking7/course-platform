export type Auth = {
  email: string,
  password: string
}

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  profilePictureLink?: string,
  role: UserRole
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type CreateUserDto = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  profilePictureLink?: string,
  role: UserRole
}

export type Module = {
  id: number,
  name: string,
  description: string,
  course_id: number | null,
  profile_image: string,
}

export type Course = {
  id: number,
  name: string,
  description: string,
  profile_image: string,
}

export type Topic = {
  id: number,
  name: string,
  description: string,
  text_material: string,
}