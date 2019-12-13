import React, { useEffect, useContext } from 'react';
import Header from '../../../../components/header';
import OpenGraph from '../../../../components/open_graph';
import Error from 'next/error';
import SiteContext from '../../../../components/site_context';
import { useRouter } from 'next/router';
import { getToken, redirectToLogin } from '../../../../utils/auth';
import { useViewer, fetch as fetchViewer } from '../../../../data/viewer';
import { useSite, fetch as fetchSite } from '../../../../data/site';
import { useForm, fetch as fetchForm } from '../../../../data/form';

function FormPage({
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

  if (siteData.status === 'notFound') return <Error statusCode={404} />;
  if (formData.status === 'notFound') return <Error statusCode={404} />;

  useEffect(() => {
    if (siteData.status === 'ok') {
      setSiteId(siteData.site.id);
    }
  }, [siteData]);

  const form = formData.form;

  return (
    <div>
      <main>
        <OpenGraph title={form.name} description={''} />
        <div className="bg-gray-900">
          <Header inverted={true} viewerData={viewerData} siteData={siteData} />
          <div className="mx-auto container px-6 py-8">
            <h1 className="text-3xl text-gray-200 font-semibold tracking-snug">
              {form.name}
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}

FormPage.getInitialProps = async context => {
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

export default FormPage;
