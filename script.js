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
      if (modalImg) modalImg.src = card.dataset.image;
      if (modalTitle) modalTitle.textContent = card.dataset.title;
      if (modalBadge) modalBadge.textContent = card.dataset.type;

      if (modalDesc) {
        let formattedDesc = card.dataset.desc || '';
        formattedDesc = formattedDesc.replace(/\*(.*?)\*/g, '<b>$1</b>');
        formattedDesc = formattedDesc.replace(/\\n/g, '<br>');
        formattedDesc = formattedDesc.replace(/~(.*?)~/g, '<small>$1</small>');
        modalDesc.innerHTML = formattedDesc;
      }

      if (modalVersion) modalVersion.textContent = card.dataset.version;
      if (modalDeveloper) modalDeveloper.textContent = card.dataset.developer;
      if (modalReqs) modalReqs.textContent = card.dataset.requirements;

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
        // Fallback for older cards using data-size
        if (modalApkSize) modalApkSize.textContent = card.dataset.size;
        if (modalApkSizeRow) modalApkSizeRow.style.display = 'block';
        if (modalFileSizeRow) modalFileSizeRow.style.display = 'none';
      } else {
        if (modalApkSizeRow) modalApkSizeRow.style.display = 'none';
        if (modalFileSizeRow) modalFileSizeRow.style.display = 'none';
      }

      // Handle APK / Main Download Link
      if (modalDownloadLink) {
        modalDownloadLink.href = card.dataset.download;
        modalDownloadLink.setAttribute('download', card.dataset.title + '.apk');
      }

      // Handle OBB Link and OBB Size Visibility
      if (card.dataset.obb) {
        if (modalObbSize) modalObbSize.textContent = card.dataset.obbsize || 'N/A';
        if (modalObbSizeRow) modalObbSizeRow.style.display = 'block';

        if (modalObbLink) {
          modalObbLink.style.display = 'block';
          modalObbLink.href = card.dataset.obb;
          modalObbLink.textContent = `Download OBB Data (${card.dataset.obbsize || 'OBB'})`;
          modalObbLink.setAttribute('download', card.dataset.title + '.obb');
        }
      } else {
        if (modalObbSizeRow) modalObbSizeRow.style.display = 'none';
        if (modalObbLink) modalObbLink.style.display = 'none';
      }

      if (modal) modal.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
});
