document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button').forEach(button => {
    let isDragging = false;
    let dragOffsetX = 0, dragOffsetY = 0;
    let dragTimer;

    button.addEventListener('mousedown', e => {
      if (e.button !== 0) return; // Only respond to left-click

      dragTimer = setTimeout(() => {
        isDragging = true;
        const rect = button.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;

        // Apply fixed positioning for dragging
        button.style.position = 'fixed';
        button.style.left = `${rect.left}px`;
        button.style.top = `${rect.top}px`;
        button.classList.add('dragging');
      }, 1000); // 1-second hold to initiate drag
    });

    document.addEventListener('mousemove', e => {
      if (isDragging) {
        button.style.left = `${e.clientX - dragOffsetX}px`;
        button.style.top = `${e.clientY - dragOffsetY}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      clearTimeout(dragTimer);
      if (isDragging) {
        isDragging = false;
        button.classList.remove('dragging');
      }
    });

    button.addEventListener('click', e => {
      if (!isDragging) {
        button.classList.toggle('active');
      }
    });
  });
});