interface SEOConfig {
    title?: string;
    description?: string;
    favicon?: string;
  }
  
  const defaultSEO: SEOConfig = {
    title: 'The Golden Crown Malta | Best Barbers in Fgura',
    description: 'Located in Fgura, Malta - Best barber shop available, Exceptional & Fast Service, low cost, Indian Barbers available as well',
    favicon: '/logo.png'
  };
  
  export const updateSEO = (config: Partial<SEOConfig> = {}) => {
    const seoConfig = { ...defaultSEO, ...config };
  
    // Update title
    document.title = seoConfig.title || defaultSEO.title!;
  
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seoConfig.description || defaultSEO.description!);
  
    // Update favicon
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.setAttribute('rel', 'icon');
      favicon.setAttribute('type', 'image/png');
      document.head.appendChild(favicon);
    }
    favicon.setAttribute('href', seoConfig.favicon || defaultSEO.favicon!);
  };