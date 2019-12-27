import Link from 'next/link';
import { useRouter } from 'next/router';

const Tab = ({ href, as, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  const classes = `block py-2 mr-6 font-semibold ${
    isActive ? 'text-gray-200' : 'text-gray-600 hover:text-gray-500'
  }`;

  return (
    <Link href={href} as={as}>
      <a className={classes}>{children}</a>
    </Link>
  );
};

const Breadcrumb = ({ siteData }) => {
  if (!siteData) return <></>;

  const site = siteData.site;

  return (
    <Link href="/sites/[siteId]" as={`/sites/${site.id}`}>
      <a className="text-gray-600 font-semibold">Forms</a>
    </Link>
  );
};

const Heading = ({ formData }) => {
  if (!formData) return <></>;

  const form = formData.form;

  return (
    <h1 className="pb-3 text-3xl text-gray-100 tracking-snug">{form.name}</h1>
  );
};

const Tabs = ({ formData, siteData }) => {
  if (!siteData || !formData) {
    return <></>;
  }
  const site = siteData.site;
  const form = formData.form;

  return (
    <div className="flex">
      <Tab
        href="/sites/[siteId]/forms/[formId]"
        as={`/sites/${site.id}/forms/${form.id}`}
      >
        Submissions
      </Tab>

      <Tab
        href="/sites/[siteId]/forms/[formId]/settings"
        as={`/sites/${site.id}/forms/${form.id}/settings`}
      >
        Settings
      </Tab>
    </div>
  );
};

export default function FormHeader({ siteData, formData }) {
  return (
    <div className="mx-auto container px-6 pt-4 pb-4">
      <div className="pb-1">
        <Breadcrumb siteData={siteData} />
      </div>
      <Heading formData={formData} />
      <Tabs siteData={siteData} formData={formData} />
    </div>
  );
}
