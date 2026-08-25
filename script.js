document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Hamburger Menu Logic ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // --- Modal & Detailed Info Popup Logic ---
  const modal = document.getElementById('infoModal');
  const modalClose = document.getElementById('modalClose');

  const modalImg = document.getElementById('modalImg');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalVersion = document.getElementById('modalVersion');

  // Size targets
  const modalApkSize = document.getElementById('modalApkSize');
  const modalApkSizeRow = document.getElementById('modalApkSizeRow');
  const modalFileSize = document.getElementById('modalFileSize');
  const modalFileSizeRow = document.getElementById('modalFileSizeRow');
  
  const modalObbSize = document.getElementById('modalObbSize');
  const modalObbSizeRow = document.getElementById('modalObbSizeRow');
  const modalDeveloper = document.getElementById('modalDeveloper');
  const modalReqs = document.getElementById('modalReqs');
  const modalDownloadLink = document.getElementById('modalDownloadLink');
  const modalObbLink = document.getElementById('modalObbLink');

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      if (modalImg) modalImg.src = card.dataset.image || '';
      if (modalTitle) modalTitle.textContent = card.dataset.title || 'Title';
      if (modalBadge) modalBadge.textContent = card.dataset.type || 'Category';

      if (modalDesc) {
        let formattedDesc = card.dataset.desc || '';
        formattedDesc = formattedDesc.replace(/\*(.*?)\*/g, '<b>$1</b>');
        formattedDesc = formattedDesc.replace(/\\n/g, '<br>');
        formattedDesc = formattedDesc.replace(/~(.*?)~/g, '<small>$1</small>');
        modalDesc.innerHTML = formattedDesc;
      }

      if (modalVersion) modalVersion.textContent = card.dataset.version || '-';
      if (modalDeveloper) modalDeveloper.textContent = card.dataset.developer || '-';
      if (modalReqs) modalReqs.textContent = card.dataset.requirements || '-';

      // --- Separate APK Size vs File Size Logic ---
      if (card.dataset.apksize) {
        if (modalApkSize) modalApkSize.textContent = card.dataset.apksize;
        if (modalApkSizeRow) modalApkSizeRow.style.display = 'block';
        if (modalFileSizeRow) modalFileSizeRow.style.display = 'none';
      } else if (card.dataset.filesize) {
        if (modalFileSize) modalFileSize.textContent = card.dataset.filesize;
        if (modalFileSizeRow) modalFileSizeRow.style.display = 'block';
        if (modalApkSizeRow) modalApkSizeRow.style.display = 'none';
      } else if (card.dataset.size) {
        if (modalApkSize) modalApkSize.textContent = card.dataset.size;
        if (modalApkSizeRow) modalApkSizeRow.style.display = 'block';
        if (modalFileSizeRow) modalFileSizeRow.style.display = 'none';
      } else {
        if (modalApkSizeRow) modalApkSizeRow.style.display = 'none';
        if (modalFileSizeRow) modalFileSizeRow.style.display = 'none';
      }

      // --- Download APK / Download ROM Label Logic ---
      const downloadPath = card.dataset.download;
      const itemType = (card.dataset.type || '').toUpperCase();

      if (modalDownloadLink) {
        if (downloadPath && downloadPath.trim() !== '' && downloadPath !== '#') {
          modalDownloadLink.style.display = 'inline-block';
          modalDownloadLink.href = downloadPath;
          
          if (itemType === 'ROM' || itemType === 'ROM GAME') {
            modalDownloadLink.textContent = 'Download ROM';
          } else {
            modalDownloadLink.textContent = 'Download APK';
          }

          modalDownloadLink.removeAttribute('disabled');
          modalDownloadLink.style.pointerEvents = 'auto';
          modalDownloadLink.style.opacity = '1';
          if (card.dataset.title) {
            modalDownloadLink.setAttribute('download', card.dataset.title);
          }
        } else {
          modalDownloadLink.style.display = 'inline-block';
          modalDownloadLink.href = '#';
          modalDownloadLink.textContent = 'Unavailable / Coming Soon';
          modalDownloadLink.style.pointerEvents = 'none';
          modalDownloadLink.style.opacity = '0.5';
          modalDownloadLink.removeAttribute('download');
        }
      }

      // --- OBB Logic ---
      const obbPath = card.dataset.obb;
      if (obbPath && obbPath.trim() !== '' && obbPath !== '#') {
        if (modalObbSize) modalObbSize.textContent = card.dataset.obbsize || 'N/A';
        if (modalObbSizeRow) modalObbSizeRow.style.display = 'block';

        if (modalObbLink) {
          modalObbLink.style.display = 'inline-block';
          modalObbLink.href = obbPath;
          modalObbLink.textContent = `Download OBB Data (${card.dataset.obbsize || 'OBB'})`;
          if (card.dataset.title) {
            modalObbLink.setAttribute('download', card.dataset.title + '.obb');
          }
        }
      } else {
        if (modalObbSizeRow) modalObbSizeRow.style.display = 'none';
        if (modalObbLink) modalObbLink.style.display = 'none';
      }

      // Open Modal
      if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
      }
    });
  });

  // --- Close Modal Logic ---
  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});
