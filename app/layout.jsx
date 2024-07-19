import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'

export const metadata = {
    title: 'PromptShare',
    description: 'Discover and share prompts'
}


const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                {/* This is used to make session details availabe to all components
                like Profile picture,username, email and others. */}
                <Provider>
                    {/* Not necessary, this is just for backgrounds */}
                    <div className="main">
                        <div className='gradient' />
                    </div>
                    {/* Main component which has everything inside it */}
                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout
