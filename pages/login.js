import React, { useState } from 'react';
import OpenGraph from '../components/open_graph';
import Logo from '../components/logo';
import Link from 'next/link';

function LoginPage(props) {
  const title = 'Log in';
  const description = 'Log in to your StaticKit account.';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = e => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: actually submit it
  };

  return (
    <main className="container mx-auto px-6 py-8">
      <OpenGraph title={title} description={description} path="/login" />

      <div className="max-w-sm mx-auto">
        <header className="pb-16">
          <Link href="/">
            <a>
              <Logo inverted={false} />
            </a>
          </Link>
        </header>

        <form className="pb-8" onSubmit={submit}>
          <div className="pb-6">
            <label
              htmlFor="email"
              className="block font-bold pb-2 leading-snug text-sm"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="input-field block w-full"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="pb-6">
            <label
              htmlFor="password"
              className="block font-bold pb-2 leading-snug text-sm"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="input-field block w-full"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn" disabled={isSubmitting}>
            Log in to StaticKit
          </button>
        </form>

        <div className="py-5 border-t text-gray-600 text-sm">
          <span>Not registered yet? </span>
          <Link href="/">
            <a className="font-bold text-indigo-600">Sign up free &rarr;</a>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
