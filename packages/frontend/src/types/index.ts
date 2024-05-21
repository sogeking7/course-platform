export type Auth = {
  email: string,
  password: string
}

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  profile_image_url?: string,
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