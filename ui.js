document.querySelectorAll('button').forEach(button => {
  let isDragging = false;
  let dragOffsetX = 0, dragOffsetY = 0;
  let dragTimer;

  button.addEventListener('mousedown', e => {
    if (e.button !== 0) return;

    dragTimer = setTimeout(() => {
      isDragging = true;
      const rect = button.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;

      // Only enable positioning on drag
      button.style.position = 'fixed';
      button.style.left = `${rect.left}px`;
      button.style.top = `${rect.top}px`;
      button.classList.add('dragging');
    }, 500);
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