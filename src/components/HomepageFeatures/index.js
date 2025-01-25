import clsx from 'clsx';
import Heading from '@theme/Heading';
import { IconNumber1, IconNumber2, IconNumber3 } from '@tabler/icons-react';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Pick a Package',
    Svg: IconNumber1,
    description: (
      <>
        Choose the perfect package. The BuildMaster package includes lifetime updates for your convenience.
      </>
    ),
  },
  {
    title: 'Make It Yours',
    Svg: IconNumber2,
    description: (
      <>
        Personalize your platform. Customize branding, features, and integrations in just a few minutes. Watch Demo.
      </>
    ),
  },
  {
    title: 'Launch Yours',
    Svg: IconNumber3,
    description: (
      <>
        Go live confidently. A scalable, SEO-friendly platform ensures seamless growth from the very first day.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
