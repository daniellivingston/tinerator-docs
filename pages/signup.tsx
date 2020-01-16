import React, { useState, useContext, useEffect } from 'react';
import OpenGraph from 'components/open_graph';
import Logo from 'components/logo';
import SiteContext from 'components/site_context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signup, login } from 'utils/auth';
import { ValidationError } from '@statickit/react';
import cookie from 'js-cookie';

function SignupPage() {
  const title = 'Sign up';
  const description = 'Create a StaticKit account.';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const { setSiteId } = useContext(SiteContext);
  const router = useRouter();

  useEffect(() => {
    if (router.query.next) {
      cookie.set('next', router.query.next);
    }
  }, [router]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const resp = await signup(email, password);

      if (resp.token) {
        let nextPath = cookie.get('next') || '/docs';
        cookie.remove('next');
        setSiteId(resp.site_id);
        login({ token: resp.token, nextPath });
      } else {
        setErrors(resp.errors || []);
        setIsSubmitting(false);
      }
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-6 py-8">
      <OpenGraph title={title} description={description} />

      <div className="max-w-sm mx-auto">
        <header className="pb-16">
          <Link href="/">
            <a>
              <Logo inverted={false} />
            </a>
          </Link>
        </header>

        <h1 className="pb-10 text-3xl font-semibold tracking-snug">
          Sign up for StaticKit
        </h1>

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
            <ValidationError
              prefix="Email"
              field="email"
              errors={errors}
              className="pt-2 text-sm text-red-600 font-bold"
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
              value={password}
            />
            <ValidationError
              prefix="Password"
              field="password"
              errors={errors}
              className="pt-2 text-sm text-red-600 font-bold"
            />
          </div>

          <button type="submit" className="btn" disabled={isSubmitting}>
            Sign up free
          </button>
        </form>

        <div className="py-5 border-t text-gray-600 text-sm">
          <span>Already have an account? </span>
          <Link href="/login">
            <a className="font-bold text-indigo-600">Log in &rarr;</a>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SignupPage;
