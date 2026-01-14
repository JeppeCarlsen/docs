#!/usr/bin/env node

/**
 * IndexNow submission script for Valiyou Knowledge Center
 *
 * Notifies search engines instantly when documentation is updated
 * Supports Bing, Yandex, and other IndexNow-compatible search engines
 *
 * Learn more: https://www.indexnow.org/
 */

const https = require('https')

// Configuration
const HOST = 'docs.valiyou.com'
const KEY = '40f06bab0e1042cba8b2fdb77838b20d' // Valiyou IndexNow key
const KEY_LOCATION = `https://${HOST}/40f06bab0e1042cba8b2fdb77838b20d.txt`

// Main documentation URLs to submit
// Add new pages here when creating important documentation
const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/getting-started/quick-start`,
  `https://${HOST}/getting-started/your-profile`,
  `https://${HOST}/getting-started/organization-settings`,
  `https://${HOST}/valuations/create-valuation`,
  `https://${HOST}/valuations/dashboard`,
  `https://${HOST}/valuations/methods`,
  `https://${HOST}/sponsorships/sponsors`,
  `https://${HOST}/sponsorships/packages`,
  `https://${HOST}/sponsorships/inventory/inventory`,
  `https://${HOST}/sponsorships/proposals`,
  `https://${HOST}/platform/team-management`,
  `https://${HOST}/platform/billing/billing`,
  `https://${HOST}/platform/api`,
  `https://${HOST}/authentication/login`,
  `https://${HOST}/trust-security/trust-center`,
  `https://${HOST}/resources/glossary`,
]

/**
 * Submit URLs to IndexNow API
 */
function submitToIndexNow() {
  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS,
  })

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  }

  console.log('📤 Submitting URLs to IndexNow API...')
  console.log(`📋 ${URLS.length} URLs to submit`)
  console.log('')

  const req = https.request(options, (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('✅ IndexNow submission successful!')
        console.log('')
        console.log('🔍 Search engines notified:')
        console.log('   • Bing')
        console.log('   • Yandex')
        console.log('   • Seznam.cz')
        console.log('   • Naver (and others)')
        console.log('')
        console.log('⏱️  Indexing typically happens within minutes')
      } else if (res.statusCode === 202) {
        console.log('✅ IndexNow submission accepted!')
        console.log('⏱️  URLs will be processed shortly')
      } else {
        console.log(`⚠️  Unexpected response: ${res.statusCode}`)
        console.log('📄 Response:', data)
      }
    })
  })

  req.on('error', (error) => {
    console.error('❌ IndexNow submission failed:')
    console.error(error.message)
    process.exit(1)
  })

  req.write(payload)
  req.end()
}

// Run submission
console.log('🚀 Valiyou Knowledge Center - IndexNow Submission')
console.log('================================================')
console.log('')
submitToIndexNow()
