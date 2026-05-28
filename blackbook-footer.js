// Add "Made by Blackbook.dk" link to footer
document.addEventListener('DOMContentLoaded', function () {
  function addBlackbookLink() {
    var footer = document.getElementById('footer');
    if (!footer) return false;

    var link = document.createElement('a');
    link.href = 'https://www.blackbook.dk/';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Made by Blackbook.dk';
    link.className = 'text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300';
    link.style.whiteSpace = 'nowrap';

    footer.appendChild(link);
    return true;
  }

  if (!addBlackbookLink()) {
    // Footer might not be rendered yet, retry with observer
    var observer = new MutationObserver(function () {
      if (addBlackbookLink()) {
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
});
