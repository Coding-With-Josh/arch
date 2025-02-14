import * as z from "zod"

export const onboardingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores and dashes"),
  profilePhoto: z.string().optional(),
  selectedColor: z.object({
    name: z.string(),
    primary: z.string(),
    hover: z.string(),
    text: z.string(),
  }),
  selectedTheme: z.object({
    name: z.string(),
    value: z.string(),
    preview: z.string(),
  }),
})

export type OnboardingData = z.infer<typeof onboardingSchema>
