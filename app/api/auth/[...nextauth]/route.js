import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";
import User from "@models/user";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            // You got this from google cloud console.
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({email: session.user.email})
            session.user.id = sessionUser._id.toString();
            return session;
        },

        async signIn({ profile }) {
            try {
                await connectToDB();
                // Check if the user exist
                const userexists = await User.findOne({
                    email: profile.email
                })

                // If not create a new user
                if (!userexists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true;
            } catch (error) {
                console.error(error)
            }
        }
    }

})

export { handler as GET, handler as POST }