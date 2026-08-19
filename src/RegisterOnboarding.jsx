import React, { useState, useRef, useEffect } from 'react';
import { translations, stepsData } from './translations';
import './register.css';

import trFlag from '../images/TR.svg';
import gbFlag from '../images/GB.svg';
import factoryIllustration from '../images/Steps Illustration.svg';

import step1Current from '../images/State=Current, Step Type=Language.svg';
import step1Completed from '../images/State=Completed, Step Type=Language.svg';
import step1Incomplete from '../images/State=Incomplete, Step Type=Language.svg';

import step2Current from '../images/State=Current, Step Type=Company.svg';
import step2Completed from '../images/State=Completed, Step Type=Company.svg';
import step2Incomplete from '../images/State=Incomplete, Step Type=Company.svg';

import step3Current from '../images/State=Current, Step Type=Department.svg';
import step3Completed from '../images/State=Completed, Step Type=Department.svg';
import step3Incomplete from '../images/State=Incomplete, Step Type=Department.svg';

import step4Current from '../images/State=Current, Step Type=Personnel.svg';
import step4Completed from '../images/State=Completed, Step Type=Personnel.svg';
import step4Incomplete from '../images/State=Incomplete, Step Type=Personnel.svg';

import step5Current from '../images/State=Current, Step Type=Internal Op..svg';
import step5Completed from '../images/State=Completed, Step Type=Internal Op..svg';
import step5Incomplete from '../images/State=Incomplete, Step Type=Internal Op..svg';

import step6Current from '../images/State=Current, Step Type=External Op..svg';
import step6Completed from '../images/State=Completed, Step Type=External Op..svg';
import step6Incomplete from '../images/State=Incomplete, Step Type=External Op..svg';

import step7Current from '../images/State=Current, Step Type=Equipments.svg';
import step7Completed from '../images/State=Completed, Step Type=Equipments.svg';
import step7Incomplete from '../images/State=Incomplete, Step Type=Equipments.svg';

import step8Current from '../images/State=Current, Step Type=Shifts.svg';
import step8Completed from '../images/State=Completed, Step Type=Shifts.svg';
import step8Incomplete from '../images/State=Incomplete, Step Type=Shifts.svg';

// Dynamically import all 36 internal operation icons via Vite
const opIconModules = import.meta.glob('../images/ic operasyon ikonlar/*.svg', { eager: true, query: '?url', import: 'default' });
const opIconsList = Array.from({ length: 36 }, (_, i) => {
  const iconNum = i + 1;
  const matchKey = Object.keys(opIconModules).find(k => k.endsWith(`/${iconNum}.svg`));
  return {
    id: `icon-${iconNum}`,
    src: matchKey ? opIconModules[matchKey] : ''
  };
});

const stepImages = {
  1: { Current: step1Current, Completed: step1Completed, Incomplete: step1Incomplete },
  2: { Current: step2Current, Completed: step2Completed, Incomplete: step2Incomplete },
  3: { Current: step3Current, Completed: step3Completed, Incomplete: step3Incomplete },
  4: { Current: step4Current, Completed: step4Completed, Incomplete: step4Incomplete },
  5: { Current: step5Current, Completed: step5Completed, Incomplete: step5Incomplete },
  6: { Current: step6Current, Completed: step6Completed, Incomplete: step6Incomplete },
  7: { Current: step7Current, Completed: step7Completed, Incomplete: step7Incomplete },
  8: { Current: step8Current, Completed: step8Completed, Incomplete: step8Incomplete },
};

const defaultTagColors = ['#7C5CFC', '#D9381E', '#389E8D', '#F59E0B', '#3B82F6'];

// Reusable SVG icons
const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);
const DeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9381E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);
const SearchIcon = () => (
  <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const EmailIcon = () => (
  <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
);
const CalendarIcon = () => (
  <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
);

export default function RegisterOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState('tr');
  const [isLangPopupOpen, setIsLangPopupOpen] = useState(false);

  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [companyForm, setCompanyForm] = useState({
    companyName: '', companyAddress: '', companyEmail: '', companyPhone: '',
    companyPhoneCountry: 'TR', fiscalYearStart: '01.01.2026',
    authorizedName: '', authorizedEmail: '', authorizedPhone: '',
    authorizedPhoneCountry: 'TR', taxOffice: '', taxNumber: '',
    solutionPackages: '', country: 'Türkiye', timezone: 'GMT +03:00 Istanbul',
    equipmentCredit: '42', personnelCredit: '124', dayStartHour: '',
    t1Standard: '', t1: '', t2: '', t3: ''
  });

  // STEP 3: Department State
  const [departments, setDepartments] = useState([]);
  const [maxDepartments, setMaxDepartments] = useState(4);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [editingDeptId, setEditingDeptId] = useState(null);
  const [deptNameInput, setDeptNameInput] = useState('');
  const [modalTagInput, setModalTagInput] = useState('');
  const [modalTags, setModalTags] = useState([]);
  const [deptSearchQuery, setDeptSearchQuery] = useState('');

  // STEP 4: Personnel State
  const [personnelData, setPersonnelData] = useState([]);
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [personSearchQuery, setPersonSearchQuery] = useState('');
  const [personModalTab, setPersonModalTab] = useState('genel');
  const personPhotoInputRef = useRef(null);
  const [currentUploadedPhotoData, setCurrentUploadedPhotoData] = useState(null);
  const [personForm, setPersonForm] = useState({
    personId: '', role: '', firstName: '', lastName: '',
    phone: '', phoneCountry: 'TR', email: '', startDate: '',
    upuPoint: '', totalCost: '', totalSalary: '', dept: '', isManager: false
  });

  // STEP 4: Skills State (tab 2)
  const [skillsData, setSkillsData] = useState([]);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [skillForm, setSkillForm] = useState({ name: '', date: '', score: '' });

  // STEP 4: Achievements State (tab 3)
  const [achievementsData, setAchievementsData] = useState([]);
  const [isAchieveModalOpen, setIsAchieveModalOpen] = useState(false);
  const [editingAchieveId, setEditingAchieveId] = useState(null);
  const [achieveForm, setAchieveForm] = useState({
    title: '', date: '', institution: '', certNo: '', score: '', maxScore: ''
  });

  // STEP 5: Internal Operations State
  const [internalOpsData, setInternalOpsData] = useState([]);
  const [isInternalOpModalOpen, setIsInternalOpModalOpen] = useState(false);
  const [editingInternalOpId, setEditingInternalOpId] = useState(null);
  const [internalOpModalTab, setInternalOpModalTab] = useState('op-tab-info');
  const [internalOpSearchQuery, setInternalOpSearchQuery] = useState('');
  const [opManagerSearchQuery, setOpManagerSearchQuery] = useState('');
  const [opIconSearchQuery, setOpIconSearchQuery] = useState('');
  const [selectedOpIconSrc, setSelectedOpIconSrc] = useState(opIconsList[0]?.src || '');
  const [selectedOpManagers, setSelectedOpManagers] = useState([]);
  const [internalOpForm, setInternalOpForm] = useState({
    name: '', type: '', code: '', utilization: '', measurable: '', performance: '', availability: ''
  });

  // STEP 6: External Operations State
  const [externalOpsData, setExternalOpsData] = useState([]);
  const [isExternalOpModalOpen, setIsExternalOpModalOpen] = useState(false);
  const [editingExternalOpId, setEditingExternalOpId] = useState(null);
  const [externalOpModalTab, setExternalOpModalTab] = useState('ext-tab-info');
  const [externalOpSearchQuery, setExternalOpSearchQuery] = useState('');
  const [extOpManagerSearchQuery, setExtOpManagerSearchQuery] = useState('');
  const [selectedExtOpSuppliers, setSelectedExtOpSuppliers] = useState([]);
  const [selectedExtOpManagers, setSelectedExtOpManagers] = useState([]);
  const [extOpNameInput, setExtOpNameInput] = useState('');

  // STEP 6: Suppliers State
  const [suppliersData, setSuppliersData] = useState([]);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [editingSupplierId, setEditingSupplierId] = useState(null);
  const [supplierForm, setSupplierForm] = useState({
    name: '', address: '', countryCode: 'TR', phone: '', email: ''
  });

  const t = translations[language];

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest('.floating-left-actions')) {
        setIsLangPopupOpen(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const handleInputChange = (field, value) => {
    setCompanyForm(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const getStepSvg = (stepId) => {
    let stateStr = 'Incomplete';
    if (stepId < currentStep) stateStr = 'Completed';
    else if (stepId === currentStep) stateStr = 'Current';
    return stepImages[stepId][stateStr];
  };

  // ─── Step 3: Department Handlers ───
  const handleOpenAddDeptModal = () => {
    setEditingDeptId(null); setDeptNameInput(''); setModalTagInput(''); setModalTags([]);
    setIsDeptModalOpen(true);
  };
  const handleOpenEditDeptModal = (dept) => {
    setEditingDeptId(dept.id); setDeptNameInput(dept.name); setModalTagInput('');
    setModalTags(dept.tags ? [...dept.tags] : []);
    setIsDeptModalOpen(true);
  };
  const handleAddTag = () => {
    const text = modalTagInput.trim();
    if (!text) return;
    const color = defaultTagColors[modalTags.length % defaultTagColors.length];
    setModalTags(prev => [...prev, { text, color }]);
    setModalTagInput('');
  };
  const handleRemoveTag = (idx) => setModalTags(prev => prev.filter((_, i) => i !== idx));
  const handleSaveDept = () => {
    let name = deptNameInput.trim();
    if (!name) name = modalTagInput.trim() || 'Yeni Departman';
    if (editingDeptId) {
      setDepartments(prev => prev.map(d => d.id === editingDeptId ? { ...d, name, tags: [...modalTags] } : d));
    } else {
      setDepartments(prev => [...prev, { id: Date.now(), name, tags: [...modalTags] }]);
    }
    setIsDeptModalOpen(false);
  };
  const handleDeleteDept = (id) => setDepartments(prev => prev.filter(d => d.id !== id));
  const filteredDepartments = departments.filter(d =>
    d.name.toLowerCase().includes(deptSearchQuery.toLowerCase()) ||
    (d.tags && d.tags.some(tag => tag.text.toLowerCase().includes(deptSearchQuery.toLowerCase())))
  );
  const isLimitReached = departments.length >= maxDepartments;

  // ─── Step 4: Personnel Handlers ───
  const resetPersonForm = () => {
    setPersonForm({
      personId: '', role: '', firstName: '', lastName: '',
      phone: '', phoneCountry: 'TR', email: '', startDate: '',
      upuPoint: '', totalCost: '', totalSalary: '', dept: '', isManager: false
    });
    setCurrentUploadedPhotoData(null);
    setSkillsData([]);
    setAchievementsData([]);
    setPersonModalTab('genel');
  };
  const handleOpenAddPersonModal = () => {
    setEditingPersonId(null); resetPersonForm(); setIsPersonModalOpen(true);
  };
  const handleOpenEditPersonModal = (person) => {
    setEditingPersonId(person.id);
    setPersonForm({
      personId: person.personId || '', role: person.role || '',
      firstName: person.firstName || '', lastName: person.lastName || '',
      phone: person.phone || '', phoneCountry: 'TR', email: person.email || '',
      startDate: person.startDate || '', upuPoint: person.upuPoint || '',
      totalCost: person.totalCost || '', totalSalary: person.totalSalary || '',
      dept: person.dept || '', isManager: !!person.isManager
    });
    setCurrentUploadedPhotoData(person.photo || null);
    setSkillsData(person.skills ? [...person.skills] : []);
    setAchievementsData(person.achievements ? [...person.achievements] : []);
    setPersonModalTab('genel');
    setIsPersonModalOpen(true);
  };
  const handlePersonPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCurrentUploadedPhotoData(event.target.result);
      reader.readAsDataURL(file);
    }
  };
  const handleSavePerson = () => {
    const finalFirstName = personForm.firstName.trim() || (personForm.role.trim() || 'Yeni Personel');
    const finalLastName = personForm.lastName.trim();
    const fullName = `${finalFirstName} ${finalLastName}`.trim();
    const personObj = {
      firstName: finalFirstName, lastName: finalLastName, role: personForm.role.trim(),
      personId: personForm.personId.trim(), phone: personForm.phone.trim(),
      email: personForm.email.trim(), startDate: personForm.startDate,
      upuPoint: personForm.upuPoint, totalCost: personForm.totalCost,
      totalSalary: personForm.totalSalary, dept: personForm.dept,
      isManager: personForm.isManager, photo: currentUploadedPhotoData,
      skills: [...skillsData], achievements: [...achievementsData]
    };
    if (editingPersonId) {
      setPersonnelData(prev => prev.map(p => p.id === editingPersonId ? { ...p, ...personObj } : p));
    } else {
      setPersonnelData(prev => [...prev, { id: Date.now(), ...personObj }]);
    }
    if (personForm.isManager && personForm.dept) {
      setDepartments(prev => prev.map(d => d.name === personForm.dept ? { ...d, manager: fullName } : d));
    }
    setIsPersonModalOpen(false);
  };
  const handleDeletePerson = (id) => setPersonnelData(prev => prev.filter(p => p.id !== id));
  const filteredPersonnel = personnelData.filter(p => {
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
    const role = (p.role || p.dept || '').toLowerCase();
    const q = personSearchQuery.toLowerCase();
    return fullName.includes(q) || role.includes(q);
  });

  // Skills handlers
  const handleOpenAddSkillModal = () => {
    setEditingSkillId(null); setSkillForm({ name: '', date: '', score: '' }); setIsSkillModalOpen(true);
  };
  const handleOpenEditSkillModal = (skill) => {
    setEditingSkillId(skill.id); setSkillForm({ name: skill.name, date: skill.date || '', score: skill.score || '' }); setIsSkillModalOpen(true);
  };
  const handleSaveSkill = () => {
    const opName = skillForm.name.trim();
    if (!opName) return;
    const score = skillForm.score || '5/10';
    if (editingSkillId) {
      setSkillsData(prev => prev.map(s => s.id === editingSkillId ? { ...s, name: opName, date: skillForm.date, score } : s));
    } else {
      setSkillsData(prev => [...prev, { id: Date.now(), name: opName, date: skillForm.date, score }]);
    }
    setIsSkillModalOpen(false);
  };
  const handleDeleteSkill = (id) => setSkillsData(prev => prev.filter(s => s.id !== id));

  // Achievements handlers
  const handleOpenAddAchieveModal = () => {
    setEditingAchieveId(null); setAchieveForm({ title: '', date: '', institution: '', certNo: '', score: '', maxScore: '' }); setIsAchieveModalOpen(true);
  };
  const handleOpenEditAchieveModal = (item) => {
    setEditingAchieveId(item.id);
    setAchieveForm({
      title: item.title || '', date: item.date || '', institution: item.institution || '',
      certNo: item.certNo || '', score: item.score || '', maxScore: item.maxScore || ''
    });
    setIsAchieveModalOpen(true);
  };
  const handleSaveAchieve = () => {
    const finalTitle = achieveForm.title.trim() || 'Başarı Adı';
    if (editingAchieveId) {
      setAchievementsData(prev => prev.map(a => a.id === editingAchieveId
        ? { ...a, title: finalTitle, date: achieveForm.date, institution: achieveForm.institution, certNo: achieveForm.certNo, score: achieveForm.score, maxScore: achieveForm.maxScore }
        : a
      ));
    } else {
      setAchievementsData(prev => [...prev, {
        id: Date.now(), title: finalTitle, date: achieveForm.date, institution: achieveForm.institution,
        certNo: achieveForm.certNo, score: achieveForm.score, maxScore: achieveForm.maxScore,
        approvedBy: 'Approved by Çağatay Cangüloğlu'
      }]);
    }
    setIsAchieveModalOpen(false);
  };
  const handleDeleteAchieve = (id) => setAchievementsData(prev => prev.filter(a => a.id !== id));

  // ─── Step 5: Internal Operations Handlers ───
  const handleOpenAddInternalOpModal = () => {
    setEditingInternalOpId(null);
    setInternalOpForm({ name: '', type: '', code: '', utilization: '', measurable: '', performance: '', availability: '' });
    setSelectedOpManagers([]);
    setSelectedOpIconSrc(opIconsList[0]?.src || '');
    setInternalOpModalTab('op-tab-info');
    setIsInternalOpModalOpen(true);
  };
  const handleOpenEditInternalOpModal = (op) => {
    setEditingInternalOpId(op.id);
    setInternalOpForm({
      name: op.name || '', type: op.type || '', code: op.code || '',
      utilization: op.utilization || '', measurable: op.measurable || '',
      performance: op.performance || '', availability: op.availability || ''
    });
    setSelectedOpManagers(op.managers ? [...op.managers] : []);
    setSelectedOpIconSrc(op.src || opIconsList[0]?.src || '');
    setInternalOpModalTab('op-tab-info');
    setIsInternalOpModalOpen(true);
  };
  const handleToggleOpManager = (name) => {
    setSelectedOpManagers(prev => prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]);
  };
  const handleSaveInternalOp = () => {
    const name = internalOpForm.name.trim() || 'Yeni Operasyon';
    const code = (internalOpForm.code.trim() || name.substring(0, 3)).toUpperCase();
    const opObj = {
      name, type: internalOpForm.type || 'Frezeleme', code,
      src: selectedOpIconSrc, managers: [...selectedOpManagers],
      utilization: internalOpForm.utilization, measurable: internalOpForm.measurable,
      performance: internalOpForm.performance, availability: internalOpForm.availability
    };
    if (editingInternalOpId) {
      setInternalOpsData(prev => prev.map(o => o.id === editingInternalOpId ? { ...o, ...opObj } : o));
    } else {
      setInternalOpsData(prev => [...prev, { id: Date.now(), ...opObj }]);
    }
    setIsInternalOpModalOpen(false);
  };
  const handleDeleteInternalOp = (id) => setInternalOpsData(prev => prev.filter(o => o.id !== id));
  const filteredInternalOps = internalOpsData.filter(o => {
    const q = internalOpSearchQuery.toLowerCase();
    return o.name.toLowerCase().includes(q) || (o.code && o.code.toLowerCase().includes(q)) || (o.type && o.type.toLowerCase().includes(q));
  });
  const filteredPersonnelForOp = personnelData.filter(p => {
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
    return fullName.includes(opManagerSearchQuery.toLowerCase());
  });

  // ─── Step 6: External Operations Handlers ───
  const handleOpenAddExternalOpModal = () => {
    setEditingExternalOpId(null);
    setExtOpNameInput('');
    setSelectedExtOpSuppliers([]);
    setSelectedExtOpManagers([]);
    setExternalOpModalTab('ext-tab-info');
    setIsExternalOpModalOpen(true);
  };
  const handleOpenEditExternalOpModal = (op) => {
    setEditingExternalOpId(op.id);
    setExtOpNameInput(op.name || '');
    setSelectedExtOpSuppliers(op.suppliers ? [...op.suppliers] : []);
    setSelectedExtOpManagers(op.managers ? [...op.managers] : []);
    setExternalOpModalTab('ext-tab-info');
    setIsExternalOpModalOpen(true);
  };
  const handleToggleExtSupplier = (name) => {
    setSelectedExtOpSuppliers(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]);
  };
  const handleToggleExtManager = (name) => {
    setSelectedExtOpManagers(prev => prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]);
  };
  const handleSaveExternalOp = () => {
    const name = extOpNameInput.trim() || 'Yeni Dış Operasyon';
    const opObj = {
      name, suppliers: [...selectedExtOpSuppliers], managers: [...selectedExtOpManagers]
    };
    if (editingExternalOpId) {
      setExternalOpsData(prev => prev.map(o => o.id === editingExternalOpId ? { ...o, ...opObj } : o));
    } else {
      setExternalOpsData(prev => [...prev, { id: Date.now(), ...opObj }]);
    }
    setIsExternalOpModalOpen(false);
  };
  const handleDeleteExternalOp = (id) => setExternalOpsData(prev => prev.filter(o => o.id !== id));
  const filteredExternalOps = externalOpsData.filter(o => {
    const q = externalOpSearchQuery.toLowerCase();
    return o.name.toLowerCase().includes(q) || (o.suppliers && o.suppliers.some(s => s.toLowerCase().includes(q)));
  });

  // Supplier handlers
  const handleOpenAddSupplierModal = () => {
    setEditingSupplierId(null);
    setSupplierForm({ name: '', address: '', countryCode: 'TR', phone: '', email: '' });
    setIsSupplierModalOpen(true);
  };
  const handleOpenEditSupplierModal = (sup) => {
    setEditingSupplierId(sup.id);
    setSupplierForm({
      name: sup.name || '', address: sup.address || '',
      countryCode: sup.countryCode || 'TR', phone: sup.phone || '', email: sup.email || ''
    });
    setIsSupplierModalOpen(true);
  };
  const handleSaveSupplier = () => {
    const name = supplierForm.name.trim() || 'Yeni Tedarikçi';
    const supObj = {
      name, address: supplierForm.address, countryCode: supplierForm.countryCode,
      phone: supplierForm.phone, email: supplierForm.email
    };
    if (editingSupplierId) {
      setSuppliersData(prev => prev.map(s => s.id === editingSupplierId ? { ...s, ...supObj } : s));
    } else {
      setSuppliersData(prev => [...prev, { id: Date.now(), ...supObj }]);
    }
    setIsSupplierModalOpen(false);
  };
  const handleDeleteSupplier = (id) => setSuppliersData(prev => prev.filter(s => s.id !== id));

  // ─────────────────────────── RENDER ───────────────────────────
  return (
    <main className="onboarding-wrapper">
      {/* PROGRESS HEADER */}
      <header className="progress-header">
        <div className="steps-container" id="stepsBar">
          {stepsData.map((step) => (
            <div
              key={step.id}
              className={`step-item ${step.id === currentStep ? 'active' : ''}`}
              data-step={step.id}
              onClick={() => setCurrentStep(step.id)}
            >
              <img src={getStepSvg(step.id)} alt={step.alt} className="step-figma-svg" />
            </div>
          ))}
        </div>
      </header>

      <section className="content-container">

        {/* ══════════ STEP 1: DİL SEÇİMİ ══════════ */}
        {currentStep === 1 && (
          <div className="step-view active" id="step-1">
            <div className="welcome-header">
              <h1 className="brand-welcome">
                <span className="welcome-prefix">{t.welcome_prefix}</span>
                <a href="#index" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span className="brand-upu">upu.</span><span className="brand-io">io</span>
                </a>
                <span className="welcome-suffix">{t.welcome_suffix}</span>
              </h1>
              <p className="welcome-subtitle">{t.welcome_sub}</p>
            </div>
            <form className="language-selection-form" onSubmit={(e) => e.preventDefault()}>
              <div className="language-options">
                <label className={`lang-card ${language === 'tr' ? 'active' : ''}`} htmlFor="lang-tr" onClick={() => setLanguage('tr')}>
                  <input type="radio" name="language" id="lang-tr" value="tr" checked={language === 'tr'} onChange={() => setLanguage('tr')} />
                  <span className="custom-radio">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <div className="flag-icon"><img src={trFlag} alt="TR" /></div>
                  <span className="lang-code">TR</span>
                </label>
                <label className={`lang-card ${language === 'en' ? 'active' : ''}`} htmlFor="lang-en" onClick={() => setLanguage('en')}>
                  <input type="radio" name="language" id="lang-en" value="en" checked={language === 'en'} onChange={() => setLanguage('en')} />
                  <span className="custom-radio">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <div className="flag-icon"><img src={gbFlag} alt="EN" /></div>
                  <span className="lang-code">EN</span>
                </label>
              </div>
              <div className="action-button-wrapper">
                <button type="button" className="btn-primary" onClick={() => setCurrentStep(2)}>
                  <span>{t.btn_start}</span>
                  <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ══════════ STEP 2: FİRMA OLUŞTUR ══════════ */}
        {currentStep === 2 && (
          <div className="step-view active" id="step-2">
            <div className="company-form-header"><h1 className="step-title">{t.step2_title}</h1></div>
            <form className="company-form" onSubmit={(e) => e.preventDefault()}>
              <div className="company-form-grid">
                <div className="form-column">
                  <div className="form-group logo-upload-group">
                    <label className="input-label">{t.company_logo}</label>
                    <div className="logo-upload-box" onClick={() => fileInputRef.current?.click()}>
                      <input type="file" ref={fileInputRef} accept="image/*" style={{ display: 'none' }} onChange={handleLogoUpload} />
                      <div className="logo-plus-icon">{logoPreview ? <img src={logoPreview} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} /> : '+'}</div>
                      <div className="logo-text-wrapper">
                        <span className="logo-title">{t.company_logo}</span>
                        <a href="#upload" className="logo-upload-link" onClick={(e) => { e.preventDefault(); fileInputRef.current?.click(); }}>{t.upload_image}</a>
                      </div>
                    </div>
                  </div>
                  <div className="form-group"><label className="input-label">{t.company_name}</label><input type="text" className="form-input" placeholder={t.company_name} value={companyForm.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} /></div>
                  <div className="form-group"><label className="input-label">{t.company_address}</label><input type="text" className="form-input" placeholder={t.company_address} value={companyForm.companyAddress} onChange={(e) => handleInputChange('companyAddress', e.target.value)} /></div>
                  <div className="form-group input-icon-group"><label className="input-label">{t.company_email}</label><div className="input-with-icon"><EmailIcon /><input type="email" className="form-input" placeholder={t.company_email} value={companyForm.companyEmail} onChange={(e) => handleInputChange('companyEmail', e.target.value)} /></div></div>
                  <div className="form-group"><label className="input-label">{t.company_phone}</label><div className="phone-input-group"><select className="phone-country-select" value={companyForm.companyPhoneCountry} onChange={(e) => handleInputChange('companyPhoneCountry', e.target.value)}><option value="TR">TR ∨</option></select><input type="text" className="form-input" placeholder="+(90)" value={companyForm.companyPhone} onChange={(e) => handleInputChange('companyPhone', e.target.value)} /></div></div>
                  <div className="form-group input-icon-group"><label className="input-label">{t.fiscal_year_start}</label><div className="input-with-icon"><CalendarIcon /><input type="text" className="form-input" placeholder="01.01.2026" value={companyForm.fiscalYearStart} onChange={(e) => handleInputChange('fiscalYearStart', e.target.value)} /></div></div>
                </div>
                <div className="form-column">
                  <div className="form-group"><label className="input-label">{t.authorized_name}</label><input type="text" className="form-input" placeholder={t.authorized_name} value={companyForm.authorizedName} onChange={(e) => handleInputChange('authorizedName', e.target.value)} /></div>
                  <div className="form-group input-icon-group"><label className="input-label">{t.authorized_email}</label><div className="input-with-icon"><EmailIcon /><input type="email" className="form-input" placeholder={t.authorized_email} value={companyForm.authorizedEmail} onChange={(e) => handleInputChange('authorizedEmail', e.target.value)} /></div></div>
                  <div className="form-group"><label className="input-label">{t.authorized_phone}</label><div className="phone-input-group"><select className="phone-country-select" value={companyForm.authorizedPhoneCountry} onChange={(e) => handleInputChange('authorizedPhoneCountry', e.target.value)}><option value="TR">TR ∨</option></select><input type="text" className="form-input" placeholder="+(90)" value={companyForm.authorizedPhone} onChange={(e) => handleInputChange('authorizedPhone', e.target.value)} /></div></div>
                  <div className="form-group"><label className="input-label">{t.tax_office}</label><input type="text" className="form-input" placeholder={t.tax_office} value={companyForm.taxOffice} onChange={(e) => handleInputChange('taxOffice', e.target.value)} /></div>
                  <div className="form-group"><label className="input-label">{t.tax_number}</label><input type="text" className="form-input" placeholder="00" value={companyForm.taxNumber} onChange={(e) => handleInputChange('taxNumber', e.target.value)} /></div>
                  <div className="form-group"><label className="input-label">{t.solution_packages}</label><input type="text" className="form-input" placeholder="upu.machine, upu.product, upu.person" value={companyForm.solutionPackages} onChange={(e) => handleInputChange('solutionPackages', e.target.value)} /></div>
                </div>
                <div className="form-column">
                  <div className="form-group"><label className="input-label">{t.country}</label><select className="form-select" value={companyForm.country} onChange={(e) => handleInputChange('country', e.target.value)}><option value="Türkiye">Türkiye</option><option value="Almanya">Almanya</option><option value="İngiltere">İngiltere</option></select></div>
                  <div className="form-group"><label className="input-label">{t.timezone}</label><select className="form-select" value={companyForm.timezone} onChange={(e) => handleInputChange('timezone', e.target.value)}><option value="GMT +03:00 Istanbul">GMT +03:00 Istanbul</option></select></div>
                  <div className="form-row-two">
                    <div className="form-group"><label className="input-label">{t.equipment_credit}</label><input type="text" className="form-input" value={companyForm.equipmentCredit} onChange={(e) => handleInputChange('equipmentCredit', e.target.value)} /></div>
                    <div className="form-group"><label className="input-label">{t.personnel_credit}</label><input type="text" className="form-input" value={companyForm.personnelCredit} onChange={(e) => handleInputChange('personnelCredit', e.target.value)} /></div>
                  </div>
                  <div className="form-group"><label className="input-label">{t.day_start_hour}</label><select className="form-select" value={companyForm.dayStartHour} onChange={(e) => handleInputChange('dayStartHour', e.target.value)}><option value="">{t.company_address}</option></select></div>
                  <div className="form-row-two">
                    <div className="form-group"><label className="input-label">{t.t1_standard}</label><input type="text" className="form-input" placeholder="+(90)" value={companyForm.t1Standard} onChange={(e) => handleInputChange('t1Standard', e.target.value)} /></div>
                    <div className="form-group"><label className="input-label">T1</label><input type="text" className="form-input" placeholder="+(90)" value={companyForm.t1} onChange={(e) => handleInputChange('t1', e.target.value)} /></div>
                  </div>
                  <div className="form-row-two">
                    <div className="form-group"><label className="input-label">T2</label><input type="text" className="form-input" placeholder="+(90)" value={companyForm.t2} onChange={(e) => handleInputChange('t2', e.target.value)} /></div>
                    <div className="form-group"><label className="input-label">T3</label><input type="text" className="form-input" placeholder="+(90)" value={companyForm.t3} onChange={(e) => handleInputChange('t3', e.target.value)} /></div>
                  </div>
                </div>
              </div>
              <div className="form-action-buttons">
                <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(1)}>{t.btn_prev}</button>
                <button type="button" className="btn-step-next btn-next" onClick={() => setCurrentStep(3)}>{t.btn_next}</button>
              </div>
            </form>
          </div>
        )}

        {/* ══════════ STEP 3: DEPARTMAN EKLE ══════════ */}
        {currentStep === 3 && (
          <div className="step-view active" id="step-3">
            {departments.length === 0 ? (
              <div className="dept-empty-view">
                <div className="welcome-header department-header">
                  <h1 className="step-title">{t.step3_title}</h1>
                  <p className="welcome-subtitle">{t.step3_sub}</p>
                </div>
                <div className="add-department-wrapper">
                  <button type="button" className="btn-add-item" onClick={handleOpenAddDeptModal}>
                    <span className="plus-sign">+</span><span>{t.btn_add}</span>
                  </button>
                </div>
                <div className="form-action-buttons" style={{ marginTop: '40px' }}>
                  <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(2)}>{t.btn_prev}</button>
                  <button type="button" className="btn-step-next btn-next" onClick={() => setCurrentStep(4)}>{t.btn_next}</button>
                </div>
              </div>
            ) : (
              <div className="dept-list-view">
                <div className="dept-card-container">
                  <div className="dept-card-header">
                    <h2 className="dept-card-title">{t.departments}</h2>
                    <span className={`dept-count-badge ${isLimitReached ? 'limit-reached' : ''}`}>
                      {departments.length}/{maxDepartments} {t.dept_count_suffix}
                    </span>
                  </div>
                  <div className="dept-search-wrapper">
                    <SearchIcon />
                    <input type="text" className="dept-search-input" placeholder={t.search_placeholder} value={deptSearchQuery} onChange={(e) => setDeptSearchQuery(e.target.value)} />
                  </div>
                  <div className="dept-items-list">
                    {filteredDepartments.map((dept) => (
                      <div key={dept.id} className="dept-item-card" style={{ borderLeftColor: (dept.tags?.[0]?.color) || '#7C5CFC' }}>
                        <span className="dept-name-text">{dept.name}</span>
                        <div className="dept-actions-btns">
                          <button type="button" className="dept-action-icon-btn" onClick={() => handleOpenEditDeptModal(dept)}><EditIcon /></button>
                          <button type="button" className="dept-action-icon-btn" onClick={() => handleDeleteDept(dept.id)}><DeleteIcon /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {isLimitReached ? (
                    <button type="button" className="btn-buy-dept-credit" onClick={() => setMaxDepartments(10)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9381E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                      <span>{t.btn_buy_dept_credit}</span>
                    </button>
                  ) : (
                    <button type="button" className="btn-add-new-dept" onClick={handleOpenAddDeptModal}>
                      <span className="plus-sign">+</span><span>{t.btn_add_new_dept}</span>
                    </button>
                  )}
                </div>
                <div className="form-action-buttons" style={{ marginTop: '20px' }}>
                  <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(2)}>{t.btn_prev}</button>
                  <button type="button" className="btn-step-next btn-next" onClick={() => setCurrentStep(4)}>{t.btn_next}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════ STEP 4: PERSONEL EKLE ══════════ */}
        {currentStep === 4 && (
          <div className="step-view active" id="step-4">
            {personnelData.length === 0 ? (
              <div className="personnel-empty-view">
                <div className="welcome-header personnel-header">
                  <h1 className="step-title">{t.step4_title}</h1>
                  <p className="welcome-subtitle">{t.step4_sub}</p>
                </div>
                <div className="add-personnel-wrapper">
                  <button type="button" className="btn-add-item" onClick={handleOpenAddPersonModal}>
                    <span className="plus-sign">+</span><span>{t.btn_add}</span>
                  </button>
                </div>
                <div className="form-action-buttons" style={{ marginTop: '40px' }}>
                  <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(3)}>{t.btn_prev}</button>
                  <button type="button" className="btn-step-next btn-next" onClick={() => setCurrentStep(5)}>{t.btn_next}</button>
                </div>
              </div>
            ) : (
              <div className="personnel-list-view">
                <div className="dept-card-container">
                  <div className="dept-card-header">
                    <h2 className="dept-card-title">{t.personnels}</h2>
                    <span className="dept-count-badge">{personnelData.length}/56 {t.personnel_credit_count}</span>
                  </div>
                  <div className="dept-search-wrapper">
                    <SearchIcon />
                    <input type="text" className="dept-search-input" placeholder={t.search_placeholder} value={personSearchQuery} onChange={(e) => setPersonSearchQuery(e.target.value)} />
                  </div>
                  <div className="dept-items-list">
                    {filteredPersonnel.map((person) => {
                      const initials = ((person.firstName[0] || '') + (person.lastName[0] || '')).toUpperCase() || 'P';
                      const displayRole = person.role || person.dept || 'Staff';
                      return (
                        <div key={person.id} className="person-item-card">
                          <div className="person-item-left">
                            <div className="person-avatar-wrapper">
                              {person.photo ? (
                                <img src={person.photo} className="person-avatar-img" alt="Avatar" />
                              ) : (
                                <div className="person-avatar-fallback">{initials}</div>
                              )}
                            </div>
                            <div className="person-info-col">
                              <span className="person-full-name">
                                {person.firstName} {person.lastName}
                                {person.isManager && <span className="person-manager-badge">{t.dept_manager_badge}</span>}
                              </span>
                              <span className="person-sub-title">{displayRole}</span>
                            </div>
                          </div>
                          <div className="dept-actions-btns">
                            <button type="button" className="dept-action-icon-btn" onClick={() => handleOpenEditPersonModal(person)}><EditIcon /></button>
                            <button type="button" className="dept-action-icon-btn" onClick={() => handleDeletePerson(person.id)}><DeleteIcon /></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button type="button" className="btn-add-new-dept" onClick={handleOpenAddPersonModal}>
                    <span className="plus-sign">+</span><span>{t.btn_add_new_person}</span>
                  </button>
                </div>
                <div className="form-action-buttons" style={{ marginTop: '20px' }}>
                  <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(3)}>{t.btn_prev}</button>
                  <button type="button" className="btn-step-next btn-next" onClick={() => setCurrentStep(5)}>{t.btn_next}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════ STEP 5: İÇ OPERASYON EKLE ══════════ */}
        {currentStep === 5 && (
          <div className="step-view active" id="step-5">
            {internalOpsData.length === 0 ? (
              <div className="internal-op-empty-view">
                <div className="welcome-header internal-op-header">
                  <h1 className="step-title">{t.step5_title}</h1>
                  <p className="welcome-subtitle">{t.step5_sub}</p>
                </div>
                <div className="add-internal-op-wrapper">
                  <button type="button" className="btn-add-item" onClick={handleOpenAddInternalOpModal}>
                    <span className="plus-sign">+</span><span>{t.btn_add}</span>
                  </button>
                </div>
                <div className="form-action-buttons" style={{ marginTop: '40px' }}>
                  <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(4)}>{t.btn_prev}</button>
                  <button type="button" className="btn-step-next btn-next" onClick={() => setCurrentStep(6)}>{t.btn_next}</button>
                </div>
              </div>
            ) : (
              <div className="internal-op-list-view">
                <div className="dept-card-container">
                  <div className="dept-card-header">
                    <h2 className="dept-card-title">{t.internal_ops}</h2>
                    <span className="dept-count-badge">{internalOpsData.length}/10 {t.internal_op_count_suffix}</span>
                  </div>
                  <div className="dept-search-wrapper">
                    <SearchIcon />
                    <input type="text" className="dept-search-input" placeholder={t.search_placeholder} value={internalOpSearchQuery} onChange={(e) => setInternalOpSearchQuery(e.target.value)} />
                  </div>
                  <div className="dept-items-list">
                    {filteredInternalOps.map((op) => (
                      <div key={op.id} className="person-item-card">
                        <div className="person-item-left">
                          <div className="op-icon-wrapper">
                            {op.src ? <img src={op.src} alt="Op Icon" /> : '⚙️'}
                          </div>
                          <div className="person-info-col">
                            <span className="person-full-name">
                              {op.name}
                              {op.code && <span className="op-code-badge">{op.code}</span>}
                            </span>
                            <span className="person-sub-title">
                              {op.managers && op.managers.length > 0 ? op.managers.join(', ') : (op.type || 'İç Operasyon')}
                            </span>
                          </div>
                        </div>
                        <div className="dept-actions-btns">
                          <button type="button" className="dept-action-icon-btn" onClick={() => handleOpenEditInternalOpModal(op)}><EditIcon /></button>
                          <button type="button" className="dept-action-icon-btn" onClick={() => handleDeleteInternalOp(op.id)}><DeleteIcon /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn-add-new-dept" onClick={handleOpenAddInternalOpModal}>
                    <span className="plus-sign">+</span><span>{t.btn_add_new_internal_op}</span>
                  </button>
                </div>
                <div className="form-action-buttons" style={{ marginTop: '20px' }}>
                  <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(4)}>{t.btn_prev}</button>
                  <button type="button" className="btn-step-next btn-next" onClick={() => setCurrentStep(6)}>{t.btn_next}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════ STEP 6: DIŞ OPERASYON EKLE ══════════ */}
        {currentStep === 6 && (
          <div className="step-view active" id="step-6">
            {externalOpsData.length === 0 ? (
              <div className="internal-op-empty-view">
                <div className="welcome-header internal-op-header">
                  <h1 className="step-title">{t.step6_title}</h1>
                  <p className="welcome-subtitle">{t.step6_sub}</p>
                </div>
                <div className="add-internal-op-wrapper">
                  <button type="button" className="btn-add-item" onClick={handleOpenAddExternalOpModal}>
                    <span className="plus-sign">+</span><span>{t.btn_add}</span>
                  </button>
                </div>
                <div className="form-action-buttons" style={{ marginTop: '40px' }}>
                  <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(5)}>{t.btn_prev}</button>
                  <button type="button" className="btn-step-next btn-next" onClick={() => setCurrentStep(7)}>{t.btn_next}</button>
                </div>
              </div>
            ) : (
              <div className="internal-op-list-view">
                <div className="dept-card-container">
                  <div className="dept-card-header">
                    <h2 className="dept-card-title">{t.external_ops}</h2>
                    <span className="dept-count-badge">{externalOpsData.length} {t.external_op_count_suffix}</span>
                  </div>
                  <div className="dept-search-wrapper">
                    <SearchIcon />
                    <input type="text" className="dept-search-input" placeholder={t.search_placeholder} value={externalOpSearchQuery} onChange={(e) => setExternalOpSearchQuery(e.target.value)} />
                  </div>
                  <div className="dept-items-list">
                    {filteredExternalOps.map((op) => (
                      <div key={op.id} className="person-item-card">
                        <div className="person-item-left">
                          <div className="person-info-col">
                            <span className="person-full-name">{op.name}</span>
                            <span className="person-sub-title">
                              {op.suppliers && op.suppliers.length > 0 ? op.suppliers.join(', ') : 'Tedarikçi atanmadı'}
                            </span>
                          </div>
                        </div>
                        <div className="dept-actions-btns">
                          <button type="button" className="dept-action-icon-btn" onClick={() => handleOpenEditExternalOpModal(op)}><EditIcon /></button>
                          <button type="button" className="dept-action-icon-btn" onClick={() => handleDeleteExternalOp(op.id)}><DeleteIcon /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn-add-new-dept" onClick={handleOpenAddExternalOpModal}>
                    <span className="plus-sign">+</span><span>{t.btn_add_new_external_op}</span>
                  </button>
                </div>
                <div className="form-action-buttons" style={{ marginTop: '20px' }}>
                  <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(5)}>{t.btn_prev}</button>
                  <button type="button" className="btn-step-next btn-next" onClick={() => setCurrentStep(7)}>{t.btn_next}</button>
                </div>
              </div>
            )}
          </div>
        )}
        {/* ══════════ STEP 7: EKİPMANLAR (BOŞ ŞABLON) ══════════ */}
        {currentStep === 7 && (
          <div className="step-view active" id="step-7"></div>
        )}

        {/* ══════════ STEP 8: VARDİYALAR (BOŞ ŞABLON) ══════════ */}
        {currentStep === 8 && (
          <div className="step-view active" id="step-8"></div>
        )}

      </section>

      {/* SOL ALT YÜZEN DİL VE ÇIKIŞ BUTONLARI */}
      <div className="floating-left-actions">
        <div className={`lang-dropdown-popup ${isLangPopupOpen ? 'open' : ''}`} id="langPopup">
          <div
            className={`lang-popup-option ${language === 'tr' ? 'active' : ''}`}
            onClick={() => { setLanguage('tr'); setIsLangPopupOpen(false); }}
          >
            <div className="flag-icon"><img src={trFlag} alt="TR" /></div>
            <span>TR</span>
          </div>
          <div
            className={`lang-popup-option ${language === 'en' ? 'active' : ''}`}
            onClick={() => { setLanguage('en'); setIsLangPopupOpen(false); }}
          >
            <div className="flag-icon"><img src={gbFlag} alt="EN" /></div>
            <span>EN</span>
          </div>
        </div>

        <button
          type="button"
          className="floating-btn globe-btn"
          title="Dil Değiştir"
          onClick={(e) => {
            e.stopPropagation();
            setIsLangPopupOpen(prev => !prev);
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8"/><path d="M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18"/></svg>
        </button>
        <button type="button" className="floating-btn logout-btn" title="Çıkış Yap" onClick={() => setCurrentStep(1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
        </button>
      </div>

      {/* FLOATING COMPANY LOGO BADGE */}
      {logoPreview && currentStep >= 3 && (
        <div className="floating-company-badge">
          <div className="badge-logo-box"><img src={logoPreview} alt="Company Logo" /></div>
        </div>
      )}

      {/* FACTORY ILLUSTRATION FOOTER (BACKGROUND) */}
      <div className="factory-illustration-footer">
        <img
          src={factoryIllustration}
          alt="Factory Illustration"
          className="factory-illustration-img"
          style={{ opacity: currentStep === 2 ? 0.3 : 1 }}
        />
      </div>

      {/* ══════════ DEPARTMENT MODAL ══════════ */}
      {isDeptModalOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsDeptModalOpen(false); }}>
          <div className="modal-card">
            <div className="modal-header">
              <h2 className="modal-title">{editingDeptId ? t.modal_dept_edit_title : t.modal_dept_title}</h2>
              <button type="button" className="modal-close-btn" onClick={() => setIsDeptModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="input-label">{t.modal_dept_name}</label>
                <input type="text" className="form-input" placeholder={t.modal_dept_name} value={deptNameInput} onChange={(e) => setDeptNameInput(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="input-label">{t.modal_tag_label}</label>
                <div className="tag-input-row">
                  <div className="tag-input-wrapper">
                    <input type="text" className="form-input" placeholder="Etiket Adı" value={modalTagInput} onChange={(e) => setModalTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }} />
                  </div>
                  <button type="button" className="tag-add-btn" onClick={handleAddTag}>+</button>
                </div>
                {modalTags.length > 0 && (
                  <div className="tags-container">
                    {modalTags.map((tag, idx) => (
                      <span key={idx} className="tag-pill" style={{ backgroundColor: tag.color || '#7C5CFC' }}>
                        {tag.text}
                        <button type="button" className="tag-remove" onClick={() => handleRemoveTag(idx)}>&times;</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-modal-cancel" onClick={() => setIsDeptModalOpen(false)}>{t.btn_cancel}</button>
              <button type="button" className="btn-modal-submit" onClick={handleSaveDept}>{t.btn_save}</button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ PERSONNEL MODAL ══════════ */}
      {isPersonModalOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsPersonModalOpen(false); }}>
          <div className="modal-card modal-card-wide">
            <div className="modal-header">
              <h2 className="modal-title">{editingPersonId ? t.modal_personnel_edit_title : t.modal_personnel_title}</h2>
              <button type="button" className="modal-close-btn" onClick={() => setIsPersonModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-tabs">
              <button type="button" className={`modal-tab-btn ${personModalTab === 'genel' ? 'active' : ''}`} onClick={() => setPersonModalTab('genel')}>{t.tab_genel}</button>
              <button type="button" className={`modal-tab-btn ${personModalTab === 'yetenek' ? 'active' : ''}`} onClick={() => setPersonModalTab('yetenek')}>{t.tab_yetenek}</button>
              <button type="button" className={`modal-tab-btn ${personModalTab === 'basari' ? 'active' : ''}`} onClick={() => setPersonModalTab('basari')}>{t.tab_basari}</button>
            </div>
            <div className="modal-body personnel-modal-body">
              {personModalTab === 'genel' && (
                <div className="modal-tab-content active">
                  <div className="modal-two-column-grid">
                    <div className="modal-col">
                      <div className="form-group" style={{ marginBottom: '20px' }}>
                        <input type="file" ref={personPhotoInputRef} accept="image/*" style={{ display: 'none' }} onChange={handlePersonPhotoUpload} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div className="person-photo-circle" onClick={() => personPhotoInputRef.current?.click()} style={currentUploadedPhotoData ? { border: 'none' } : {}}>
                            {currentUploadedPhotoData ? <img src={currentUploadedPhotoData} alt="Photo" /> : <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#98A2B3" strokeWidth="2"><line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/></svg>}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '15px', fontWeight: 700, color: '#101828', marginBottom: '2px' }}>{t.person_photo}</span>
                            <span onClick={() => personPhotoInputRef.current?.click()} style={{ fontSize: '13px', color: '#667085', textDecoration: 'underline', cursor: 'pointer' }}>{t.upload_image}</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group"><label className="input-label">{t.person_id}</label><input type="text" className="form-input" value={personForm.personId} onChange={(e) => setPersonForm(p => ({ ...p, personId: e.target.value }))} /></div>
                      <div className="form-group"><label className="input-label">{t.person_role}</label><input type="text" className="form-input" value={personForm.role} onChange={(e) => setPersonForm(p => ({ ...p, role: e.target.value }))} /></div>
                      <div className="form-group"><label className="input-label">{t.person_first_name}</label><input type="text" className="form-input" value={personForm.firstName} onChange={(e) => setPersonForm(p => ({ ...p, firstName: e.target.value }))} /></div>
                      <div className="form-group"><label className="input-label">{t.person_last_name}</label><input type="text" className="form-input" value={personForm.lastName} onChange={(e) => setPersonForm(p => ({ ...p, lastName: e.target.value }))} /></div>
                      <div className="form-group"><label className="input-label">{t.person_phone}</label>
                        <div className="phone-input-group">
                          <select className="phone-country-select" value={personForm.phoneCountry} onChange={(e) => setPersonForm(p => ({ ...p, phoneCountry: e.target.value }))}><option value="TR">TR ∨</option></select>
                          <input type="text" className="form-input" placeholder="+90 (555) 000-0000" value={personForm.phone} onChange={(e) => setPersonForm(p => ({ ...p, phone }))} />
                        </div>
                      </div>
                    </div>
                    <div className="modal-col">
                      <div className="form-group input-icon-group"><label className="input-label">{t.person_email}</label><div className="input-with-icon"><EmailIcon /><input type="email" className="form-input" placeholder="olivia@upu.io" value={personForm.email} onChange={(e) => setPersonForm(p => ({ ...p, email: e.target.value }))} /></div></div>
                      <div className="form-group"><label className="input-label">{t.person_start_date}</label><input type="date" className="form-input" value={personForm.startDate} onChange={(e) => setPersonForm(p => ({ ...p, startDate: e.target.value }))} /></div>
                      <div className="form-group"><label className="input-label">{t.person_upu_point}</label><input type="text" className="form-input" value={personForm.upuPoint} onChange={(e) => setPersonForm(p => ({ ...p, upuPoint: e.target.value }))} /></div>
                      <div className="form-group"><label className="input-label">{t.person_total_cost}</label><input type="text" className="form-input" value={personForm.totalCost} onChange={(e) => setPersonForm(p => ({ ...p, totalCost: e.target.value }))} /></div>
                      <div className="form-group"><label className="input-label">{t.person_total_salary}</label><input type="text" className="form-input" value={personForm.totalSalary} onChange={(e) => setPersonForm(p => ({ ...p, totalSalary: e.target.value }))} /></div>
                      <div className="form-group"><label className="input-label">{t.person_dept}</label>
                        <select className="form-select" value={personForm.dept} onChange={(e) => setPersonForm(p => ({ ...p, dept: e.target.value }))}>
                          <option value="">{t.person_dept_placeholder}</option>
                          {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                      </div>
                      <div className="form-checkbox-group">
                        <label className="checkbox-container">
                          <input type="checkbox" checked={personForm.isManager} onChange={(e) => setPersonForm(p => ({ ...p, isManager: e.target.checked }))} />
                          <span className="checkbox-label-text">{t.person_is_manager}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <p className="modal-info-footnote">{t.person_manager_footnote}</p>
                </div>
              )}
              {personModalTab === 'yetenek' && (
                <div className="modal-tab-content active" style={{ width: '100%' }}>
                  <div className="skills-section-header">
                    <div className="skills-title-group">
                      <h3 className="skills-title">{t.skills_title}</h3>
                      <span className="skills-count-badge">{skillsData.length} {t.skills_count_suffix}</span>
                    </div>
                    <button type="button" className="btn-add-skill-trigger" onClick={handleOpenAddSkillModal}><span className="plus-sign">+</span><span>{t.btn_add_skill}</span></button>
                  </div>
                  <div className="skills-items-list">
                    {skillsData.map(skill => (
                      <div key={skill.id} className="skill-item-row">
                        <div className="skill-info"><div className="skill-name">{skill.name}</div><div className="skill-score">{skill.score}</div></div>
                        <div className="dept-actions-btns">
                          <button type="button" className="dept-action-icon-btn" onClick={() => handleOpenEditSkillModal(skill)}><EditIcon /></button>
                          <button type="button" className="dept-action-icon-btn" onClick={() => handleDeleteSkill(skill.id)}><DeleteIcon /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {personModalTab === 'basari' && (
                <div className="modal-tab-content active" style={{ width: '100%' }}>
                  <div className="skills-section-header">
                    <div className="skills-title-group">
                      <h3 className="skills-title">{t.achievements_title}</h3>
                      <span className="skills-count-badge">{achievementsData.length} {t.skills_count_suffix}</span>
                    </div>
                    <button type="button" className="btn-add-skill-trigger" onClick={handleOpenAddAchieveModal}><span className="plus-sign">+</span><span>{t.btn_add_achievement}</span></button>
                  </div>
                  <div className="skills-items-list">
                    {achievementsData.map(item => (
                      <div key={item.id} className="skill-item-row">
                        <div className="skill-info"><div className="skill-name">{item.title}</div><div className="skill-score">{item.approvedBy}</div></div>
                        <div className="dept-actions-btns">
                          <button type="button" className="dept-action-icon-btn" onClick={() => handleOpenEditAchieveModal(item)}><EditIcon /></button>
                          <button type="button" className="dept-action-icon-btn" onClick={() => handleDeleteAchieve(item.id)}><DeleteIcon /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-modal-cancel" onClick={() => setIsPersonModalOpen(false)}>{t.btn_cancel}</button>
              <button type="button" className="btn-modal-submit" onClick={handleSavePerson}>{t.btn_save}</button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ SKILL SUB-MODAL ══════════ */}
      {isSkillModalOpen && (
        <div className="modal-overlay sub-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsSkillModalOpen(false); }}>
          <div className="modal-card" style={{ maxWidth: '380px' }}>
            <div className="modal-header">
              <h2 className="modal-title">{editingSkillId ? t.modal_skill_edit_title : t.modal_skill_title}</h2>
              <button type="button" className="modal-close-btn" onClick={() => setIsSkillModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group" style={{ marginBottom: '16px' }}><label className="input-label">{t.skill_operation}</label><input type="text" className="form-input" placeholder={t.skill_operation_placeholder} value={skillForm.name} onChange={(e) => setSkillForm(p => ({ ...p, name: e.target.value }))} /></div>
              <div className="form-group input-icon-group" style={{ marginBottom: '16px' }}><label className="input-label">{t.skill_date}</label><div className="input-with-icon"><CalendarIcon /><input type="text" className="form-input" placeholder="16:34" value={skillForm.date} onChange={(e) => setSkillForm(p => ({ ...p, date: e.target.value }))} /></div></div>
              <div className="form-group"><label className="input-label">{t.skill_score}</label><select className="form-select" value={skillForm.score} onChange={(e) => setSkillForm(p => ({ ...p, score: e.target.value }))}><option value="">{t.skill_score_placeholder}</option>{[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={`${n}/10`}>{n}/10</option>)}</select></div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-modal-cancel" onClick={() => setIsSkillModalOpen(false)}>{t.btn_cancel}</button>
              <button type="button" className="btn-modal-submit" onClick={handleSaveSkill}>{t.btn_save}</button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ ACHIEVEMENT SUB-MODAL ══════════ */}
      {isAchieveModalOpen && (
        <div className="modal-overlay sub-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsAchieveModalOpen(false); }}>
          <div className="modal-card" style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h2 className="modal-title">{editingAchieveId ? t.modal_achievement_edit_title : t.modal_achievement_title}</h2>
              <button type="button" className="modal-close-btn" onClick={() => setIsAchieveModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-two-column-grid">
                <div className="modal-col">
                  <div className="form-group"><label className="input-label">{t.achieve_title}</label><input type="text" className="form-input" placeholder={t.achieve_title_placeholder} value={achieveForm.title} onChange={(e) => setAchieveForm(p => ({ ...p, title: e.target.value }))} /></div>
                  <div className="form-group input-icon-group"><label className="input-label">{t.achieve_date}</label><div className="input-with-icon"><CalendarIcon /><input type="text" className="form-input" placeholder="16:34" value={achieveForm.date} onChange={(e) => setAchieveForm(p => ({ ...p, date: e.target.value }))} /></div></div>
                  <div className="form-group"><label className="input-label">{t.achieve_institution}</label><input type="text" className="form-input" value={achieveForm.institution} onChange={(e) => setAchieveForm(p => ({ ...p, institution: e.target.value }))} /></div>
                  <div className="form-group logo-upload-group"><div className="logo-upload-box"><div className="logo-plus-icon">+</div><div className="logo-text-wrapper"><span className="logo-title">{t.achieve_document}</span><span className="logo-upload-link">{t.achieve_upload_link}</span></div></div></div>
                </div>
                <div className="modal-col">
                  <div className="form-group"><label className="input-label">{t.achieve_cert_no}</label><input type="text" className="form-input" value={achieveForm.certNo} onChange={(e) => setAchieveForm(p => ({ ...p, certNo: e.target.value }))} /></div>
                  <div className="form-group"><label className="input-label">{t.achieve_score}</label><input type="text" className="form-input" value={achieveForm.score} onChange={(e) => setAchieveForm(p => ({ ...p, score: e.target.value }))} /></div>
                  <div className="form-group"><label className="input-label">{t.achieve_max_score}</label><input type="text" className="form-input" value={achieveForm.maxScore} onChange={(e) => setAchieveForm(p => ({ ...p, maxScore: e.target.value }))} /></div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-modal-cancel" onClick={() => setIsAchieveModalOpen(false)}>{t.btn_cancel}</button>
              <button type="button" className="btn-modal-submit" onClick={handleSaveAchieve}>{t.btn_save}</button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ STEP 5: INTERNAL OP MODAL (3 Tabs) ══════════ */}
      {isInternalOpModalOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsInternalOpModalOpen(false); }}>
          <div className="modal-card modal-card-wide">
            <div className="modal-header">
              <h2 className="modal-title">{editingInternalOpId ? t.modal_internal_op_edit_title : t.modal_internal_op_title}</h2>
              <button type="button" className="modal-close-btn" onClick={() => setIsInternalOpModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-tabs">
              <button type="button" className={`modal-tab-btn ${internalOpModalTab === 'op-tab-info' ? 'active' : ''}`} onClick={() => setInternalOpModalTab('op-tab-info')}>{t.tab_op_info}</button>
              <button type="button" className={`modal-tab-btn ${internalOpModalTab === 'op-tab-manager' ? 'active' : ''}`} onClick={() => setInternalOpModalTab('op-tab-manager')}>{t.tab_op_manager}</button>
              <button type="button" className={`modal-tab-btn ${internalOpModalTab === 'op-tab-icon' ? 'active' : ''}`} onClick={() => setInternalOpModalTab('op-tab-icon')}>{t.tab_op_icon}</button>
            </div>
            <div className="modal-body">
              {/* TAB 1: OPERASYON BİLGİLERİ */}
              {internalOpModalTab === 'op-tab-info' && (
                <div className="modal-tab-content active">
                  <div className="modal-two-column-grid">
                    <div className="modal-col">
                      <div className="form-group"><label className="input-label">{t.op_name}</label><input type="text" className="form-input" value={internalOpForm.name} onChange={(e) => setInternalOpForm(p => ({ ...p, name: e.target.value }))} /></div>
                      <div className="form-group"><label className="input-label">{t.op_type}</label>
                        <select className="form-select" value={internalOpForm.type} onChange={(e) => setInternalOpForm(p => ({ ...p, type: e.target.value }))}>
                          <option value="">{t.op_type_placeholder}</option>
                          <option value="Frezeleme">Frezeleme</option>
                          <option value="Tornalama">Tornalama</option>
                          <option value="Kesme">Kesme</option>
                          <option value="Kaynak">Kaynak</option>
                          <option value="Montaj">Montaj</option>
                        </select>
                      </div>
                      <div className="form-group"><label className="input-label">{t.op_code}</label><input type="text" className="form-input" maxLength={3} value={internalOpForm.code} onChange={(e) => setInternalOpForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} /><span className="input-footnote">{t.op_code_footnote}</span></div>
                    </div>
                    <div className="modal-col">
                      <div className="form-group"><label className="input-label">{t.utilization}</label><div className="kpi-input-group"><span className="kpi-badge">KPI</span><input type="number" className="form-input" placeholder="12" value={internalOpForm.utilization} onChange={(e) => setInternalOpForm(p => ({ ...p, utilization: e.target.value }))} /></div></div>
                      <div className="form-group"><label className="input-label">{t.measurable}</label><div className="kpi-input-group"><span className="kpi-badge">KPI</span><input type="number" className="form-input" placeholder="12" value={internalOpForm.measurable} onChange={(e) => setInternalOpForm(p => ({ ...p, measurable: e.target.value }))} /></div></div>
                      <div className="form-group"><label className="input-label">{t.performance}</label><div className="kpi-input-group"><span className="kpi-badge">KPI</span><input type="number" className="form-input" placeholder="12" value={internalOpForm.performance} onChange={(e) => setInternalOpForm(p => ({ ...p, performance: e.target.value }))} /></div></div>
                      <div className="form-group"><label className="input-label">{t.availability}</label><div className="kpi-input-group"><span className="kpi-badge">KPI</span><input type="number" className="form-input" placeholder="12" value={internalOpForm.availability} onChange={(e) => setInternalOpForm(p => ({ ...p, availability: e.target.value }))} /></div></div>
                    </div>
                  </div>
                  <div className="modal-footer" style={{ marginTop: '24px' }}>
                    <button type="button" className="btn-modal-cancel" onClick={() => setIsInternalOpModalOpen(false)}>{t.btn_cancel}</button>
                    <button type="button" className="btn-modal-submit" onClick={() => setInternalOpModalTab('op-tab-manager')}>{t.btn_next}</button>
                  </div>
                </div>
              )}

              {/* TAB 2: OPERASYON SORUMLUSU */}
              {internalOpModalTab === 'op-tab-manager' && (
                <div className="modal-tab-content active" style={{ width: '100%' }}>
                  <div className="dept-search-wrapper" style={{ marginBottom: '16px' }}>
                    <SearchIcon />
                    <input type="text" className="dept-search-input" placeholder={t.search_placeholder} value={opManagerSearchQuery} onChange={(e) => setOpManagerSearchQuery(e.target.value)} />
                  </div>
                  <div className="op-managers-grid">
                    {filteredPersonnelForOp.length === 0 ? (
                      <div style={{ gridColumn: '1 / -1', padding: '20px', textAlign: 'center', color: '#667085' }}>Henüz personel eklenmedi veya arama bulunamadı.</div>
                    ) : (
                      filteredPersonnelForOp.map(p => {
                        const fullName = `${p.firstName} ${p.lastName}`.trim();
                        const isChecked = selectedOpManagers.includes(fullName);
                        return (
                          <label key={p.id} className="op-manager-card">
                            <input type="checkbox" checked={isChecked} onChange={() => handleToggleOpManager(fullName)} />
                            <div className="person-avatar-fallback" style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: '50%', fontSize: '12px' }}>
                              {((p.firstName[0] || '') + (p.lastName[0] || '')).toUpperCase() || 'P'}
                            </div>
                            <div className="person-info-col">
                              <span style={{ fontSize: '13px', fontWeight: 600, color: '#101828' }}>{fullName}</span>
                              <span style={{ fontSize: '12px', color: '#667085' }}>{p.role || p.dept || 'Staff'}</span>
                            </div>
                          </label>
                        );
                      })
                    )}
                  </div>
                  <div className="modal-footer" style={{ marginTop: '24px' }}>
                    <button type="button" className="btn-modal-cancel" onClick={() => setInternalOpModalTab('op-tab-info')}>{t.btn_prev}</button>
                    <button type="button" className="btn-modal-submit" onClick={() => setInternalOpModalTab('op-tab-icon')}>{t.btn_next}</button>
                  </div>
                </div>
              )}

              {/* TAB 3: OPERASYON İKONU */}
              {internalOpModalTab === 'op-tab-icon' && (
                <div className="modal-tab-content active" style={{ width: '100%' }}>
                  <div className="dept-search-wrapper" style={{ marginBottom: '16px' }}>
                    <SearchIcon />
                    <input type="text" className="dept-search-input" placeholder={t.search_placeholder} value={opIconSearchQuery} onChange={(e) => setOpIconSearchQuery(e.target.value)} />
                  </div>
                  <div className="op-icon-picker-grid">
                    {opIconsList.map(icon => (
                      <button
                        key={icon.id}
                        type="button"
                        className={`icon-picker-item ${selectedOpIconSrc === icon.src ? 'active' : ''}`}
                        onClick={() => setSelectedOpIconSrc(icon.src)}
                      >
                        {icon.src ? <img src={icon.src} alt={icon.id} /> : '⚙️'}
                      </button>
                    ))}
                  </div>
                  <div className="modal-footer" style={{ marginTop: '24px' }}>
                    <button type="button" className="btn-modal-cancel" onClick={() => setInternalOpModalTab('op-tab-manager')}>{t.btn_prev}</button>
                    <button type="button" className="btn-modal-submit" onClick={handleSaveInternalOp}>{t.btn_save}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ STEP 6: EXTERNAL OP MODAL (2 Tabs) ══════════ */}
      {isExternalOpModalOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsExternalOpModalOpen(false); }}>
          <div className="modal-card modal-card-wide">
            <div className="modal-header">
              <h2 className="modal-title">{editingExternalOpId ? t.modal_external_op_edit_title : t.modal_external_op_title}</h2>
              <button type="button" className="modal-close-btn" onClick={() => setIsExternalOpModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-tabs">
              <button type="button" className={`modal-tab-btn ${externalOpModalTab === 'ext-tab-info' ? 'active' : ''}`} onClick={() => setExternalOpModalTab('ext-tab-info')}>{t.tab_op_info}</button>
              <button type="button" className={`modal-tab-btn ${externalOpModalTab === 'ext-tab-manager' ? 'active' : ''}`} onClick={() => setExternalOpModalTab('ext-tab-manager')}>{t.tab_op_manager}</button>
            </div>
            <div className="modal-body">
              {/* TAB 1: OPERASYON BİLGİLERİ VE TEDARİKÇİLER */}
              {externalOpModalTab === 'ext-tab-info' && (
                <div className="modal-tab-content active" style={{ width: '100%' }}>
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="input-label">{t.ext_op_name}</label>
                    <input type="text" className="form-input" placeholder="Operasyon Adı" value={extOpNameInput} onChange={(e) => setExtOpNameInput(e.target.value)} />
                  </div>
                  <div className="suppliers-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <label className="input-label" style={{ marginBottom: 0 }}>{t.suppliers}</label>
                      <span className="dept-count-badge">{suppliersData.length} adet</span>
                    </div>
                    <button type="button" className="btn-link-action" onClick={handleOpenAddSupplierModal}>
                      <span>+</span><span>{t.btn_add_new_supplier}</span>
                    </button>
                  </div>
                  <div className="suppliers-grid">
                    {suppliersData.length === 0 ? (
                      <div style={{ gridColumn: '1 / -1', padding: '24px', textAlign: 'center', color: '#667085', fontSize: '13px', background: '#F9FAFB', border: '1px dashed #EAECF0', borderRadius: '8px' }}>
                        Henüz tedarikçi tanımlanmadı. Lütfen tedarikçi ekleyiniz.
                      </div>
                    ) : (
                      suppliersData.map(sup => {
                        const isChecked = selectedExtOpSuppliers.includes(sup.name);
                        return (
                          <div key={sup.id} className="supplier-item-row">
                            <label className="supplier-item-left" style={{ cursor: 'pointer', flex: 1 }}>
                              <input type="checkbox" className="supplier-checkbox" checked={isChecked} onChange={() => handleToggleExtSupplier(sup.name)} />
                              <span>{sup.name}</span>
                            </label>
                            <div className="supplier-item-actions">
                              <button type="button" className="supplier-action-btn edit-btn" onClick={() => handleOpenEditSupplierModal(sup)}><EditIcon /></button>
                              <button type="button" className="supplier-action-btn delete-btn" onClick={() => handleDeleteSupplier(sup.id)}><DeleteIcon /></button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="modal-footer" style={{ marginTop: '24px' }}>
                    <button type="button" className="btn-modal-cancel" onClick={() => setIsExternalOpModalOpen(false)}>{t.btn_cancel}</button>
                    <button type="button" className="btn-modal-submit" onClick={() => setExternalOpModalTab('ext-tab-manager')}>{t.btn_next}</button>
                  </div>
                </div>
              )}

              {/* TAB 2: OPERASYON SORUMLUSU */}
              {externalOpModalTab === 'ext-tab-manager' && (
                <div className="modal-tab-content active" style={{ width: '100%' }}>
                  <div className="dept-search-wrapper" style={{ marginBottom: '16px' }}>
                    <SearchIcon />
                    <input type="text" className="dept-search-input" placeholder={t.search_placeholder} value={extOpManagerSearchQuery} onChange={(e) => setExtOpManagerSearchQuery(e.target.value)} />
                  </div>
                  <div className="op-managers-grid">
                    {personnelData.map(p => {
                      const fullName = `${p.firstName} ${p.lastName}`.trim();
                      const isChecked = selectedExtOpManagers.includes(fullName);
                      return (
                        <label key={p.id} className="op-manager-card">
                          <input type="checkbox" checked={isChecked} onChange={() => handleToggleExtManager(fullName)} />
                          <div className="person-avatar-fallback" style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: '50%', fontSize: '12px' }}>
                            {((p.firstName[0] || '') + (p.lastName[0] || '')).toUpperCase() || 'P'}
                          </div>
                          <div className="person-info-col">
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#101828' }}>{fullName}</span>
                            <span style={{ fontSize: '12px', color: '#667085' }}>{p.role || p.dept || 'Staff'}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  <div className="modal-footer" style={{ marginTop: '24px' }}>
                    <button type="button" className="btn-modal-cancel" onClick={() => setExternalOpModalTab('ext-tab-info')}>{t.btn_prev}</button>
                    <button type="button" className="btn-modal-submit" onClick={handleSaveExternalOp}>{t.btn_save}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ SUPPLIER MODAL (Nested Sub-Modal) ══════════ */}
      {isSupplierModalOpen && (
        <div className="modal-overlay sub-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsSupplierModalOpen(false); }}>
          <div className="modal-card" style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <h2 className="modal-title">{editingSupplierId ? t.modal_supplier_edit_title : t.modal_supplier_title}</h2>
              <button type="button" className="modal-close-btn" onClick={() => setIsSupplierModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body" style={{ gap: '16px' }}>
              <div className="form-group"><label className="input-label">{t.supplier_name}</label><input type="text" className="form-input" placeholder={t.supplier_name} value={supplierForm.name} onChange={(e) => setSupplierForm(p => ({ ...p, name: e.target.value }))} /></div>
              <div className="form-group"><label className="input-label">{t.supplier_address}</label><input type="text" className="form-input" placeholder={t.supplier_address} value={supplierForm.address} onChange={(e) => setSupplierForm(p => ({ ...p, address: e.target.value }))} /></div>
              <div className="form-group"><label className="input-label">{t.supplier_phone}</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select className="form-input" style={{ width: '110px', flexShrink: 0 }} value={supplierForm.countryCode} onChange={(e) => setSupplierForm(p => ({ ...p, countryCode: e.target.value }))}>
                    <option value="TR">TR ∨ +(90)</option>
                    <option value="US">US ∨ +(1)</option>
                    <option value="GB">GB ∨ +(44)</option>
                    <option value="DE">DE ∨ +(49)</option>
                  </select>
                  <input type="tel" className="form-input" placeholder="5xx xxx xx xx" style={{ flex: 1 }} value={supplierForm.phone} onChange={(e) => setSupplierForm(p => ({ ...p, phone: e.target.value }))} />
                </div>
              </div>
              <div className="form-group input-icon-group"><label className="input-label">{t.supplier_email}</label>
                <div className="input-with-icon"><EmailIcon /><input type="email" className="form-input" placeholder="upu@upu.io" value={supplierForm.email} onChange={(e) => setSupplierForm(p => ({ ...p, email: e.target.value }))} /></div>
              </div>
            </div>
            <div className="modal-footer" style={{ marginTop: '24px' }}>
              <button type="button" className="btn-modal-cancel" onClick={() => setIsSupplierModalOpen(false)}>{t.btn_cancel}</button>
              <button type="button" className="btn-modal-submit" onClick={handleSaveSupplier}>{t.btn_save}</button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
