import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Section {
  path: string;
  label: string;
  sections: {
    path: string;
    label: string;
  }[];
}

const sections: Section[] = [
  {
    path: '/docs',
    label: 'Introduction',
    sections: []
  },
  {
    path: '/docs/forms',
    label: 'Forms',
    sections: [
      {
        path: '/docs/forms/react',
        label: 'React'
      },
      {
        path: '/docs/forms/html',
        label: 'HTML'
      }
    ]
  },
  {
    path: '/docs/functions',
    label: 'Functions',
    sections: []
  },
  {
    path: '/guides',
    label: 'Guides',
    sections: []
  },
  {
    path: '/docs/core',
    label: 'Client',
    sections: []
  },
  {
    path: '/docs/cli',
    label: 'CLI',
    sections: []
  }
];

const Section = ({ path, label, sections }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const isCurrent =
    sections.find((section: Section) => {
      return section.path == currentPath;
    }) ||
    path == currentPath ||
    (path.startsWith('/guides') && currentPath.startsWith('/guides')) ||
    (path.startsWith('/docs/forms') && currentPath.startsWith('/docs/forms')) ||
    (path.startsWith('/docs/functions') &&
      currentPath.startsWith('/docs/functions')) ||
    (path.startsWith('/docs/config') &&
      currentPath.startsWith('/docs/config')) ||
    (path.startsWith('/docs/react') && currentPath.startsWith('/docs/react'));

  const Subsection = ({ section }) => {
    const color =
      section.path == currentPath ? 'text-gray-900' : 'text-gray-600';

    return (
      <li className={`ml-2 ${color}`}>
        <Link href={section.path}>
          <a>– {section.label}</a>
        </Link>
      </li>
    );
  };

  const Subsections = ({ sections }) => {
    return (
      <ul className="py-1 border-gray-400 text-base font-normal">
        {sections.map((section: Section) => (
          <Subsection key={section.path} section={section} />
        ))}
      </ul>
    );
  };

  const color = isCurrent ? 'text-gray-900' : 'text-gray-600';

  return (
    <li>
      <h3 className="pb-2 text-lg text-gray-600 text-xs font-semibold">
        <Link href={path}>
          <a className={`${color} hover:text-gray-900`}>{label}</a>
        </Link>
        {isCurrent && sections.length > 0 ? (
          <Subsections sections={sections} />
        ) : (
          ''
        )}
      </h3>
    </li>
  );
};

const Nav: React.FC = () => {
  return (
    <ul>
      {sections.map((section: Section) => (
        <Section
          key={section.path}
          path={section.path}
          label={section.label}
          sections={section.sections}
        />
      ))}
    </ul>
  );
};

export default Nav;
