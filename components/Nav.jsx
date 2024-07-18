'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Nav = () => {

  const isUserLogged = true

  const [Providers, setProviders] = useState(null)
  const [Toggle, setToggle] = useState(false)

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    setProvider()
  }, [])


  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>promptShare</p>
      </Link>


      {/* Desktop navigation : If the screen size is above 640px apply the below property*/}
      <div className="sm:flex hidden">
        {isUserLogged ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/createPrompt' className='black_btn'>
              Create post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src='/assets/images/logo.svg'
                width={37}
                height={37}
                alt='profile'
              />
            </Link>

          </div>
        )
          :
          (
            <>
              {Providers &&

                Object.values(Providers).map((provider) =>
                (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                  >
                    Sign In
                  </button>
                ))

              }
            </>
          )}
      </div>


      {/* Mobile navigation : if the screen size is above 640px hide the below div*/}
      <div className="sm:hidden flex relative">

        {isUserLogged ?
          (
            <div>
              <Image
                src='/assets/images/logo.svg'
                width={37}
                height={37}
                alt='profile'
                onClick={() => setToggle((prev) => !prev)}
              />

              {Toggle &&
                (
                  <div className="dropdown">
                    <Link
                      href='/profile'
                      className='dropdown_link w-full text-center'
                      onClick={() => setToggle(false)}
                    >
                      My profile
                    </Link>

                    <Link
                      href='/createPrompt'
                      className='dropdown_link w-full text-center'
                      onClick={() => setToggle(false)}
                    >
                      Create Prompt
                    </Link>

                    <button
                      type='button'
                      onClick={() => {
                        setToggle(false)
                        signOut()
                      }}
                      className='mt-5 w-full black_btn'
                    >
                      Sign Out
                    </button>

                  </div>
                )
              }

            </div>

          ) :

          (
            <>
              {Providers &&
                Object.values(Providers).map((provider) =>
                (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                  >
                    Sign In
                  </button>
                ))
              }
            </>
          )}

      </div>

    </nav>
  )
}

export default Nav
