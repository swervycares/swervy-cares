#!/usr/bin/env node

/**
 * Build script for static deployment
 * This script moves files from dist/public to dist for static deployment compatibility
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPublicDir = path.join(__dirname, 'dist', 'public');
const distDir = path.join(__dirname, 'dist');

console.log('🚀 Preparing build for static deployment...');

// Check if dist/public exists
if (!fs.existsSync(distPublicDir)) {
  console.error('❌ dist/public directory not found. Please run `npm run build` first.');
  process.exit(1);
}

// Function to copy files recursively
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  
  if (stat.isDirectory()) {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    // Copy all files and subdirectories
    const files = fs.readdirSync(src);
    files.forEach(file => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      copyRecursive(srcPath, destPath);
    });
  } else {
    // Copy file
    fs.copyFileSync(src, dest);
  }
}

try {
  // Get list of files in dist/public
  const files = fs.readdirSync(distPublicDir);
  
  console.log(`📁 Found ${files.length} items in dist/public`);
  
  // Copy each file/directory from dist/public to dist
  files.forEach(file => {
    const srcPath = path.join(distPublicDir, file);
    const destPath = path.join(distDir, file);
    
    // Remove destination if it exists
    if (fs.existsSync(destPath)) {
      fs.rmSync(destPath, { recursive: true, force: true });
    }
    
    copyRecursive(srcPath, destPath);
    console.log(`✅ Copied ${file}`);
  });
  
  // Remove the dist/public directory since files are now in dist
  fs.rmSync(distPublicDir, { recursive: true, force: true });
  console.log('🗑️  Removed dist/public directory');
  
  console.log('✨ Static deployment build complete!');
  console.log('📋 Files are now ready in the dist directory for static deployment.');
  
} catch (error) {
  console.error('❌ Error during static deployment preparation:', error.message);
  process.exit(1);
}