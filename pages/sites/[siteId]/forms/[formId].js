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

const formatFieldValue = value => {
  if (!value) return '—';

  return value
    .split('\n')
    .slice(0, 3)
    .join(' ');
};

const SubmissionTable = ({ submissionData, displayFields }) => {
  if (!submissionData) {
    return (
      <div className="mx-auto container px-6 py-24 text-2xl font-semibold text-gray-500 text-center">
        Loading...
      </div>
    );
  }

  const submissions = submissionData.submissions.edges.map(edge => edge.node);

  return (
    <div className="overflow-auto w-full rounded-t-lg">
      <table className="w-full text-gray-800 text-sm">
        <thead>
          <tr className="">
            <th className="px-3 py-3 text-left font-semibold bg-gray-200 text-gray-700 border-b rounded-tl-lg">
              created_at
            </th>
            {displayFields.map(name => (
              <th className="px-3 py-3 text-left font-semibold bg-gray-200 text-gray-700 border-b">
                {name}
              </th>
            ))}
            <th className="w-12 px-3 py-3 text-left text-sm font-semibold bg-gray-200 text-gray-700 border-b rounded-tr-lg"></th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, idx) => {
            return (
              <tr className="border-b align-top hover:bg-gray-100">
                <td className="px-3 py-4 w-48">
                  {moment
                    .utc(submission.occurredAt)
                    .format('MMM D, YYYY h:mm a')}
                </td>

                {displayFields.map(field => (
                  <td className="px-3 py-4">
                    {formatFieldValue(
                      (submission.data.find(datum => datum.name == field) || {})
                        .value
                    )}
                  </td>
                ))}

                <td className="px-3 py-4 w-12"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
          <div className="mx-auto container px-6 pt-3 pb-3">
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
            <div className="text-gray-700 pb-6">
              This form has been submitted {form.submissionCount} times.
            </div>

            <SubmissionTable
              submissionData={submissionData}
              displayFields={form.displayFields}
            />
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
