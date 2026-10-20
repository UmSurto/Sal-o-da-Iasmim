/**
 * Iasmim Raquel Beauty - Script Principal (JavaScript Puro)
 * Sem dependências, sem backend, sem frameworks
 */

(function () {
  'use strict';

  // 1. Atualizar ano corrente no rodapé
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  // 2. Efeito sutil no cabeçalho ao rolar a página
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        siteHeader.style.boxShadow = '0 4px 20px rgba(43, 29, 33, 0.08)';
      } else {
        siteHeader.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // 3. Rolagem suave para links internos com ajuste de foco para acessibilidade
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Garantir que o foco seja transferido para leitores de tela
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });

  // 4. Modal / Visualizador acessível da Galeria de Fotos
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    // Cria elemento modal dinamicamente de forma limpa
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.id = 'gallery-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Visualizador de imagem');
    modal.hidden = true;

    modal.innerHTML = `
      <div class="gallery-modal-backdrop"></div>
      <div class="gallery-modal-dialog">
        <button type="button" class="gallery-modal-close" aria-label="Fechar visualização">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div class="gallery-modal-content">
          <img src="" alt="" class="gallery-modal-img" />
          <div class="gallery-modal-caption"></div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.gallery-modal-img');
    const modalCaption = modal.querySelector('.gallery-modal-caption');
    const modalClose = modal.querySelector('.gallery-modal-close');
    const modalBackdrop = modal.querySelector('.gallery-modal-backdrop');

    let previousActiveElement = null;

    const openModal = (imgSrc, imgAlt, captionHtml) => {
      previousActiveElement = document.activeElement;
      modalImg.src = imgSrc;
      modalImg.alt = imgAlt;
      modalCaption.innerHTML = captionHtml;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      modalClose.focus();
    };

    const closeModal = () => {
      modal.hidden = true;
      modalImg.src = '';
      document.body.style.overflow = '';
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    };

    galleryItems.forEach((item) => {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', 'Ampliar foto');
      item.style.cursor = 'pointer';

      const handleOpen = () => {
        const img = item.querySelector('.gallery-img');
        const caption = item.querySelector('.gallery-caption');
        if (img) {
          openModal(img.src, img.alt, caption ? caption.innerHTML : '');
        }
      };

      item.addEventListener('click', handleOpen);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      });
    });

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (!modal.hidden && e.key === 'Escape') {
        closeModal();
      }
    });
  }
})();
