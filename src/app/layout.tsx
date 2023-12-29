import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Movietracker',
    description: 'Сайт для ведения собственно watchlist`а по фильмам и сериалам.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <link rel="icon" href="https://media.discordapp.net/attachments/1150833613936533574/1184505743550980198/Frame_1_1.png?ex=658c37f0&is=6579c2f0&hm=cf92c6b58c8d4f497e052760987700b7fd50d47ca7a5966ef20b6edd5762ba9e&=&format=webp&quality=lossless&width=89&height=89" />
            <body className={inter.className}>{children}</body>
        </html>
    )
}
