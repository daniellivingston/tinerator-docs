import Link from 'next/link';

const sections = [
  {
    path: '/docs',
    label: 'Introduction',
    sections: []
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
    path: '/docs/react',
    label: 'React',
    sections: []
  }
];

const Section = ({ path, label, currentPath, sections }) => {
  const isCurrent =
    sections.find(section => {
      return section.path == currentPath;
    }) || path == currentPath;

  const Subsection = ({ section }) => {
    const color =
      section.path == currentPath ? 'text-gray-900' : 'text-gray-600';

    return (
      <li className={`ml-3 ${color}`}>
        <Link href={section.path}>
          <a>{section.label}</a>
        </Link>
      </li>
    );
  };

  const Subsections = ({ sections }) => {
    return (
      <ul className="mt-1 py-1 border-l text-base font-normal">
        {sections.map(section => (
          <Subsection key={section.path} section={section} />
        ))}
      </ul>
    );
  };

  const color = isCurrent ? 'text-gray-900' : 'text-gray-600';

  return (
    <li>
      <h3 className="pb-3 text-lg text-gray-600 text-xs font-semibold">
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

export default ({ currentPath }) => {
  return (
    <ul>
      {sections.map(section => (
        <Section
          key={section.path}
          path={section.path}
          label={section.label}
          sections={section.sections}
          currentPath={currentPath}
        />
      ))}
    </ul>
  );
};
