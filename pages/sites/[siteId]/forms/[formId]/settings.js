import React, { useState, useEffect, useContext } from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import Header from 'components/header';
import OpenGraph from 'components/open_graph';
import SiteContext from 'components/site_context';
import FormHeader from 'components/form_header';
import { graphql } from 'utils/graphql';
import { getToken, redirectToLogin } from 'utils/auth';
import { useViewer, fetch as fetchViewer } from 'data/viewer';
import { useSite, fetch as fetchSite } from 'data/site';
import { useForm, fetch as fetchForm } from 'data/form';
import { ValidationError } from '@statickit/react';

function FormSettingsPage({
  viewerData: initialViewerData,
  siteData: initialSiteData,
  formData: initialFormData
}) {
  const router = useRouter();
  const { setSiteId } = useContext(SiteContext);

  const { data: viewerData } = useViewer({
    initialData: initialViewerData
  });

  const { data: siteData } = useSite(router.query.siteId, {
    initialData: initialSiteData
  });

  const { data: formData } = useForm(router.query.siteId, router.query.formId, {
    initialData: initialFormData
  });

  if (siteData && siteData.status === 'notFound') {
    return <Error statusCode={404} />;
  }

  if (formData && formData.status === 'notFound') {
    return <Error statusCode={404} />;
  }

  const [key, setKey] = useState(
    initialFormData ? initialFormData.form.key : ''
  );

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!siteData) return;

    if (siteData.status === 'ok') {
      setSiteId(siteData.site.id);
    }
  }, [siteData]);

  useEffect(() => {
    setKey(formData.form.key);
  }, [formData]);

  if (!formData) return <></>;

  const form = formData.form;

  const handleKeySaved = async e => {
    e.preventDefault();
    const token = getToken();

    const query = `
      mutation UpdateFormKey(
        $formId: ID!
        $key: String!
      ) {
        updateForm(
          id: $formId,
          key: $key
        ) {
          success
          errors {
            field
            message
          }
          form {
            key
          }
        }
      }
    `;

    try {
      const resp = await graphql(query, { formId: form.id, key }, token);
      const {
        data: { updateForm: payload }
      } = await resp.json();
      setErrors(payload.errors);
    } catch (e) {}
  };

  return (
    <div>
      <main>
        <OpenGraph title={form.name} description={''} />
        <div className="bg-gray-900">
          <Header inverted={true} viewerData={viewerData} siteData={siteData} />
          <FormHeader site={siteData.site} form={form} />
        </div>
        <div className="mx-auto container py-6">
          <div className="mx-auto sm:flex max-w-3xl py-6">
            <div className="sm:w-1/3 px-6 pb-3">
              <label className="block pb-1 text-gray-800 font-semibold">
                Form Key
              </label>
              <p className="text-sm text-gray-600">
                The unique key specified in your config file.
              </p>
            </div>
            <div className="sm:w-2/3 px-6 pb-3">
              <div className="mb-3 p-1 pl-3 flex input-field block">
                <input
                  type="text"
                  name="key"
                  className="block flex-grow bg-transparent focus:outline-none"
                  value={key}
                  onChange={e => setKey(e.target.value)}
                />
                <button className="btn btn-sm" onClick={handleKeySaved}>
                  Save
                </button>
              </div>

              <ValidationError
                prefix="Key"
                field="key"
                errors={errors}
                className="pb-4 text-sm text-red-700 font-bold"
              />

              <p className="text-red-700 text-sm px-4 py-4 rounded bg-red-100">
                <strong>Be careful!</strong> Changing the key will disconnect
                this form from your config file (unless you also update your
                config file to match).
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

FormSettingsPage.getInitialProps = async context => {
  const { query } = context;
  const token = getToken(context);

  try {
    const [viewerData, siteData, formData] = await Promise.all([
      fetchViewer(token),
      fetchSite(query.siteId, token),
      fetchForm(query.siteId, query.formId, token)
    ]);

    if (viewerData.status === 'unauthorized') {
      redirectToLogin(context);
    }

    return { viewerData, siteData, formData };
  } catch (err) {
    console.log(err);
    return redirectToLogin(context);
  }
};

export default FormSettingsPage;
