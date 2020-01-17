import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import HeadMatter from 'components/HeadMatter';
import Error from 'next/error';
import { useDefaultSite } from 'utils/default-site';
import { useAuthRequired, getToken } from 'utils/auth';
import { useRouter } from 'next/router';
import { useViewerData } from 'data/viewer';
import useSiteData, { revalidate } from 'components/useSiteData';
import { updateSiteName } from 'data/mutations';
import { ValidationError } from '@statickit/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const copyIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
`;

const pageTitle = siteData => {
  if (!siteData || !siteData.site) return 'Site Settings';
  return `Site Settings - ${siteData.site.name}`;
};

function SiteSettingsPage() {
  const router = useRouter();
  const { viewerData } = useViewerData();
  const { data: siteData } = useSiteData(router.query.siteId as string);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [deployKey, setDeployKey] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (siteData && siteData.status === 'ok') {
      setName(siteData.site.name);
      setSlug(siteData.site.id);
      setDeployKey(siteData.site.deployKey);
    }
  }, [siteData]);

  useAuthRequired(viewerData);
  useDefaultSite(siteData);

  if (siteData && siteData.status === 'notFound') {
    return <Error statusCode={404} />;
  }

  const handleNameSaved = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(siteData && siteData.status === 'ok')) return;

    let site = siteData.site;
    let payload = await updateSiteName(site.id, name, getToken());
    if (payload.success) revalidate(payload.site.id);
    setErrors(payload.errors);
  };

  return (
    <main>
      <HeadMatter title={pageTitle(siteData)} />
      <div className="bg-gray-900">
        <Header inverted={true} viewerData={viewerData} siteData={siteData} />
        <div className="container py-16 sm:py-20 mx-auto">
          <div className="mx-auto max-w-3xl">
            <div className="px-6 pb-6">
              <h1 className="pb-2 text-gray-200 text-4xl tracking-snug">
                Site Settings
              </h1>
            </div>

            <div className="mx-auto container py-6">
              <div className="mx-auto sm:flex max-w-3xl py-3">
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
                    className="flex input-field-inverse p-0"
                    onSubmit={handleNameSaved}
                  >
                    <input
                      type="text"
                      name="name"
                      className="block p-3 flex-grow bg-transparent focus:outline-none min-w-0"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                    <div className="p-1">
                      <button type="submit" className="btn btn-sm">
                        Save
                      </button>
                    </div>
                  </form>

                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={errors}
                    className="py-2 text-sm text-red-700 font-bold"
                  />
                </div>
              </div>

              <div className="mx-auto sm:flex max-w-3xl py-3">
                <div className="sm:w-1/3 px-6 pb-3">
                  <label className="block pb-1 text-gray-400 font-semibold">
                    Site ID
                  </label>
                  <p className="text-sm text-gray-600">
                    The public ID for this site.
                  </p>
                </div>
                <div className="sm:w-2/3 px-6 pb-3">
                  <div className="flex">
                    <div className="flex max-w-full border border-transparent bg-gray-800 leading-tight rounded">
                      <div className="p-3 overflow-auto font-mono text-gray-200 bg-transparent focus:outline-none">
                        {slug}
                      </div>

                      <CopyToClipboard text={slug}>
                        <button type="submit" className="btn btn-sm">
                          <span
                            dangerouslySetInnerHTML={{ __html: copyIcon }}
                          />
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto sm:flex max-w-3xl py-3">
                <div className="sm:w-1/3 px-6 pb-3">
                  <label className="block pb-1 text-gray-400 font-semibold">
                    Deploy Key
                  </label>
                  <p className="text-sm text-gray-600">Keep this secret!</p>
                </div>
                <div className="sm:w-2/3 px-6 pb-3">
                  <div className="flex">
                    <div className="flex max-w-full border border-transparent bg-gray-800 leading-tight rounded">
                      <div className="p-3 overflow-auto font-mono text-gray-200 bg-transparent focus:outline-none">
                        {deployKey}
                      </div>
                      <CopyToClipboard text={deployKey}>
                        <button type="submit" className="btn btn-sm">
                          <span
                            dangerouslySetInnerHTML={{ __html: copyIcon }}
                          />
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SiteSettingsPage;
