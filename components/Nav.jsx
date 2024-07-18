'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Nav = () => {

  const isUserLogged = true

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


      {/* Desktop navigation : means if the screen size is above 640px apply the below property*/}
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
              />
            </Link>

          </div>
        ) 
        
        :

        (
          <>

          </>
        )}

      </div>

   </nav>
  )
}

export default Nav
