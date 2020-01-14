import Link from 'next/link';
import { useRouter } from 'next/router';

const sections = [
  {
    path: '/docs',
    label: 'Getting Started',
    sections: []
  },
  {
    path: '/docs/cli',
    label: 'CLI',
    sections: []
  },
  {
    path: '/docs/config',
    label: 'Config',
    sections: [
      {
        path: '/docs/config/forms',
        label: 'Forms'
      }
    ]
  },
  {
    path: '/docs/react',
    label: 'React',
    sections: [
      {
        path: '/docs/react/use-statickit',
        label: 'useStaticKit'
      },
      {
        path: '/docs/react/use-form',
        label: 'useForm'
      }
    ]
  },
  {
    path: '/docs/html',
    label: 'HTML',
    sections: [
      {
        path: '/docs/html/forms',
        label: 'Forms'
      }
    ]
  },
  {
    path: '/docs/core',
    label: 'Core',
    sections: []
  },
  {
    path: '/guides',
    label: 'Guides',
    sections: []
  },
  {
    path: '/integrations',
    label: 'Integrations',
    sections: [
      {
        path: '/integrations/zeit',
        label: 'ZEIT'
      }
    ]
  }
];

const Section = ({ path, label, sections }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const isCurrent =
    sections.find(section => {
      return section.path == currentPath;
    }) ||
    path == currentPath ||
    (path.startsWith('/guides') && currentPath.startsWith('/guides')) ||
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
        {sections.map(section => (
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

export default () => {
  return (
    <ul>
      {sections.map(section => (
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
