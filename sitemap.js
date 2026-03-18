// // sitemap-generator.js
// require('dotenv').config();
// const Sitemap = require('react-router-sitemap').default;
// const router = require('./src/App.jsx').default; // aapka React Router import

// function generateSitemap() {
//     return (
//         new Sitemap(router)
//             .build('https://kesharwanimart.in') // aapki domain
//             .save('./public/sitemap.xml')       // ye public folder me save hoga
//     );
// }

// generateSitemap();