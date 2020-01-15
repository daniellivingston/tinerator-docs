import { useEffect } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import cookies from 'next-cookies';
import { revalidate, prefetch } from '../data/viewer';
import { redirectTo } from './routing';

const endpoint =
  process.env.NODE_ENV == 'production'
    ? 'https://api.statickit.com'
    : 'http://localhost:4000';

export const signup = async (email, password) => {
  const resp = await fetch(`${endpoint}/api/users`, {
    method: 'POST',
    body: JSON.stringify({ user: { email, password } }),
    headers: { 'Content-Type': 'application/json' }
  });

  return await resp.json();
};

export const login = async ({ token }) => {
  cookie.set('token', token, { expires: 365 });
  await prefetch(token);
  Router.push('/');
};

export const logout = () => {
  cookie.remove('token');
  revalidate();
  redirectToLogin();
};

export const redirectToLogin = (context = {}) => {
  redirectTo('/login', context);
};

export const fetchToken = async (email, password) => {
  const resp = await fetch(`${endpoint}/api/tokens`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (resp.status === 200) {
    const body = await resp.json();
    return body.token;
  } else {
    return null;
  }
};

export const getToken = (context = {}) => {
  const { token } = cookies(context);
  return token;
};

export const useAuthRequired = viewerData => {
  useEffect(() => {
    if (!viewerData) return;
    if (viewerData.status === 'unauthorized') {
      redirectToLogin();
    }
  }, [viewerData]);
};
