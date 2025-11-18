// Service Worker for back/forward cache support
// This minimal service worker helps with bfcache compatibility

const CACHE_NAME = 'e-commerce-v1';
const urlsToCache = [];

// Install event - minimal caching
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  // Claim clients immediately
  event.waitUntil(self.clients.claim());
});

// Fetch event - pass through strategy for bfcache compatibility
self.addEventListener('fetch', (event) => {
  // Just pass through all requests - don't intercept for bfcache
  // This allows the browser to handle caching naturally
  return;
});
