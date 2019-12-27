import React, { useState, useEffect } from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import Header from 'components/header';
import OpenGraph from 'components/open_graph';
import FormHeader from 'components/form_header';
import { graphql } from 'utils/graphql';
import { useDefaultSite } from 'utils/default-site';
import { useAuthRequired, getToken } from 'utils/auth';
import { useViewerData } from 'data/viewer';
import { useSiteData } from 'data/site';
import { useFormData } from 'data/form';
import { ValidationError } from '@statickit/react';

function FormSettingsPage() {
  const router = useRouter();

  const { viewerData } = useViewerData();
  const { siteData } = useSiteData(router.query.siteId);
  const { formData } = useFormData(router.query.siteId, router.query.formId);

  useAuthRequired(viewerData);
  useDefaultSite(siteData);

  const [key, setKey] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (formData && formData.form) {
      setKey(formData.form.key);
    }
  }, [formData]);

  if (siteData && siteData.status === 'notFound') {
    return <Error statusCode={404} />;
  }

  if (formData && formData.status === 'notFound') {
    return <Error statusCode={404} />;
  }

  if (!formData || !formData.form) return <></>;

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
          <FormHeader siteData={siteData} formData={formData} />
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

export default FormSettingsPage;
