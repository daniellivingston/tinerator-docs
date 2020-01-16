import React, { useState } from 'react';
import { NextPageContext } from 'next';
import { graphql } from 'utils/graphql';
import { getToken } from 'utils/auth';
import { redirectTo } from 'utils/routing';
import OpenGraph from 'components/open_graph';
import Logo from 'components/logo';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import Error from 'next/error';

interface Preauth {
  status: 'OK' | 'REDIRECT' | 'NATIVE_REDIRECT' | 'ERROR';
  clientName: string;
  scopes: Array<'read' | 'write'>;
  redirectUri: string;
  code: string;
  error: string;
  errorDescription: string;
}

interface Auth {
  status: 'REDIRECT' | 'NATIVE_REDIRECT' | 'ERROR';
  redirectUri: string;
  code: string;
  error: string;
  errorDescription: string;
}

interface Deny {
  status: 'REDIRECT' | 'ERROR';
  redirectUri: string;
  error: string;
  errorDescription: string;
}

interface Props {
  preauth?: Preauth;
}

const scopeLabel = (scope: 'read' | 'write') => {
  switch (scope) {
    case 'read':
      return 'Read your account';

    case 'write':
      return 'Perform actions on your behalf';
  }
};

function OAuthAuthorizePage({ preauth }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAllow = async () => {
    setIsSubmitting(true);
    const token = getToken();

    const query = `
      mutation OAuthAuthorize(
        $response_type: String,
        $client_id: String,
        $redirect_uri: String,
        $scope: String,
        $state: String
      ) {
        oauthAuthorize(
          responseType: $response_type,
          clientId: $client_id,
          redirectUri: $redirect_uri,
          scope: $scope,
          state: $state
        ) {
          status
          redirectUri
          code
          error
          errorDescription
        }
      }
    `;

    const resp = await graphql(query, router.query, token);
    const body = await resp.json();
    const auth = body.data.oauthAuthorize as Auth;

    if (auth.status === 'REDIRECT') {
      redirectTo(auth.redirectUri);
    } else {
      setIsSubmitting(false);
    }
  };

  const handleDeny = async () => {
    setIsSubmitting(true);
    const token = getToken();

    const query = `
      mutation OAuthDeny(
        $response_type: String,
        $client_id: String,
        $redirect_uri: String,
        $scope: String,
        $state: String
      ) {
        oauthDeny(
          responseType: $response_type,
          clientId: $client_id,
          redirectUri: $redirect_uri,
          scope: $scope,
          state: $state
        ) {
          status
          redirectUri
          error
          errorDescription
        }
      }
    `;

    const resp = await graphql(query, router.query, token);
    const body = await resp.json();
    const auth = body.data.oauthDeny as Deny;

    if (auth.status === 'REDIRECT') {
      redirectTo(auth.redirectUri);
    } else {
      setIsSubmitting(false);
    }
  };

  if (!preauth) {
    return <Error statusCode={404} />;
  }

  if (preauth.status === 'ERROR') {
    return (
      <pre className="p-8">
        {JSON.stringify(
          {
            error: preauth.error,
            error_description: preauth.errorDescription
          },
          null,
          2
        )}
      </pre>
    );
  }

  if (preauth.status === 'NATIVE_REDIRECT') {
    return <pre>{preauth.code}</pre>;
  }

  const title = `Authorize ${preauth.clientName}`;
  const description = `Allow ${preauth.clientName} to access your account.`;

  return (
    <main className="container mx-auto px-6 py-8">
      <OpenGraph title={title} description={description} />

      <div className="max-w-xl mx-auto">
        <header className="pb-16">
          <Link href="/">
            <a>
              <Logo inverted={false} />
            </a>
          </Link>
        </header>
        <div className="py-8">
          <h1 className="pb-4 text-3xl font-semibold tracking-snug leading-snug">
            Allow <span className="text-indigo-600">{preauth.clientName}</span>{' '}
            to access your account?
          </h1>
          <div className="pb-3 text-gray-700 leading-relaxed">
            <p className="pb-4">
              This application <strong>will be able to:</strong>
            </p>
            <ul className="pb-6 list-inside list-disc">
              {preauth.scopes.map((scope, i) => (
                <li key={i}>{scopeLabel(scope)}</li>
              ))}
            </ul>
            <div>
              <button
                className="mr-2 btn"
                onClick={handleAllow}
                disabled={isSubmitting}
              >
                Grant access
              </button>
              <button
                className="mr-2 btn btn-red"
                onClick={handleDeny}
                disabled={isSubmitting}
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const redirectWithNext = (pathname: string, context: NextPageContext) => {
  if (context.res) {
    context.res
      .writeHead(302, {
        Location: `${pathname}?next=${encodeURIComponent(context.asPath)}`
      })
      .end();
  } else {
    Router.push({
      pathname,
      query: { next: Router.asPath }
    });
  }
};

OAuthAuthorizePage.getInitialProps = async (context: NextPageContext) => {
  const token = getToken(context);

  const query = `
    mutation OAuthPreauthorize(
      $response_type: String,
      $client_id: String,
      $redirect_uri: String,
      $scope: String,
      $state: String
    ) {
      oauthPreauthorize(
        responseType: $response_type,
        clientId: $client_id,
        redirectUri: $redirect_uri,
        scope: $scope
        state: $state
      ) {
        status
        clientName
        scopes
        redirectUri
        code
        error
        errorDescription
      }
    }
  `;

  try {
    const resp = await graphql(query, context.query, token);

    if (resp.status === 401) {
      redirectWithNext('/signup', context);
      return;
    }

    const body = await resp.json();
    const preauth = body.data.oauthPreauthorize as Preauth;

    // An error occurred
    if (!preauth) {
      return {};
    }

    if (preauth.status === 'REDIRECT') {
      redirectTo(preauth.redirectUri, undefined, context);
      return;
    }

    return { preauth };
  } catch (e) {
    console.error(e);
    return {};
  }
};

export default OAuthAuthorizePage;
