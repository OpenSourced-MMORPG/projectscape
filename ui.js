document.querySelectorAll('button').forEach(button => {
  let isDragging = false;
  let offsetX = 0, offsetY = 0;
  let dragTimeout;

  button.addEventListener('mousedown', e => {
    // Start 1s timer to allow drag
    dragTimeout = setTimeout(() => {
      isDragging = true;
      offsetX = e.clientX - button.offsetLeft;
      offsetY = e.clientY - button.offsetTop;
      button.classList.add('dragging');
      button.style.position = 'fixed'; // Ensure it can move freely
      button.style.zIndex = 10;
    }, 1000);
  });

  document.addEventListener('mousemove', e => {
    if (isDragging) {
      button.style.left = `${e.clientX - offsetX}px`;
      button.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', e => {
    clearTimeout(dragTimeout);
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