import React, { useState, useEffect } from 'react';
import Header from 'components/header';
import OpenGraph from 'components/open_graph';
import Error from 'next/error';
import { useDefaultSite } from 'utils/default-site';
import { useAuthRequired, getToken } from 'utils/auth';
import { useRouter } from 'next/router';
import { useViewerData } from 'data/viewer';
import { useSiteData, revalidate } from 'data/site';
import { updateSiteName } from 'data/mutations';
import { ValidationError } from '@statickit/react';

const pageTitle = siteData => {
  if (!siteData || !siteData.site) return 'Site Settings';
  return `Site Settings - ${siteData.site.name}`;
};

function SiteSettingsPage() {
  const router = useRouter();
  const { viewerData } = useViewerData();
  const { siteData } = useSiteData(router.query.siteId);

  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (siteData && siteData.site) {
      setName(siteData.site.name);
    }
  }, [siteData]);

  useAuthRequired(viewerData);
  useDefaultSite(siteData);

  if (siteData && siteData.status === 'notFound') {
    return <Error statusCode={404} />;
  }

  const handleNameSaved = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(siteData && siteData.site)) return;

    let site = siteData.site;
    let payload = await updateSiteName(site.id, name, getToken());
    if (payload.success) revalidate(payload.site.id);
    setErrors(payload.errors);
  };

  return (
    <div>
      <main>
        <OpenGraph title={pageTitle(siteData)} description={''} />
        <div className="bg-gray-900">
          <Header inverted={true} viewerData={viewerData} siteData={siteData} />
          <div className="container py-16 sm:py-20 mx-auto">
            <div className="mx-auto max-w-3xl">
              <div className="px-6">
                <h1 className="pb-2 text-gray-200 text-3xl tracking-snug">
                  Site Settings
                </h1>
              </div>

              <div className="mx-auto container py-3">
                <div className="mx-auto sm:flex max-w-3xl py-6">
                  <div className="sm:w-1/3 px-6 pb-3">
                    <label className="block pb-1 text-gray-400 font-semibold">
                      Site Name
                    </label>
                    <p className="text-sm text-gray-600">
                      The name of this site.
                    </p>
                  </div>
                  <div className="sm:w-2/3 px-6 pb-3">
                    <form
                      className="mb-3 p-1 pl-3 flex input-field-inverse block"
                      onSubmit={handleNameSaved}
                    >
                      <input
                        type="text"
                        name="name"
                        className="block flex-grow bg-transparent focus:outline-none"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                      <button type="submit" className="btn btn-sm">
                        Save
                      </button>
                    </form>

                    <ValidationError
                      prefix="Name"
                      field="name"
                      errors={errors}
                      className="pb-4 text-sm text-red-700 font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SiteSettingsPage;
