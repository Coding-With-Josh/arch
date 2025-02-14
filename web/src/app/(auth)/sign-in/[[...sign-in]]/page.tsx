'use client'
import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
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
import { Glow } from '@/components/sections/landing/blocks/glow'

export default function SignInPage() {
  return (
    <>
    <div className="grid w-full min-h-screen grow items-center bg-zinc-950 px-4 sm:justify-center">
      <SignIn.Root>
      <Clerk.Loading>
        {(isGlobalLoading) => (
        <>
          <SignIn.Step name="start">
                <Card className="w-full border-zinc-800 bg-zinc-900/50 backdrop-blur sm:w-96">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100">Welcome back</CardTitle>
                    <CardDescription className="text-zinc-400">Sign in to continue to your account</CardDescription>
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
                    <Clerk.Field name="identifier" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label className="text-zinc-300">Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-blue-600" />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-red-500" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignIn.Action submit asChild>
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors" disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => isLoading ? <Icons.spinner className="size-4 animate-spin" /> : 'Continue'}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>

                      <Button variant="link" size="sm" asChild className="text-blue-500 hover:text-blue-400 transition-colors">
                        <Link href="/sign-up">
                          Don&apos;t have an account? Sign up
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SignIn.Step>

              <SignIn.Step name="choose-strategy">
                <Card className="w-full border-zinc-800 bg-zinc-900/50 backdrop-blur sm:w-96">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100">Use another method</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Facing issues? You can use any of these methods to sign in.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-6">
                    <SignIn.SupportedStrategy name="email_code" asChild>
                      <Button type="button" variant="link" disabled={isGlobalLoading} className="text-blue-500 hover:text-blue-400 transition-colors">
                        Email code
                      </Button>
                    </SignIn.SupportedStrategy>
                    <SignIn.SupportedStrategy name="password" asChild>
                      <Button type="button" variant="link" disabled={isGlobalLoading} className="text-blue-500 hover:text-blue-400 transition-colors">
                        Password
                      </Button>
                    </SignIn.SupportedStrategy>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignIn.Action navigate="previous" asChild>
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors" disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                'Go back'
                              )
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                    </div>
                  </CardFooter>
                </Card>
              </SignIn.Step>

              <SignIn.Step name="verifications">
                <SignIn.Strategy name="password">
                  <Card className="w-full border-zinc-800 bg-zinc-900/50 backdrop-blur sm:w-96">
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100">Check your email</CardTitle>
                      <CardDescription className="text-zinc-400">
                        Enter the verification code sent to your email
                      </CardDescription>
                      <p className="text-sm text-zinc-500">
                        Welcome back <SignIn.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className="grid gap-y-6">
                      <Clerk.Field name="password" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label className="text-zinc-300">Password</Label>
                        </Clerk.Label>
                        <Clerk.Input type="password" asChild>
                          <Input className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-blue-600" />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-red-500" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action submit asChild>
                          <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors" disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  'Continue'
                                )
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <Button type="button" size="sm" variant="link" className="text-blue-500 hover:text-blue-400 transition-colors">
                            Use another method
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>

                <SignIn.Strategy name="email_code">
                  <Card className="w-full border-zinc-800 bg-zinc-900/50 backdrop-blur sm:w-96">
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100">Check your email</CardTitle>
                      <CardDescription className="text-zinc-400">
                        Enter the verification code sent to your email
                      </CardDescription>
                      <p className="text-sm text-zinc-500">
                        Welcome back <SignIn.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className="grid gap-y-6">
                      <Clerk.Field name="code">
                        <Clerk.Label className="sr-only">Email verification code</Clerk.Label>
                        <div className="grid gap-y-2 items-center justify-center">
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              autoSubmit
                              className="flex justify-center has-[:disabled]:opacity-50"
                              render={({ value, status }) => {
                                return (
                                  <div
                                    data-status={status}
                                    className="relative flex h-9 w-9 items-center justify-center border-y border-r border-zinc-800 bg-zinc-900 text-zinc-100 text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-1 data-[status=selected]:ring-blue-600 data-[status=cursor]:ring-1 data-[status=cursor]:ring-blue-600"
                                  >
                                    {value}
                                  </div>
                                )
                              }}
                            />
                          </div>
                          <Clerk.FieldError className="block text-sm text-red-500 text-center" />
                          <SignIn.Action
                            asChild
                            resend
                            className="text-blue-500"
                            fallback={({ resendableAfter }) => (
                              <Button variant="link" size="sm" disabled>
                                Didn&apos;t receive a code? Resend (
                                <span className="tabular-nums">{resendableAfter}</span>)
                              </Button>
                            )}
                          >
                            <Button variant="link" size="sm" className="text-blue-500 hover:text-blue-400 transition-colors">
                              Didn&apos;t receive a code? Resend
                            </Button>
                          </SignIn.Action>
                        </div>
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action submit asChild>
                          <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors" disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  'Continue'
                                )
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <Button size="sm" variant="link" className="text-blue-500 hover:text-blue-400 transition-colors">
                            Use another method
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>

    </>
  )
}