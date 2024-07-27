'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'


const MyProfile = () => {

    const { data : session } = useSession()
    const [Post, setPost] = useState([])

    useEffect(() =>
    {   
        const fetchPost = async () =>
        {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()
            setPost(data)
        }

        if(session?.user.id)
            fetchPost()

    }, [session?.user.id])

    const handleEdit = async () =>
    {

    }

    const handleDelete = async () =>
    {

    }

  return (
    <div>
      <Profile 
        name="My"
        desc="Welcome to your personalized profile"
        data={Post}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default MyProfile
