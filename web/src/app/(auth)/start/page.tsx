"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Settings, Activity, Box } from 'lucide-react';

const colors = [
  { name: 'blue', primary: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600' },
  { name: 'green', primary: 'bg-green-600', hover: 'hover:bg-green-700', text: 'text-green-600' },
  { name: 'purple', primary: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-purple-600' },
  { name: 'red', primary: 'bg-red-600', hover: 'hover:bg-red-700', text: 'text-red-600' },
  { name: 'orange', primary: 'bg-orange-600', hover: 'hover:bg-orange-700', text: 'text-orange-600' },
  { name: 'pink', primary: 'bg-pink-600', hover: 'hover:bg-pink-700', text: 'text-pink-600' },
  { name: 'indigo', primary: 'bg-indigo-600', hover: 'hover:bg-indigo-700', text: 'text-indigo-600' },
];

const themes = [
  { name: 'Dark', value: 'dark', preview: 'bg-zinc-900' },
  { name: 'Darker', value: 'darker', preview: 'bg-black' },
  { name: 'System', value: 'system', preview: 'bg-zinc-800' },
];

const Page = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    walletAddress: "",
    profilePhoto: "",
    selectedColor: colors[0],
    selectedTheme: themes[0],
    previewImage: "",
  });
  const [step, setStep] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setData({ ...data, previewImage: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-zinc-950 w-screen h-screen flex items-center justify-center text-white">
      <div className="h-[80%] w-[65%] bg-zinc-800 rounded-[2rem] flex items-center justify-between">
        {/* Left Panel */}
        <div className="h-full lg:w-[50%] w-full bg-zinc-900 lg:rounded-s-[2rem] lg:rounded-e-[0rem] rounded-[1.5rem] px-24 py-20">
          {step === 1 && (
            <div className="flex flex-col items-start justify-between h-full">
              <div className="">
                <Badge className="lg:hidden text-zinc-200 border-blue-700">
                  See Preview
                </Badge>
                <h2 className="text-2xl font-bold mt-4">Let&apos;s get you started</h2>
                <h2 className="text-md text-muted-foreground mt-2">
                  Complete your details to begin
                </h2>
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center justify-center space-x-5">
                  <div className="space-y-2">
                    <Label className="text-zinc-300">first name</Label>
                    <Input
                      className="w-full p-3 rounded-md bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      value={data.firstName}
                      type="text"
                      placeholder={data.firstName || "johndoey"}
                      onChange={(e) =>
                        setData({
                          ...data,
                          firstName: e.target.value,
                        })
                      }
                    />
                    {/* {data.firstName} */}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Last name</Label>
                    <Input
                      className="w-full p-3 rounded-md bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      value={data.lastName}
                      type="text"
                      onChange={(e) =>
                        setData({
                          ...data,
                          lastName: e.target.value,
                        })
                      }
                    />
                    {/* {data.lastName} */}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Username</Label>
                  <Input
                    className="w-full p-3 rounded-md bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    value={data.username}
                    type="text"
                    onChange={(e) =>
                      setData({
                        ...data,
                        username: e.target.value,
                      })
                    }
                  />
                  {/* {data.username} */}
                  <div className="space-y-2 mb-4">
                    <Label className="text-zinc-300">Profile photo</Label>
                    <Input
                      className="w-full p-3 rounded-md placeholder:text-white bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      // value={data.profilePhoto}
                      type="file"
                      // onChange={(e) =>
                      //   setData({
                      //     ...data,
                      //     profilePhoto: e.target.value,
                      //   })
                      // }
                    />
                    {/* {data.profilePhoto} */}
                  </div>
                  <div className="space-y-2  mt-6">
                    <Label className="text-zinc-300">
                      Connect your accounts
                    </Label>
                    <div className="flex items-start w-full space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        className="border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-blue-600/30 hover:text-white hover:border-blue-600 transition-all duration-300"
                      >
                        <Icons.google className="mr-2 size-4" />
                        Google
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        className="border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-blue-600/30 hover:text-white hover:border-blue-600 transition-all duration-300"
                      >
                        <Icons.gitHub className="mr-2 size-4" />
                        Github
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-end justify-end">
                <Button
                  className="bg-blue-600 w-full hover:bg-blue-700 transition-colors text-zinc-100 duration-300"
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col items-start justify-between h-full">
              <div>
                <Badge className="lg:hidden text-zinc-200 border-blue-700">
                  See Preview
                </Badge>
                <h2 className="text-2xl font-bold mt-4">Make yourself at home</h2>
                <h2 className="text-md text-muted-foreground mt-2">
                  Customize your dashboard
                </h2>
              </div>
              <div className="flex flex-col items-start gap-6 w-full">
                {/* Color Selection */}
                <div className="space-y-4 w-full">
                  <Label className="text-zinc-300">Primary Color</Label>
                  <div className="grid grid-cols-7 gap-3">
                    {colors.map((color) => (
                      <div
                        key={color.name}
                        onClick={() => setData(prev => ({ ...prev, selectedColor: color }))}
                        className={cn(
                          "size-8 rounded-full cursor-pointer transition-all duration-200",
                          color.primary,
                          data.selectedColor.name === color.name ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900" : ""
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Theme Selection */}
                <div className="space-y-4 w-full">
                  <Label className="text-zinc-300">Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {themes.map((theme) => (
                      <div
                        key={theme.value}
                        onClick={() => setData(prev => ({ ...prev, selectedTheme: theme }))}
                        className={cn(
                          "p-4 rounded-lg cursor-pointer transition-all duration-200",
                          theme.preview,
                          data.selectedTheme.value === theme.value ? "ring-2 ring-white/20" : "ring-1 ring-white/10"
                        )}
                      >
                        <span className="text-sm font-medium">{theme.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profile Photo Upload */}
                <div className="space-y-4 w-full">
                  <Label className="text-zinc-300">Profile Photo</Label>
                  <div className="flex items-center gap-4">
                    {data.previewImage && (
                      <div className="size-16 rounded-full overflow-hidden">
                        <img src={data.previewImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full p-3 rounded-md bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="w-full flex items-center justify-between mt-auto pt-6">
                  <Button
                    onClick={() => setStep(1)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white transition-all duration-200"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className={cn(
                      "text-white transition-all duration-200",
                      data.selectedColor.primary,
                      data.selectedColor.hover
                    )}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col items-start">
              <h2 className="text-2xl font-bold">Almost there...</h2>
              <h2 className="text-md text-muted-foreground mt-2">
                Tell us more about yourself
              </h2>
              <div className="flex flex-col items-start gap-3 mt-16">
                <div className="flex items-center justify-center space-x-5">
                  <div className="space-y-2">
                    <Label className="text-zinc-300">first name</Label>
                    <Input
                      className="w-full p-3 rounded-md bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      value={data.firstName}
                      type="text"
                      onChange={(e) =>
                        setData({
                          ...data,
                          firstName: e.target.value,
                        })
                      }
                    />
                    {/* {data.firstName} */}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Last name</Label>
                    <Input
                      className="w-full p-3 rounded-md bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      value={data.lastName}
                      type="text"
                      onChange={(e) =>
                        setData({
                          ...data,
                          lastName: e.target.value,
                        })
                      }
                    />
                    {/* {data.lastName} */}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Username</Label>
                  <Input
                    className="w-full p-3 rounded-md bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    value={data.username}
                    type="text"
                    onChange={(e) =>
                      setData({
                        ...data,
                        username: e.target.value,
                      })
                    }
                  />
                  {/* {data.username} */}
                  <div className="space-y-2 mb-4">
                    <Label className="text-zinc-300">Profile photo</Label>
                    <Input
                      className="w-full p-3 rounded-md placeholder:text-white bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      // value={data.profilePhoto}
                      type="file"
                      // onChange={(e) =>
                      //   setData({
                      //     ...data,
                      //     profilePhoto: e.target.value,
                      //   })
                      // }
                    />
                    {/* {data.profilePhoto} */}
                  </div>
                  <div className="space-y-2  mt-6">
                    <Label className="text-zinc-300">
                      Connect your accounts
                    </Label>
                    <div className="flex items-start w-full space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        className="border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-blue-600/30 hover:text-white hover:border-blue-600 transition-all duration-300"
                      >
                        <Icons.google className="mr-2 size-4" />
                        Google
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        className="border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-blue-600/30 hover:text-white hover:border-blue-600 transition-all duration-300"
                      >
                        <Icons.gitHub className="mr-2 size-4" />
                        Github
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-full flex items-center justify-between mt-12">
                  <Button
                    className="bg-zinc-600 text-white hover:bg-zinc-700 transition-colors duration-300"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 transition-colors text-zinc-100 duration-300">
                    Go to dashboard
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Preview Panel */}
        <div className={cn(
          "hidden lg:flex h-full w-[50%] flex-col",
          data.selectedTheme.preview
        )}>
          {step === 1 ? (
            // Profile Preview for Step 1
            <div className="p-8 h-full">
              <div className="flex items-start gap-6 p-6 rounded-lg bg-white/5">
                {data.previewImage ? (
                  <img src={data.previewImage} alt="Profile" className="size-24 rounded-full object-cover border-2 border-white/10" />
                ) : (
                  <div className="size-24 rounded-full bg-white/10 border-2 border-white/10" />
                )}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-medium">{data.firstName ? `${data.firstName} ${data.lastName}` : 'Your Name'}</h3>
                    <p className="text-lg text-white/60">{data.username ? `@${data.username}` : '@username'}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-white/10 hover:bg-white/20">Developer</Badge>
                    <Badge className="bg-white/10 hover:bg-white/20">Web3</Badge>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Dashboard Preview for Step 2
            <div className="h-full flex">
              {/* Sidebar */}
              <div className="w-[70px] h-full border-r border-white/10 flex flex-col items-center py-6 gap-6">
                <div className="size-8 rounded-lg bg-white/10" />
                <div className="space-y-6 mt-6">
                  {[LayoutDashboard, Users, Box, Activity, Settings].map((Icon, i) => (
                    <div
                      key={i}
                      className={cn(
                        "size-10 rounded-lg flex items-center justify-center transition-colors",
                        i === 0 ? data.selectedColor.primary : "bg-white/5 hover:bg-white/10"
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Navbar */}
                <div className="h-16 border-b border-white/10 flex items-center justify-between px-6">
                  <div className="h-2 w-24 rounded bg-white/10" />
                  <div className="flex items-center gap-4">
                    <div className="size-9 rounded-full bg-white/10" />
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-24 rounded-lg p-4",
                          i === 1 ? data.selectedColor.primary : "bg-white/5"
                        )}
                      >
                        <div className="space-y-2">
                          <div className="h-2 w-12 rounded bg-white/20" />
                          <div className="h-3 w-16 rounded bg-white/20" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Main Content Area */}
                  <div className="grid grid-cols-5 gap-4">
                    {/* Wide Card */}
                    <div className="col-span-3 h-[300px] rounded-lg bg-white/5 p-4">
                      <div className="space-y-4">
                        <div className="h-2 w-24 rounded bg-white/10" />
                        <div className="h-[200px] rounded bg-white/10" />
                      </div>
                    </div>

                    {/* Sidebar Cards */}
                    <div className="col-span-2 space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-[142px] rounded-lg bg-white/5 p-4">
                          <div className="space-y-2">
                            <div className="h-2 w-20 rounded bg-white/10" />
                            <div className="space-y-2">
                              {[1, 2, 3].map((j) => (
                                <div key={j} className="h-2 w-full rounded bg-white/10" />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
