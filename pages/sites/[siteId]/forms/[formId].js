import React, { useEffect, useContext } from 'react';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../../../components/header';
import OpenGraph from '../../../../components/open_graph';
import SiteContext from '../../../../components/site_context';
import { getToken, redirectToLogin } from '../../../../utils/auth';
import { useViewer, fetch as fetchViewer } from '../../../../data/viewer';
import { useSite, fetch as fetchSite } from '../../../../data/site';
import { useForm, fetch as fetchForm } from '../../../../data/form';
import { useSubmissions } from '../../../../data/submissions';
import moment from 'moment';

const SubmissionItem = ({ submission, index }) => {
  const occurredAt = moment.utc(submission.occurredAt);

  return (
    <div className={`${index % 2 == 1 ? '' : 'bg-gray-200'}`}>
      <div className={`mx-auto container md:flex py-4 rounded-lg`}>
        <div className="md:w-1/3 py-3 px-6">
          <time>{occurredAt.format('MMM D, YYYY h:mm a')}</time>
        </div>
        <div className="md:w-2/3 px-6">
          {submission.data.map(datum => {
            return (
              <div key={datum.name} className="py-3">
                <p className="pb-1 font-semibold text-gray-700">{datum.name}</p>
                <p className="whitespace-pre-wrap">{datum.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SubmissionList = ({ submissionData }) => {
  if (!submissionData) {
    return (
      <div className="mx-auto container px-6 py-24 text-2xl font-semibold text-gray-500 text-center">
        Loading...
      </div>
    );
  }

  const submissions = submissionData.submissions.edges.map(edge => edge.node);

  return (
    <div className="text-gray-800">
      {submissions.map((submission, idx) => (
        <SubmissionItem submission={submission} index={idx} />
      ))}
    </div>
  );
};

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

  const { data: submissionData } = useSubmissions(
    router.query.siteId,
    router.query.formId
  );

  if (siteData && siteData.status === 'notFound') {
    return <Error statusCode={404} />;
  }

  if (formData && formData.status === 'notFound') {
    return <Error statusCode={404} />;
  }

  useEffect(() => {
    if (!siteData) return;

    if (siteData.status === 'ok') {
      setSiteId(siteData.site.id);
    }
  }, [siteData]);

  if (!formData) return <></>;
  const form = formData.form;

  return (
    <div>
      <main>
        <OpenGraph title={form.name} description={''} />
        <div className="bg-gray-900">
          <Header inverted={true} viewerData={viewerData} siteData={siteData} />
          <div className="mx-auto container px-6 pt-6 pb-3">
            <h1 className="pb-3 text-4xl text-gray-200 font-semibold tracking-snug">
              {form.name}
            </h1>
            <div className="flex">
              <Link
                href="/sites/[siteId]/forms/[formId]"
                as={`/sites/${router.query.siteId}/forms/${router.query.formId}`}
              >
                <a className="block py-2 mr-6 text-gray-200 font-semibold">
                  Submissions
                </a>
              </Link>

              <Link
                href="/sites/[siteId]/forms/[formId]/settings"
                as={`/sites/${router.query.siteId}/forms/${router.query.formId}/settings`}
              >
                <a className="block py-2 mr-6 text-gray-600 hover:text-gray-500 font-semibold">
                  Settings
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="mx-auto container px-6 py-6">
            <div className="text-gray-700">
              This form has been submitted {form.submissionCount} times.
            </div>
          </div>
        </div>
        <SubmissionList submissionData={submissionData} />
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
