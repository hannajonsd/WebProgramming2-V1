// @ts-nocheck
// Fékk smá hjálp frá chatGPT til að fá þetta til að virka
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.date-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const gamesContainer = button.nextElementSibling;
      gamesContainer.style.display =
        gamesContainer.style.display === 'none' ? 'block' : 'none';
    });
  });
});
