import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1">
          {siteConfig.title}
        </Heading>
        <p className={styles.subtitle}>{siteConfig.tagline}</p>
        <div className={styles.heroFlow} aria-label="Fusion CMS setup flow">
          <span>Install</span>
          <span>Configure</span>
          <span>Model</span>
          <span>Generate</span>
          <span>Ship</span>
        </div>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/getting-started/installation">
            Install Fusion CMS
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/architecture">
            Read Architecture
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Fusion CMS documentation for installing, configuring, and operating the beta release.">
      <HomepageHeader />
      <main className={styles.main}>
        <section className="container">
          <div className={styles.featureGrid}>
            <article>
              <Heading as="h2">Connect Databases</Heading>
              <p>Onboard metadata and application databases, then manage schemas from the dashboard.</p>
            </article>
            <article>
              <Heading as="h2">Generate APIs</Heading>
              <p>Create GraphQL and REST surfaces from MongoDB and SQL-style schema definitions.</p>
            </article>
            <article>
              <Heading as="h2">Control Access</Heading>
              <p>Use built-in users, tokens, API keys, and access schemas to protect generated endpoints.</p>
            </article>
          </div>
          <div className={styles.releaseStrip}>
            <Heading as="h2">Beta Path</Heading>
            <p>
              Start with SQLite metadata, run <code>npm run beta:check</code>, register the first admin, then create
              databases, schemas, access rules, and generated APIs from the dashboard.
            </p>
            <Link className="button button--outline button--sm" to="/docs/tutorials/generate-api">
              Follow the generated API tutorial
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
