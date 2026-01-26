#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Get files from command line args (passed by lint-staged)
const files = process.argv.slice(2)

let hasErrors = false

files.forEach((file) => {
  if (!file.endsWith('.mdx') && !file.endsWith('.md')) {
    return
  }

  const content = fs.readFileSync(file, 'utf-8')
  const errors = []

  // Check for cols={} syntax (should be cols="")
  const colsPattern = /cols=\{(\d+)\}/g
  let match
  while ((match = colsPattern.exec(content)) !== null) {
    const lineNum = content.substring(0, match.index).split('\n').length
    errors.push(
      `Line ${lineNum}: Found cols={${match[1]}} - should be cols="${match[1]}" (Mintlify requires string literals)`
    )
  }

  // Check for < followed by digit (like <15%)
  const lessThanPattern = /<(\d+)/g
  while ((match = lessThanPattern.exec(content)) !== null) {
    // Skip if it's part of an HTML comment or tag
    const before = content.substring(Math.max(0, match.index - 4), match.index)
    if (!before.includes('<!--') && !before.includes('</')) {
      const lineNum = content.substring(0, match.index).split('\n').length
      errors.push(
        `Line ${lineNum}: Found <${match[1]} - MDX may parse this as JSX tag. Use "Less than ${match[1]}" instead`
      )
    }
  }

  // Check for special math characters
  if (content.includes('×')) {
    const lineNum = content.substring(0, content.indexOf('×')).split('\n').length
    errors.push(
      `Line ${lineNum}: Found × character - use * instead for MDX compatibility`
    )
  }
  if (content.includes('÷')) {
    const lineNum = content.substring(0, content.indexOf('÷')).split('\n').length
    errors.push(
      `Line ${lineNum}: Found ÷ character - use / instead for MDX compatibility`
    )
  }

  // Check frontmatter exists (for MDX files)
  if (file.endsWith('.mdx')) {
    if (!content.startsWith('---\n')) {
      errors.push('Missing frontmatter (should start with ---)')
    } else {
      const frontmatterEnd = content.indexOf('\n---\n', 4)
      if (frontmatterEnd === -1) {
        errors.push('Frontmatter not properly closed (missing closing ---)')
      } else {
        const frontmatter = content.substring(4, frontmatterEnd)

        // Check for required fields
        if (!frontmatter.includes('title:')) {
          errors.push('Frontmatter missing required field: title')
        }
        if (!frontmatter.includes('description:')) {
          errors.push('Frontmatter missing required field: description')
        }

        // Check for nested seo: block (Mintlify doesn't support this)
        if (/\nseo:\n  /.test(frontmatter)) {
          const lineNum = content.substring(0, content.indexOf('seo:')).split('\n').length
          errors.push(
            `Line ${lineNum}: Found nested 'seo:' block - Mintlify requires flat frontmatter. Use "og:title" instead of seo:\\n  title:`
          )
        }
      }
    }
  }

  if (errors.length > 0) {
    hasErrors = true
    console.error(`\n❌ ${file}:`)
    errors.forEach((error) => console.error(`   ${error}`))
  }
})

if (hasErrors) {
  console.error('\n❌ MDX validation failed. Please fix the errors above.\n')
  process.exit(1)
} else {
  console.log('✅ MDX validation passed')
  process.exit(0)
}
