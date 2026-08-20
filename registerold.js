/**
 * ==========================================================================
 * UPU.IO ONBOARDING & STEP SYSTEM (register.js)
 * Dil Çeviri (i18n) & İki Yönlü Entegrasyon Sistemi
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. DİL ÇEVİRİ SÖZLÜĞÜ (TR & EN Translation Dictionary)
    // ----------------------------------------------------------------------
    const translations = {
        tr: {
            welcome_text: "'ya hoşgeldiniz.",
            welcome_sub: "Kaydınızı oluşturmanız ve upu.io'yu kullanabilmeniz için gerekli adımları tamamlamanız gerekmektedir. Adımları tamamlamak için uygun dili seçin ve \"Başla\" butonuna tıklayın.",
            btn_start: "Başla",
            step2_title: "Firma Oluştur",
            company_logo: "Firma Logosu",
            upload_image: "Resim yükle",
            company_name: "Firma Adı",
            company_address: "Firma Adresi",
            company_email: "Firma E-Posta",
            company_phone: "Firma Telefonu",
            fiscal_year_start: "Mali Yıl Başlangıç Tarihi",
            authorized_name: "Yetkili Adı",
            authorized_email: "Yetkili E-Posta",
            authorized_phone: "Yetkili Telefonu",
            tax_office: "Vergi Dairesi",
            tax_number: "Vergi Numarası",
            solution_packages: "Çözüm Paketleri",
            country: "Ülke",
            timezone: "Zaman Dilimi",
            equipment_credit: "Ekipman Kredisi",
            personnel_credit: "Personel Kredisi",
            day_start_hour: "Gün Başlangıç Saati",
            t1_standard: "T1 Standart",
            btn_prev: "Önceki",
            btn_next: "Sonraki",
            step3_title: "Departman Ekle",
            step3_sub: "Firmanızda çalışan personelleri eklemeden önce; muhasebe, insan kaynakları, üretim gibi departmanları oluşturarak yönetim kolaylığı sağlayabilirsiniz.",
            step4_title: "Personel Ekle",
            step4_sub: "Firmanızda çalışan personellerinizi ekleyebilir, oluşturduğunuz departmanlara atayabilirsiniz.",
            step5_title: "İç Operasyon Ekle",
            step5_sub: "Frezeleme, tornalama, kesme gibi firma içi operasyonlarınızı ekleyebilir ve eklemiş olduğunuz operasyonları ekipmanlarınıza göre kategorize edebilirsiniz.",
            btn_add: "Ekle",
            modal_dept_title: "Yeni Departman Ekle",
            modal_dept_name: "Departman Adı",
            modal_tag_label: "Etiket",
            btn_cancel: "Vazgeç",
            btn_save: "Kaydet"
        },
        en: {
            welcome_text: "Welcome to ",
            welcome_sub: "To create your registration and use upu.io, you need to complete the required steps. Please select a suitable language to begin and click \"Start\".",
            btn_start: "Start",
            step2_title: "Create Company",
            company_logo: "Company Logo",
            upload_image: "Upload image",
            company_name: "Company Name",
            company_address: "Company Address",
            company_email: "Company Email",
            company_phone: "Company Phone",
            fiscal_year_start: "Fiscal Year Start Date",
            authorized_name: "Authorized Person Name",
            authorized_email: "Authorized Person Email",
            authorized_phone: "Authorized Person Phone",
            tax_office: "Tax Office",
            tax_number: "Tax Number",
            solution_packages: "Solution Packages",
            country: "Country",
            timezone: "Timezone",
            equipment_credit: "Equipment Credit",
            personnel_credit: "Personnel Credit",
            day_start_hour: "Day Start Hour",
            t1_standard: "T1 Standard",
            btn_prev: "Previous",
            btn_next: "Next",
            step3_title: "Add Department",
            step3_sub: "Before adding personnel working in your company, you can create departments such as accounting, human resources, production to provide management convenience.",
            step4_title: "Add Personnel",
            step4_sub: "You can add personnel working in your company and assign them to the departments you have created.",
            step5_title: "Add Internal Operation",
            step5_sub: "You can add your in-house operations such as milling, turning, cutting and categorize the operations you have added according to your equipment.",
            btn_add: "Add",
            modal_dept_title: "Add New Department",
            modal_dept_name: "Department Name",
            modal_tag_label: "Tag",
            btn_cancel: "Cancel",
            btn_save: "Save"
        }
    };

    // images/ Klasöründeki Tüm 8 Adımın Figma SVG Dosya Haritası
    const stepFilesMap = {
        1: {
            current: 'images/State=Current, Step Type=Language.svg',
            completed: 'images/State=Completed, Step Type=Language.svg',
            incomplete: 'images/State=Incomplete, Step Type=Language.svg'
        },
        2: {
            current: 'images/State=Current, Step Type=Company.svg',
            completed: 'images/State=Completed, Step Type=Company.svg',
            incomplete: 'images/State=Incomplete, Step Type=Company.svg'
        },
        3: {
            current: 'images/State=Current, Step Type=Department.svg',
            completed: 'images/State=Completed, Step Type=Department.svg',
            incomplete: 'images/State=Incomplete, Step Type=Department.svg'
        },
        4: {
            current: 'images/State=Current, Step Type=Personnel.svg',
            completed: 'images/State=Completed, Step Type=Personnel.svg',
            incomplete: 'images/State=Incomplete, Step Type=Personnel.svg'
        },
        5: {
            current: 'images/State=Current, Step Type=Internal Op..svg',
            completed: 'images/State=Completed, Step Type=Internal Op..svg',
            incomplete: 'images/State=Incomplete, Step Type=Internal Op..svg'
        },
        6: {
            current: 'images/State=Current, Step Type=External Op..svg',
            completed: 'images/State=Completed, Step Type=External Op..svg',
            incomplete: 'images/State=Incomplete, Step Type=External Op..svg'
        },
        7: {
            current: 'images/State=Current, Step Type=Equipments.svg',
            completed: 'images/State=Completed, Step Type=Equipments.svg',
            incomplete: 'images/State=Incomplete, Step Type=Equipments.svg'
        },
        8: {
            current: 'images/State=Current, Step Type=Shifts.svg',
            completed: 'images/State=Completed, Step Type=Shifts.svg',
            incomplete: 'images/State=Incomplete, Step Type=Shifts.svg'
        }
    };

    let currentStep = 1;
    let currentLang = 'tr';
    let uploadedCompanyLogo = null;

    const stepItems = document.querySelectorAll('.step-item');
    const btnNextStep = document.getElementById('btnNextStep');
    const langRadios = document.querySelectorAll('input[name="language"]');
    const langCards = document.querySelectorAll('.lang-card');
    const globeBtn = document.getElementById('globeBtn');
    const langPopup = document.getElementById('langPopup');

    // ----------------------------------------------------------------------
    // 2. DİL DEĞİŞTİRME VE ÇİFT YÖNLÜ SENKRONİZASYON (Entegrasyon)
    // ----------------------------------------------------------------------
    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;

        // A) 1. Adımdaki Kartları & Radio Butonlarını Senkronize Et
        langCards.forEach(card => {
            const radio = card.querySelector('input[type="radio"]');
            if (radio) {
                if (radio.value === lang) {
                    radio.checked = true;
                    card.classList.add('active');
                } else {
                    radio.checked = false;
                    card.classList.remove('active');
                }
            }
        });

        // B) Sol Alt Küre Pop-up Seçeneklerini Senkronize Et
        if (langPopup) {
            const popupOptions = langPopup.querySelectorAll('.lang-popup-option');
            popupOptions.forEach(opt => {
                const optLang = opt.getAttribute('data-lang');
                if (optLang === lang) {
                    opt.classList.add('active');
                } else {
                    opt.classList.remove('active');
                }
            });
        }

        // C) Sayfadaki Tüm Metinleri (data-i18n) Çevir
        const i18nElements = document.querySelectorAll('[data-i18n]');
        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // D) Sayfadaki Tüm Placeholder'ları (data-i18n-placeholder) Çevir
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        // E) Hoşgeldiniz Başlığı Gramer Düzeltmesi (TR: upu.io'ya hoşgeldiniz. | EN: Welcome to upu.io)
        const welcomePrefix = document.getElementById('welcomePrefix');
        const welcomeSuffix = document.getElementById('welcomeSuffix');
        if (welcomePrefix && welcomeSuffix) {
            if (lang === 'en') {
                welcomePrefix.textContent = 'Welcome to';
                welcomeSuffix.textContent = '';
            } else {
                welcomePrefix.textContent = '';
                welcomeSuffix.textContent = "'ya hoşgeldiniz.";
            }
        }
    }

    // 1. Adım Dil Kartları Tıklama Dinleyicileri
    langRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    });

    langCards.forEach(card => {
        card.addEventListener('click', () => {
            const radio = card.querySelector('input[type="radio"]');
            if (radio) {
                setLanguage(radio.value);
            }
        });
    });

    // Sol Alt Küre Butonuna Tıklanınca Açılan Pop-up Menü
    if (globeBtn && langPopup) {
        globeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langPopup.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!langPopup.contains(e.target) && e.target !== globeBtn) {
                langPopup.classList.remove('open');
            }
        });

        const popupOptions = langPopup.querySelectorAll('.lang-popup-option');
        popupOptions.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = opt.getAttribute('data-lang');
                setLanguage(selectedLang);
                langPopup.classList.remove('open');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. ADIM GEÇİŞ YÖNETİMİ (?)
    // ----------------------------------------------------------------------
    function goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > 9) return;

        currentStep = stepNumber;

        stepItems.forEach(item => {
            const stepVal = parseInt(item.getAttribute('data-step'), 10);
            const img = item.querySelector('img');
            const files = stepFilesMap[stepVal];

            item.classList.remove('active', 'completed');

            if (stepVal === currentStep) {
                item.classList.add('active'); // AKTİF DURUM
                if (img && files) {
                    img.src = files.current || files.incomplete;
                }
            } else if (stepVal < currentStep) {
                item.classList.add('completed'); // TAMAMLANMIŞ DURUM
                if (img && files) {
                    img.src = files.completed || files.incomplete;
                }
            } else {
                // PASİF DURUM
                if (img && files) {
                    img.src = files.incomplete;
                }
            }
        });

        // Sayfa İçeriğini Değiştir (SPA View Switcher)
        const allStepViews = document.querySelectorAll('.step-view');
        allStepViews.forEach(view => {
            view.classList.remove('active');
        });

        const targetView = document.getElementById(`step-${currentStep}`);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Belirli adımlarda alt fabrika görselini soluklaştır
        const factoryImg = document.querySelector('.factory-illustration-img');
        if (factoryImg) {
            if (currentStep === 7) {
                // Adım 7'de eğer ekipman eklendiyse (liste görünümü aktifse) 0.3 yap, boş giriş sayfasındaysa 1.0 yap
                if (typeof equipmentsData !== 'undefined' && equipmentsData.length > 0) {
                    factoryImg.style.opacity = '0.3';
                } else {
                    factoryImg.style.opacity = '1';
                }
            } else if (currentStep === 2) {
                factoryImg.style.opacity = '0.4';
            } else {
                factoryImg.style.opacity = '1';
            }
        }

        // Sağ Alt Yüzen Firma Logosu Rozeti Yönetimi (Step >= 3 VE resim yüklenmişse göster)
        const floatingBadge = document.getElementById('floatingCompanyBadge');
        const badgeLogoImg = document.getElementById('badgeLogoImg');
        if (floatingBadge) {
            if (currentStep >= 3 && uploadedCompanyLogo) {
                if (badgeLogoImg) badgeLogoImg.src = uploadedCompanyLogo;
                floatingBadge.style.display = 'flex';
            } else {
                floatingBadge.style.display = 'none';
            }
        }

        // Sol Alt Butonlar (Globe & Çıkış) Görünürlüğü (Step 1'de tamamen gizli, Step >= 2 iken göster)
        const floatingLeftActions = document.querySelector('.floating-left-actions');
        if (floatingLeftActions) {
            if (currentStep === 1) {
                floatingLeftActions.style.display = 'none';
                if (langPopup) langPopup.classList.remove('open');
            } else {
                floatingLeftActions.style.display = 'flex';
            }
        }

        // Adım 9 (Kurulum Tamamlandı Ekranı)
        const stepsHeaderContainer = document.querySelector('.steps-header-container');
        if (stepsHeaderContainer) {
            if (currentStep === 9) {
                stepsHeaderContainer.style.display = 'none';
            } else {
                stepsHeaderContainer.style.display = 'block';
            }
        }
    }

    // Tıklama Dinleyicisi (Header Adımları)
    stepItems.forEach(item => {
        item.addEventListener('click', () => {
            const stepVal = parseInt(item.getAttribute('data-step'), 10);
            goToStep(stepVal);
        });
    });

    // Buton Dinleyicileri
    if (btnNextStep) {
        btnNextStep.addEventListener('click', () => {
            goToStep(2);
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-next')) {
            if (currentStep >= 9) {
                window.location.href = 'app.html';
            } else {
                goToStep(currentStep + 1);
            }
        } else if (e.target.classList.contains('btn-prev')) {
            goToStep(currentStep - 1);
        }
    });

    // ----------------------------------------------------------------------
    // 4. FİRMA LOGOSU YÜKLEME VE CANLI ÖNİZLEME KISMIs
    // ----------------------------------------------------------------------
    const logoUploadBox = document.getElementById('logoUploadBox');
    const logoFileInput = document.getElementById('logoFileInput');
    const logoPreviewBox = document.getElementById('logoPreviewBox');
    const logoTitleText = document.getElementById('logoTitleText');

    if (logoUploadBox && logoFileInput) {
        logoUploadBox.addEventListener('click', () => {
            logoFileInput.click();
        });

        logoFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    uploadedCompanyLogo = event.target.result;
                    try {
                        localStorage.setItem('upu_company_logo', uploadedCompanyLogo);
                    } catch (_) {}
                    logoPreviewBox.innerHTML = `<img src="${event.target.result}" alt="Logo" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">`;
                    logoPreviewBox.style.border = 'none';
                    if (logoTitleText) {
                        logoTitleText.textContent = file.name.length > 16 ? file.name.substring(0, 13) + '...' : file.name;
                    }
                    // Sağ alt yüzen rozet görselini güncelle
                    const badgeLogoImg = document.getElementById('badgeLogoImg');
                    const floatingBadge = document.getElementById('floatingCompanyBadge');
                    if (badgeLogoImg) {
                        badgeLogoImg.src = event.target.result;
                    }
                    if (floatingBadge && currentStep >= 3) {
                        floatingBadge.style.display = 'flex';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    function saveCompanyDataToLocalStorage() {
        const data = {
            name: document.getElementById('regCompanyNameInput')?.value.trim() || '',
            address: document.getElementById('regCompanyAddressInput')?.value.trim() || '',
            email: document.getElementById('regCompanyEmailInput')?.value.trim() || '',
            phone: document.getElementById('regCompanyPhoneInput')?.value.trim() || '',
            fiscalYear: document.getElementById('regFiscalYearInput')?.value.trim() || '',
            authorizedName: document.getElementById('regAuthorizedNameInput')?.value.trim() || '',
            authorizedEmail: document.getElementById('regAuthorizedEmailInput')?.value.trim() || '',
            authorizedPhone: document.getElementById('regAuthorizedPhoneInput')?.value.trim() || '',
            taxOffice: document.getElementById('regTaxOfficeInput')?.value.trim() || '',
            taxNumber: document.getElementById('regTaxNumberInput')?.value.trim() || '',
            country: document.getElementById('regCountrySelect')?.value || 'Türkiye',
            timezone: document.getElementById('regTimezoneSelect')?.value || 'GMT +03:00 Istanbul'
        };
        try {
            localStorage.setItem('upu_company_info', JSON.stringify(data));
            if (uploadedCompanyLogo) {
                localStorage.setItem('upu_company_logo', uploadedCompanyLogo);
            }
        } catch (_) {}
    }

    document.addEventListener('input', (e) => {
        if (e.target && e.target.id && e.target.id.startsWith('reg')) {
            saveCompanyDataToLocalStorage();
        }
    });
    document.addEventListener('change', (e) => {
        if (e.target && e.target.id && e.target.id.startsWith('reg')) {
            saveCompanyDataToLocalStorage();
        }
    });

    // ----------------------------------------------------------------------
    // 5. YENİ DEPARTMAN EKLE VE DİNAMİK LİSTE YÖNETİMİ (Dynamic Department System)
    // ----------------------------------------------------------------------
    let departmentsData = JSON.parse(localStorage.getItem('upu_departments') || '[]');
    let maxDepartments = 4; // Varsayılan Başlangıç Limiti: 4
    let editingDeptId = null;

    const btnAddDepartment = document.getElementById('btnAddDepartment');
    const btnAddNewDept = document.getElementById('btnAddNewDept');
    const departmentModal = document.getElementById('departmentModal');
    const closeDeptModalBtn = document.getElementById('closeDeptModalBtn');
    const cancelDeptModalBtn = document.getElementById('cancelDeptModalBtn');
    const saveDeptModalBtn = document.getElementById('saveDeptModalBtn');
    const modalDeptNameInput = document.getElementById('modalDeptNameInput');
    const modalTagInput = document.getElementById('modalTagInput');
    const addTagBtn = document.getElementById('addTagBtn');
    const modalTagsContainer = document.getElementById('modalTagsContainer');
    
    const deptEmptyView = document.getElementById('deptEmptyView');
    const deptListView = document.getElementById('deptListView');
    const deptItemsList = document.getElementById('deptItemsList');
    const deptCountBadge = document.getElementById('deptCountBadge');
    const deptSearchInput = document.getElementById('deptSearchInput');

    function renderDepartments(filterQuery = '') {
        if (!deptEmptyView || !deptListView || !deptItemsList || !deptCountBadge) return;

        try {
            localStorage.setItem('upu_departments', JSON.stringify(departmentsData));
        } catch (_) {}

        // Sayı Rozeti & Kredi Limiti Yönetimi (Figma Red/Purple State)
        deptCountBadge.textContent = `${departmentsData.length}/${maxDepartments} Departman`;

        if (departmentsData.length >= maxDepartments) {
            deptCountBadge.classList.add('limit-reached'); // Kırmızı Warning Pill
            if (btnAddNewDept) {
                btnAddNewDept.className = 'btn-buy-dept-credit';
                btnAddNewDept.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg> <span>Ek Departman Kredisi Satın Al</span>`;
            }
        } else {
            deptCountBadge.classList.remove('limit-reached'); // Mor Normal Pill
            if (btnAddNewDept) {
                btnAddNewDept.className = 'btn-add-new-dept';
                btnAddNewDept.innerHTML = `<span class="plus-sign">+</span><span>Yeni Departman Ekle</span>`;
            }
        }

        if (departmentsData.length === 0) {
            deptEmptyView.style.display = 'flex';
            deptListView.style.display = 'none';
        } else {
            deptEmptyView.style.display = 'none';
            deptListView.style.display = 'flex';

            // Arama filtresine göre filtrele
            const filtered = departmentsData.filter(d => 
                d.name.toLowerCase().includes(filterQuery.toLowerCase())
            );

            deptItemsList.innerHTML = '';
            filtered.forEach(dept => {
                const card = document.createElement('div');
                card.className = 'dept-item-card';
                card.innerHTML = `
                    <span class="dept-name-text">${dept.name}</span>
                    <div class="dept-item-actions">
                        <button type="button" class="dept-action-btn edit-btn" data-id="${dept.id}" title="Düzenle">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button type="button" class="dept-action-btn delete-btn" data-id="${dept.id}" title="Sil">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                    </div>
                `;
                deptItemsList.appendChild(card);
            });
        }
    }

    function openModal(editId = null) {
        editingDeptId = editId;

        // Modal Input ve Etiketlerini Temizle
        if (modalDeptNameInput) modalDeptNameInput.value = '';
        if (modalTagInput) modalTagInput.value = '';
        if (modalTagsContainer) modalTagsContainer.innerHTML = '';

        if (editId) {
            // Düzenleme Modu: Seçili departmanın adı ve etiketlerini yükle
            const target = departmentsData.find(d => d.id === editId);
            if (target) {
                if (modalDeptNameInput) modalDeptNameInput.value = target.name;
                if (target.tags && Array.isArray(target.tags) && modalTagsContainer) {
                    target.tags.forEach(tag => {
                        const pill = document.createElement('span');
                        pill.className = 'tag-pill';
                        pill.style.backgroundColor = tag.color;
                        pill.innerHTML = `${tag.text} <button type="button" class="tag-remove">&times;</button>`;
                        modalTagsContainer.appendChild(pill);
                    });
                }
            }
        }
        if (departmentModal) departmentModal.classList.add('active');
    }

    function closeModal() {
        editingDeptId = null;
        if (departmentModal) departmentModal.classList.remove('active');
    }

    if (btnAddDepartment) btnAddDepartment.addEventListener('click', () => openModal());
    if (btnAddNewDept) {
        btnAddNewDept.addEventListener('click', () => {
            if (departmentsData.length >= maxDepartments) {
                // Kredi Satın Al Modu: Limiti 4'ten 10'a çıkarır
                maxDepartments = 10;
                renderDepartments(deptSearchInput ? deptSearchInput.value : '');
            } else {
                openModal();
            }
        });
    }
    if (closeDeptModalBtn) closeDeptModalBtn.addEventListener('click', closeModal);
    if (cancelDeptModalBtn) cancelDeptModalBtn.addEventListener('click', closeModal);
    if (departmentModal) {
        departmentModal.addEventListener('click', (e) => {
            if (e.target === departmentModal) closeModal();
        });
    }

    // Arama Dinleyicisi
    if (deptSearchInput) {
        deptSearchInput.addEventListener('input', (e) => {
            renderDepartments(e.target.value);
        });
    }

    // Silme ve Düzenleme Tıklamaları
    if (deptItemsList) {
        deptItemsList.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.delete-btn');
            const editBtn = e.target.closest('.edit-btn');

            if (deleteBtn) {
                const id = parseInt(deleteBtn.getAttribute('data-id'), 10);
                departmentsData = departmentsData.filter(d => d.id !== id);
                renderDepartments(deptSearchInput ? deptSearchInput.value : '');
            } else if (editBtn) {
                const id = parseInt(editBtn.getAttribute('data-id'), 10);
                openModal(id);
            }
        });
    }

    // Etiket Ekleme Mantığı
    function addNewTag() {
        if (!modalTagInput || !modalTagsContainer) return;
        const tagText = modalTagInput.value.trim();
        if (!tagText) return;

        const tagColor = '#7C5CFC';
        const newPill = document.createElement('span');
        newPill.className = 'tag-pill';
        newPill.style.backgroundColor = tagColor;
        newPill.innerHTML = `${tagText} <button type="button" class="tag-remove">&times;</button>`;

        modalTagsContainer.appendChild(newPill);
        modalTagInput.value = '';
    }

    if (addTagBtn) addTagBtn.addEventListener('click', addNewTag);
    if (modalTagInput) {
        modalTagInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addNewTag();
            }
        });
    }

    // Etiket Silme Mantığı ???
    if (modalTagsContainer) {
        modalTagsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag-remove')) {
                e.target.parentElement.remove();
            }
        });
    }

    // Departman Kaydetme Mantığı (Özel Etiket Dizi Desteğiyle)
    if (saveDeptModalBtn) {
        saveDeptModalBtn.addEventListener('click', () => {
            let name = modalDeptNameInput ? modalDeptNameInput.value.trim() : '';
            if (!name) {
                const tagVal = modalTagInput ? modalTagInput.value.trim() : '';
                name = tagVal || 'Yeni Departman';
            }

            // Modal İçi Etiketleri Topla
            const currentTags = [];
            if (modalTagsContainer) {
                const pills = modalTagsContainer.querySelectorAll('.tag-pill');
                pills.forEach(pill => {
                    const tagText = pill.childNodes[0].textContent.trim();
                    const tagColor = pill.style.backgroundColor || '#7C5CFC';
                    currentTags.push({ text: tagText, color: tagColor });
                });
            }

            if (editingDeptId) {
                // Düzenleme Modu: Sadece o departmanın bilgilerini güncelle
                const target = departmentsData.find(d => d.id === editingDeptId);
                if (target) {
                    target.name = name;
                    target.tags = currentTags;
                }
            } else {
                // Yeni Ekleme Modu: Departmana özel unique etiket listesiyle ekle
                departmentsData.push({
                    id: Date.now(),
                    name: name,
                    tags: currentTags
                });
            }

            renderDepartments(deptSearchInput ? deptSearchInput.value : '');
            closeModal();
        });
    }

    // ----------------------------------------------------------------------
    // 6. YENİ PERSONEL EKLE VE DİNAMİK LİSTE YÖNETİMİ (Dynamic Personnel System)
    // ----------------------------------------------------------------------
    let personnelData = JSON.parse(localStorage.getItem('upu_personnels') || '[]');
    let editingPersonId = null;
    let currentUploadedPhotoData = null;

    const btnAddPersonnel = document.getElementById('btnAddPersonnel');
    const btnAddNewPerson = document.getElementById('btnAddNewPerson');
    const personnelModal = document.getElementById('personnelModal');
    const closePersonModalBtn = document.getElementById('closePersonModalBtn');
    const cancelPersonModalBtn = document.getElementById('cancelPersonModalBtn');
    const savePersonModalBtn = document.getElementById('savePersonModalBtn');
    const personDeptSelect = document.getElementById('personDeptSelect');
    const personPhotoUploadBox = document.getElementById('personPhotoUploadBox');
    const personPhotoInput = document.getElementById('personPhotoInput');
    const personPhotoPreview = document.getElementById('personPhotoPreview');

    const personFirstNameInput = document.getElementById('personFirstNameInput');
    const personLastNameInput = document.getElementById('personLastNameInput');
    const personRoleInput = document.getElementById('personRoleInput');
    const personIdInput = document.getElementById('personIdInput');
    const personPhoneInput = document.getElementById('personPhoneInput');
    const personEmailInput = document.getElementById('personEmailInput');

    const personnelEmptyView = document.getElementById('personnelEmptyView');
    const personnelListView = document.getElementById('personnelListView');
    const personItemsList = document.getElementById('personItemsList');
    const personnelCountBadge = document.getElementById('personnelCountBadge');
    const personSearchInput = document.getElementById('personSearchInput');

    function renderPersonnels(filterQuery = '') {
        if (!personnelEmptyView || !personnelListView || !personItemsList || !personnelCountBadge) return;

        try {
            localStorage.setItem('upu_personnels', JSON.stringify(personnelData));
        } catch (_) {}

        personnelCountBadge.textContent = `${personnelData.length}/56 Personel Kredisi`;

        if (personnelData.length === 0) {
            personnelEmptyView.style.display = 'flex';
            personnelListView.style.display = 'none';
        } else {
            personnelEmptyView.style.display = 'none';
            personnelListView.style.display = 'flex';

            const filtered = personnelData.filter(p => {
                const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
                const role = (p.role || p.dept || '').toLowerCase();
                const query = filterQuery.toLowerCase();
                return fullName.includes(query) || role.includes(query);
            });

            personItemsList.innerHTML = '';
            filtered.forEach(person => {
                const card = document.createElement('div');
                card.className = 'person-item-card';
                
                const initials = ((person.firstName[0] || '') + (person.lastName[0] || '')).toUpperCase() || 'P';
                const avatarInner = person.photo 
                    ? `<img src="${person.photo}" class="person-avatar-img" alt="Avatar" style="width: 36px; height: 36px; object-fit: cover; border-radius: 50%; display: block;">`
                    : `<div class="person-avatar-fallback">${initials}</div>`;
                const avatarHtml = `<div class="person-avatar-wrapper">${avatarInner}</div>`;

                const displayRole = person.role || person.dept || 'Staff';
                const managerBadge = person.isManager ? `<span style="background: #F4F3FF; color: #7F56D9; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 12px; border: 1px solid #D9D6FE; margin-left: 6px;">★ Departman Sorumlusu</span>` : '';

                card.innerHTML = `
                    <div class="person-item-left">
                        ${avatarHtml}
                        <div class="person-info-col">
                            <span class="person-full-name" style="display: flex; align-items: center; flex-wrap: wrap;">${person.firstName} ${person.lastName} ${managerBadge}</span>
                            <span class="person-sub-title">${displayRole}</span>
                        </div>
                    </div>
                    <div class="dept-item-actions">
                        <button type="button" class="dept-action-btn edit-person-btn" data-id="${person.id}" title="Düzenle">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button type="button" class="dept-action-btn delete-person-btn" data-id="${person.id}" title="Sil">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                    </div>
                `;
                personItemsList.appendChild(card);
            });
        }
    }

    function openPersonModal(editId = null) {
        editingPersonId = editId;
        currentUploadedPhotoData = null;

        // Form alanlarını sıfırla
        if (personFirstNameInput) personFirstNameInput.value = '';
        if (personLastNameInput) personLastNameInput.value = '';
        if (personRoleInput) personRoleInput.value = '';
        if (personIdInput) personIdInput.value = '';
        if (personPhoneInput) personPhoneInput.value = '';
        if (personEmailInput) personEmailInput.value = '';
        if (personPhotoPreview) {
            personPhotoPreview.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#98A2B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/></svg>`;
            personPhotoPreview.style.border = '1.33px dashed #D0D5DD';
        }
        const personIsManagerCheckbox = document.getElementById('personIsManagerCheckbox');
        if (personIsManagerCheckbox) {
            personIsManagerCheckbox.checked = false;
        }

        // Departman Dropdown Seçeneklerini Güncelle
        if (personDeptSelect) {
            personDeptSelect.innerHTML = '<option value="">Departman Seçiniz</option>';
            departmentsData.forEach(dept => {
                const opt = document.createElement('option');
                opt.value = dept.name;
                opt.textContent = dept.name;
                personDeptSelect.appendChild(opt);
            });
        }

        if (editId) {
            const target = personnelData.find(p => p.id === editId);
            if (target) {
                if (personFirstNameInput) personFirstNameInput.value = target.firstName || '';
                if (personLastNameInput) personLastNameInput.value = target.lastName || '';
                if (personRoleInput) personRoleInput.value = target.role || '';
                if (personIdInput) personIdInput.value = target.personId || '';
                if (personPhoneInput) personPhoneInput.value = target.phone || '';
                if (personEmailInput) personEmailInput.value = target.email || '';
                if (personDeptSelect) personDeptSelect.value = target.dept || '';
                if (personIsManagerCheckbox) personIsManagerCheckbox.checked = !!target.isManager;
                if (target.photo && personPhotoPreview) {
                    currentUploadedPhotoData = target.photo;
                    personPhotoPreview.innerHTML = `<img src="${target.photo}" alt="Photo" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
                    personPhotoPreview.style.border = 'none';
                }
            }
        }

        if (personnelModal) personnelModal.classList.add('active');
    }

    function closePersonModal() {
        editingPersonId = null;
        if (personnelModal) personnelModal.classList.remove('active');
    }

    if (btnAddPersonnel) btnAddPersonnel.addEventListener('click', () => openPersonModal());
    if (btnAddNewPerson) btnAddNewPerson.addEventListener('click', () => openPersonModal());
    if (closePersonModalBtn) closePersonModalBtn.addEventListener('click', closePersonModal);
    if (cancelPersonModalBtn) cancelPersonModalBtn.addEventListener('click', closePersonModal);
    if (personnelModal) {
        personnelModal.addEventListener('click', (e) => {
            if (e.target === personnelModal) closePersonModal();
        });
    }

    // Modal İçi Tab Geçişleri
    const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
    const modalTabContents = document.querySelectorAll('.modal-tab-content');

    modalTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTabId = btn.getAttribute('data-tab');
            modalTabBtns.forEach(b => b.classList.remove('active'));
            modalTabContents.forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none';
            });

            btn.classList.add('active');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'flex';
                targetContent.style.flexDirection = 'column';
            }
        });
    });

    // Fotoğraf Yükleme Önizleme
    if (personPhotoInput) {
        personPhotoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && personPhotoPreview) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    currentUploadedPhotoData = event.target.result;
                    personPhotoPreview.innerHTML = `<img src="${event.target.result}" alt="Photo" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
                    personPhotoPreview.style.border = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Personel Kaydetme Mantığı
    if (savePersonModalBtn) {
        savePersonModalBtn.addEventListener('click', () => {
            const firstName = personFirstNameInput ? personFirstNameInput.value.trim() : '';
            const lastName = personLastNameInput ? personLastNameInput.value.trim() : '';
            const role = personRoleInput ? personRoleInput.value.trim() : '';
            const personId = personIdInput ? personIdInput.value.trim() : '';
            const phone = personPhoneInput ? personPhoneInput.value.trim() : '';
            const email = personEmailInput ? personEmailInput.value.trim() : '';
            const dept = personDeptSelect ? personDeptSelect.value : '';
            const personIsManagerCheckbox = document.getElementById('personIsManagerCheckbox');
            const isManager = personIsManagerCheckbox ? personIsManagerCheckbox.checked : false;

            const finalFirstName = firstName || (role || 'Yeni Personel');
            const finalLastName = lastName || '';
            const fullName = `${finalFirstName} ${finalLastName}`.trim();

            if (editingPersonId) {
                const target = personnelData.find(p => p.id === editingPersonId);
                if (target) {
                    target.firstName = finalFirstName;
                    target.lastName = finalLastName;
                    target.role = role;
                    target.personId = personId;
                    target.phone = phone;
                    target.email = email;
                    target.dept = dept;
                    target.isManager = isManager;
                    if (currentUploadedPhotoData) target.photo = currentUploadedPhotoData;
                }
            } else {
                personnelData.push({
                    id: Date.now(),
                    firstName: finalFirstName,
                    lastName: finalLastName,
                    role: role,
                    personId: personId,
                    phone: phone,
                    email: email,
                    dept: dept,
                    isManager: isManager,
                    photo: currentUploadedPhotoData
                });
            }

            // Departman Sorumlusu olarak seçildiyse ilgili departmana ata
            if (isManager && dept) {
                const targetDept = departmentsData.find(d => d.name === dept);
                if (targetDept) {
                    targetDept.manager = fullName;
                }
            }

            renderPersonnels(personSearchInput ? personSearchInput.value : '');
            renderDepartments();
            closePersonModal();
        });
    }

    // Personel Arama
    if (personSearchInput) {
        personSearchInput.addEventListener('input', (e) => {
            renderPersonnels(e.target.value);
        });
    }

    // Personel Silme & Düzenleme
    if (personItemsList) {
        personItemsList.addEventListener('click', (e) => {
            const delBtn = e.target.closest('.delete-person-btn');
            const editBtn = e.target.closest('.edit-person-btn');

            if (delBtn) {
                const id = parseInt(delBtn.getAttribute('data-id'), 10);
                personnelData = personnelData.filter(p => p.id !== id);
                renderPersonnels(personSearchInput ? personSearchInput.value : '');
            } else if (editBtn) {
                const id = parseInt(editBtn.getAttribute('data-id'), 10);
                openPersonModal(id);
            }
        });
    }

    // ----------------------------------------------------------------------
    // 7. YETENEK VE OPERASYON YÖNETİMİ & ALT MODAL (Skills Sub-Modal System)
    // ----------------------------------------------------------------------
    let skillsData = [];
    let editingSkillId = null;

    const btnAddSkillTrigger = document.getElementById('btnAddSkillTrigger');
    const skillModal = document.getElementById('skillModal');
    const closeSkillModalBtn = document.getElementById('closeSkillModalBtn');
    const cancelSkillModalBtn = document.getElementById('cancelSkillModalBtn');
    const saveSkillModalBtn = document.getElementById('saveSkillModalBtn');
    const skillsCountBadge = document.getElementById('skillsCountBadge');
    const skillsItemsList = document.getElementById('skillsItemsList');
    const skillOpInput = document.getElementById('skillOpInput');
    const skillScoreSelect = document.getElementById('skillScoreSelect');

    function renderSkills() {
        if (!skillsCountBadge || !skillsItemsList) return;
        skillsCountBadge.textContent = `${skillsData.length} adet`;

        skillsItemsList.innerHTML = '';
        skillsData.forEach(skill => {
            const row = document.createElement('div');
            row.className = 'skill-item-row';
            row.innerHTML = `
                <div class="skill-info">
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-score">${skill.score}</div>
                </div>
                <div class="dept-item-actions">
                    <button type="button" class="dept-action-btn edit-skill-btn" data-id="${skill.id}" title="Düzenle">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button type="button" class="dept-action-btn delete-skill-btn" data-id="${skill.id}" title="Sil">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                </div>
            `;
            skillsItemsList.appendChild(row);
        });
    }

    function openSkillModal(editId = null) {
        editingSkillId = editId;
        if (editId) {
            const target = skillsData.find(s => s.id === editId);
            if (target) {
                if (skillOpInput) skillOpInput.value = target.name || '';
                if (skillScoreSelect) skillScoreSelect.value = target.score || '';
            }
        } else {
            if (skillOpInput) skillOpInput.value = '';
            if (skillScoreSelect) skillScoreSelect.value = '';
        }
        if (skillModal) skillModal.classList.add('active');
    }

    function closeSkillModal() {
        editingSkillId = null;
        if (skillModal) skillModal.classList.remove('active');
    }

    if (btnAddSkillTrigger) btnAddSkillTrigger.addEventListener('click', () => openSkillModal());
    if (closeSkillModalBtn) closeSkillModalBtn.addEventListener('click', closeSkillModal);
    if (cancelSkillModalBtn) cancelSkillModalBtn.addEventListener('click', closeSkillModal);
    if (skillModal) {
        skillModal.addEventListener('click', (e) => {
            if (e.target === skillModal) closeSkillModal();
        });
    }

    // Yetenek Silme ve Düzenleme
    if (skillsItemsList) {
        skillsItemsList.addEventListener('click', (e) => {
            const delBtn = e.target.closest('.delete-skill-btn');
            const editBtn = e.target.closest('.edit-skill-btn');

            if (delBtn) {
                const id = parseInt(delBtn.getAttribute('data-id'), 10);
                skillsData = skillsData.filter(s => s.id !== id);
                renderSkills();
            } else if (editBtn) {
                const id = parseInt(editBtn.getAttribute('data-id'), 10);
                openSkillModal(id);
            }
        });
    }

    // Yetenek Kaydetme
    if (saveSkillModalBtn) {
        saveSkillModalBtn.addEventListener('click', () => {
            const opName = skillOpInput ? skillOpInput.value.trim() : '';
            const score = skillScoreSelect ? skillScoreSelect.value : '5/10';
            if (!opName) return;

            if (editingSkillId) {
                const target = skillsData.find(s => s.id === editingSkillId);
                if (target) {
                    target.name = opName;
                    target.score = score;
                }
            } else {
                skillsData.push({
                    id: Date.now(),
                    name: opName,
                    score: score
                });
            }

            renderSkills();
            closeSkillModal();
        });
    }

    // ----------------------------------------------------------------------
    // 8. KAZANILMIŞ BAŞARI YÖNETİMİ & ALT MODAL (Achievements Sub-Modal System)
    // ----------------------------------------------------------------------
    let achievementsData = [];
    let editingAchievementId = null;

    const btnAddAchievementTrigger = document.getElementById('btnAddAchievementTrigger');
    const achievementModal = document.getElementById('achievementModal');
    const closeAchievementModalBtn = document.getElementById('closeAchievementModalBtn');
    const cancelAchievementModalBtn = document.getElementById('cancelAchievementModalBtn');
    const saveAchievementModalBtn = document.getElementById('saveAchievementModalBtn');
    const achievementsCountBadge = document.getElementById('achievementsCountBadge');
    const achievementsItemsList = document.getElementById('achievementsItemsList');
    const achieveTitleInput = document.getElementById('achieveTitleInput');
    const achieveFileUploadBox = document.getElementById('achieveFileUploadBox');
    const achieveFileInput = document.getElementById('achieveFileInput');
    const achieveFilePreview = document.getElementById('achieveFilePreview');

    function renderAchievements() {
        if (!achievementsCountBadge || !achievementsItemsList) return;
        achievementsCountBadge.textContent = `${achievementsData.length} adet`;

        achievementsItemsList.innerHTML = '';
        achievementsData.forEach(item => {
            const row = document.createElement('div');
            row.className = 'skill-item-row';
            row.innerHTML = `
                <div class="skill-info">
                    <div class="skill-name">${item.title}</div>
                    <div class="skill-score">${item.approvedBy}</div>
                </div>
                <div class="dept-item-actions">
                    <button type="button" class="dept-action-btn edit-achieve-btn" data-id="${item.id}" title="Düzenle">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button type="button" class="dept-action-btn delete-achieve-btn" data-id="${item.id}" title="Sil">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                </div>
            `;
            achievementsItemsList.appendChild(row);
        });
    }

    function openAchievementModal(editId = null) {
        editingAchievementId = editId;
        if (editId) {
            const target = achievementsData.find(a => a.id === editId);
            if (target && achieveTitleInput) achieveTitleInput.value = target.title;
        } else {
            if (achieveTitleInput) achieveTitleInput.value = '';
        }
        if (achievementModal) achievementModal.classList.add('active');
    }

    function closeAchievementModal() {
        editingAchievementId = null;
        if (achievementModal) achievementModal.classList.remove('active');
    }

    if (btnAddAchievementTrigger) btnAddAchievementTrigger.addEventListener('click', () => openAchievementModal());
    if (closeAchievementModalBtn) closeAchievementModalBtn.addEventListener('click', closeAchievementModal);
    if (cancelAchievementModalBtn) cancelAchievementModalBtn.addEventListener('click', closeAchievementModal);
    if (achievementModal) {
        achievementModal.addEventListener('click', (e) => {
            if (e.target === achievementModal) closeAchievementModal();
        });
    }

    // Belge Yükleme Önizleme
    if (achieveFileUploadBox && achieveFileInput) {
        achieveFileUploadBox.addEventListener('click', () => {
            achieveFileInput.click();
        });

        achieveFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && achieveFilePreview) {
                achieveFilePreview.innerHTML = `✓`;
                achieveFilePreview.style.backgroundColor = '#ECFDF3';
                achieveFilePreview.style.color = '#12B76A';
            }
        });
    }

    // Silme ve Düzenleme
    if (achievementsItemsList) {
        achievementsItemsList.addEventListener('click', (e) => {
            const delBtn = e.target.closest('.delete-achieve-btn');
            const editBtn = e.target.closest('.edit-achieve-btn');

            if (delBtn) {
                const id = parseInt(delBtn.getAttribute('data-id'), 10);
                achievementsData = achievementsData.filter(a => a.id !== id);
                renderAchievements();
            } else if (editBtn) {
                const id = parseInt(editBtn.getAttribute('data-id'), 10);
                openAchievementModal(id);
            }
        });
    }

    // Kaydetme
    if (saveAchievementModalBtn) {
        saveAchievementModalBtn.addEventListener('click', () => {
            const title = achieveTitleInput ? achieveTitleInput.value.trim() : '';
            const finalTitle = title || 'Başarı Adı';

            if (editingAchievementId) {
                const target = achievementsData.find(a => a.id === editingAchievementId);
                if (target) target.title = finalTitle;
            } else {
                achievementsData.push({
                    id: Date.now(),
                    title: finalTitle,
                    approvedBy: 'Approved by Çağatay Cangüloğlu'
                });
            }

            renderAchievements();
            closeAchievementModal();
        });
    }

    // ----------------------------------------------------------------------
    // 9. İÇ OPERASYON MODAL VE SEKMELERİ MANTIĞI (Internal Op Modal System)
    // ----------------------------------------------------------------------
    let internalOpsData = JSON.parse(localStorage.getItem('upu_internal_ops') || '[]');
    let editingInternalOpId = null;

    const btnAddInternalOp = document.getElementById('btnAddInternalOp');
    const btnAddNewInternalOp = document.getElementById('btnAddNewInternalOp');
    const internalOpModal = document.getElementById('internalOpModal');
    const closeInternalOpModalBtn = document.getElementById('closeInternalOpModalBtn');
    const cancelInternalOpModalBtn = document.getElementById('cancelInternalOpModalBtn');
    const saveInternalOpModalBtn = document.getElementById('saveInternalOpModalBtn');

    const nextTabInfoBtn = document.getElementById('nextTabInfoBtn');
    const prevTabManagerBtn = document.getElementById('prevTabManagerBtn');
    const nextTabManagerBtn = document.getElementById('nextTabManagerBtn');
    const prevTabIconBtn = document.getElementById('prevTabIconBtn');

    const opNameInput = document.getElementById('opNameInput');
    const opTypeSelect = document.getElementById('opTypeSelect');
    const opCodeInput = document.getElementById('opCodeInput');

    const internalOpEmptyView = document.getElementById('internalOpEmptyView');
    const internalOpListView = document.getElementById('internalOpListView');
    const internalOpItemsList = document.getElementById('internalOpItemsList');
    const internalOpCountBadge = document.getElementById('internalOpCountBadge');
    const internalOpSearchInput = document.getElementById('internalOpSearchInput');

    const opManagersGrid = document.getElementById('opManagersGrid');
    const opManagerSearchInput = document.getElementById('opManagerSearchInput');

    function renderInternalOps(filterQuery = '') {
        if (!internalOpEmptyView || !internalOpListView || !internalOpItemsList || !internalOpCountBadge) return;

        try {
            localStorage.setItem('upu_internal_ops', JSON.stringify(internalOpsData));
        } catch (_) {}

        internalOpCountBadge.textContent = `${internalOpsData.length}/10 İç Operasyon`;

        if (internalOpsData.length === 0) {
            internalOpEmptyView.style.display = 'flex';
            internalOpListView.style.display = 'none';
        } else {
            internalOpEmptyView.style.display = 'none';
            internalOpListView.style.display = 'flex';

            const filtered = internalOpsData.filter(op => 
                op.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
                (op.code && op.code.toLowerCase().includes(filterQuery.toLowerCase())) ||
                (op.type && op.type.toLowerCase().includes(filterQuery.toLowerCase()))
            );

            internalOpItemsList.innerHTML = '';
            filtered.forEach(op => {
                const card = document.createElement('div');
                card.className = 'dept-item-card';
                
                const opIconHtml = op.src 
                    ? `<img src="${op.src}" style="width: 24px; height: 24px; object-fit: contain;">` 
                    : (op.svg || `<span style="font-size: 20px;">${op.icon || '⚙️'}</span>`);
                const codeBadge = op.code ? `<span style="background: #F4F3FF; color: #7C5CFC; font-size: 12px; font-weight: 600; padding: 2px 6px; border-radius: 4px; margin-left: 8px;">${op.code}</span>` : '';
                const subText = (op.managers && op.managers.length > 0) ? op.managers.join(', ') : 'Henüz sorumlu atanmadı';

                card.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; color: #344054;">${opIconHtml}</div>
                        <div style="display: flex; flex-direction: column;">
                            <span class="dept-name-text" style="display: flex; align-items: center;">${op.name} ${codeBadge}</span>
                            <span style="font-size: 13px; color: #667085; font-weight: 400; margin-top: 2px;">${subText}</span>
                        </div>
                    </div>
                    <div class="dept-item-actions">
                        <button type="button" class="dept-action-btn edit-op-btn" data-id="${op.id}" title="Düzenle">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button type="button" class="dept-action-btn delete-op-btn" data-id="${op.id}" title="Sil">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                    </div>
                `;
                internalOpItemsList.appendChild(card);
            });
        }
    }

    // Tab Geçiş Fonksiyonu
    function switchInternalOpTab(tabId) {
        if (!internalOpModal) return;
        const tabBtns = internalOpModal.querySelectorAll('.modal-tab-btn');
        const tabContents = internalOpModal.querySelectorAll('.modal-tab-content');

        tabBtns.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        tabContents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
                content.style.display = 'flex';
                content.style.flexDirection = 'column';
            } else {
                content.classList.remove('active');
                content.style.display = 'none';
            }
        });
    }

    function renderOpManagers(filterQuery = '', selectedManagers = []) {
        if (!opManagersGrid) return;

        const listToUse = personnelData.map(p => ({
            name: `${p.firstName || ''} ${p.lastName || ''}`.trim() || p.name || 'Personel',
            role: p.role || p.dept || 'Personel',
            photo: p.photo || p.photoDataUrl || p.photoUrl || ''
        }));

        if (listToUse.length === 0) {
            opManagersGrid.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 24px; text-align: center; color: #667085; font-size: 13px; background: #F9FAFB; border: 1px dashed #EAECF0; border-radius: 8px;">
                    Henüz personel tanımlanmadı. Lütfen 3. adımda personel ekleyiniz.
                </div>
            `;
            return;
        }

        const filtered = listToUse.filter(m => 
            m.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
            m.role.toLowerCase().includes(filterQuery.toLowerCase())
        );

        opManagersGrid.innerHTML = '';
        if (filtered.length === 0) {
            opManagersGrid.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 16px; text-align: center; color: #667085; font-size: 13px;">
                    Arama kriterine uygun personel bulunamadı.
                </div>
            `;
            return;
        }

        filtered.forEach(m => {
            const card = document.createElement('label');
            card.className = 'op-manager-card';
            const initials = m.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            const isChecked = selectedManagers && selectedManagers.includes(m.name);

            const avatarInner = m.photo
                ? `<img src="${m.photo}" alt="${m.name}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; display: block;">`
                : `<div class="person-avatar-fallback" style="font-size: 12px;">${initials}</div>`;

            card.innerHTML = `
                <input type="checkbox" class="op-manager-cb" data-name="${m.name}" ${isChecked ? 'checked' : ''} style="accent-color: #7F56D9; width: 18px; height: 18px; cursor: pointer;">
                <div class="person-avatar-wrapper" style="width: 36px; height: 36px; min-width: 36px; min-height: 36px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                    ${avatarInner}
                </div>
                <div class="person-info-col">
                    <span class="person-full-name" style="font-size: 13px;">${m.name}</span>
                    <span class="person-sub-title" style="font-size: 12px;">${m.role}</span>
                </div>
            `;
            opManagersGrid.appendChild(card);
        });
    }

    function openInternalOpModal(editId = null) {
        editingInternalOpId = editId;

        if (opNameInput) opNameInput.value = '';
        if (opTypeSelect) opTypeSelect.value = '';
        if (opCodeInput) opCodeInput.value = '';

        let currentManagers = [];

        if (editId) {
            const target = internalOpsData.find(o => o.id === editId);
            if (target) {
                if (opNameInput) opNameInput.value = target.name || '';
                if (opTypeSelect) opTypeSelect.value = target.type || '';
                if (opCodeInput) opCodeInput.value = target.code || '';
                selectedOpIconSrc = target.src || 'images/ic operasyon ikonlar/1.svg';
                currentManagers = target.managers || [];
            }
        } else {
            selectedOpIconSrc = 'images/ic operasyon ikonlar/1.svg';
        }

        switchInternalOpTab('op-tab-info');
        renderOpManagers('', currentManagers);
        renderOpPickerGrid();
        if (internalOpModal) internalOpModal.classList.add('active');
    }

    function closeInternalOpModal() {
        editingInternalOpId = null;
        if (internalOpModal) internalOpModal.classList.remove('active');
    }

    window.openInternalOpModal = openInternalOpModal;

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#btnAddInternalOp, #btnAddNewInternalOp');
        if (btn) {
            e.preventDefault();
            openInternalOpModal();
        }
    });

    if (closeInternalOpModalBtn) closeInternalOpModalBtn.addEventListener('click', closeInternalOpModal);
    if (cancelInternalOpModalBtn) cancelInternalOpModalBtn.addEventListener('click', closeInternalOpModal);
    if (internalOpModal) {
        internalOpModal.addEventListener('click', (e) => {
            if (e.target === internalOpModal) closeInternalOpModal();
        });

        const tabBtns = internalOpModal.querySelectorAll('.modal-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-tab');
                switchInternalOpTab(targetId);
            });
        });
    }

    if (nextTabInfoBtn) nextTabInfoBtn.addEventListener('click', () => switchInternalOpTab('op-tab-manager'));
    if (prevTabManagerBtn) prevTabManagerBtn.addEventListener('click', () => switchInternalOpTab('op-tab-info'));
    if (nextTabManagerBtn) nextTabManagerBtn.addEventListener('click', () => switchInternalOpTab('op-tab-icon'));
    if (prevTabIconBtn) prevTabIconBtn.addEventListener('click', () => switchInternalOpTab('op-tab-manager'));

    // --------------------------------------------------------------------------
    // 16. İÇ OPERASYON İKONLARI (36 Adet SVG Görsel - images/ic operasyon ikonlar/)
    // --------------------------------------------------------------------------
    const opIconsList = Array.from({ length: 36 }, (_, i) => {
        const num = i + 1;
        return {
            id: `icon-${num}`,
            src: `images/ic operasyon ikonlar/${num}.svg`
        };
    });

    let selectedOpIconSrc = opIconsList[0].src; // Varsayılan 1.svg

    function renderOpPickerGrid(filterQuery = '') {
        const opIconPickerGrid = document.getElementById('opIconPickerGrid');
        if (!opIconPickerGrid) return;

        opIconPickerGrid.innerHTML = '';
        opIconsList.forEach((item, index) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            const isActive = item.src === selectedOpIconSrc;
            btn.className = `icon-picker-item ${isActive ? 'active' : ''}`;
            btn.style.cssText = `width: 38px; height: 38px; border: 1px solid ${isActive ? '#7F56D9' : '#EAECF0'}; border-radius: 8px; background: ${isActive ? '#F4F3FF' : '#FFFFFF'}; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 6px; transition: all 0.15s;`;
            btn.innerHTML = `<img src="${item.src}" style="width: 22px; height: 22px; pointer-events: none;" alt="icon ${index + 1}">`;

            btn.addEventListener('click', () => {
                opIconPickerGrid.querySelectorAll('.icon-picker-item').forEach(b => {
                    b.classList.remove('active');
                    b.style.borderColor = '#EAECF0';
                    b.style.backgroundColor = '#FFFFFF';
                });
                btn.classList.add('active');
                btn.style.borderColor = '#7F56D9';
                btn.style.backgroundColor = '#F4F3FF';
                selectedOpIconSrc = item.src;
            });

            opIconPickerGrid.appendChild(btn);
        });
    }

    const opIconSearchInput = document.getElementById('opIconSearchInput');
    if (opIconSearchInput) {
        opIconSearchInput.addEventListener('input', (e) => {
            renderOpPickerGrid(e.target.value);
        });
    }

    // Operasyon Kaydetme (Tüm Sekmelerdeki Kaydet Butonları)
    const saveOpActionBtns = document.querySelectorAll('.save-op-action-btn');
    saveOpActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = opNameInput ? opNameInput.value.trim() : '';
            const type = opTypeSelect ? opTypeSelect.value : '';
            const code = opCodeInput ? opCodeInput.value.trim().toUpperCase() : '';

            const finalName = name || (type || 'Yeni İç Operasyon');

            // Seçili operasyon sorumlularını topla
            const checkedCBs = opManagersGrid ? Array.from(opManagersGrid.querySelectorAll('.op-manager-cb:checked')) : [];
            const selectedManagers = checkedCBs.map(cb => cb.getAttribute('data-name')).filter(Boolean);

            if (editingInternalOpId) {
                const target = internalOpsData.find(o => o.id === editingInternalOpId);
                if (target) {
                    target.name = finalName;
                    target.type = type;
                    target.code = code;
                    target.src = selectedOpIconSrc;
                    target.managers = selectedManagers;
                }
            } else {
                internalOpsData.push({
                    id: Date.now(),
                    name: finalName,
                    type: type,
                    code: code,
                    src: selectedOpIconSrc,
                    managers: selectedManagers
                });
            }

            renderInternalOps(internalOpSearchInput ? internalOpSearchInput.value : '');
            closeInternalOpModal();
        });
    });

    // Arama Dinleyicisi
    if (internalOpSearchInput) {
        internalOpSearchInput.addEventListener('input', (e) => {
            renderInternalOps(e.target.value);
        });
    }

    // Silme & Düzenleme Tıklamaları
    if (internalOpItemsList) {
        internalOpItemsList.addEventListener('click', (e) => {
            const delBtn = e.target.closest('.delete-op-btn');
            const editBtn = e.target.closest('.edit-op-btn');

            if (delBtn) {
                const id = parseInt(delBtn.getAttribute('data-id'), 10);
                internalOpsData = internalOpsData.filter(o => o.id !== id);
                renderInternalOps(internalOpSearchInput ? internalOpSearchInput.value : '');
            } else if (editBtn) {
                const id = parseInt(editBtn.getAttribute('data-id'), 10);
                openInternalOpModal(id);
            }
        });
    }

    // --------------------------------------------------------------------------
    // 19. DIŞ OPERASYON SÜREÇLERİ VE TEDARİKÇİ MODALLARI (Step 6 Logic - Figma Spec)
    // --------------------------------------------------------------------------
    let externalOpsData = JSON.parse(localStorage.getItem('upu_external_ops') || '[]');
    let editingExternalOpId = null;

    let suppliersData = [];
    let editingSupplierId = null;

    const externalOpEmptyView = document.getElementById('externalOpEmptyView');
    const externalOpListView = document.getElementById('externalOpListView');
    const externalOpCountBadge = document.getElementById('externalOpCountBadge');
    const externalOpSearchInput = document.getElementById('externalOpSearchInput');
    const externalOpItemsList = document.getElementById('externalOpItemsList');
    const externalOpModal = document.getElementById('externalOpModal');

    const closeExternalOpModalBtn = document.getElementById('closeExternalOpModalBtn');
    const cancelExternalOpModalBtn = document.getElementById('cancelExternalOpModalBtn');
    const saveExternalOpModalBtn = document.getElementById('saveExternalOpModalBtn');
    const nextExtTabInfoBtn = document.getElementById('nextExtTabInfoBtn');
    const prevExtTabManagerBtn = document.getElementById('prevExtTabManagerBtn');

    const extOpNameInput = document.getElementById('extOpNameInput');

    // Yeni Tedarikçi Modal Elementleri
    const newSupplierModal = document.getElementById('newSupplierModal');
    const btnOpenNewSupplierModal = document.getElementById('btnOpenNewSupplierModal');
    const closeNewSupplierModalBtn = document.getElementById('closeNewSupplierModalBtn');
    const cancelNewSupplierModalBtn = document.getElementById('cancelNewSupplierModalBtn');
    const saveNewSupplierModalBtn = document.getElementById('saveNewSupplierModalBtn');
    const supplierNameInput = document.getElementById('supplierNameInput');
    const supplierAddressInput = document.getElementById('supplierAddressInput');
    const supplierPhoneInput = document.getElementById('supplierPhoneInput');
    const supplierEmailInput = document.getElementById('supplierEmailInput');

    function renderSuppliers(selectedSupplierNames = []) {
        const suppliersGrid = document.getElementById('suppliersGrid');
        const supplierCountBadge = document.getElementById('supplierCountBadge');
        if (!suppliersGrid) return;
        if (supplierCountBadge) supplierCountBadge.textContent = `${suppliersData.length} adet`;

        suppliersGrid.innerHTML = '';
        if (suppliersData.length === 0) {
            suppliersGrid.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 24px; text-align: center; color: #667085; font-size: 13px; background: #F9FAFB; border: 1px dashed #EAECF0; border-radius: 8px;">
                    Henüz tedarikçi tanımlanmadı. Lütfen tedarikçi ekleyiniz.
                </div>
            `;
            return;
        }

        suppliersData.forEach((s) => {
            const isChecked = selectedSupplierNames && selectedSupplierNames.includes(s.name);
            const itemRow = document.createElement('div');
            itemRow.className = 'supplier-item-row';
            itemRow.innerHTML = `
                <div class="supplier-item-left">
                    <input type="checkbox" class="supplier-checkbox" ${isChecked ? 'checked' : ''} data-id="${s.id}" data-name="${s.name}">
                    <span>${s.name}</span>
                </div>
                <div class="supplier-item-actions">
                    <button type="button" class="supplier-action-btn edit-btn edit-supplier-btn" data-id="${s.id}" title="Düzenle">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button type="button" class="supplier-action-btn delete-btn delete-supplier-btn" data-id="${s.id}" title="Sil">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                </div>
            `;
            suppliersGrid.appendChild(itemRow);
        });
    }

    function switchExternalOpTab(tabId) {
        if (!externalOpModal) return;
        const tabBtns = externalOpModal.querySelectorAll('.modal-tab-btn');
        const tabContents = externalOpModal.querySelectorAll('.modal-tab-content');

        tabBtns.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        tabContents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
                content.style.display = 'flex';
                content.style.flexDirection = 'column';
            } else {
                content.classList.remove('active');
                content.style.display = 'none';
            }
        });
    }

    const extTabBtns = externalOpModal ? externalOpModal.querySelectorAll('.modal-tab-btn') : [];
    if (extTabBtns.length > 0) {
        extTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-tab');
                switchExternalOpTab(targetId);
            });
        });
    }

    if (nextExtTabInfoBtn) nextExtTabInfoBtn.addEventListener('click', () => switchExternalOpTab('ext-tab-manager'));
    if (prevExtTabManagerBtn) prevExtTabManagerBtn.addEventListener('click', () => switchExternalOpTab('ext-tab-info'));

    function renderExternalOps(filterQuery = '') {
        if (!externalOpEmptyView || !externalOpListView) return;

        if (externalOpsData.length === 0) {
            externalOpEmptyView.style.display = 'flex';
            externalOpListView.style.display = 'none';
        } else {
            externalOpEmptyView.style.display = 'none';
            externalOpListView.style.display = 'block';

            if (externalOpCountBadge) {
                externalOpCountBadge.textContent = `${externalOpsData.length} Operasyon`;
            }

            if (externalOpItemsList) {
                externalOpItemsList.innerHTML = '';
                const query = filterQuery.toLowerCase().trim();
                const filtered = externalOpsData.filter(o => o.name.toLowerCase().includes(query));

                filtered.forEach(op => {
                    const card = document.createElement('div');
                    card.className = 'dept-item-card';
                    const supplierSubText = (op.suppliers && op.suppliers.length > 0) ? op.suppliers.join(', ') : '';

                    card.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 36px; height: 36px; background-color: #F4F3FF; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #7F56D9;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <span class="dept-name-text">${op.name}</span>
                                ${supplierSubText ? `<span style="font-size: 13px; color: #667085; font-weight: 400; margin-top: 2px;">${supplierSubText}</span>` : ''}
                            </div>
                        </div>
                        <div class="dept-item-actions">
                            <button type="button" class="dept-action-btn edit-ext-op-btn" data-id="${op.id}" title="Düzenle">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button type="button" class="dept-action-btn delete-ext-op-btn" data-id="${op.id}" title="Sil">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                            </button>
                        </div>
                    `;
                    externalOpItemsList.appendChild(card);
                });
            }
        }
    }

    function renderExtOpManagers(filterQuery = '', selectedManagers = []) {
        const extOpManagersGrid = document.getElementById('extOpManagersGrid');
        if (!extOpManagersGrid) return;

        let listToRender = personnelData.map(p => ({
            id: p.id,
            name: `${p.firstName || ''} ${p.lastName || ''}`.trim() || p.name || 'Personel',
            role: p.role || p.dept || 'Personel',
            photo: p.photo || p.photoDataUrl || p.photoUrl || ''
        }));

        if (listToRender.length === 0) {
            extOpManagersGrid.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 24px; text-align: center; color: #667085; font-size: 13px; background: #F9FAFB; border: 1px dashed #EAECF0; border-radius: 8px;">
                    Henüz personel tanımlanmadı. Lütfen 3. adımda personel ekleyiniz.
                </div>
            `;
            return;
        }

        const query = filterQuery.toLowerCase().trim();
        if (query) {
            listToRender = listToRender.filter(m => m.name.toLowerCase().includes(query) || m.role.toLowerCase().includes(query));
        }

        extOpManagersGrid.innerHTML = '';
        if (listToRender.length === 0) {
            extOpManagersGrid.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 16px; text-align: center; color: #667085; font-size: 13px;">
                    Arama kriterine uygun personel bulunamadı.
                </div>
            `;
            return;
        }

        listToRender.forEach(m => {
            const isChecked = selectedManagers && selectedManagers.includes(m.name);
            const initials = m.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

            const avatarInner = m.photo
                ? `<img src="${m.photo}" alt="${m.name}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; display: block;">`
                : `<div class="person-avatar-fallback" style="font-size: 12px;">${initials}</div>`;

            const item = document.createElement('label');
            item.className = 'op-manager-item';
            item.style.cssText = 'display: flex; align-items: center; gap: 10px; padding: 8px; border-radius: 8px; cursor: pointer; transition: background-color 0.15s;';
            item.innerHTML = `
                <input type="checkbox" class="ext-op-manager-cb" data-name="${m.name}" ${isChecked ? 'checked' : ''} style="accent-color: #7F56D9; width: 18px; height: 18px; cursor: pointer;">
                <div class="person-avatar-wrapper" style="width: 36px; height: 36px; min-width: 36px; min-height: 36px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                    ${avatarInner}
                </div>
                <div>
                    <div style="font-size: 14px; font-weight: 500; color: #101828;">${m.name}</div>
                    <div style="font-size: 12px; color: #667085;">${m.role}</div>
                </div>
            `;
            extOpManagersGrid.appendChild(item);
        });
    }

    const extOpManagerSearchInput = document.getElementById('extOpManagerSearchInput');
    if (extOpManagerSearchInput) {
        extOpManagerSearchInput.addEventListener('input', (e) => {
            const currentExtOp = externalOpsData.find(o => o.id === editingExternalOpId);
            renderExtOpManagers(e.target.value, currentExtOp ? currentExtOp.managers : []);
        });
    }

    function openExternalOpModal(id = null) {
        editingExternalOpId = id;
        switchExternalOpTab('ext-tab-info');

        let selectedSuppliers = [];
        let selectedManagers = [];
        if (id) {
            const target = externalOpsData.find(o => o.id === id);
            if (target) {
                if (extOpNameInput) extOpNameInput.value = target.name || '';
                selectedSuppliers = target.suppliers || [];
                selectedManagers = target.managers || [];
            }
        } else {
            if (extOpNameInput) extOpNameInput.value = '';
        }

        renderSuppliers(selectedSuppliers);
        renderExtOpManagers('', selectedManagers);

        if (externalOpModal) externalOpModal.classList.add('active');
    }

    function closeExternalOpModal() {
        editingExternalOpId = null;
        if (externalOpModal) externalOpModal.classList.remove('active');
    }

    window.openExternalOpModal = openExternalOpModal;

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#btnAddExternalOp, #btnAddNewExternalOp');
        if (btn) {
            e.preventDefault();
            openExternalOpModal();
        }
    });

    if (closeExternalOpModalBtn) closeExternalOpModalBtn.addEventListener('click', closeExternalOpModal);
    if (cancelExternalOpModalBtn) cancelExternalOpModalBtn.addEventListener('click', closeExternalOpModal);
    if (externalOpModal) {
        externalOpModal.addEventListener('click', (e) => {
            if (e.target === externalOpModal) closeExternalOpModal();
        });
    }

    // Tedarikçi Modal İşlemleri
    function openNewSupplierModal(id = null) {
        editingSupplierId = id;
        if (id) {
            const target = suppliersData.find(s => s.id === id);
            if (target && supplierNameInput) supplierNameInput.value = target.name;
        } else {
            if (supplierNameInput) supplierNameInput.value = '';
            if (supplierAddressInput) supplierAddressInput.value = '';
            if (supplierPhoneInput) supplierPhoneInput.value = '';
            if (supplierEmailInput) supplierEmailInput.value = '';
        }
        if (newSupplierModal) newSupplierModal.classList.add('active');
    }

    function closeNewSupplierModal() {
        editingSupplierId = null;
        if (newSupplierModal) newSupplierModal.classList.remove('active');
    }

    if (btnOpenNewSupplierModal) btnOpenNewSupplierModal.addEventListener('click', () => openNewSupplierModal());
    if (closeNewSupplierModalBtn) closeNewSupplierModalBtn.addEventListener('click', closeNewSupplierModal);
    if (cancelNewSupplierModalBtn) cancelNewSupplierModalBtn.addEventListener('click', closeNewSupplierModal);
    if (newSupplierModal) {
        newSupplierModal.addEventListener('click', (e) => {
            if (e.target === newSupplierModal) closeNewSupplierModal();
        });
    }

    if (saveNewSupplierModalBtn) {
        saveNewSupplierModalBtn.addEventListener('click', () => {
            const name = supplierNameInput ? supplierNameInput.value.trim() : '';
            if (editingSupplierId) {
                const target = suppliersData.find(s => s.id === editingSupplierId);
                if (target) target.name = name || target.name;
            } else {
                suppliersData.push({
                    id: Date.now(),
                    name: name || `Tedarikçi ${suppliersData.length + 1}`,
                    checked: true
                });
            }
            // Aktif Dış Operasyon düzenlemedeyse onun seçili tedarikçi listesini al
            const currentExtOp = externalOpsData.find(o => o.id === editingExternalOpId);
            renderSuppliers(currentExtOp ? currentExtOp.suppliers : []);
            closeNewSupplierModal();
        });
    }

    // Tedarikçi Izgarası Tıklamaları (Silme & Düzenleme)
    const suppliersGrid = document.getElementById('suppliersGrid');
    if (suppliersGrid) {
        suppliersGrid.addEventListener('click', (e) => {
            const delBtn = e.target.closest('.delete-supplier-btn');
            const editBtn = e.target.closest('.edit-supplier-btn');

            if (delBtn) {
                const id = parseInt(delBtn.getAttribute('data-id'), 10);
                suppliersData = suppliersData.filter(s => s.id !== id);
                renderSuppliers();
            } else if (editBtn) {
                const id = parseInt(editBtn.getAttribute('data-id'), 10);
                openNewSupplierModal(id);
            }
        });

        suppliersGrid.addEventListener('change', (e) => {
            if (e.target.classList.contains('supplier-checkbox')) {
                const id = parseInt(e.target.getAttribute('data-id'), 10);
                const target = suppliersData.find(s => s.id === id);
                if (target) target.checked = e.target.checked;
            }
        });
    }

    if (saveExternalOpModalBtn) {
        saveExternalOpModalBtn.addEventListener('click', () => {
            const name = extOpNameInput ? extOpNameInput.value.trim() : '';
            const finalName = name || 'Yeni Dış Operasyon';

            const suppliersGrid = document.getElementById('suppliersGrid');
            const checkedSupplierCBs = suppliersGrid ? Array.from(suppliersGrid.querySelectorAll('.supplier-checkbox:checked')) : [];
            const selectedSuppliers = checkedSupplierCBs.map(cb => cb.getAttribute('data-name')).filter(Boolean);

            const extOpManagersGrid = document.getElementById('extOpManagersGrid');
            const checkedManagerCBs = extOpManagersGrid ? Array.from(extOpManagersGrid.querySelectorAll('.ext-op-manager-cb:checked')) : [];
            const selectedManagers = checkedManagerCBs.map(cb => cb.getAttribute('data-name')).filter(Boolean);

            if (editingExternalOpId) {
                const target = externalOpsData.find(o => o.id === editingExternalOpId);
                if (target) {
                    target.name = finalName;
                    target.suppliers = selectedSuppliers;
                    target.managers = selectedManagers;
                }
            } else {
                externalOpsData.push({
                    id: Date.now(),
                    name: finalName,
                    suppliers: selectedSuppliers,
                    managers: selectedManagers
                });
            }

            try {
                localStorage.setItem('upu_external_ops', JSON.stringify(externalOpsData));
            } catch (_) {}

            renderExternalOps(externalOpSearchInput ? externalOpSearchInput.value : '');
            closeExternalOpModal();
        });
    }

    if (externalOpSearchInput) {
        externalOpSearchInput.addEventListener('input', (e) => {
            renderExternalOps(e.target.value);
        });
    }

    if (externalOpItemsList) {
        externalOpItemsList.addEventListener('click', (e) => {
            const delBtn = e.target.closest('.delete-ext-op-btn');
            const editBtn = e.target.closest('.edit-ext-op-btn');

            if (delBtn) {
                const id = parseInt(delBtn.getAttribute('data-id'), 10);
                externalOpsData = externalOpsData.filter(o => o.id !== id);
                try {
                    localStorage.setItem('upu_external_ops', JSON.stringify(externalOpsData));
                } catch (_) {}
                renderExternalOps(externalOpSearchInput ? externalOpSearchInput.value : '');
            } else if (editBtn) {
                const id = parseInt(editBtn.getAttribute('data-id'), 10);
                openExternalOpModal(id);
            }
        });
    }

    // --------------------------------------------------------------------------
    // 20. EKİPMAN SÜREÇLERİ (Step 7 Logic)
    // --------------------------------------------------------------------------
    let equipmentsData = JSON.parse(localStorage.getItem('upu_equipments') || '[]');
    let editingEquipmentId = null;

    const equipmentsEmptyView = document.getElementById('equipmentsEmptyView');
    const equipmentsListView = document.getElementById('equipmentsListView');
    const equipmentCountBadge = document.getElementById('equipmentCountBadge');
    const equipmentSearchInput = document.getElementById('equipmentSearchInput');
    const equipmentItemsList = document.getElementById('equipmentItemsList');
    const equipmentModal = document.getElementById('equipmentModal');

    const closeEquipmentModalBtn = document.getElementById('closeEquipmentModalBtn');
    const cancelEquipmentModalBtn = document.getElementById('cancelEquipmentModalBtn');
    const saveEquipmentModalBtn = document.getElementById('saveEquipmentModalBtn');

    const eqNameInput = document.getElementById('eqNameInput');
    const eqCodeInput = document.getElementById('eqCodeInput');
    const eqTypeSelect = document.getElementById('eqTypeSelect');

    const defaultUndefinedEquipments = [];

    let currentUploadedEqPhoto = null;
    document.addEventListener('change', (e) => {
        if (e.target && e.target.id === 'eqPhotoFileInput') {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    currentUploadedEqPhoto = event.target.result;
                    const eqPhotoPreviewBox = document.getElementById('eqPhotoPreviewBox');
                    if (eqPhotoPreviewBox) {
                        eqPhotoPreviewBox.innerHTML = `<img src="${currentUploadedEqPhoto}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    });

    let maxEquipmentCredit = 42;

    function renderEquipments(filterQuery = '') {
        if (!equipmentsEmptyView || !equipmentsListView) return;

        const factoryImg = document.querySelector('.factory-illustration-img');
        const equipmentCreditBadge = document.getElementById('equipmentCreditBadge');
        const undefinedBadgeCount = document.getElementById('undefinedBadgeCount');
        const definedBadgeCount = document.getElementById('definedBadgeCount');

        if (equipmentsData.length === 0) {
            equipmentsEmptyView.style.display = 'flex';
            equipmentsListView.style.display = 'none';
            if (factoryImg) {
                factoryImg.style.opacity = '1';
            }
        } else {
            equipmentsEmptyView.style.display = 'none';
            equipmentsListView.style.display = 'block';
            if (factoryImg) {
                factoryImg.style.opacity = '0.3';
            }

            const undefinedListContainer = document.getElementById('undefinedEquipmentsList');
            const definedListContainer = document.getElementById('definedEquipmentsList');

            const query = filterQuery.toLowerCase().trim();
            const totalDefinedCount = equipmentsData.length;
            const isLimitReached = totalDefinedCount >= maxEquipmentCredit;

            // Header Rozeti Güncelle
            if (equipmentCreditBadge) {
                equipmentCreditBadge.textContent = `${totalDefinedCount} / ${maxEquipmentCredit} Ekipman Kredisi`;
                if (isLimitReached) {
                    equipmentCreditBadge.style.backgroundColor = '#FEF3F2';
                    equipmentCreditBadge.style.color = '#B42318';
                } else {
                    equipmentCreditBadge.style.backgroundColor = '#F4F3FF';
                    equipmentCreditBadge.style.color = '#7F56D9';
                }
            }

            // Tanımlı Sayı Rozeti
            if (definedBadgeCount) {
                definedBadgeCount.textContent = totalDefinedCount.toString();
            }

            // Render Tanımsız Ekipmanlar (Sol Kolon - Kredi Bitti vs Normal Liste)
            if (undefinedListContainer) {
                undefinedListContainer.innerHTML = '';

                if (isLimitReached) {
                    // Krediniz Bitti Görünümü (Figma Spec)
                    if (undefinedBadgeCount) {
                        undefinedBadgeCount.textContent = '0';
                        undefinedBadgeCount.style.backgroundColor = '#FEF3F2';
                        undefinedBadgeCount.style.color = '#B42318';
                    }

                    undefinedListContainer.innerHTML = `
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 32px 16px; border: 1px dashed #FDA29B; border-radius: 12px; background: #FFFAFA; min-height: 200px;">
                            <div style="width: 44px; height: 44px; background: #FEF3F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            </div>
                            <h3 style="font-size: 15px; font-weight: 700; color: #101828; margin-bottom: 6px;">Krediniz Bitti</h3>
                            <p style="font-size: 12px; color: #667085; max-width: 220px; line-height: 1.4; margin-bottom: 18px;">
                                Yeni ekipman tanımlayabilmek için kredi satın alabilirsiniz.
                            </p>
                            <button type="button" id="btnBuyEquipmentCredit" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border: 1px solid #D0D5DD; border-radius: 8px; background: #FFFFFF; font-size: 14px; font-weight: 600; color: #344054; cursor: pointer; box-shadow: 0 1px 2px rgba(16,24,40,0.05); transition: background 0.15s;">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                                <span>Satın Al</span>
                            </button>
                        </div>
                    `;
                } else {
                    // Normal Tanımsız Ekipmanlar Listesi
                    if (undefinedBadgeCount) {
                        undefinedBadgeCount.textContent = Math.max(0, maxEquipmentCredit - totalDefinedCount).toString();
                        undefinedBadgeCount.style.backgroundColor = '#EFF8FF';
                        undefinedBadgeCount.style.color = '#175CD3';
                    }

                    const filteredUndefined = defaultUndefinedEquipments.filter(item => item.name.toLowerCase().includes(query) || item.sub.toLowerCase().includes(query));
                    filteredUndefined.forEach(item => {
                        const card = document.createElement('div');
                        card.className = 'dept-item-card';
                        card.style.cssText = 'padding: 10px 12px; border: 1px solid #EAECF0; border-radius: 8px; background: #FFFFFF; display: flex; align-items: center; justify-content: space-between;';
                        card.innerHTML = `
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <div style="width: 32px; height: 32px; background: #F9FAFB; border: 1px solid #EAECF0; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #667085;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                                </div>
                                <div>
                                    <div style="font-size: 14px; font-weight: 600; color: #101828;">${item.name}</div>
                                    <div style="font-size: 12px; color: #667085;">${item.sub}</div>
                                </div>
                            </div>
                            <div style="color: #667085; cursor: pointer;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                            </div>
                        `;
                        undefinedListContainer.appendChild(card);
                    });
                }
            }

            // Render Tanımlı Ekipmanlar (Sağ Kolon - YALNIZCA Kullanıcının Yüklediği Resimler Gösterilir)
            if (definedListContainer) {
                definedListContainer.innerHTML = '';
                const filteredDefined = equipmentsData.filter(item => item.name.toLowerCase().includes(query) || (item.type && item.type.toLowerCase().includes(query)));

                filteredDefined.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'dept-item-card';
                    card.style.cssText = 'padding: 8px 12px; border: 1px solid #EAECF0; border-radius: 8px; background: #FFFFFF; display: flex; align-items: center; justify-content: space-between;';
                    
                    const imgContent = item.img 
                        ? `<img src="${item.img}" alt="${item.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`
                        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#667085" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`;

                    card.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 44px; height: 36px; border-radius: 6px; overflow: hidden; background: #F9FAFB; border: 1px solid #EAECF0; display: flex; align-items: center; justify-content: center;">
                                ${imgContent}
                            </div>
                            <div>
                                <div style="font-size: 14px; font-weight: 600; color: #101828;">${item.name}</div>
                                <div style="font-size: 12px; color: #667085;">${item.type || 'CNC Torna'}</div>
                            </div>
                        </div>
                        <div class="dept-item-actions">
                            <button type="button" class="dept-action-btn edit-eq-btn" onclick="window.editEquipment('${item.id}')" title="Düzenle">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button type="button" class="dept-action-btn delete-eq-btn" onclick="window.deleteEquipment('${item.id}')" title="Sil">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                        </div>
                    `;
                    definedListContainer.appendChild(card);
                });
            }
        }
    }

    window.deleteEquipment = function(id) {
        equipmentsData = equipmentsData.filter(eq => String(eq.id) !== String(id));
        try {
            localStorage.setItem('upu_equipments', JSON.stringify(equipmentsData));
        } catch (_) {}
        renderEquipments(equipmentSearchInput ? equipmentSearchInput.value : '');
    };

    window.editEquipment = function(id) {
        openEquipmentModal(id);
    };

    function openEquipmentModal(id = null) {
        editingEquipmentId = id;
        currentUploadedEqPhoto = null;

        const eqIdInput = document.getElementById('eqIdInput');
        const eqBrandInput = document.getElementById('eqBrandInput');
        const eqModelInput = document.getElementById('eqModelInput');
        const eqPhotoPreviewBox = document.getElementById('eqPhotoPreviewBox');
        const eqPhotoFileInput = document.getElementById('eqPhotoFileInput');

        if (eqPhotoFileInput) {
            eqPhotoFileInput.value = '';
        }

        if (eqPhotoPreviewBox) {
            eqPhotoPreviewBox.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#667085" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            `;
        }

        const eqOperationSelect = document.getElementById('eqOperationSelect');

        if (id !== null && id !== undefined) {
            const target = equipmentsData.find(e => String(e.id) === String(id));
            if (target) {
                if (eqIdInput) eqIdInput.value = target.id;
                if (eqBrandInput) eqBrandInput.value = target.brand || target.name || '';
                if (eqModelInput) eqModelInput.value = target.model || '';
                if (eqOperationSelect) eqOperationSelect.value = target.type || '';
                if (target.img && eqPhotoPreviewBox) {
                    currentUploadedEqPhoto = target.img;
                    eqPhotoPreviewBox.innerHTML = `<img src="${target.img}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
                }
            }
        } else {
            if (eqIdInput) eqIdInput.value = '';
            if (eqBrandInput) eqBrandInput.value = '';
            if (eqModelInput) eqModelInput.value = '';
            if (eqOperationSelect) eqOperationSelect.value = '';
        }

        if (equipmentModal) equipmentModal.classList.add('active');
    }

    function closeEquipmentModal() {
        editingEquipmentId = null;
        currentUploadedEqPhoto = null;
        if (equipmentModal) equipmentModal.classList.remove('active');
    }

    window.openEquipmentModal = openEquipmentModal;

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#btnAddEquipment, #btnAddNewEquipment');
        if (btn) {
            e.preventDefault();
            openEquipmentModal();
        }
    });

    if (closeEquipmentModalBtn) closeEquipmentModalBtn.addEventListener('click', closeEquipmentModal);
    if (cancelEquipmentModalBtn) cancelEquipmentModalBtn.addEventListener('click', closeEquipmentModal);
    if (equipmentModal) {
        equipmentModal.addEventListener('click', (e) => {
            if (e.target === equipmentModal) closeEquipmentModal();
        });
    }

    if (saveEquipmentModalBtn) {
        saveEquipmentModalBtn.addEventListener('click', () => {
            const eqBrandInput = document.getElementById('eqBrandInput');
            const eqModelInput = document.getElementById('eqModelInput');
            const eqOperationSelect = document.getElementById('eqOperationSelect');

            const brand = eqBrandInput ? eqBrandInput.value.trim() : '';
            const model = eqModelInput ? eqModelInput.value.trim() : '';
            const selectedOp = eqOperationSelect ? eqOperationSelect.value : '';

            const finalName = brand && model ? `${brand} ${model}` : (brand || model || 'Yeni Ekipman');
            const finalType = selectedOp || 'CNC Torna';

            if (editingEquipmentId !== null && editingEquipmentId !== undefined) {
                const target = equipmentsData.find(e => String(e.id) === String(editingEquipmentId));
                if (target) {
                    target.name = finalName;
                    target.brand = brand;
                    target.model = model;
                    target.type = finalType;
                    if (currentUploadedEqPhoto) {
                        target.img = currentUploadedEqPhoto;
                        target.photo = currentUploadedEqPhoto;
                    }
                }
            } else {
                equipmentsData.push({
                    id: Date.now(),
                    name: finalName,
                    brand: brand,
                    model: model,
                    type: finalType,
                    img: currentUploadedEqPhoto || null,
                    photo: currentUploadedEqPhoto || null
                });
            }

            try {
                localStorage.setItem('upu_equipments', JSON.stringify(equipmentsData));
            } catch (_) {}

            renderEquipments(equipmentSearchInput ? equipmentSearchInput.value : '');
            closeEquipmentModal();
        });
    }

    if (equipmentSearchInput) {
        equipmentSearchInput.addEventListener('input', (e) => {
            renderEquipments(e.target.value);
        });
    }

    document.addEventListener('click', (e) => {
        const buyBtn = e.target.closest('#btnBuyEquipmentCredit');
        if (buyBtn) {
            e.preventDefault();
            maxEquipmentCredit += 20;
            renderEquipments(equipmentSearchInput ? equipmentSearchInput.value : '');
        }
    });

    // --------------------------------------------------------------------------
    // 21. VARDİYA SÜREÇLERİ (Step 8 Logic - Figma Web Modal Base & List View)
    // --------------------------------------------------------------------------
    let shiftsData = JSON.parse(localStorage.getItem('upu_shifts') || '[]');
    let editingShiftId = null;
    let holidaysData = JSON.parse(localStorage.getItem('upu_holidays') || '[]');
    let editingHolidayId = null;

    const shiftsEmptyView = document.getElementById('shiftsEmptyView');
    const shiftsListView = document.getElementById('shiftsListView');
    const definedShiftsList = document.getElementById('definedShiftsList');
    const shiftListBadgeCount = document.getElementById('shiftListBadgeCount');

    const shiftModal = document.getElementById('shiftModal');
    const closeShiftModalBtn = document.getElementById('closeShiftModalBtn');
    const cancelShiftModalBtn = document.getElementById('cancelShiftModalBtn');
    const nextShiftTabBtn = document.getElementById('nextShiftTabBtn');
    const prevShiftTabBtn = document.getElementById('prevShiftTabBtn');
    const saveShiftModalBtn = document.getElementById('saveShiftModalBtn');

    const shiftTabInfoBtn = document.getElementById('shiftTabInfoBtn');
    const shiftTabBreakBtn = document.getElementById('shiftTabBreakBtn');
    const shiftTabInfo = document.getElementById('shift-tab-info');
    const shiftTabBreak = document.getElementById('shift-tab-break');

    const colorHexMap = {
        'mor': '#7F56D9',
        'gri': '#667085',
        'kırmızı': '#D9381E',
        'turuncu': '#F79009',
        'yeşil': '#12B76A',
        'mavi': '#2E90FA'
    };

    function renderShifts() {
        if (!shiftsEmptyView || !shiftsListView) return;

        const factoryImg = document.querySelector('.factory-illustration-img');
        const btnAddNewShiftFromList = document.getElementById('btnAddNewShiftFromList');
        const shiftLimitWarningRow = document.getElementById('shiftLimitWarningRow');

        if (shiftsData.length === 0) {
            shiftsEmptyView.style.display = 'block';
            shiftsListView.style.display = 'none';
            if (factoryImg) factoryImg.style.opacity = '1';
        } else {
            shiftsEmptyView.style.display = 'none';
            shiftsListView.style.display = 'block';
            if (factoryImg) factoryImg.style.opacity = '0.3';

            if (shiftListBadgeCount) {
                shiftListBadgeCount.textContent = `${shiftsData.length} Vardiya`;
            }

            if (definedShiftsList) {
                definedShiftsList.innerHTML = '';
                shiftsData.forEach(item => {
                    const borderColor = colorHexMap[item.color || 'kırmızı'] || '#D9381E';
                    const card = document.createElement('div');
                    card.style.cssText = `padding: 12px 16px 12px 12px; border: 1px solid #EAECF0; border-left: 4px solid ${borderColor}; border-radius: 8px; background: #FFFFFF; display: flex; align-items: center; justify-content: space-between; width: 100%; box-sizing: border-box; text-align: left;`;
                    card.innerHTML = `
                        <div style="display: flex; flex-direction: column; align-items: flex-start; text-align: left;">
                            <span style="font-size: 15px; font-weight: 700; color: #101828; text-align: left;">${item.name}</span>
                            <span style="font-size: 13px; color: #667085; margin-top: 2px; text-align: left;">${item.startTime} - ${item.endTime}</span>
                        </div>
                        <div class="dept-item-actions">
                            <button type="button" class="dept-action-btn edit-shift-btn" onclick="window.editShift('${item.id}')" title="Düzenle">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button type="button" class="dept-action-btn delete-shift-btn" onclick="window.deleteShift('${item.id}')" title="Sil">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                        </div>
                    `;
                    definedShiftsList.appendChild(card);
                });
            }

            // 24 saatte en fazla 3 vardiya ekleme sınırı kontrolü (Figma Spec)
            if (shiftsData.length >= 3) {
                if (btnAddNewShiftFromList) {
                    btnAddNewShiftFromList.disabled = true;
                    btnAddNewShiftFromList.style.backgroundColor = '#F9FAFB';
                    btnAddNewShiftFromList.style.borderColor = '#EAECF0';
                    btnAddNewShiftFromList.style.color = '#98A2B3';
                    btnAddNewShiftFromList.style.cursor = 'not-allowed';
                    btnAddNewShiftFromList.style.opacity = '0.7';
                }
                if (shiftLimitWarningRow) {
                    shiftLimitWarningRow.style.display = 'flex';
                }
            } else {
                if (btnAddNewShiftFromList) {
                    btnAddNewShiftFromList.disabled = false;
                    btnAddNewShiftFromList.style.backgroundColor = '#FFFFFF';
                    btnAddNewShiftFromList.style.borderColor = '#D0D5DD';
                    btnAddNewShiftFromList.style.color = '#344054';
                    btnAddNewShiftFromList.style.cursor = 'pointer';
                    btnAddNewShiftFromList.style.opacity = '1';
                }
                if (shiftLimitWarningRow) {
                    shiftLimitWarningRow.style.display = 'none';
                }
            }
        }
    }

    window.deleteShift = function(id) {
        shiftsData = shiftsData.filter(s => String(s.id) !== String(id));
        try {
            localStorage.setItem('upu_shifts', JSON.stringify(shiftsData));
        } catch (_) {}
        renderShifts();
    };

    window.editShift = function(id) {
        openShiftModal(id);
    };

    function switchShiftTab(tabName) {
        const shiftTabInfo = document.getElementById('shift-tab-info');
        const shiftTabBreak = document.getElementById('shift-tab-break');
        const shiftTabInfoBtn = document.getElementById('shiftTabInfoBtn');
        const shiftTabBreakBtn = document.getElementById('shiftTabBreakBtn');

        if (tabName === 'info') {
            if (shiftTabInfo) { shiftTabInfo.classList.add('active'); shiftTabInfo.style.display = 'flex'; }
            if (shiftTabBreak) { shiftTabBreak.classList.remove('active'); shiftTabBreak.style.display = 'none'; }
            if (shiftTabInfoBtn) shiftTabInfoBtn.classList.add('active');
            if (shiftTabBreakBtn) shiftTabBreakBtn.classList.remove('active');
        } else if (tabName === 'break') {
            if (shiftTabInfo) { shiftTabInfo.classList.remove('active'); shiftTabInfo.style.display = 'none'; }
            if (shiftTabBreak) { shiftTabBreak.classList.add('active'); shiftTabBreak.style.display = 'flex'; }
            if (shiftTabBreakBtn) shiftTabBreakBtn.classList.add('active');
            if (shiftTabInfoBtn) shiftTabInfoBtn.classList.remove('active');
        }
    }

    window.switchShiftTab = switchShiftTab;

    let currentShiftBreaks = [];

    function openShiftModal(id = null) {
        if (id === null && shiftsData.length >= 3) {
            return; // 3 vardiya sınırına ulaşıldıysa yeni ekleme yaptırma
        }
        editingShiftId = id;
        const shiftNameInput = document.getElementById('shiftNameInput');
        const shiftStartTimeInput = document.getElementById('shiftStartTimeInput');
        const shiftEndTimeInput = document.getElementById('shiftEndTimeInput');
        const shiftManagerSelect = document.getElementById('shiftManagerSelect');

        // Vardiya Sorumlusu Dropdown'unu 3. Adımdaki Personellerle Doldur
        if (shiftManagerSelect) {
            shiftManagerSelect.innerHTML = '<option value="">Vardiya Sorumlusu Seçiniz</option>';
            personnelData.forEach(p => {
                const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || p.name || 'Personel';
                const opt = document.createElement('option');
                opt.value = fullName;
                opt.textContent = fullName;
                shiftManagerSelect.appendChild(opt);
            });
        }

        if (id !== null && id !== undefined) {
            const target = shiftsData.find(s => String(s.id) === String(id));
            if (target) {
                if (shiftNameInput) shiftNameInput.value = target.name || '';
                if (shiftStartTimeInput) shiftStartTimeInput.value = target.startTime || '16:34';
                if (shiftEndTimeInput) shiftEndTimeInput.value = target.endTime || '16:34';
                if (shiftManagerSelect) shiftManagerSelect.value = target.manager || '';

                const selectedDays = target.repeatDays || [];
                document.querySelectorAll('input[name="shiftRepeatDays"]').forEach(cb => {
                    cb.checked = selectedDays.includes(cb.value);
                });

                document.querySelectorAll('input[name="shiftCalendarColor"]').forEach(r => {
                    r.checked = !!(target.color && r.value === target.color);
                });

                currentShiftBreaks = target.breaks ? JSON.parse(JSON.stringify(target.breaks)) : [];
            }
        } else {
            if (shiftNameInput) shiftNameInput.value = '';
            if (shiftStartTimeInput) shiftStartTimeInput.value = '16:34';
            if (shiftEndTimeInput) shiftEndTimeInput.value = '16:34';
            if (shiftManagerSelect) shiftManagerSelect.value = '';

            // Yeni vardiya eklerken gün ve renk seçili gelmesin
            document.querySelectorAll('input[name="shiftRepeatDays"]').forEach(cb => { cb.checked = false; });
            document.querySelectorAll('input[name="shiftCalendarColor"]').forEach(r => { r.checked = false; });

            currentShiftBreaks = [];
        }

        renderBreaks();
        if (shiftModal) shiftModal.classList.add('active');
        switchShiftTab('info');
    }

    function closeShiftModal() {
        editingShiftId = null;
        currentShiftBreaks = [];
        if (shiftModal) shiftModal.classList.remove('active');
    }

    window.openShiftModal = openShiftModal;

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#btnAddShift, #btnAddNewShiftFromList');
        if (btn) {
            e.preventDefault();
            openShiftModal();
        }
    });

    if (saveShiftModalBtn) {
        saveShiftModalBtn.addEventListener('click', () => {
            const shiftNameInput = document.getElementById('shiftNameInput');
            const shiftStartTimeInput = document.getElementById('shiftStartTimeInput');
            const shiftEndTimeInput = document.getElementById('shiftEndTimeInput');
            const shiftManagerSelect = document.getElementById('shiftManagerSelect');
            const colorRadio = document.querySelector('input[name="shiftCalendarColor"]:checked');

            const name = shiftNameInput ? shiftNameInput.value.trim() : '';
            const startTime = shiftStartTimeInput ? shiftStartTimeInput.value.trim() : '16:34';
            const endTime = shiftEndTimeInput ? shiftEndTimeInput.value.trim() : '16:34';
            const color = colorRadio ? colorRadio.value : '';
            const manager = shiftManagerSelect ? shiftManagerSelect.value : '';

            const checkedDays = Array.from(document.querySelectorAll('input[name="shiftRepeatDays"]:checked')).map(cb => cb.value);
            const finalName = name || 'Yeni Vardiya';
            const savedBreaks = JSON.parse(JSON.stringify(currentShiftBreaks));

            if (editingShiftId !== null && editingShiftId !== undefined) {
                const target = shiftsData.find(s => String(s.id) === String(editingShiftId));
                if (target) {
                    target.name = finalName;
                    target.startTime = startTime;
                    target.endTime = endTime;
                    target.color = color;
                    target.manager = manager;
                    target.repeatDays = checkedDays;
                    target.breaks = savedBreaks;
                }
            } else {
                shiftsData.push({
                    id: Date.now(),
                    name: finalName,
                    startTime: startTime,
                    endTime: endTime,
                    color: color,
                    manager: manager,
                    repeatDays: checkedDays,
                    breaks: savedBreaks
                });
            }

            try {
                localStorage.setItem('upu_shifts', JSON.stringify(shiftsData));
            } catch (_) {}

            renderShifts();
            closeShiftModal();
        });
    }

    if (closeShiftModalBtn) closeShiftModalBtn.addEventListener('click', closeShiftModal);
    if (cancelShiftModalBtn) cancelShiftModalBtn.addEventListener('click', closeShiftModal);
    if (shiftModal) {
        shiftModal.addEventListener('click', (e) => {
            if (e.target === shiftModal) closeShiftModal();
        });
    }

    // Mola Verileri (Her vardiya için özel olarak hafızada tutulur)
    let editingBreakId = null;

    const breaksListContainer = document.getElementById('breaksListContainer');
    const breakCountBadge = document.getElementById('breakCountBadge');
    const newBreakModal = document.getElementById('newBreakModal');
    const closeBreakModalBtn = document.getElementById('closeBreakModalBtn');
    const cancelBreakModalBtn = document.getElementById('cancelBreakModalBtn');
    const saveBreakModalBtn = document.getElementById('saveBreakModalBtn');
    const btnOpenNewBreakModal = document.getElementById('btnOpenNewBreakModal');
    const cancelShiftModalBtn2 = document.getElementById('cancelShiftModalBtn2');

    function renderBreaks() {
        if (breakCountBadge) {
            breakCountBadge.textContent = `${currentShiftBreaks.length} adet`;
        }

        if (breaksListContainer) {
            breaksListContainer.innerHTML = '';
            currentShiftBreaks.forEach(item => {
                const card = document.createElement('div');
                card.style.cssText = 'padding: 10px 12px; border: 1px solid #EAECF0; border-radius: 8px; background: #FFFFFF; display: flex; align-items: center; justify-content: space-between;';
                card.innerHTML = `
                    <div>
                        <div style="font-size: 14px; font-weight: 600; color: #101828;">${item.name}</div>
                        <div style="font-size: 12px; color: #667085;">${item.startTime} - ${item.endTime}</div>
                    </div>
                    <div class="dept-item-actions">
                        <button type="button" class="dept-action-btn edit-break-btn" onclick="window.editBreak('${item.id}')" title="Düzenle">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button type="button" class="dept-action-btn delete-break-btn" onclick="window.deleteBreak('${item.id}')" title="Sil">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                `;
                breaksListContainer.appendChild(card);
            });
        }
    }

    window.deleteBreak = function(id) {
        currentShiftBreaks = currentShiftBreaks.filter(b => String(b.id) !== String(id));
        renderBreaks();
    };

    window.editBreak = function(id) {
        openBreakModal(id);
    };

    function openBreakModal(id = null) {
        editingBreakId = id;
        const breakNameInput = document.getElementById('breakNameInput');
        const breakStartTimeInput = document.getElementById('breakStartTimeInput');
        const breakEndTimeInput = document.getElementById('breakEndTimeInput');
        const breakModalTitle = document.getElementById('breakModalTitle');

        if (id !== null && id !== undefined) {
            const target = currentShiftBreaks.find(b => String(b.id) === String(id));
            if (target) {
                if (breakModalTitle) breakModalTitle.textContent = 'Mola Düzenle';
                if (breakNameInput) breakNameInput.value = target.name || '';
                if (breakStartTimeInput) breakStartTimeInput.value = target.startTime || '16:34';
                if (breakEndTimeInput) breakEndTimeInput.value = target.endTime || '16:34';
            }
        } else {
            if (breakModalTitle) breakModalTitle.textContent = 'Yeni Mola Ekle';
            if (breakNameInput) breakNameInput.value = '';
            if (breakStartTimeInput) breakStartTimeInput.value = '16:34';
            if (breakEndTimeInput) breakEndTimeInput.value = '16:34';
        }

        if (newBreakModal) newBreakModal.classList.add('active');
    }

    function closeBreakModal() {
        editingBreakId = null;
        if (newBreakModal) newBreakModal.classList.remove('active');
    }

    window.openBreakModal = openBreakModal;

    if (btnOpenNewBreakModal) {
        btnOpenNewBreakModal.addEventListener('click', () => openBreakModal());
    }
    if (closeBreakModalBtn) closeBreakModalBtn.addEventListener('click', closeBreakModal);
    if (cancelBreakModalBtn) cancelBreakModalBtn.addEventListener('click', closeBreakModal);
    if (cancelShiftModalBtn2) cancelShiftModalBtn2.addEventListener('click', closeShiftModal);
    if (newBreakModal) {
        newBreakModal.addEventListener('click', (e) => {
            if (e.target === newBreakModal) closeBreakModal();
        });
    }

    if (saveBreakModalBtn) {
        saveBreakModalBtn.addEventListener('click', () => {
            const breakNameInput = document.getElementById('breakNameInput');
            const breakStartTimeInput = document.getElementById('breakStartTimeInput');
            const breakEndTimeInput = document.getElementById('breakEndTimeInput');

            const name = breakNameInput ? breakNameInput.value.trim() : '';
            const startTime = breakStartTimeInput ? breakStartTimeInput.value.trim() : '16:34';
            const endTime = breakEndTimeInput ? breakEndTimeInput.value.trim() : '16:34';

            if (!name) return;

            if (editingBreakId !== null && editingBreakId !== undefined) {
                const target = currentShiftBreaks.find(b => String(b.id) === String(editingBreakId));
                if (target) {
                    target.name = name;
                    target.startTime = startTime;
                    target.endTime = endTime;
                }
            } else {
                currentShiftBreaks.push({
                    id: Date.now(),
                    name: name,
                    startTime: startTime,
                    endTime: endTime
                });
            }

            renderBreaks();
            closeBreakModal();
        });
    }

    renderBreaks();

    if (shiftTabInfoBtn) shiftTabInfoBtn.addEventListener('click', () => switchShiftTab('info'));
    if (shiftTabBreakBtn) shiftTabBreakBtn.addEventListener('click', () => switchShiftTab('break'));
    if (nextShiftTabBtn) nextShiftTabBtn.addEventListener('click', () => switchShiftTab('break'));
    if (prevShiftTabBtn) prevShiftTabBtn.addEventListener('click', () => switchShiftTab('info'));

    // İlk Yükleme (Doğrudan Step 8 Vardiya Görünümü)
    setLanguage('tr');
    renderDepartments();
    renderPersonnels();
    renderInternalOps();
    renderExternalOps();
    renderSuppliers();
    renderEquipments();
    renderSkills();
    renderAchievements();
    renderShifts();
    goToStep(1);

});
