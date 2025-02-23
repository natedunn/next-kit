import React from 'react';

import { Link } from '@/components/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAuth } from '@/lib/auth/auth';

import { GithubButton } from './_components/github-button';

export default async function SignInPage() {
	const { session } = await getAuth();

	return (
		<React.Fragment>
			<div>
				<h1 className='text-3xl font-bold'>Sign In</h1>
				<p className='mt-2'>Sign in to see authenticated features.</p>
			</div>
			<div className='mt-6 font-mono font-bold bg-muted p-3 md:p-6 border'>
				<div className='flex flex-col gap-4'>
					<GithubButton disabled={!!session} />
				</div>
			</div>
		</React.Fragment>
	);
}
