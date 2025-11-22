import { useState } from 'react';
import './App.css';
import minesFslLogo from './assets/mines-fsl-logo.png';

type OrgType = 'fraternity' | 'sorority';

interface Organization {
    id: string;
    name: string;
    letters: string;
    type: OrgType;
    imageKey: string;
}

const organizations: Organization[] = [
    { id: 'sae', name: 'Sigma Alpha Epsilon', letters: 'ΣΑΕ', type: 'fraternity', imageKey: 'sae' },
    { id: 'ksig', name: 'Kappa Sigma', letters: 'ΚΣ', type: 'fraternity', imageKey: 'ksig' },
    { id: 'sigep', name: 'Sigma Phi Epsilon', letters: 'ΣΦΕ', type: 'fraternity', imageKey: 'sigep' },
    { id: 'fiji', name: 'Phi Gamma Delta', letters: 'ΦΓΔ', type: 'fraternity', imageKey: 'fiji' },
    { id: 'ato', name: 'Alpha Tau Omega', letters: 'ΑΤΩ', type: 'fraternity', imageKey: 'ato' },
    { id: 'beta', name: 'Beta Theta Pi', letters: 'ΒΘΠ', type: 'fraternity', imageKey: 'beta' },
    { id: 'signu', name: 'Sigma Nu', letters: 'ΣΝ', type: 'fraternity', imageKey: 'signu' },
    { id: 'lul', name: 'Lambda Alpha Upsilon', letters: 'ΛΑΥ', type: 'fraternity', imageKey: 'lambda' },
    { id: 'aphi', name: 'Alpha Phi', letters: 'ΑΦ', type: 'sorority', imageKey: 'aphi' },
    { id: 'sigkap', name: 'Sigma Kappa', letters: 'ΣΚ', type: 'sorority', imageKey: 'sigkap' },
    { id: 'pibetaphi', name: 'Pi Beta Phi', letters: 'ΠΒΦ', type: 'sorority', imageKey: 'piphi' },
    { id: 'theta', name: 'Kappa Alpha Theta', letters: 'ΚΑΘ', type: 'sorority', imageKey: 'theta' }
];

function getOrgImage(imageKey: string): string | undefined {
    try {
        return new URL(`./assets/${imageKey}.png`, import.meta.url).href;
    } catch {
        return undefined;
    }
}

function App() {
    const [selectedType, setSelectedType] = useState<OrgType>('fraternity');
    const filteredOrgs = organizations.filter((org) => org.type === selectedType);

    const [page, setPage] = useState<'home' | 'org'>('home');
    const [selectedOrg, setSelectedOrg] = useState<Organization>();

    const [fratLogo, setFratLogo] = useState<URL>();

    const handleOrgClick = (org: Organization) => { 
      //console.log('Clicked:', org.name); 
      setSelectedOrg(org);
      setPage('org');
      let logoPath = new URL(`./assets/${org.id}.png`, import.meta.url).href;
      setFratLogo(logoPath);
    };
    const handleLogoClick = () => { 
      //console.log('Clicked Logo'); 
      setPage('home');
    };

    return (
        <div className="app-shell">
            <header className="site-header">
                <div className="header-left">
                    <img src={minesFslLogo} alt="Colorado School of Mines Fraternity & Sorority Life" className="mines-logo" onClick={() => handleLogoClick()}/>
                </div>
                {page === 'home' && (
                  <nav className="header-tabs" aria-label="Organization type selection">
                      <button type="button" className={selectedType === 'fraternity' ? 'tab-button tab-button--active' : 'tab-button'} onClick={() => setSelectedType('fraternity')}>Fraternities</button>
                      <button type="button" className={selectedType === 'sorority' ? 'tab-button tab-button--active' : 'tab-button'} onClick={() => setSelectedType('sorority')}>Sororities</button>
                  </nav>
                )}
            </header>
            {page === 'home' && (
              <main className="page-main">
                  <section className="org-section">
                      <h1 className="section-title">{selectedType === 'fraternity' ? 'Fraternities' : 'Sororities'}</h1>
                      <div className="org-grid">
                          {filteredOrgs.map((org) => { const imageSrc = getOrgImage(org.imageKey);
                              return (
                                  <div key={org.id} className="org-card-block">
                                      <div className={imageSrc ? 'org-image-area has-image' : 'org-image-area'} style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : undefined} role="button" tabIndex={0} aria-label={`${org.name} image`} onClick={() => handleOrgClick(org)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOrgClick(org); }}}>
                                          <div className="org-image-overlay-letters">{org.letters}</div>{!imageSrc && (<div className="org-image-placeholder-text">{org.name} Image</div>)}</div>
                                      <button type="button" className="org-content" onClick={() => handleOrgClick(org)}>
                                          <div className="org-content-text">
                                              <span className="org-title">{org.name}</span>
                                          </div>
                                          <span className="org-content-arrow" aria-hidden="true">→</span>
                                      </button>
                                  </div>
                              );
                          })}
                          {filteredOrgs.length === 0 && (<p className="empty-state">No fraternities or sororities to show</p>)}
                      </div>
                  </section>
              </main>
            )}
            {page === 'org' && (
              <>
                <img src={fratLogo} alt="Fraternity Image" className="main-logo" />
                <main className="chapter-page">
                  <section className="chapter-main">
                    <div className="chapter-greek-letters">{selectedOrg.letters}</div>
                    <h1 className="chapter-title">{selectedOrg.name} | Colorado School of Mines</h1>
                  </section>
                  <aside className="chapter-links">
                    <a href="#" className="chapter-link">
                      About Us <span className="arrow">→</span>
                    </a>
                    <a href="#" className="chapter-link">
                      Social Media <span className="arrow">→</span>
                    </a>
                    <a href="#" className="chapter-link">
                      Philanthropies <span className="arrow">→</span>
                    </a>
                    <a href="#" className="chapter-link">
                      Rush <span className="arrow">→</span>
                    </a>
                  </aside>
                </main>
              </>
            )}
        </div>
    );
}
export default App;
