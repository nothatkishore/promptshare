"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPromptContent = ({ promptId }) => {
    const router = useRouter();
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };

        if (promptId) getPromptDetails();
    }, [promptId]);

    if (!promptId) return alert("Prompt Id not found");

    const updatePrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
};

const EditPrompt = () => {
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {promptId ? <EditPromptContent promptId={promptId} /> : <div>Prompt ID not found</div>}
        </Suspense>
    );
};

export default EditPrompt;
