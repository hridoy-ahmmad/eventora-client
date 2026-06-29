'use client';

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = authClient.useSession()

  const handleSighOut = async () => {
    await authClient.signOut();
  }


  const user = session?.user
  const navItems = (
    <>
      <li>
        <Link
          href="/"
          className="text-sm font-medium text-zinc-300 transition-all duration-300 hover:text-white"
        >
          Home
        </Link>
      </li>

      <li>
        <Link
          href="#"
          className="text-sm font-medium text-zinc-300 transition-all duration-300 hover:text-white"
        >
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          href="#"
          className="text-sm font-medium text-zinc-300 transition-all duration-300 hover:text-white"
        >
          Pricing
        </Link>
      </li>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-2xl">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Eventora Logo"
            width={42}
            height={42}
            priority
          />

          <span className="text-2xl font-bold tracking-wide text-white">
            Eventora
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-10 md:flex">
          {navItems}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Desktop Buttons */}
          {
            user ? <div className=" flex">
              <p>{user?.name}</p>
              <Button
                className="w-full rounded-lg bg-linear-to-r from-[#3B1DFF] via-[#6A1BFF] to-[#FF3DA8] py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg  hover:scale-[1.02] hidden md:flex"
              >
                <Link onClick={handleSighOut} className={'hover:no-underline'}>
                  Sign out
                </Link>
              </Button>
            </div> : <div className="border-t border-white/10 backdrop-blur-2xl">
              <ul className=" gap-6 px-6 py-6 hidden md:flex items-center">
                <li>
                  <Link
                    href="#"
                    className="text-sm font-medium text-zinc-300 transition hover:no-underline hover:text-white"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Button
                    className="w-full rounded-lg bg-linear-to-r from-[#3B1DFF] via-[#6A1BFF] to-[#FF3DA8] py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg  hover:scale-[1.02]"
                  >
                    <Link className={'hover:no-underline'}>
                      Sign Up
                    </Link>
                  </Button>
                </li>
              </ul>
            </div>
          }

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:bg-white/10 md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? "max-h-96" : "max-h-0"
          }`}
      >
        {
          user ? <div className=" ">
           {navItems}
            <Button
              className="w-full rounded-lg bg-linear-to-r from-[#3B1DFF] via-[#6A1BFF] to-[#FF3DA8] py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg  hover:scale-[1.02]"
            >
              <Link onClick={handleSighOut} className={'hover:no-underline'}>
                Sign out
              </Link>
            </Button>
          </div> : <div className="border-t border-white/10 bg-zinc-950/95 backdrop-blur-2xl">
            <ul className="flex flex-col gap-6 px-6 py-6">

              {navItems}

              <li>
                <Link
                  href="#"
                  className="text-sm font-medium text-zinc-300 transition hover:text-white"
                >
                  Login
                </Link>
              </li>

              <li>
                <Button
                  className="w-full rounded-lg bg-linear-to-r from-[#3B1DFF] via-[#6A1BFF] to-[#FF3DA8] py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg  hover:scale-[1.02]"
                >
                  <Link className={'hover:no-underline'}>
                    Sign Up
                  </Link>

                </Button>
              </li>

            </ul>
          </div>
        }
      </div>
    </nav>
  );
}

