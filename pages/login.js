import React, { useState, useRef } from 'react';
import OpenGraph from '../components/open_graph';
import Logo from '../components/logo';
import Link from 'next/link';
import { login, fetchToken } from '../utils/auth';

const ErrorMessage = ({ error }) => {
  if (!error) return <></>;

  return (
    <div className="mb-8 p-3 bg-red-600 text-white text-sm font-bold shadow">
      {error}
    </div>
  );
};

function LoginPage() {
  const title = 'Log in';
  const description = 'Log in to your StaticKit account.';
  const passwordRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = await fetchToken(email, password);

      if (token) {
        await login({ token });
      } else {
        setError('These credentials are not valid');
        setPassword('');
        setIsSubmitting(false);
        passwordRef.current.focus();
      }
    } catch (e) {
      console.error(e);
      setError('An unexpected error occurred');
      setIsSubmitting(false);
    }
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

        <ErrorMessage error={error} />

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
              value={email}
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
              ref={passwordRef}
              id="password"
              type="password"
              name="password"
              className="input-field block w-full"
              onChange={e => setPassword(e.target.value)}
              value={password}
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
