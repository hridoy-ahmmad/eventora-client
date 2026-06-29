"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const result = await authClient.signIn.email({
            ...data
        })
        console.log(result);

    };

    const signIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#111111] p-8 shadow-2xl">
                <h2 className="mb-2 text-center text-3xl font-bold text-white">
                    LogIn to your Account
                </h2>
                <p className="mb-8 text-center text-gray-400">
                    Join Eventora and start managing events effortlessly.
                </p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 text-gray-300"
                >

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Email Address
                        </label>

                        <input
                            {...register("email", {
                                required: "Email is required",
                            })}
                            type="email"
                            placeholder="john@example.com"
                            className="w-full rounded-lg border border-gray-700 bg-[#1a1a1a] px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Password
                        </label>

                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                                    message:
                                        "Password must contain uppercase, lowercase, number and special character",
                                },
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-gray-700 bg-[#1a1a1a] px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                        />

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>



                    {/* Role */}

                    {/* Show Password */}
                    <div className="flex items-center gap-2">
                        <input
                            id="showPassword"
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className="h-4 w-4 accent-blue-600"
                        />

                        <label
                            htmlFor="showPassword"
                            className="text-sm text-gray-400 cursor-pointer"
                        >
                            Show Password
                        </label>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-linear-to-r from-[#3B1DFF] via-[#6A1BFF] to-[#FF3DA8] py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/40 hover:scale-[1.02] "
                    >
                        Sing In
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="h-px flex-1 bg-gray-700"></div>
                    <span className="mx-4 text-sm text-gray-500">OR</span>
                    <div className="h-px flex-1 bg-gray-700"></div>
                </div>

                <button onClick={signIn} className="w-full rounded-lg border border-gray-700 bg-[#1a1a1a] py-3 font-medium text-white transition hover:bg-[#242424]">
                    Continue with Google
                </button>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Don`t have an account?{" "}
                    <Link
                        href={'/RegisterForm'}
                        type="button"
                        className="font-semibold text-blue-500 transition hover:text-blue-400"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}