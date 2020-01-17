import React, { useState, useRef } from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Header from 'components/Header';
import HeadMatter from 'components/HeadMatter';
import ValidationError from 'components/ValidationError';
import useViewerData from 'components/useViewerData';
import { ViewerData, fetchViewer } from 'data/queries';
import { getToken, redirectToLogin } from 'utils/auth';
import { graphql } from 'utils/graphql';

function NewSitePage({
  viewerData: initialViewerData
}: {
  viewerData: ViewerData;
}) {
  const title = 'New Site';
  const description = 'Create a new StaticKit site.';
  const router = useRouter();
  const { data: viewerData } = useViewerData({
    initialData: initialViewerData
  });
  const nameRef = useRef(null);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = getToken();

    const query = `
      mutation CreateSite(
        $name: String
      ) {
        createSite(name: $name) {
          success
          errors {
            field
            message
          }
          site {
            id
          }
        }
      }
    `;

    const variables = { name };

    try {
      const resp = await graphql(query, variables, token);

      if (resp.ok) {
        const {
          data: { createSite: payload }
        } = await resp.json();

        if (payload.success) {
          router.push(`/sites/${payload.site.id}`);
        } else {
          setErrors(payload.errors);
          setIsSubmitting(false);
          if (nameRef.current) nameRef.current.focus();
        }
      }
    } catch (e) {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <main>
        <HeadMatter title={title} description={description} />
        <div className="bg-gray-900">
          <Header viewerData={viewerData} inverted={true} showAppNav={false} />
          <div className="container px-6 py-16 sm:py-24 mx-auto">
            <div className="mx-auto max-w-md">
              <h1 className="pb-2 text-gray-200 text-3xl font-normal tracking-snug">
                Create a new site
              </h1>
              <p className="pb-5 text-gray-500">
                Just give your site a name and you&rsquo;ll be on your way!
              </p>
              <form onSubmit={submit}>
                <div className="pb-4">
                  <input
                    ref={nameRef}
                    type="text"
                    name="name"
                    placeholder="acme.com"
                    className="input-field-inverse w-full"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={errors}
                    className="pt-2 text-red-600 font-bold"
                  />
                </div>
                <div>
                  <button type="submit" className="btn" disabled={isSubmitting}>
                    Get started
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

NewSitePage.getInitialProps = async (context: NextPageContext) => {
  const token = getToken(context);
  const viewerData = await fetchViewer(token);
  if (viewerData.status === 'unauthorized') redirectToLogin(context);
  return { viewerData };
};

export default NewSitePage;
