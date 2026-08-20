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

  // STEP 7: Equipments State
  const [equipmentsData, setEquipmentsData] = useState([]);
  const [maxEquipmentCredit, setMaxEquipmentCredit] = useState(42);
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [editingEquipmentId, setEditingEquipmentId] = useState(null);
  const [equipmentSearchQuery, setEquipmentSearchQuery] = useState('');
  const eqPhotoFileInputRef = useRef(null);
  const [currentUploadedEqPhoto, setCurrentUploadedEqPhoto] = useState(null);
  const [eqForm, setEqForm] = useState({
    id: '', brand: '', model: '', type: '', mac: '', year: '',
    amort: '', score: '', valuation: '', minCost: '',
    workerCount: '', orderNo: '', lifespan: '', tolerance: '',
    utilization: '12', measurable: '12', performance: '12', availability: '12'
  });

  // STEP 8: Shifts State
  const [shiftsData, setShiftsData] = useState([]);
  const [editingShiftId, setEditingShiftId] = useState(null);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [shiftModalTab, setShiftModalTab] = useState('info'); // 'info' | 'break'
  const [shiftForm, setShiftForm] = useState({
    name: '', startTime: '16:34', endTime: '16:34', manager: '', repeatDays: [], color: ''
  });
  const [currentShiftBreaks, setCurrentShiftBreaks] = useState([]);

  // Sub-modal: Breaks
  const [isBreakModalOpen, setIsBreakModalOpen] = useState(false);
  const [editingBreakId, setEditingBreakId] = useState(null);
  const [breakForm, setBreakForm] = useState({ name: '', startTime: '16:34', endTime: '16:34' });

  const colorHexMap = {
    'mor': '#7F56D9',
    'gri': '#667085',
    'kırmızı': '#D9381E',
    'turuncu': '#F79009',
    'yeşil': '#12B76A',
    'mavi': '#2E90FA'
  };

  const t = translations[language];

  const hasActiveList = (currentStep === 2) ||
    (currentStep === 3 && departments.length > 0) ||
    (currentStep === 4 && personnelData.length > 0) ||
    (currentStep === 5 && internalOpsData.length > 0) ||
    (currentStep === 6 && externalOpsData.length > 0) ||
    (currentStep === 7 && equipmentsData.length > 0) ||
    (currentStep === 8 && shiftsData.length > 0);

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

  // ─── Step 7: Equipment Handlers ───
  const handleOpenAddEquipmentModal = () => {
    setEditingEquipmentId(null);
    setCurrentUploadedEqPhoto(null);
    setEqForm({
      id: '', brand: '', model: '', type: 'CNC Torna', mac: '', year: '',
      amort: '', score: '', valuation: '', minCost: '',
      workerCount: '', orderNo: '', lifespan: '', tolerance: '',
      utilization: '12', measurable: '12', performance: '12', availability: '12'
    });
    setIsEquipmentModalOpen(true);
  };

  const handleOpenEditEquipmentModal = (eq) => {
    setEditingEquipmentId(eq.id);
    setCurrentUploadedEqPhoto(eq.img || eq.photo || null);
    setEqForm({
      id: eq.id || '',
      brand: eq.brand || eq.name || '',
      model: eq.model || '',
      type: eq.type || 'CNC Torna',
      mac: eq.mac || '',
      year: eq.year || '',
      amort: eq.amort || '',
      score: eq.score || '',
      valuation: eq.valuation || '',
      minCost: eq.minCost || '',
      workerCount: eq.workerCount || '',
      orderNo: eq.orderNo || '',
      lifespan: eq.lifespan || '',
      tolerance: eq.tolerance || '',
      utilization: eq.utilization || '12',
      measurable: eq.measurable || '12',
      performance: eq.performance || '12',
      availability: eq.availability || '12'
    });
    setIsEquipmentModalOpen(true);
  };

  const handleEqPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCurrentUploadedEqPhoto(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEquipment = () => {
    const brand = eqForm.brand.trim();
    const model = eqForm.model.trim();
    const finalName = brand && model ? `${brand} ${model}` : (brand || model || 'Yeni Ekipman');
    const finalType = eqForm.type || 'CNC Torna';

    const eqObj = {
      name: finalName,
      brand,
      model,
      type: finalType,
      img: currentUploadedEqPhoto || null,
      photo: currentUploadedEqPhoto || null,
      ...eqForm
    };

    if (editingEquipmentId) {
      setEquipmentsData(prev => prev.map(e => e.id === editingEquipmentId ? { ...e, ...eqObj } : e));
    } else {
      setEquipmentsData(prev => [...prev, { id: Date.now(), ...eqObj }]);
    }
    setIsEquipmentModalOpen(false);
  };

  const handleDeleteEquipment = (id) => setEquipmentsData(prev => prev.filter(e => e.id !== id));

  const filteredDefinedEquipments = equipmentsData.filter(e => {
    const q = equipmentSearchQuery.toLowerCase();
    return e.name.toLowerCase().includes(q) || (e.type && e.type.toLowerCase().includes(q));
  });

  const isEquipmentLimitReached = equipmentsData.length >= maxEquipmentCredit;

  // ─── Step 8: Shift Handlers ───
  const handleOpenAddShiftModal = () => {
    if (shiftsData.length >= 3) return;
    setEditingShiftId(null);
    setShiftForm({ name: '', startTime: '16:34', endTime: '16:34', manager: '', repeatDays: [], color: '' });
    setCurrentShiftBreaks([]);
    setShiftModalTab('info');
    setIsShiftModalOpen(true);
  };

  const handleOpenEditShiftModal = (shift) => {
    setEditingShiftId(shift.id);
    setShiftForm({
      name: shift.name || '',
      startTime: shift.startTime || '16:34',
      endTime: shift.endTime || '16:34',
      manager: shift.manager || '',
      repeatDays: shift.repeatDays || [],
      color: shift.color || ''
    });
    setCurrentShiftBreaks(shift.breaks ? JSON.parse(JSON.stringify(shift.breaks)) : []);
    setShiftModalTab('info');
    setIsShiftModalOpen(true);
  };

  const handleToggleShiftRepeatDay = (day) => {
    setShiftForm(prev => ({
      ...prev,
      repeatDays: prev.repeatDays.includes(day)
        ? prev.repeatDays.filter(d => d !== day)
        : [...prev.repeatDays, day]
    }));
  };

  const handleSaveShift = () => {
    const name = shiftForm.name.trim() || 'Yeni Vardiya';
    const shiftObj = {
      name,
      startTime: shiftForm.startTime || '16:34',
      endTime: shiftForm.endTime || '16:34',
      manager: shiftForm.manager || '',
      repeatDays: [...shiftForm.repeatDays],
      color: shiftForm.color || '',
      breaks: [...currentShiftBreaks]
    };
    if (editingShiftId) {
      setShiftsData(prev => prev.map(s => s.id === editingShiftId ? { ...s, ...shiftObj } : s));
    } else {
      setShiftsData(prev => [...prev, { id: Date.now(), ...shiftObj }]);
    }
    setIsShiftModalOpen(false);
  };

  const handleDeleteShift = (id) => setShiftsData(prev => prev.filter(s => s.id !== id));

  // Break Handlers (Submodal)
  const handleOpenAddBreakModal = () => {
    setEditingBreakId(null);
    setBreakForm({ name: '', startTime: '16:34', endTime: '16:34' });
    setIsBreakModalOpen(true);
  };

  const handleOpenEditBreakModal = (b) => {
    setEditingBreakId(b.id);
    setBreakForm({ name: b.name || '', startTime: b.startTime || '16:34', endTime: b.endTime || '16:34' });
    setIsBreakModalOpen(true);
  };

  const handleSaveBreak = () => {
    const name = breakForm.name.trim() || 'Yeni Mola';
    const breakObj = { name, startTime: breakForm.startTime || '16:34', endTime: breakForm.endTime || '16:34' };
    if (editingBreakId) {
      setCurrentShiftBreaks(prev => prev.map(b => b.id === editingBreakId ? { ...b, ...breakObj } : b));
    } else {
      setCurrentShiftBreaks(prev => [...prev, { id: Date.now(), ...breakObj }]);
    }
    setIsBreakModalOpen(false);
  };

  const handleDeleteBreak = (id) => setCurrentShiftBreaks(prev => prev.filter(b => b.id !== id));

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
                        <div className="dept-item-actions">
                          <button type="button" className="dept-action-btn edit-dept-btn" onClick={() => handleOpenEditDeptModal(dept)} title="Düzenle">
                            <EditIcon />
                          </button>
                          <button type="button" className="dept-action-btn delete-btn" onClick={() => handleDeleteDept(dept.id)} title="Sil">
                            <DeleteIcon />
                          </button>
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
                          <div className="dept-item-actions">
                            <button type="button" className="dept-action-btn edit-person-btn" onClick={() => handleOpenEditPersonModal(person)} title="Düzenle">
                              <EditIcon />
                            </button>
                            <button type="button" className="dept-action-btn delete-person-btn" onClick={() => handleDeletePerson(person.id)} title="Sil">
                              <DeleteIcon />
                            </button>
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
                      <div key={op.id} className="dept-item-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', color: '#344054' }}>
                            {op.src ? <img src={op.src} alt="Op Icon" style={{ width: '24px', height: '24px', objectFit: 'contain' }} /> : <span style={{ fontSize: '20px' }}>⚙️</span>}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <span className="dept-name-text" style={{ display: 'flex', alignItems: 'center' }}>
                              {op.name}
                              {op.code && (
                                <span style={{ background: '#F4F3FF', color: '#7C5CFC', fontSize: '12px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>
                                  {op.code}
                                </span>
                              )}
                            </span>
                            <span style={{ fontSize: '13px', color: '#667085', fontWeight: 400, marginTop: '2px' }}>
                              {op.managers && op.managers.length > 0 ? op.managers.join(', ') : 'Henüz sorumlu atanmadı'}
                            </span>
                          </div>
                        </div>
                        <div className="dept-item-actions">
                          <button type="button" className="dept-action-btn edit-op-btn" onClick={() => handleOpenEditInternalOpModal(op)} title="Düzenle">
                            <EditIcon />
                          </button>
                          <button type="button" className="dept-action-btn delete-op-btn" onClick={() => handleDeleteInternalOp(op.id)} title="Sil">
                            <DeleteIcon />
                          </button>
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
                    {filteredExternalOps.map((op) => {
                      const supplierSubText = (op.suppliers && op.suppliers.length > 0) ? op.suppliers.join(', ') : '';
                      return (
                        <div key={op.id} className="dept-item-card">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '36px', height: '36px', minWidth: '36px', backgroundColor: '#F4F3FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7F56D9' }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                              <span className="dept-name-text">{op.name}</span>
                              {supplierSubText && <span style={{ fontSize: '13px', color: '#667085', fontWeight: 400, marginTop: '2px' }}>{supplierSubText}</span>}
                            </div>
                          </div>
                          <div className="dept-item-actions">
                            <button type="button" className="dept-action-btn edit-ext-op-btn" onClick={() => handleOpenEditExternalOpModal(op)} title="Düzenle">
                              <EditIcon />
                            </button>
                            <button type="button" className="dept-action-btn delete-ext-op-btn" onClick={() => handleDeleteExternalOp(op.id)} title="Sil">
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      );
                    })}
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
        {/* ══════════ STEP 7: EKİPMAN EKLE (EQUIPMENTS) ══════════ */}
        {currentStep === 7 && (
          <div className="step-view active" id="step-7">
            {equipmentsData.length === 0 ? (
              <div className="internal-op-empty-view" id="equipmentsEmptyView">
                <div className="welcome-header internal-op-header">
                  <h1 className="step-title">{t.step7_title}</h1>
                  <p className="welcome-subtitle">{t.step7_sub}</p>
                </div>
                <div className="add-internal-op-wrapper">
                  <button type="button" className="btn-add-item" id="btnAddEquipment" onClick={handleOpenAddEquipmentModal}>
                    <span className="plus-sign">+</span>
                    <span>{t.btn_add}</span>
                  </button>
                </div>
                <div className="form-action-buttons" style={{ marginTop: '40px' }}>
                  <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(6)}>{t.btn_prev}</button>
                  <button type="button" className="btn-step-next btn-next" onClick={() => setCurrentStep(8)}>{t.btn_next}</button>
                </div>
              </div>
            ) : (
              <div className="internal-op-list-view" id="equipmentsListView">
                <div className="dept-card-container" style={{ maxWidth: '720px' }}>
                  {/* Header */}
                  <div className="dept-card-header" style={{ marginBottom: '16px' }}>
                    <h2 className="dept-card-title">{t.equipments}</h2>
                    <span
                      className="dept-count-badge"
                      style={{
                        backgroundColor: isEquipmentLimitReached ? '#FEF3F2' : '#F4F3FF',
                        color: isEquipmentLimitReached ? '#B42318' : '#7F56D9',
                        fontWeight: 600,
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '13px'
                      }}
                    >
                      {equipmentsData.length} / {maxEquipmentCredit} {t.equipment_credit_count}
                    </span>
                  </div>

                  {/* Search */}
                  <div className="dept-search-wrapper" style={{ marginBottom: '16px' }}>
                    <SearchIcon />
                    <input
                      type="text"
                      className="dept-search-input"
                      placeholder={t.search_placeholder}
                      value={equipmentSearchQuery}
                      onChange={(e) => setEquipmentSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Tabs Row: Tanımsız Ekipmanlar & Tanımlı Ekipmanlar */}
                  <div className="equipment-list-tabs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #EAECF0', paddingBottom: '12px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#344054' }}>
                      <span>{t.undefined_equipments}</span>
                      <span
                        style={{
                          backgroundColor: isEquipmentLimitReached ? '#FEF3F2' : '#EFF8FF',
                          color: isEquipmentLimitReached ? '#B42318' : '#175CD3',
                          fontSize: '12px',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontWeight: 600
                        }}
                      >
                        {isEquipmentLimitReached ? 0 : Math.max(0, maxEquipmentCredit - equipmentsData.length)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#344054' }}>
                      <span>{t.defined_equipments}</span>
                      <span style={{ backgroundColor: '#ECFDF3', color: '#027A48', fontSize: '12px', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                        {equipmentsData.length}
                      </span>
                    </div>
                  </div>

                  {/* 2-Column Equipment Container */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'start' }}>
                    {/* Left Column: Tanımsız Ekipmanlar veya Kredi Bitti */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {isEquipmentLimitReached ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifySelf: 'center', textAlign: 'center', padding: '32px 16px', border: '1px dashed #FDA29B', borderRadius: '12px', background: '#FFFAFA', minHeight: '200px' }}>
                          <div style={{ width: '44px', height: '44px', background: '#FEF3F2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D9381E" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          </div>
                          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#101828', marginBottom: '6px' }}>{t.credit_finished_title}</h3>
                          <p style={{ fontSize: '12px', color: '#667085', maxWidth: '220px', lineHeight: '1.4', marginBottom: '18px' }}>
                            {t.credit_finished_sub}
                          </p>
                          <button
                            type="button"
                            onClick={() => setMaxEquipmentCredit(prev => prev + 20)}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px solid #D0D5DD', borderRadius: '8px', background: '#FFFFFF', fontSize: '14px', fontWeight: 600, color: '#344054', cursor: 'pointer', boxShadow: '0 1px 2px rgba(16,24,40,0.05)' }}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                            <span>{t.btn_buy}</span>
                          </button>
                        </div>
                      ) : (
                        <div style={{ padding: '24px', textAlign: 'center', color: '#667085', fontSize: '13px', background: '#F9FAFB', border: '1px dashed #EAECF0', borderRadius: '8px' }}>
                          Henüz tanımsız ekipman kalmadı.
                        </div>
                      )}
                    </div>

                    {/* Right Column: Tanımlı Ekipmanlar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {filteredDefinedEquipments.map((item) => (
                        <div
                          key={item.id}
                          className="dept-item-card"
                          style={{ padding: '8px 12px', border: '1px solid #EAECF0', borderRadius: '8px', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '44px', height: '36px', minWidth: '44px', borderRadius: '6px', overflow: 'hidden', background: '#F9FAFB', border: '1px solid #EAECF0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {item.img || item.photo ? (
                                <img src={item.img || item.photo} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                              )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                              <div style={{ fontSize: '14px', fontWeight: 600, color: '#101828' }}>{item.name}</div>
                              <div style={{ fontSize: '12px', color: '#667085' }}>{item.type || 'CNC Torna'}</div>
                            </div>
                          </div>
                          <div className="dept-item-actions">
                            <button type="button" className="dept-action-btn edit-eq-btn" onClick={() => handleOpenEditEquipmentModal(item)} title="Düzenle">
                              <EditIcon />
                            </button>
                            <button type="button" className="dept-action-btn delete-eq-btn" onClick={() => handleDeleteEquipment(item.id)} title="Sil">
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn-add-new-dept"
                        onClick={handleOpenAddEquipmentModal}
                        style={{ marginTop: '4px' }}
                      >
                        <span className="plus-sign">+</span><span>{t.modal_equipment_title}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-action-buttons" style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto' }}>
                  <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(6)}>{t.btn_prev}</button>
                  <button type="button" className="btn-step-next btn-next" onClick={() => setCurrentStep(8)}>{t.btn_next}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════ STEP 8: VARDİYA EKLE (SHIFTS) ══════════ */}
        {currentStep === 8 && (
          <div className="step-view active" id="step-8">
            {shiftsData.length === 0 ? (
              <div className="internal-op-empty-view" id="shiftsEmptyView">
                <div className="welcome-header internal-op-header">
                  <h1 className="step-title">{t.step8_title}</h1>
                  <p className="welcome-subtitle">{t.step8_sub}</p>
                </div>
                <div className="add-internal-op-wrapper">
                  <button type="button" className="btn-add-item" id="btnAddShift" onClick={handleOpenAddShiftModal}>
                    <span className="plus-sign">+</span>
                    <span>{t.btn_add}</span>
                  </button>
                </div>
                <div className="form-action-buttons" style={{ marginTop: '40px' }}>
                  <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(7)}>{t.btn_prev}</button>
                  <button type="button" className="btn-step-next btn-next" onClick={() => setCurrentStep(9)}>{t.btn_next}</button>
                </div>
              </div>
            ) : (
              <div className="internal-op-list-view" id="shiftsListView" style={{ width: '100%' }}>
                <div style={{ width: '100%', maxWidth: '688px', margin: '0 auto', background: '#FFFFFF', border: '1px solid #EAECF0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(16,24,40,0.05)', boxSizing: 'border-box' }}>
                  {/* Header Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#101828', margin: 0 }}>{t.shifts}</h2>
                    <span style={{ padding: '4px 12px', borderRadius: '16px', background: '#F4F3FF', color: '#7F56D9', fontSize: '13px', fontWeight: 600 }}>
                      {shiftsData.length} {t.shift_count_suffix}
                    </span>
                  </div>

                  {/* Defined Shifts Cards Container */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                    {shiftsData.map((item) => {
                      const borderColor = colorHexMap[item.color] || '#7F56D9';
                      return (
                        <div
                          key={item.id}
                          style={{
                            padding: '12px 16px 12px 12px',
                            border: '1px solid #EAECF0',
                            borderLeft: `4px solid ${borderColor}`,
                            borderRadius: '8px',
                            background: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            boxSizing: 'border-box',
                            textAlign: 'left'
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                            <span style={{ fontSize: '15px', fontWeight: 700, color: '#101828', textAlign: 'left' }}>{item.name}</span>
                            <span style={{ fontSize: '13px', color: '#667085', marginTop: '2px', textAlign: 'left' }}>{item.startTime} - {item.endTime}</span>
                          </div>
                          <div className="dept-item-actions">
                            <button type="button" className="dept-action-btn edit-shift-btn" onClick={() => handleOpenEditShiftModal(item)} title="Düzenle">
                              <EditIcon />
                            </button>
                            <button type="button" className="dept-action-btn delete-shift-btn" onClick={() => handleDeleteShift(item.id)} title="Sil">
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* + Yeni Vardiya Ekle Bottom Button */}
                  <button
                    type="button"
                    disabled={shiftsData.length >= 3}
                    onClick={handleOpenAddShiftModal}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #D0D5DD',
                      borderRadius: '8px',
                      background: shiftsData.length >= 3 ? '#F9FAFB' : '#FFFFFF',
                      borderColor: shiftsData.length >= 3 ? '#EAECF0' : '#D0D5DD',
                      color: shiftsData.length >= 3 ? '#98A2B3' : '#344054',
                      cursor: shiftsData.length >= 3 ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 1px 2px rgba(16,24,40,0.05)',
                      transition: 'all 0.15s'
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>+</span>
                    <span>{t.btn_add_new_shift}</span>
                  </button>

                  {/* 24 Saat / 3 Vardiya Sınırı Uyarı Satırı */}
                  {shiftsData.length >= 3 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '13px', color: '#475467' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                      <span>{t.shift_limit_warning}</span>
                    </div>
                  )}
                </div>

                <div className="form-action-buttons" style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', maxWidth: '688px', marginLeft: 'auto', marginRight: 'auto', boxSizing: 'border-box' }}>
                  <button type="button" className="btn-step-prev btn-prev" onClick={() => setCurrentStep(7)}>{t.btn_prev}</button>
                  <button type="button" className="btn-step-next btn-next" onClick={() => setCurrentStep(9)} style={{ background: '#7F56D9', color: '#FFFFFF' }}>{t.btn_next}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════ STEP 9: KAPANIŞ SAYFASI (KURULUM TAMAMLANDI) ══════════ */}
        {currentStep === 9 && (
          <div className="step-view active" id="step-9" style={{ marginTop: '60px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#101828', marginBottom: '12px' }}>{t.step9_title}</h1>
              <p style={{ fontSize: '15px', color: '#667085', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto 32px auto' }}>
                {t.step9_sub}
              </p>
              <button
                type="button"
                id="btnFinishStart"
                onClick={() => setCurrentStep(1)}
                style={{
                  padding: '12px 36px',
                  background: '#7F56D9',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 1px 3px rgba(16,24,40,0.1)',
                  transition: 'background 0.15s'
                }}
              >
                <span>{t.btn_finish_start}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          </div>
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
          style={{ opacity: hasActiveList ? 0.3 : 1 }}
        />
      </div>

      {/* ══════════ DEPARTMENT MODAL ══════════ */}
      {isDeptModalOpen && (
        <div className="modal-overlay active" id="departmentModal" onClick={(e) => { if (e.target === e.currentTarget) setIsDeptModalOpen(false); }}>
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
        <div className="modal-overlay active" id="personnelModal" onClick={(e) => { if (e.target === e.currentTarget) setIsPersonModalOpen(false); }}>
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
                          <div
                            className="person-photo-circle"
                            onClick={() => personPhotoInputRef.current?.click()}
                            style={currentUploadedPhotoData ? { border: 'none' } : {}}
                          >
                            {currentUploadedPhotoData ? (
                              <img
                                src={currentUploadedPhotoData}
                                alt="Photo"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }}
                              />
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }}>
                                <line x1="7" y1="2" x2="7" y2="12" />
                                <line x1="2" y1="7" x2="12" y2="7" />
                              </svg>
                            )}
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
                        <div className="dept-item-actions">
                          <button type="button" className="dept-action-btn edit-skill-btn" onClick={() => handleOpenEditSkillModal(skill)} title="Düzenle">
                            <EditIcon />
                          </button>
                          <button type="button" className="dept-action-btn delete-skill-btn" onClick={() => handleDeleteSkill(skill.id)} title="Sil">
                            <DeleteIcon />
                          </button>
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
                        <div className="dept-item-actions">
                          <button type="button" className="dept-action-btn edit-achieve-btn" onClick={() => handleOpenEditAchieveModal(item)} title="Düzenle">
                            <EditIcon />
                          </button>
                          <button type="button" className="dept-action-btn delete-achieve-btn" onClick={() => handleDeleteAchieve(item.id)} title="Sil">
                            <DeleteIcon />
                          </button>
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
        <div className="modal-overlay active sub-modal-overlay" id="skillModal" style={{ zIndex: 1100 }} onClick={(e) => { if (e.target === e.currentTarget) setIsSkillModalOpen(false); }}>
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
        <div className="modal-overlay active sub-modal-overlay" id="achievementModal" style={{ zIndex: 1100 }} onClick={(e) => { if (e.target === e.currentTarget) setIsAchieveModalOpen(false); }}>
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
        <div className="modal-overlay active" id="internalOpModal" onClick={(e) => { if (e.target === e.currentTarget) setIsInternalOpModalOpen(false); }}>
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
                            {p.photo ? (
                              <img
                                src={p.photo}
                                alt="Avatar"
                                style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                              />
                            ) : (
                              <div className="person-avatar-fallback" style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px', borderRadius: '50%', fontSize: '13px' }}>
                                {((p.firstName[0] || '') + (p.lastName[0] || '')).toUpperCase() || 'P'}
                              </div>
                            )}
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
        <div className="modal-overlay active" id="externalOpModal" onClick={(e) => { if (e.target === e.currentTarget) setIsExternalOpModalOpen(false); }}>
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
                    <button
                      type="button"
                      className="btn-link-action"
                      onClick={handleOpenAddSupplierModal}
                      style={{ background: 'none', border: 'none', color: '#7F56D9', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}
                    >
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
                              <button type="button" className="supplier-action-btn edit-btn edit-supplier-btn" onClick={() => handleOpenEditSupplierModal(sup)} title="Düzenle">
                                <EditIcon />
                              </button>
                              <button type="button" className="supplier-action-btn delete-btn delete-supplier-btn" onClick={() => handleDeleteSupplier(sup.id)} title="Sil">
                                <DeleteIcon />
                              </button>
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
                          {p.photo ? (
                            <img
                              src={p.photo}
                              alt="Avatar"
                              style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                            />
                          ) : (
                            <div className="person-avatar-fallback" style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px', borderRadius: '50%', fontSize: '13px' }}>
                              {((p.firstName[0] || '') + (p.lastName[0] || '')).toUpperCase() || 'P'}
                            </div>
                          )}
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
        <div className="modal-overlay active sub-modal-overlay" id="newSupplierModal" style={{ zIndex: 1050 }} onClick={(e) => { if (e.target === e.currentTarget) setIsSupplierModalOpen(false); }}>
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

      {/* ══════════ STEP 7: EQUIPMENT MODAL (2-Column Grid) ══════════ */}
      {isEquipmentModalOpen && (
        <div className="modal-overlay active" id="equipmentModal" onClick={(e) => { if (e.target === e.currentTarget) setIsEquipmentModalOpen(false); }}>
          <div className="modal-card modal-card-wide" style={{ maxWidth: '680px', padding: '24px' }}>
            <div className="modal-header" style={{ marginBottom: '20px' }}>
              <h2 className="modal-title">{editingEquipmentId ? t.modal_equipment_edit_title : t.modal_equipment_title}</h2>
              <button type="button" className="modal-close-btn" onClick={() => setIsEquipmentModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-two-column-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
                {/* LEFT COLUMN */}
                <div className="modal-col" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Photo Upload Box */}
                  <div className="photo-upload-box-row" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '4px' }}>
                    <input type="file" ref={eqPhotoFileInputRef} accept="image/*" style={{ display: 'none' }} onChange={handleEqPhotoUpload} />
                    <div
                      onClick={() => eqPhotoFileInputRef.current?.click()}
                      style={{ width: '52px', height: '52px', minWidth: '52px', border: '1px dashed #D0D5DD', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#FAFAFA', overflow: 'hidden' }}
                    >
                      {currentUploadedEqPhoto ? (
                        <img src={currentUploadedEqPhoto} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#101828' }}>{t.eq_photo}</div>
                      <span onClick={() => eqPhotoFileInputRef.current?.click()} style={{ fontSize: '13px', color: '#7F56D9', textDecoration: 'underline', cursor: 'pointer' }}>{t.upload_image}</span>
                    </div>
                  </div>

                  <div className="form-group"><label className="input-label">{t.eq_id}</label><input type="text" className="form-input" placeholder={t.eq_id} value={eqForm.id} onChange={(e) => setEqForm(p => ({ ...p, id: e.target.value }))} /></div>
                  <div className="form-group"><label className="input-label">{t.eq_brand}</label><input type="text" className="form-input" placeholder={t.eq_brand} value={eqForm.brand} onChange={(e) => setEqForm(p => ({ ...p, brand: e.target.value }))} /></div>
                  <div className="form-group"><label className="input-label">{t.eq_model}</label><input type="text" className="form-input" placeholder={t.eq_model} value={eqForm.model} onChange={(e) => setEqForm(p => ({ ...p, model: e.target.value }))} /></div>
                  <div className="form-group">
                    <label className="input-label">{t.eq_operation}</label>
                    <select className="form-input" value={eqForm.type} onChange={(e) => setEqForm(p => ({ ...p, type: e.target.value }))}>
                      <option value="">{t.eq_operation_placeholder}</option>
                      <option value="CNC Torna">CNC Torna</option>
                      <option value="CNC Freze">CNC Freze</option>
                      <option value="Kesim">Kesim</option>
                      <option value="Kaynak">Kaynak</option>
                      <option value="Montaj">Montaj</option>
                    </select>
                  </div>
                  <div className="form-group"><label className="input-label">{t.eq_mac}</label><input type="text" className="form-input" placeholder={t.eq_mac} value={eqForm.mac} onChange={(e) => setEqForm(p => ({ ...p, mac: e.target.value }))} /></div>
                  <div className="form-group"><label className="input-label">{t.eq_year}</label><input type="text" className="form-input" placeholder={t.eq_year} value={eqForm.year} onChange={(e) => setEqForm(p => ({ ...p, year: e.target.value }))} /></div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div className="form-group"><label className="input-label">{t.eq_amort}</label><input type="text" className="form-input" value={eqForm.amort} onChange={(e) => setEqForm(p => ({ ...p, amort: e.target.value }))} /></div>
                    <div className="form-group"><label className="input-label">{t.eq_score}</label><input type="text" className="form-input" value={eqForm.score} onChange={(e) => setEqForm(p => ({ ...p, score: e.target.value }))} /></div>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="modal-col" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div className="form-group"><label className="input-label">{t.eq_valuation}</label><input type="text" className="form-input" value={eqForm.valuation} onChange={(e) => setEqForm(p => ({ ...p, valuation: e.target.value }))} /></div>
                    <div className="form-group"><label className="input-label">{t.eq_min_cost}</label><input type="text" className="form-input" value={eqForm.minCost} onChange={(e) => setEqForm(p => ({ ...p, minCost: e.target.value }))} /></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div className="form-group"><label className="input-label">{t.eq_worker_count}</label><input type="text" className="form-input" value={eqForm.workerCount} onChange={(e) => setEqForm(p => ({ ...p, workerCount: e.target.value }))} /></div>
                    <div className="form-group"><label className="input-label">{t.eq_order_no}</label><input type="text" className="form-input" value={eqForm.orderNo} onChange={(e) => setEqForm(p => ({ ...p, orderNo: e.target.value }))} /></div>
                  </div>
                  <div className="form-group"><label className="input-label">{t.eq_lifespan}</label><input type="text" className="form-input" value={eqForm.lifespan} onChange={(e) => setEqForm(p => ({ ...p, lifespan: e.target.value }))} /></div>
                  <div className="form-group"><label className="input-label">{t.eq_tolerance}</label><input type="text" className="form-input" value={eqForm.tolerance} onChange={(e) => setEqForm(p => ({ ...p, tolerance: e.target.value }))} /></div>

                  <div className="form-group"><label className="input-label">{t.utilization}</label><div className="kpi-input-group"><span className="kpi-badge">KPI</span><input type="text" className="form-input" value={eqForm.utilization} onChange={(e) => setEqForm(p => ({ ...p, utilization: e.target.value }))} /></div></div>
                  <div className="form-group"><label className="input-label">{t.measurable}</label><div className="kpi-input-group"><span className="kpi-badge">KPI</span><input type="text" className="form-input" value={eqForm.measurable} onChange={(e) => setEqForm(p => ({ ...p, measurable: e.target.value }))} /></div></div>
                  <div className="form-group"><label className="input-label">{t.performance}</label><div className="kpi-input-group"><span className="kpi-badge">KPI</span><input type="text" className="form-input" value={eqForm.performance} onChange={(e) => setEqForm(p => ({ ...p, performance: e.target.value }))} /></div></div>
                  <div className="form-group"><label className="input-label">{t.availability}</label><div className="kpi-input-group"><span className="kpi-badge">KPI</span><input type="text" className="form-input" value={eqForm.availability} onChange={(e) => setEqForm(p => ({ ...p, availability: e.target.value }))} /></div></div>
                </div>
              </div>

              <div className="modal-footer" style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%' }}>
                <button type="button" className="btn-modal-cancel" onClick={() => setIsEquipmentModalOpen(false)}>{t.btn_cancel}</button>
                <button type="button" className="btn-modal-submit" onClick={handleSaveEquipment}>{t.btn_save}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ STEP 8: SHIFT MODAL (2 Tabs) ══════════ */}
      {isShiftModalOpen && (
        <div className="modal-overlay active" id="shiftModal" onClick={(e) => { if (e.target === e.currentTarget) setIsShiftModalOpen(false); }}>
          <div className="modal-card modal-card-wide" style={{ maxWidth: '680px', padding: '24px' }}>
            <div className="modal-header" style={{ marginBottom: '16px' }}>
              <h2 className="modal-title">{editingShiftId ? t.modal_shift_edit_title : t.modal_shift_title}</h2>
              <button type="button" className="modal-close-btn" onClick={() => setIsShiftModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-tabs">
              <button type="button" className={`modal-tab-btn ${shiftModalTab === 'info' ? 'active' : ''}`} onClick={() => setShiftModalTab('info')}>{t.tab_shift_info}</button>
              <button type="button" className={`modal-tab-btn ${shiftModalTab === 'break' ? 'active' : ''}`} onClick={() => setShiftModalTab('break')}>{t.tab_shift_breaks}</button>
            </div>
            <div className="modal-body">
              {/* TAB 1: VARDIYA BILGILERI */}
              {shiftModalTab === 'info' && (
                <div className="modal-tab-content active" style={{ width: '100%' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '16px', alignItems: 'start' }}>
                    {/* LEFT COLUMN */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div className="form-group"><label className="input-label">{t.shift_name}</label><input type="text" className="form-input" placeholder={t.shift_name} value={shiftForm.name} onChange={(e) => setShiftForm(p => ({ ...p, name: e.target.value }))} /></div>
                      <div className="form-group"><label className="input-label">{t.shift_start_time}</label><div className="input-with-icon"><CalendarIcon /><input type="text" className="form-input" placeholder="16:34" value={shiftForm.startTime} onChange={(e) => setShiftForm(p => ({ ...p, startTime: e.target.value }))} /></div></div>
                      <div className="form-group"><label className="input-label">{t.shift_end_time}</label><div className="input-with-icon"><CalendarIcon /><input type="text" className="form-input" placeholder="16:34" value={shiftForm.endTime} onChange={(e) => setShiftForm(p => ({ ...p, endTime: e.target.value }))} /></div></div>
                      <div className="form-group">
                        <label className="input-label">{t.shift_manager}</label>
                        <select className="form-input" value={shiftForm.manager} onChange={(e) => setShiftForm(p => ({ ...p, manager: e.target.value }))}>
                          <option value="">{t.shift_manager_placeholder}</option>
                          {personnelData.map(p => {
                            const fullName = `${p.firstName} ${p.lastName}`.trim();
                            return <option key={p.id} value={fullName}>{fullName}</option>;
                          })}
                        </select>
                      </div>
                    </div>

                    {/* MIDDLE COLUMN: VARDIYA TEKRARI */}
                    <div style={{ border: '1px solid #EAECF0', borderRadius: '8px', padding: '14px', background: '#FFFFFF', textAlign: 'left' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#101828', marginBottom: '12px' }}>{t.shift_repeat}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'].map(day => (
                          <label key={day} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#344054', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              style={{ accentColor: '#7F56D9', width: '16px', height: '16px' }}
                              checked={shiftForm.repeatDays.includes(day)}
                              onChange={() => handleToggleShiftRepeatDay(day)}
                            />
                            <span>{day}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT COLUMN: TAKVIM RENGI */}
                    <div style={{ border: '1px solid #EAECF0', borderRadius: '8px', padding: '14px', background: '#FFFFFF', textAlign: 'left' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#101828', marginBottom: '12px' }}>{t.shift_calendar_color}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                          { key: 'mor', label: 'Mor', bg: '#F4F3FF', border: '#7F56D9' },
                          { key: 'gri', label: 'Gri', bg: '#F2F4F7', border: '#667085' },
                          { key: 'kırmızı', label: 'Kırmızı', bg: '#FEF3F2', border: '#D9381E' },
                          { key: 'turuncu', label: 'Turuncu', bg: '#FEF0C7', border: '#F79009' },
                          { key: 'yeşil', label: 'Yeşil', bg: '#D1FADF', border: '#12B76A' },
                          { key: 'mavi', label: 'Mavi', bg: '#D1E9FF', border: '#2E90FA' }
                        ].map(c => (
                          <label key={c.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#344054', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="shiftCalendarColorRadio"
                              value={c.key}
                              checked={shiftForm.color === c.key}
                              onChange={() => setShiftForm(p => ({ ...p, color: c.key }))}
                              style={{ accentColor: c.border, width: '16px', height: '16px' }}
                            />
                            <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: c.bg, border: `1px solid ${c.border}` }}></span>
                            <span>{c.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer" style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%' }}>
                    <button type="button" className="btn-modal-cancel" onClick={() => setIsShiftModalOpen(false)}>{t.btn_cancel}</button>
                    <button type="button" className="btn-modal-submit" onClick={() => setShiftModalTab('break')}>{t.btn_next}</button>
                  </div>
                </div>
              )}

              {/* TAB 2: MOLALAR */}
              {shiftModalTab === 'break' && (
                <div className="modal-tab-content active" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#101828', margin: 0 }}>{t.breaks}</h3>
                      <span style={{ padding: '2px 8px', borderRadius: '12px', background: '#F4F3FF', color: '#7F56D9', fontSize: '12px', fontWeight: 600 }}>
                        {currentShiftBreaks.length} adet
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleOpenAddBreakModal}
                      style={{ background: 'none', border: 'none', color: '#7F56D9', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span style={{ fontSize: '16px' }}>+</span>
                      <span>{t.btn_add_new_break}</span>
                    </button>
                  </div>

                  {/* 2 Kolonlu Mola Listesi Container */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', minHeight: '180px', alignContent: 'start' }}>
                    {currentShiftBreaks.length === 0 ? (
                      <div style={{ gridColumn: '1 / -1', padding: '24px', textAlign: 'center', color: '#667085', fontSize: '13px', background: '#F9FAFB', border: '1px dashed #EAECF0', borderRadius: '8px' }}>
                        Henüz mola tanımlanmadı.
                      </div>
                    ) : (
                      currentShiftBreaks.map(b => (
                        <div
                          key={b.id}
                          style={{ padding: '10px 12px', border: '1px solid #EAECF0', borderRadius: '8px', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#101828' }}>{b.name}</div>
                            <div style={{ fontSize: '12px', color: '#667085' }}>{b.startTime} - {b.endTime}</div>
                          </div>
                          <div className="dept-item-actions">
                            <button type="button" className="dept-action-btn edit-break-btn" onClick={() => handleOpenEditBreakModal(b)} title="Düzenle">
                              <EditIcon />
                            </button>
                            <button type="button" className="dept-action-btn delete-break-btn" onClick={() => handleDeleteBreak(b.id)} title="Sil">
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="modal-footer" style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%' }}>
                    <button type="button" className="btn-modal-cancel" onClick={() => setShiftModalTab('info')}>{t.btn_prev}</button>
                    <button type="button" className="btn-modal-submit" onClick={handleSaveShift}>{t.btn_save}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ BREAK SUB-MODAL ══════════ */}
      {isBreakModalOpen && (
        <div className="modal-overlay active sub-modal-overlay" id="newBreakModal" style={{ zIndex: 1060 }} onClick={(e) => { if (e.target === e.currentTarget) setIsBreakModalOpen(false); }}>
          <div className="modal-card" style={{ maxWidth: '400px', padding: '24px' }}>
            <div className="modal-header" style={{ marginBottom: '16px' }}>
              <h2 className="modal-title">{editingBreakId ? t.modal_break_edit_title : t.modal_break_title}</h2>
              <button type="button" className="modal-close-btn" onClick={() => setIsBreakModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group"><label className="input-label">{t.break_name}</label><input type="text" className="form-input" placeholder={t.break_name} value={breakForm.name} onChange={(e) => setBreakForm(p => ({ ...p, name: e.target.value }))} /></div>
              <div className="form-group"><label className="input-label">{t.break_start_time}</label><div className="input-with-icon"><CalendarIcon /><input type="text" className="form-input" placeholder="16:34" value={breakForm.startTime} onChange={(e) => setBreakForm(p => ({ ...p, startTime: e.target.value }))} /></div></div>
              <div className="form-group"><label className="input-label">{t.break_end_time}</label><div className="input-with-icon"><CalendarIcon /><input type="text" className="form-input" placeholder="16:34" value={breakForm.endTime} onChange={(e) => setBreakForm(p => ({ ...p, endTime: e.target.value }))} /></div></div>
            </div>
            <div className="modal-footer" style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%' }}>
              <button type="button" className="btn-modal-cancel" onClick={() => setIsBreakModalOpen(false)}>{t.btn_cancel}</button>
              <button type="button" className="btn-modal-submit" onClick={handleSaveBreak}>{t.btn_save}</button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
