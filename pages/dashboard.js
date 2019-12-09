import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/header';
import OpenGraph from '../components/open_graph';
import ValidationError from '../components/validation_error';
import { useViewer, fetch as fetchViewer } from '../data/viewer';
import { getToken } from '../utils/auth';
import graphql from '../utils/graphql';

function DashboardPage({ viewerData: initialViewerData }) {
  const title = 'New Site';
  const description = 'Create a new StaticKit site.';
  const router = useRouter();
  const { data: viewerData } = useViewer({ initialData: initialViewerData });
  const nameRef = useRef(null);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <main>
        <OpenGraph title={title} description={description} path="/sites/new" />
        <div className="bg-gray-900">
          <Header viewerData={viewerData} inverted={true} />
          <div className="container px-6 pt-16 pb-10 mx-auto">
            <h1 className="pb-2 text-gray-200 text-5xl font-semibold tracking-tight">
              Sites
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}

DashboardPage.getInitialProps = async context => {
  const viewerData = await fetchViewer(context);
  if (viewerData.status === 'unauthorized') redirectToLogin(context);
  return { viewerData };
};

export default DashboardPage;
