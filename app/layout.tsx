import type { Metadata } from 'next';

import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from 'next/font/google';
import * as H from 'next/headers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import './globals.css';

import { ApiProvider } from '@/components/api-provider';
import { MainNav } from '@/components/main-nav';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'next-kit — by @natedunn',
	description: 'A starter kit made by @natedunn',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headers = new Headers(await H.headers());

	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider attribute='class' defaultTheme='system'>
					<NuqsAdapter>
						<ApiProvider headers={headers}>
							<div className='flex flex-col items-center justify-center min-h-screen'>
								<div className='w-full max-w-[32rem] py-10'>
									<MainNav />
									<div className='mt-4'>{children}</div>
								</div>
							</div>
						</ApiProvider>
					</NuqsAdapter>
				</ThemeProvider>
			</body>
		</html>
	);
}
