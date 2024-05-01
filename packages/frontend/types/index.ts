export type User = {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  profile_image_url?: string
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