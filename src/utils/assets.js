/**
 * Helper to get the correct path for assets based on the environment base URL.
 * Handles GitHub Pages subdirectory deployment.
 * 
 * @param {string} path - The absolute path of the asset (e.g., "/assets/image.png")
 * @returns {string} - The resolved path with base URL (e.g., "/rose_site_multi/assets/image.png")
 */
export const getAssetPath = (path) => {
    if (!path) return path;

    // If path is external (http/https), return as is
    if (path.startsWith('http')) return path;

    // Get base URL from Vite environment
    const baseUrl = import.meta.env.BASE_URL;

    // If base URL is just '/', return path as is (development or root deployment)
    if (baseUrl === '/') return path;

    // Remove leading slash from path if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Combine base URL and path
    // baseUrl already includes trailing slash (e.g., "/rose_site_multi/")
    return `${baseUrl}${cleanPath}`;
};
