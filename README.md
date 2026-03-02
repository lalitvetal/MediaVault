# 🚀 MediaVault — Professional Media Discovery Engine

MediaVault is a high-performance, premium media discovery application built with **React 19**, **Redux Toolkit**, and **Tailwind CSS**. It allows users to search, preview, and download high-quality photos, videos, and GIFs from world-class platforms like Unsplash, Pexels, and GIPHY — all within a unified, stunning interface.

![MediaVault Preview](https://via.placeholder.com/1200x600/080812/FFFFFF?text=MediaVault+Discovery+Engine)

## ✨ Features

-   🔍 **Unified Search**: Search across multiple media providers (Unsplash, Pexels, GIPHY) simultaneously.
-   ⚡ **Performance Optimized**: Uses thumbnail optimization and lazy loading to handle thousands of assets with zero lag.
-   ♾️ **Infinite Scrolling**: Seamless content discovery powered by the **Intersection Observer API**.
-   💾 **Media Collections**: Save your favorite assets to a personal collection with persistence via **localStorage**.
-   📥 **Smart Downloads**: Cross-origin safe, blob-based download system that auto-detects correct file extensions (WebP, JPG, MP4, GIF).
-   🎨 **Premium UI/UX**: Glassmorphic design, smooth animations, skeleton loaders, and interactive hover states.
-   🌓 **Dark/Light Mode**: Full theme support with automatic system preference detection.
-   📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile viewing.

## 🛠️ Tech Stack

-   **Frontend**: React 19, React Router v7
-   **State Management**: Redux Toolkit (AsyncThunks, Slices)
-   **Styling**: Tailwind CSS v4, Modern CSS Variables
-   **API Handling**: Axios (RESTful integration)
-   **Performance**: Intersection Observer API, Web Worker style Blob handling

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18+)
-   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/mediavault.git
    cd mediavault
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and add your API keys:
    ```env
    VITE_UNSPLASH_KEY=your_unsplash_access_key
    VITE_PEXELS_KEY=your_pexels_api_key
    VITE_GIPHY_KEY=your_giphy_api_key
    ```

4.  **Run Dev Server**:
    ```bash
    npm run dev
    ```

## 🏗️ Project Structure

```text
src/
├── api/                # API integration logic
├── components/         # Reusable UI components (ResultCard, SearchBar, etc.)
├── hooks/              # Custom React hooks (useInfiniteScroll, useMediaSearch)
├── pages/              # Main page views (HomePage, CollectionPage)
├── REDUX/              # Global state management
│   ├── features/       # Redux Slices (search, collection, theme)
│   └── store.js        # Centralized Redux store
└── index.css           # Global styles and design tokens
```

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ by [Your Name]
