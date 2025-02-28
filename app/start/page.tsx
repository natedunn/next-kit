import React from 'react';

import { Link } from '@/components/link';

export default async function SetupPage() {
	return (
		<React.Fragment>
			<div className='border-b pb-4 mb-4'>
				<h1 className='text-3xl font-bold'>Start</h1>
				<p className='mt-2'>A few things to get started.</p>
			</div>
			<div className='prose dark:prose-invert'>
				<h3>Required</h3>
				<ul>
					<li>
						Enable auth by adding Github client info to <span className='code'>.env</span> file.
					</li>
					<li>
						The Neon DB driver is already set up. If this is not your preferred DB provider, you
						will need to change the{' '}
						<Link className='link-as-text' href='https://orm.drizzle.team/docs/get-started'>
							different driver
						</Link>
						.
					</li>
				</ul>
				<h3>Suggestions</h3>
				<ul>
					<li>
						Add better-auth plugins before running <span className='code'>pnpm db:auth</span> to
						update schema.
					</li>
				</ul>
			</div>
		</React.Fragment>
	);
}
