import Nav from '@components/Nav'
import '@styles/globals.css'

export const metadata = {
    title : 'PromptShare',
    description : 'Discover and share prompts'
}


const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            {/* Not necessary, this is just for backgrounds */}
            <div className="main">
                <div className='gradient'/>
            </div>
            {/* Main component which has everything inside it */}
            <main className='app'>
                <Nav />
                {children}
            </main>

        </body>
    </html>
  )
}

export default RootLayout
