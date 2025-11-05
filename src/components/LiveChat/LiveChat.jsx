import { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './LiveChat.css';

const LiveChat = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Check if Tawk.to script is already loaded
    if (window.Tawk_API) {
      // Update language when it changes
      try {
        window.Tawk_API.setAttributes({
          language: language === 'ru' ? 'ru' : 'ro'
        });
      } catch (error) {
        console.log('Tawk.to language update:', error);
      }
      return;
    }

    // Load Tawk.to script
    const Tawk_LoadStart = new Date();

    (function() {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/690b41fce10d0719502ae14e/1j99vjh9l';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();

    // Configure Tawk.to when loaded
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = Tawk_LoadStart;

    // Set initial language and customize widget
    window.Tawk_API.onLoad = function() {
      try {
        window.Tawk_API.setAttributes({
          language: language === 'ru' ? 'ru' : 'ro',
          name: 'Посетитель сайта',
          source: 'Rose Creative Website'
        });

        // Customize widget appearance
        window.Tawk_API.customize({
          // Button color - pink like your site
          'backgroundColor': '#ff1493',
          'buttonColor': '#ff1493',

          // Chat window colors
          'headerBackgroundColor': '#ff1493',
          'headerColor': '#ffffff',

          // Bubble colors
          'bubbleBackgroundColor': '#ff69b4',
          'bubbleTextColor': '#ffffff',

          // Agent bubble
          'agentBubbleBackgroundColor': '#ffffff',
          'agentBubbleTextColor': '#1a1a1a',

          // Visitor bubble
          'visitorBubbleBackgroundColor': '#ff1493',
          'visitorBubbleTextColor': '#ffffff',

          // Button text
          'buttonText': language === 'ru' ? 'Написать нам' : 'Scrie-ne',

          // Position
          'position': 'bottom-right',
          'offset': {
            'x': 20,
            'y': 20
          }
        });
      } catch (error) {
        console.log('Tawk.to setup:', error);
      }
    };

    // Track chat events for analytics
    window.Tawk_API.onChatStarted = function() {
      console.log('Chat started');
      try {
        if (window.gtag) {
          window.gtag('event', 'chat_started', {
            event_category: 'engagement',
            event_label: 'Live Chat'
          });
        }
      } catch (error) {
        console.log('Analytics tracking:', error);
      }
    };

    window.Tawk_API.onChatMessageVisitor = function(message) {
      console.log('Visitor sent message:', message);
      try {
        if (window.gtag) {
          window.gtag('event', 'chat_message_sent', {
            event_category: 'engagement',
            event_label: 'Live Chat'
          });
        }
      } catch (error) {
        console.log('Analytics tracking:', error);
      }
    };

    // Cleanup function
    return () => {
      // Note: Tawk.to script persists across page reloads, which is good for UX
      // We don't remove it to maintain chat state
    };
  }, [language]);

  // This component doesn't render anything visible
  // The chat widget is injected by Tawk.to script
  return null;
};

export default LiveChat;
