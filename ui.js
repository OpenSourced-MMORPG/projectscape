document.querySelectorAll('button').forEach(button => {
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };
  let dragTimeout;

  // Only make button draggable after 1s hold
  button.addEventListener('mousedown', e => {
    // Skip right-click or if already draggable
    if (e.button !== 0) return;

    dragTimeout = setTimeout(() => {
      isDragging = true;
      const rect = button.getBoundingClientRect();
      dragOffset.x = e.clientX - rect.left;
      dragOffset.y = e.clientY - rect.top;

      // Enable absolute positioning only on drag
      button.style.position = 'fixed';
      button.style.left = `${rect.left}px`;
      button.style.top = `${rect.top}px`;
      button.classList.add('dragging');
    }, 1000);
  });

  // Move the button while dragging
  document.addEventListener('mousemove', e => {
    if (isDragging) {
      button.style.left = `${e.clientX - dragOffset.x}px`;
      button.style.top = `${e.clientY - dragOffset.y}px`;
    }
  });

  // Cleanup drag state
  document.addEventListener('mouseup', e => {
    clearTimeout(dragTimeout);
    if (isDragging) {
      isDragging = false;
      button.classList.remove('dragging');
    }
  });

  // Toggle on click if not dragging
  button.addEventListener('click', e => {
    if (!isDragging) {
      button.classList.toggle('active');
    }
  });
});