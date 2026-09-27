<div align="center">

  <!-- Main Header with Project Logo -->

# <img src="/frontend/public/webLogo.png" width="36" height="36" style="vertical-align: middle; margin-right: 8px;" /> Cookly — Recipe Sharing & Culinary Platform

  <p style="font-size: 1.15rem; color: #9ca3af; margin-top: 8px;">
    A modern full-stack culinary community platform to discover, compose, and share recipes built with the <b>MERN Stack</b>, <b>Quill.js</b>, <b>Zustand</b>, and <b>ImageKit</b>.
  </p>

  <br />

  <!-- Tech Stack Badge Row -->
  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/REACT_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" /></a>
    &nbsp;
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/NODE.JS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" /></a>
    &nbsp;
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/EXPRESS_5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express 5" /></a>
    &nbsp;
    <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MONGODB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
    &nbsp;
    <a href="https://zustand.docs.pmnd.rs/"><img src="https://img.shields.io/badge/ZUSTAND-443E38?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" /></a>
    &nbsp;
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TAILWIND_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" /></a>
    &nbsp;
    <a href="https://daisyui.com/"><img src="https://img.shields.io/badge/DAISYUI_v5-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white" alt="DaisyUI v5" /></a>
    &nbsp;
    <a href="https://imagekit.io/"><img src="https://img.shields.io/badge/IMAGEKIT-0055FF?style=for-the-badge&logo=imagekit&logoColor=white" alt="ImageKit" /></a>
  </p>

  <br />

  <!-- Dual-Tone CTA Buttons -->
  <p>
    <a href="https://cookly-sahi.onrender.com" target="_blank">
      <img src="https://img.shields.io/badge/🌐_LIVE_DEMO-VISIT_COOKLY-0284c7?style=for-the-badge&logoColor=white" alt="Live Demo" />
    </a>
    &nbsp;&nbsp;
    <a href="https://github.com/ranajitbera2006/Cookly-RecipeShare.git" target="_blank">
      <img src="https://img.shields.io/badge/📂_GITHUB-SOURCE_CODE-1f2937?style=for-the-badge&logo=github&logoColor=white" alt="Source Code" />
    </a>
  </p>

  <br />

  <!-- Two-Photo Side-by-Side Preview Showcase -->
  <table width="100%">
    <tr>
      <td width="50%" align="center">
        <b>Recipe Discovery / Feed View</b>
        <br /><br />
        <img src="/frontend/public/recipeHomeImg.png" alt="Cookly Recipe Feed Preview" width="100%" style="border-radius: 10px; border: 1px solid #1f2937;" />
      </td>
      <td width="50%" align="center">
        <b>My Recipes & Dashboard View</b>
        <br /><br />
        <img src="/frontend/public/recipeList.png" alt="Cookly Recipe Management Preview" width="100%" style="border-radius: 10px; border: 1px solid #1f2937;" />
      </td>
    </tr>
  </table>

</div>

<br />

---

## ✨ Key Features

- **🔐 Culinary Community Auth:** Secure authentication via HTTP-only cookies and JSON Web Tokens (JWT), with protected author-only edit/delete rights.
- **👨‍🍳 Rich Recipe Composer:** Interactive Quill.js editor styled with `@tailwindcss/typography` to format ingredients, step-by-step cooking instructions, and chef notes.
- **⚡ Zustand State Management:** Client-side store powered by Zustand for reactive recipe feed caching, search, and user state handling.
- **📸 High-Res Dish Media Uploads:** Streaming image uploads via Multer directly to ImageKit with automated optimization, WebP compression, and fast CDN delivery.
- **🥘 Recipe Lifecycle & Categorization:** Organize dishes by cuisine and diet, save drafts, publish live recipes, and participate in community discussions with nested comments.
- **📱 Responsive Kitchen UI:** Fully responsive interface built with Tailwind CSS v4 and DaisyUI v5 to keep cooking instructions clear across mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack Breakdown

| Layer | Tools & Libraries |
| :--- | :--- |
| **Frontend Framework** | React 19, React Router DOM v7, Vite v8 |
| **State Management** | Zustand v5 |
| **Rich Text & Content** | Quill.js v2, `@tailwindcss/typography`, Truncate-HTML, React Type Animation |
| **Styling & Components** | Tailwind CSS v4 (`@tailwindcss/vite`), DaisyUI v5, React Icons, React Hot Toast |
| **Backend & Server** | Node.js, Express 5, Multer (Memory Storage) |
| **Database & Media** | MongoDB, Mongoose v9, ImageKit Node SDK v6 |
| **Security & Utilities** | JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cookie-parser`, `cors`, `dotenv` |

---

## 📂 Project Structure

```text
Cookly/
├── backend/
│   ├── config/                      # ImageKit SDK & storage configurations
│   ├── controller/                  # Auth, Recipe CRUD, and Comment route logic
│   ├── db/                          # MongoDB connection setup
│   ├── middleware/                  # Multer memory upload & JWT protectAuth guards
│   ├── model/                       # User, Recipe, and Comment Mongoose schemas
│   ├── routes/                      # Express endpoint definitions
│   ├── index.js                     # Server entry point & Express middleware setup
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── webLogo.png              # Cookly brand logo
│   │   ├── recipeHomeImg.png        # Recipe feed preview screenshot
│   │   └── recipeList.png           # Recipe management preview screenshot
│   ├── src/
│   │   ├── components/              # Layouts, Navbar, Modals, Recipe Cards
│   │   ├── hooks/                   # Custom UI hooks (useAddRecipe, useUpdateRecipe, etc.)
│   │   ├── pages/                   # Feed, Recipe Details, Recipe Editor, User Dashboard
│   │   ├── store/                   # Zustand stores (useAuthStore, useRecipeStore)
│   │   ├── App.jsx                  # Main application routing
│   │   ├── main.jsx                 # Client entry point
│   │   └── index.css                # Tailwind CSS v4 theme directives
│   ├── package.json
│   └── vite.config.js               # Proxy & Vite build configuration
│
└── README.md