import React, { useState, useRef } from 'react';
import { translations, stepsData } from './translations';
import './register.css';

export default function RegisterOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState('tr');

  const baseUrl = import.meta.env.BASE_URL || './';

  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    companyAddress: '',
    companyEmail: '',
    companyPhone: '',
    companyPhoneCountry: 'TR',
    fiscalYearStart: '01.01.2026',
    authorizedName: '',
    authorizedEmail: '',
    authorizedPhone: '',
    authorizedPhoneCountry: 'TR',
    taxOffice: '',
    taxNumber: '',
    solutionPackages: '',
    country: 'Türkiye',
    timezone: 'GMT +03:00 Istanbul',
    equipmentCredit: '42',
    personnelCredit: '124',
    dayStartHour: '',
    t1Standard: '',
    t1: '',
    t2: '',
    t3: ''
  });

  const t = translations[language];

  const handleInputChange = (field, value) => {
    setCompanyForm(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const getStepSvg = (stepId, stepKey) => {
    let stateStr = 'Incomplete';
    if (stepId < currentStep) {
      stateStr = 'Completed';
    } else if (stepId === currentStep) {
      stateStr = 'Current';
    }
    const path = `${baseUrl}images/State=${stateStr}, Step Type=${stepKey}.svg`;
    return encodeURI(path);
  };

  return (
    <main className="onboarding-wrapper">
      <header className="progress-header">
        <div className="steps-container" id="stepsBar">
          {stepsData.map((step) => {
            const isActive = step.id === currentStep;
            return (
              <div
                key={step.id}
                className={`step-item ${isActive ? 'active' : ''}`}
                data-step={step.id}
                onClick={() => setCurrentStep(step.id)}
              >
                <img
                  src={getStepSvg(step.id, step.key)}
                  alt={step.alt}
                  className="step-figma-svg"
                />
              </div>
            );
          })}
        </div>
      </header>

      <section className="content-container">

        {currentStep === 1 && (
          <div className="step-view active" id="step-1">
            <div className="welcome-header">
              <h1 className="brand-welcome">
                <span className="welcome-prefix">{t.welcome_prefix}</span>
                <a href="#index" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span className="brand-upu">upu.</span>
                  <span className="brand-io">io</span>
                </a>
                <span className="welcome-suffix">{t.welcome_suffix}</span>
              </h1>
              <p className="welcome-subtitle">{t.welcome_sub}</p>
            </div>

            <form className="language-selection-form" id="languageForm" onSubmit={(e) => e.preventDefault()}>
              <div className="language-options">
                <label className={`lang-card ${language === 'tr' ? 'active' : ''}`} htmlFor="lang-tr" onClick={() => setLanguage('tr')}>
                  <input type="radio" name="language" id="lang-tr" value="tr" checked={language === 'tr'} onChange={() => setLanguage('tr')} />
                  <span className="custom-radio">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <div className="flag-icon"><img src={`${baseUrl}images/TR.svg`} alt="TR" /></div>
                  <span className="lang-code">TR</span>
                </label>

                <label className={`lang-card ${language === 'en' ? 'active' : ''}`} htmlFor="lang-en" onClick={() => setLanguage('en')}>
                  <input type="radio" name="language" id="lang-en" value="en" checked={language === 'en'} onChange={() => setLanguage('en')} />
                  <span className="custom-radio">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <div className="flag-icon"><img src={`${baseUrl}images/GB.svg`} alt="EN" /></div>
                  <span className="lang-code">EN</span>
                </label>
              </div>

              <div className="action-button-wrapper">
                <button type="button" className="btn-primary" id="btnNextStep" onClick={() => setCurrentStep(2)}>
                  <span>{t.btn_start}</span>
                  <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-view active" id="step-2">
            <div className="company-form-header">
              <h1 className="step-title">{t.step2_title}</h1>
            </div>

            <form className="company-form" id="companyForm" onSubmit={(e) => e.preventDefault()}>
              <div className="company-form-grid">
                
                <div className="form-column">
                  <div className="form-group logo-upload-group">
                    <label className="input-label">{t.company_logo}</label>
                    <div className="logo-upload-box" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                      <input type="file" ref={fileInputRef} accept="image/*" style={{ display: 'none' }} onChange={handleLogoUpload} />
                      <div className="logo-plus-icon">{logoPreview ? <img src={logoPreview} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} /> : '+'}</div>
                      <div className="logo-text-wrapper">
                        <span className="logo-title">{t.company_logo}</span>
                        <a href="#upload" className="logo-upload-link" onClick={(e) => { e.preventDefault(); fileInputRef.current && fileInputRef.current.click(); }}>{t.upload_image}</a>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="input-label">{t.company_name}</label>
                    <input type="text" className="form-input" placeholder={t.company_name} value={companyForm.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label className="input-label">{t.company_address}</label>
                    <input type="text" className="form-input" placeholder={t.company_address} value={companyForm.companyAddress} onChange={(e) => handleInputChange('companyAddress', e.target.value)} />
                  </div>

                  <div className="form-group input-icon-group">
                    <label className="input-label">{t.company_email}</label>
                    <div className="input-with-icon">
                      <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                      <input type="email" className="form-input" placeholder={t.company_email} value={companyForm.companyEmail} onChange={(e) => handleInputChange('companyEmail', e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="input-label">{t.company_phone}</label>
                    <div className="phone-input-group">
                      <select className="phone-country-select" value={companyForm.companyPhoneCountry} onChange={(e) => handleInputChange('companyPhoneCountry', e.target.value)}>
                        <option value="TR">TR ∨</option>
                      </select>
                      <input type="text" className="form-input" placeholder="+(90)" value={companyForm.companyPhone} onChange={(e) => handleInputChange('companyPhone', e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group input-icon-group">
                    <label className="input-label">{t.fiscal_year_start}</label>
                    <div className="input-with-icon">
                      <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                      <input type="text" className="form-input" placeholder="01.01.2026" value={companyForm.fiscalYearStart} onChange={(e) => handleInputChange('fiscalYearStart', e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="form-column">
                  <div className="form-group">
                    <label className="input-label">{t.authorized_name}</label>
                    <input type="text" className="form-input" placeholder={t.authorized_name} value={companyForm.authorizedName} onChange={(e) => handleInputChange('authorizedName', e.target.value)} />
                  </div>

                  <div className="form-group input-icon-group">
                    <label className="input-label">{t.authorized_email}</label>
                    <div className="input-with-icon">
                      <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                      <input type="email" className="form-input" placeholder={t.authorized_email} value={companyForm.authorizedEmail} onChange={(e) => handleInputChange('authorizedEmail', e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="input-label">{t.authorized_phone}</label>
                    <div className="phone-input-group">
                      <select className="phone-country-select" value={companyForm.authorizedPhoneCountry} onChange={(e) => handleInputChange('authorizedPhoneCountry', e.target.value)}>
                        <option value="TR">TR ∨</option>
                      </select>
                      <input type="text" className="form-input" placeholder="+(90)" value={companyForm.authorizedPhone} onChange={(e) => handleInputChange('authorizedPhone', e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="input-label">{t.tax_office}</label>
                    <input type="text" className="form-input" placeholder={t.tax_office} value={companyForm.taxOffice} onChange={(e) => handleInputChange('taxOffice', e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label className="input-label">{t.tax_number}</label>
                    <input type="text" className="form-input" placeholder="00" value={companyForm.taxNumber} onChange={(e) => handleInputChange('taxNumber', e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label className="input-label">{t.solution_packages}</label>
                    <input type="text" className="form-input" placeholder="upu.machine, upu.product, upu.person" value={companyForm.solutionPackages} onChange={(e) => handleInputChange('solutionPackages', e.target.value)} />
                  </div>
                </div>

                <div className="form-column">
                  <div className="form-group">
                    <label className="input-label">{t.country}</label>
                    <select className="form-select" value={companyForm.country} onChange={(e) => handleInputChange('country', e.target.value)}>
                      <option value="Türkiye">Türkiye</option>
                      <option value="Almanya">Almanya</option>
                      <option value="İngiltere">İngiltere</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="input-label">{t.timezone}</label>
                    <select className="form-select" value={companyForm.timezone} onChange={(e) => handleInputChange('timezone', e.target.value)}>
                      <option value="GMT +03:00 Istanbul">GMT +03:00 Istanbul</option>
                    </select>
                  </div>

                  <div className="form-row-two">
                    <div className="form-group">
                      <label className="input-label">{t.equipment_credit}</label>
                      <input type="text" className="form-input" value={companyForm.equipmentCredit} onChange={(e) => handleInputChange('equipmentCredit', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="input-label">{t.personnel_credit}</label>
                      <input type="text" className="form-input" value={companyForm.personnelCredit} onChange={(e) => handleInputChange('personnelCredit', e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="input-label">{t.day_start_hour}</label>
                    <select className="form-select" value={companyForm.dayStartHour} onChange={(e) => handleInputChange('dayStartHour', e.target.value)}>
                      <option value="">{t.company_address}</option>
                    </select>
                  </div>

                  <div className="form-row-two">
                    <div className="form-group">
                      <label className="input-label">{t.t1_standard}</label>
                      <input type="text" className="form-input" placeholder="+(90)" value={companyForm.t1Standard} onChange={(e) => handleInputChange('t1Standard', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="input-label">T1</label>
                      <input type="text" className="form-input" placeholder="+(90)" value={companyForm.t1} onChange={(e) => handleInputChange('t1', e.target.value)} />
                    </div>
                  </div>

                  <div className="form-row-two">
                    <div className="form-group">
                      <label className="input-label">T2</label>
                      <input type="text" className="form-input" placeholder="+(90)" value={companyForm.t2} onChange={(e) => handleInputChange('t2', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="input-label">T3</label>
                      <input type="text" className="form-input" placeholder="+(90)" value={companyForm.t3} onChange={(e) => handleInputChange('t3', e.target.value)} />
                    </div>
                  </div>
                </div>

              </div>

              <div className="form-action-buttons">
                <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(1)}>{t.btn_prev}</button>
                <button type="button" className="btn-step-next btn-next" onClick={() => alert('Firma Başarıyla Oluşturuldu!')}>{t.btn_next}</button>
              </div>
            </form>
          </div>
        )}

      </section>
    </main>
  );
}
