import { Role } from "@prisma/client"

export interface User {
  id: string
  email: string
  name: string | null
  username: string | null
  avatarUrl: string | null
  role: Role
  onboardingCompleted: boolean
  onboardingStep: number
  walletAddress: string | null
  authProviderId: string | null
  walletProviderId: string | null
  isVerified: boolean
}
