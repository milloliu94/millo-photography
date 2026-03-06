'use client'

import Link from 'next/link'
import Image from 'next/image'
import {motion} from 'framer-motion'

const textVariants = {
  hidden: {opacity: 0, y: 40},
  visible: {opacity: 1, y: 0, transition: {duration: 0.8, ease: 'easeOut'}},
}

const imageVariants = {
  hidden: {opacity: 0, y: 40},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.8, ease: 'easeOut', delay: 0.15},
  },
}

export function AboutClient({avatarUrl}: {avatarUrl: string}) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      {/* Navbar */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.3em] text-zinc-900 hover:opacity-80"
          >
            MILLO&apos;S PHOTOGRAPHY
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-14 md:flex-row md:gap-8">
          {/* Left: Avatar from Sanity */}
          <motion.div
            className="mb-10 flex w-full justify-center md:mb-0 md:w-1/2"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            <div className="flex aspect-square w-56 items-center justify-center overflow-hidden rounded-full bg-gray-100 shadow-lg sm:w-64 md:w-72 lg:w-80">
              <Image
                src={avatarUrl}
                alt="Millo portrait"
                width={400}
                height={400}
                priority
                style={{objectFit: 'cover', width: '100%', height: '100%'}}
                sizes="(max-width: 768px) 70vw, 320px"
              />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            className="flex w-full flex-col items-start justify-center space-y-10 md:w-1/2"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h1
              className="mb-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl"
              style={{letterSpacing: '0.08em'}}
            >
              Framing the world,
              <br />
              one moment at a time
            </h1>
            <div className="space-y-8 text-left">
              <p className="text-lg leading-relaxed tracking-wider sm:text-xl">
                Welcome to <span className="font-semibold">MILLO’s Photography</span>{' '}
                <span role="img" aria-label="wave">
                  👋
                </span>
              </p>
              <p className="text-base leading-loose tracking-wide sm:text-lg">
                This is my visual diary—a collection of fragments gathered from
                daily life and distant travels.
                <br />
                My updates may be irregular, but the stories behind the lens are
                constant.
                <br />
                Take a seat, stay a while, and enjoy the view.
              </p>
              <p className="select-all text-base leading-loose tracking-widest sm:text-lg">
                <span className="mr-2 align-middle" aria-hidden="true">
                  ✉️
                </span>
                <span className="align-middle">millo94@gmail.com</span>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

