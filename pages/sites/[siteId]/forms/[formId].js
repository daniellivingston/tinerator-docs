import React, { useEffect, useContext } from 'react';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../../../components/header';
import OpenGraph from '../../../../components/open_graph';
import SiteContext from '../../../../components/site_context';
import FormHeader from '../../../../components/form_header';
import { getToken, redirectToLogin } from '../../../../utils/auth';
import graphql from '../../../../utils/graphql';
import { useViewer, fetch as fetchViewer } from '../../../../data/viewer';
import { useSite, fetch as fetchSite } from '../../../../data/site';
import { useForm, fetch as fetchForm } from '../../../../data/form';
import { useSubmissions } from '../../../../data/submissions';
import moment from 'moment';

const trashIcon = `
<svg width="19px" height="21px" viewBox="0 0 19 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="trash-2" transform="translate(0.500000, 0.500000)" stroke="#E53E3E">
            <polyline id="Path" points="0 4 2 4 18 4"></polyline>
            <path d="M16,4 L16,18 C16,19.1045695 15.1045695,20 14,20 L4,20 C2.8954305,20 2,19.1045695 2,18 L2,4 M5,4 L5,2 C5,0.8954305 5.8954305,0 7,0 L11,0 C12.1045695,0 13,0.8954305 13,2 L13,4" id="Shape"></path>
            <path d="M7,9 L7,15" id="Path"></path>
            <path d="M11,9 L11,15" id="Path"></path>
        </g>
    </g>
</svg>
`;

const formatFieldValue = value => {
  if (!value) return '—';

  return value
    .split('\n')
    .slice(0, 3)
    .join(' ');
};

const PrevButton = ({ pageInfo }) => {
  const router = useRouter();

  const classes = 'block mx-1 px-2 py-1 rounded bg-gray-200 text-gray-700';

  if (!pageInfo.hasPreviousPage)
    return (
      <button className={classes.concat(' opacity-50')} disabled={true}>
        &larr;
      </button>
    );

  return (
    <Link
      href={`/sites/${router.query.siteId}/forms/${router.query.formId}?before=${pageInfo.startCursor}`}
    >
      <a className={classes}>&larr;</a>
    </Link>
  );
};

const NextButton = ({ pageInfo }) => {
  const router = useRouter();

  const classes = 'block mx-1 px-2 py-1 rounded bg-gray-200 text-gray-700';

  if (!pageInfo.hasNextPage)
    return (
      <button className={classes.concat(' opacity-50')} disabled={true}>
        &rarr;
      </button>
    );

  return (
    <Link
      href={`/sites/${router.query.siteId}/forms/${router.query.formId}?after=${pageInfo.endCursor}`}
    >
      <a className={classes}>&rarr;</a>
    </Link>
  );
};

const SubmissionTable = ({ form, submissionData, displayFields }) => {
  const router = useRouter();

  if (!submissionData) {
    return (
      <div className="mx-auto container px-6 py-24 text-2xl font-semibold text-gray-500 text-center">
        Loading...
      </div>
    );
  }

  const submissions = submissionData.submissions.edges.map(edge => edge.node);
  const pageInfo = submissionData.submissions.pageInfo;

  const deleteClicked = async id => {
    const token = getToken();

    const query = `
      mutation DeleteFormSubmission(
        $formId: ID!,
        $submissionId: ID!
      ) {
        deleteFormSubmission(
          formId: $formId,
          submissionId: $submissionId
        ) {
          success
          errors {
            field
            message
          }
          submission {
            id
          }
        }
      }
    `;

    const variables = { formId: form.id, submissionId: id };

    try {
      const resp = await graphql(query, variables, token);

      if (resp.ok) {
        router.reload();
      }
    } catch (e) {}
  };

  if (submissions.length === 0) {
    return (
      <div className="rounded-lg border py-16 px-6 text-center text-gray-600">
        No submissions to show.
      </div>
    );
  }

  return (
    <div className="overflow-auto w-full rounded-t-lg">
      <table className="w-full text-gray-800 text-sm">
        <thead>
          <tr>
            <th className="px-3 py-3 text-left font-semibold bg-gray-200 text-gray-700 border-b rounded-tl-lg">
              created_at
            </th>
            {displayFields.map(name => (
              <th
                key={`header-${name}`}
                className="px-3 py-3 text-left font-semibold bg-gray-200 text-gray-700 border-b"
              >
                {name}
              </th>
            ))}
            <th className="w-12 px-3 py-3 text-left text-sm font-semibold bg-gray-200 text-gray-700 border-b rounded-tr-lg"></th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, idx) => {
            return (
              <tr
                key={submission.id}
                className="border-b align-top hover:bg-gray-100"
              >
                <td className="px-3 py-4 w-48">
                  {moment
                    .utc(submission.occurredAt)
                    .format('MMM D, YYYY h:mm a')}
                </td>

                {displayFields.map(field => (
                  <td
                    key={`field-${submission.id}-${field}`}
                    className="px-3 py-4"
                  >
                    {formatFieldValue(
                      (submission.data.find(datum => datum.name == field) || {})
                        .value
                    )}
                  </td>
                ))}

                <td className="px-3 py-4 w-12">
                  <button
                    className="flex items-center justify-center"
                    onClick={() => deleteClicked(submission.id)}
                  >
                    <div dangerouslySetInnerHTML={{ __html: trashIcon }} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="py-4 flex items-center justify-center">
        <PrevButton pageInfo={pageInfo} />
        <NextButton pageInfo={pageInfo} />
      </div>
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

  const { data: submissionData } = useSubmissions(router.query);

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
          <FormHeader site={siteData.site} form={form} />
        </div>
        <div>
          <div className="mx-auto container px-6 py-6">
            <div className="text-gray-700 text-sm pb-6">
              This form has been submitted {form.submissionCount} times.
            </div>

            <SubmissionTable
              form={form}
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
