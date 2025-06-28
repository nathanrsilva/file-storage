import * as z from "zod/v4";

export const loginSchema = z.object({
    email: z
    .email('Invalid email. Example of a valid email: ex@example.com')
    .trim()
    .nonempty('Email cannot be an empty field'),

    password: z.string().trim().nonempty('Password cannot be an empty field')
})
