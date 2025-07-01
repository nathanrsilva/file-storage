import * as z from "zod/v4";

export const loginSchema = z.object({
    email: z
    .email('Invalid email')
    .trim()
    .nonempty('Email cannot be an empty field'),

    password: z.string('Password is requred').trim().nonempty('Password cannot be an empty field')
})
