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
  const modalSize = document.getElementById('modalSize');
  const modalObbSize = document.getElementById('modalObbSize');         // Target OBB Size span
  const modalObbSizeRow = document.getElementById('modalObbSizeRow');   // Target OBB Size row
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
        let formattedDesc = card.dataset.desc;
        // 1. Convert *text* into <b>text</b> for bold words
        formattedDesc = formattedDesc.replace(/\*(.*?)\*/g, '<b>$1</b>');
        // 2. Convert \n into <br> for line breaks
        formattedDesc = formattedDesc.replace(/\\n/g, '<br>');
        // 3. Convert ~text~ into <small>text</small> for small words
        formattedDesc = formattedDesc.replace(/~(.*?)~/g, '<small>$1</small>');

        // Insert rendered HTML into modal
        modalDesc.innerHTML = formattedDesc;
      }

      if (modalVersion) modalVersion.textContent = card.dataset.version;
      if (modalSize) modalSize.textContent = card.dataset.size;
      if (modalDeveloper) modalDeveloper.textContent = card.dataset.developer;
      if (modalReqs) modalReqs.textContent = card.dataset.requirements;

      // Handle APK Link
      if (modalDownloadLink) {
        modalDownloadLink.href = card.dataset.download;
        modalDownloadLink.setAttribute('download', card.dataset.title + '.apk');
      }

      // Handle OBB Link and OBB Size Visibility
      if (card.dataset.obb) {
        // Show OBB row in specs
        if (modalObbSize) modalObbSize.textContent = card.dataset.obbsize || 'N/A';
        if (modalObbSizeRow) modalObbSizeRow.style.display = 'block';

        // Show OBB Download Button
        if (modalObbLink) {
          modalObbLink.style.display = 'block';
          modalObbLink.href = card.dataset.obb;
          modalObbLink.textContent = `Download OBB Data (${card.dataset.obbsize || 'OBB'})`;
          modalObbLink.setAttribute('download', card.dataset.title + '.obb');
        }
      } else {
        // Hide OBB row and button if game doesn't have OBB
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