'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

import Form from '@components/Form'

const createPrompt = () => {

  const [submitting, setsubmitting] = useState(false);
  const [post, setpost] = useState({
    prompt: '',
    tag: ''
  })

  const createPost = async (e) =>
  {

  }

  return (
    <Form 
      type="Create"
      post={post}
      setpost={setpost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  )
}

export default createPrompt
