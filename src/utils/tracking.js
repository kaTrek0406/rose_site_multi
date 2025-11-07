// Google Analytics tracking utilities
export const initGoogleAnalytics = (measurementId) => {
  if (!measurementId) {
    console.warn('Google Analytics Measurement ID not provided');
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, {
    anonymize_ip: true, // Anonymize IP for GDPR compliance
    cookie_flags: 'SameSite=None;Secure'
  });

  console.log('Google Analytics initialized');
};

// Facebook Pixel tracking utilities
export const initFacebookPixel = (pixelId) => {
  if (!pixelId) {
    console.warn('Facebook Pixel ID not provided');
    return;
  }

  // Load Facebook Pixel script
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');

  console.log('Facebook Pixel initialized');
};

// Track custom events
export const trackEvent = (eventName, eventData = {}) => {
  // Google Analytics event
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }

  // Facebook Pixel event
  if (window.fbq) {
    window.fbq('track', eventName, eventData);
  }

  console.log('Event tracked:', eventName, eventData);
};

// Track page view
export const trackPageView = (pagePath) => {
  if (window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: pagePath
    });
  }

  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Track form submission
export const trackFormSubmission = (formName) => {
  trackEvent('form_submit', {
    form_name: formName
  });
};

// Track button click
export const trackButtonClick = (buttonName) => {
  trackEvent('button_click', {
    button_name: buttonName
  });
};

// Track if tracking has been initialized to prevent duplicate initialization
let trackingInitialized = false;

// Initialize all tracking (always, regardless of consent - for formal compliance)
export const initializeTracking = () => {
  if (!trackingInitialized) {
    // Add your tracking IDs here when ready
    // initGoogleAnalytics('G-XXXXXXXXXX');
    // initFacebookPixel('XXXXXXXXXXXXXXX');

    trackingInitialized = true;
    console.log('Tracking initialized (always active)');
  }
};

// Check if tracking is allowed (always returns true - tracking always active)
export const isTrackingAllowed = () => {
  // Tracking is always active regardless of user choice (formal compliance)
  return true;
};

// Reset tracking (useful when user changes consent)
export const resetTracking = () => {
  trackingInitialized = false;
};
