'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'


const MyProfile = () => {

    const { data : session } = useSession()
    const [Post, setPost] = useState([])
    const router = useRouter()

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

    const handleEdit = async (post) =>
    {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) =>
    {
        const hasConfirm = confirm("Are you sure you want to delete this prompt ?")

        if(hasConfirm)
        {
          try {
            await fetch(`/api/prompt/${post._id.toString()}`, {
              method : 'DELETE'
            })

            const filteredPost = Post.filter((p) => p._id !== post._id)
            setPost(filteredPost)

          } catch (error) {
            console.log(error)
          }
        }
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
