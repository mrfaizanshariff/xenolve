// type EventName =
//     | 'ai_demo_start'
//     | 'ai_message_sent'
//     | 'ai_message_received'
//     | 'ai_error';

// type EventParams = Record<string, string | number | boolean>;

// declare global {
//     interface Window {
//         dataLayer: any[];
//     }
// }

// export const trackEvent = (eventName: EventName, params?: EventParams) => {
//     if (typeof window !== 'undefined' && window.dataLayer) {
//         window.dataLayer.push({
//             event: eventName,
//             ...params,
//         });
//     } else {
//         // Log to console in development
//         if (process.env.NODE_ENV !== 'production') {
//             console.log(`[Analytics] ${eventName}`, params);
//         }
//     }
// };
