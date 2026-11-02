// Ahrefs Web Analytics — Mintlify includes every .js file on all pages
;(function () {
  if (document.querySelector('script[src="https://analytics.ahrefs.com/analytics.js"]')) return
  var s = document.createElement('script')
  s.src = 'https://analytics.ahrefs.com/analytics.js'
  s.setAttribute('data-key', 'CKkz8y7GWhVzzWnTxwAUAw')
  s.async = true
  document.head.appendChild(s)
})()
