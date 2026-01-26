#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { globSync } = require('glob')

// Find all MDX files
const files = globSync('**/*.mdx', {
  cwd: '/Users/jeppe/Documents/valiyou-knowledge-center',
  ignore: ['node_modules/**'],
})

let fixedCount = 0

files.forEach((file) => {
  const filePath = path.join('/Users/jeppe/Documents/valiyou-knowledge-center', file)
  const content = fs.readFileSync(filePath, 'utf-8')

  // Match frontmatter with nested seo: block
  // Pattern: seo:\n  title: 'something'
  const pattern = /^(---\n(?:.|\n)*?)seo:\n  title: ['"]([^'"]+)['"]\n((?:.|\n)*?---)/m

  const match = content.match(pattern)

  if (match) {
    const before = match[1]
    const seoTitle = match[2]
    const after = match[3]

    // Replace with flat "og:title" field
    const newContent = content.replace(
      pattern,
      `${before}"og:title": '${seoTitle}'\n${after}`
    )

    fs.writeFileSync(filePath, newContent, 'utf-8')
    console.log(`✅ Fixed: ${file}`)
    fixedCount++
  }
})

console.log(`\n✅ Fixed ${fixedCount} file(s) with nested seo: blocks`)
