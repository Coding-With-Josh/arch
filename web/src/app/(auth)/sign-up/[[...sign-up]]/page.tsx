'use client'
import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export default function SignUpPage() {
  return (
    <div className="grid w-full min-h-screen grow items-center bg-zinc-950 px-4 sm:justify-center">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start">
                <Card className="w-full border-zinc-800 bg-zinc-900/50 backdrop-blur sm:w-96">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100">Create account</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Get started by creating your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-6">
                    <div className="grid grid-cols-2 gap-x-4">
                      <Clerk.Connection name="github" asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          disabled={isGlobalLoading}
                          className="border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                        >
                          <Clerk.Loading scope="provider:github">
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Icons.gitHub className="mr-2 size-4" />
                                  GitHub
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                      <Clerk.Connection name="google" asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          disabled={isGlobalLoading}
                          className="border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                        >
                          <Clerk.Loading scope="provider:google">
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Icons.google className="mr-2 size-4" />
                                  Google
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                    </div>
                    <p className="flex items-center gap-x-3 text-sm text-zinc-500 before:h-px before:flex-1 before:bg-zinc-800 after:h-px after:flex-1 after:bg-zinc-800">
                      or continue with email
                    </p>
                    <Clerk.Field name="emailAddress" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label className="text-zinc-300">Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-blue-600" />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-red-500" />
                    </Clerk.Field>
                    <Clerk.Field name="password" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label className="text-zinc-300">Password</Label>
                      </Clerk.Label>
                      <Clerk.Input type="password" required asChild>
                        <Input className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-blue-600" />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-red-500" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignUp.Captcha className="empty:hidden" />
                      <SignUp.Action submit asChild>
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors" disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => isLoading ? <Icons.spinner className="size-4 animate-spin" /> : 'Continue'}
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                      <Button variant="link" size="sm" asChild className="text-blue-500 hover:text-blue-400 transition-colors">
                        <Link href="sign-in">Already have an account? Sign in</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              <SignUp.Step name="continue">
                <Card className="w-full border-zinc-800 bg-zinc-900/50 backdrop-blur sm:w-96">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100">Complete profile</CardTitle>
                    <CardDescription className="text-zinc-400">Choose your username</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-6">
                    <Clerk.Field name="username" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label className="text-zinc-300">Username</Label>
                      </Clerk.Label>
                      <Clerk.Input type="text" required asChild>
                        <Input className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-blue-600" />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-red-500" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignUp.Action submit asChild>
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors" disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => isLoading ? <Icons.spinner className="size-4 animate-spin" /> : 'Continue'}
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              <SignUp.Step name="verifications">
                <SignUp.Strategy name="email_code">
                  <Card className="w-full border-zinc-800 bg-zinc-900/50 backdrop-blur sm:w-96">
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100">Check your email</CardTitle>
                      <CardDescription className="text-zinc-400">
                        We&apos;ve sent you a verification code
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-y-6">
                      <div className="grid items-center justify-center gap-y-2">
                        <Clerk.Field name="code" className="space-y-2">
                          <Clerk.Label className="sr-only">Verification code</Clerk.Label>
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              className="flex justify-center has-[:disabled]:opacity-50"
                              autoSubmit
                              render={({ value, status }) => (
                                <div
                                  data-status={status}
                                  className="relative flex h-9 w-9 items-center justify-center border-y border-r border-zinc-800 bg-zinc-900 text-zinc-100 text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-1 data-[status=selected]:ring-blue-600 data-[status=cursor]:ring-1 data-[status=cursor]:ring-blue-600"
                                >
                                  {value}
                                </div>
                              )}
                            />
                          </div>
                          <Clerk.FieldError className="block text-sm text-red-500 text-center" />
                          <SignUp.Action
                            asChild
                            resend
                            className="text-blue-500 hover:text-blue-400 transition-colors"
                            fallback={({ resendableAfter }) => (
                              <Button variant="link" size="sm" disabled className="text-blue-500">
                                Resend code ({resendableAfter}s)
                              </Button>
                            )}
                          >
                            <Button variant="link" size="sm" className="text-blue-500 hover:text-blue-400 transition-colors">
                              Didn&apos;t receive a code? Resend
                            </Button>
                          </SignUp.Action>
                        </Clerk.Field>
                      </div>
                    </CardContent>
                  </Card>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  )
}