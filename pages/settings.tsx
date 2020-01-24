import React, { useState, useRef } from 'react';
import { NextPageContext } from 'next';
import Header from 'components/Header';
import HeadMatter from 'components/HeadMatter';
import ValidationError from 'components/ValidationError';
import useViewerData, { revalidate } from 'components/useViewerData';
import { Viewer, fetchViewer } from 'data/queries';
import { getToken, redirectToLogin } from 'utils/auth';
import { updateUser } from 'data/mutations';

interface Props {
  viewer: Viewer;
}

const Avatar = ({ viewerData }) => {
  if (!viewerData || viewerData.status !== 'ok') return <></>;
  let viewer = viewerData.viewer;
  return (
    <img
      src={viewer.avatarUrl}
      className="w-16 h-16 rounded-full shadow-md"
      title={viewer.email}
    />
  );
};

function UserSettingsPage({ viewer }: Props) {
  const title = 'User Settings';
  const description = 'Manage your user preferences.';
  const { data: viewerData } = useViewerData({
    initialData: { status: 'ok', viewer }
  });
  const [email, setEmail] = useState(viewer.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleEmailSaved = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payload = await updateUser({ email }, getToken());
    if (payload.success) revalidate();
    setErrors(payload.errors);
  };

  const handlePasswordSaved = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let payload = await updateUser(
      { currentPassword, password: newPassword },
      getToken()
    );

    if (payload.success) {
      setCurrentPassword('');
      setNewPassword('');
    }

    setErrors(payload.errors);
  };

  return (
    <div>
      <main>
        <HeadMatter title={title} description={description} />
        <div>
          <Header viewerData={viewerData} inverted={false} showAppNav={false} />
          <div className="container py-16 sm:py-20 mx-auto">
            <div className="mx-auto max-w-3xl">
              <div className="px-6 pb-6">
                <h1 className="pb-2 text-gray-900 text-4xl tracking-snug">
                  User Settings
                </h1>
              </div>
            </div>

            <div className="py-6">
              <div className="mx-auto container py-3">
                <div className="mx-auto sm:flex max-w-3xl py-3">
                  <div className="sm:w-1/3 px-6 pb-3">
                    <label className="block pb-1 text-gray-800 font-semibold">
                      Email Address
                    </label>
                    <p className="text-sm text-gray-600">
                      Use this to sign in.
                    </p>
                  </div>
                  <div className="sm:w-2/3 px-6 pb-3">
                    <form
                      className="flex input-field p-0"
                      onSubmit={handleEmailSaved}
                    >
                      <input
                        type="text"
                        name="email"
                        className="block p-3 flex-grow bg-transparent focus:outline-none min-w-0"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                      <div className="p-1">
                        <button type="submit" className="btn btn-sm">
                          Save
                        </button>
                      </div>
                    </form>

                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={errors}
                      className="py-2 text-sm text-red-700 font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="mx-auto container py-3">
                <div className="mx-auto sm:flex max-w-3xl py-3">
                  <div className="sm:w-1/3 px-6 pb-3">
                    <label className="block pb-1 text-gray-800 font-semibold">
                      Avatar
                    </label>
                    <p className="text-sm text-gray-600">
                      Managed by{' '}
                      <a
                        href="https://en.gravatar.com/"
                        className="text-indigo-600"
                      >
                        Gravatar
                      </a>
                      .
                    </p>
                  </div>
                  <div className="sm:w-2/3 px-6">
                    <Avatar viewerData={viewerData} />
                  </div>
                </div>
              </div>

              <div className="mx-auto container py-3">
                <div className="mx-auto sm:flex max-w-3xl py-3">
                  <div className="sm:w-1/3 px-6 pb-3">
                    <label className="block pb-1 text-gray-800 font-semibold">
                      Password
                    </label>
                    <p className="text-sm text-gray-600">
                      Update your password.
                    </p>
                  </div>
                  <div className="sm:w-2/3 px-6 pb-3">
                    <form className="" onSubmit={handlePasswordSaved}>
                      <div className="pb-6">
                        <label className="block pb-1 font-bold text-sm">
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="current_password"
                          className="input-field"
                          value={currentPassword}
                          onChange={e => setCurrentPassword(e.target.value)}
                        />
                        <ValidationError
                          prefix="Current password"
                          field="current_password"
                          errors={errors}
                          className="py-2 text-sm text-red-700 font-bold"
                        />
                      </div>

                      <div className="pb-4">
                        <label className="block pb-1 font-bold text-sm">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="new_password"
                          className="input-field"
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                        />
                        <ValidationError
                          prefix="Password"
                          field="password"
                          errors={errors}
                          className="py-2 text-sm text-red-700 font-bold"
                        />
                      </div>

                      <div>
                        <button type="submit" className="btn btn-sm">
                          Update password
                        </button>
                      </div>
                    </form>
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

UserSettingsPage.getInitialProps = async (context: NextPageContext) => {
  const token = getToken(context);
  const viewerData = await fetchViewer(token);
  if (viewerData.status === 'unauthorized') redirectToLogin(context);

  if (viewerData.status === 'ok') {
    return { viewer: viewerData.viewer };
  } else {
    // TODO: Redirect to 500 page
    throw new Error('viewer could not be fetched');
  }
};

export default UserSettingsPage;
