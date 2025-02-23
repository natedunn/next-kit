import type { SearchParams } from 'nuqs/server';

import React from 'react';
import { redirect } from 'next/navigation';

import { Link } from '@/components/link';
import { api } from '@/lib/api/clients/invoker';
import { auth, getAuth } from '@/lib/auth/auth';
import { exampleSearchParams } from '@/lib/params/search-params';

type PageProps = {
	searchParams: Promise<SearchParams>;
};

export default async function HomePage({ searchParams }: PageProps) {
	const { exampleString, redirect: redirectIfNotAuthed } = await exampleSearchParams(searchParams);
	const { user } = await getAuth();

	if (!user && redirectIfNotAuthed) {
		redirect('/sign-in');
	}

	const data = await api.example.authed(exampleString);

	return (
		<React.Fragment>
			<div>
				<h1 className='text-3xl font-bold'>Authed Procedure</h1>
				<p className='mt-2'>
					Below is returned data from the authed procedure. It only returns said data if you (the
					user) are authenticated. You may also pass a search param of{' '}
					<span className='border bg-white font-mono text-sm'>redirect=false</span> to see the
					unauthenticated API error.
				</p>
			</div>
			<pre className='mt-6 font-mono font-bold bg-muted p-3 md:p-6 border'>
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</React.Fragment>
	);
}
