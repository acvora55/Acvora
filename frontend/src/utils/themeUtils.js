export const applyTheme = (darkMode) => {
  const root = document.documentElement;

  const vars = darkMode
    ? {
        '--background-color': '#121826',
        '--text-color': '#E0E6F1',
        '--border-color': '#2E3A59',
        '--divider-color': '#374563',
        '--navbar-bg': 'linear-gradient(to right, #141A2B, #273458)',
        '--button-primary': '#4F86F7',
        '--button-accent': '#F5A623',
        '--input-border': '#394B70',
        '--input-text': '#E0E6F1',
        '--dropdown-bg': '#1E2739',
        '--dropdown-text': '#E0E6F1',
      }
    : {
        '--background-color': '#F5F7FA',
        '--text-color': '#1F2937',
        '--border-color': '#CBD5E1',
        '--divider-color': '#E2E8F0',
        '--navbar-bg': 'linear-gradient(to right, #4F86F7, #1E40AF)',
        '--button-primary': '#2563EB',
        '--button-accent': '#F59E0B',
        '--input-border': '#94A3B8',
        '--input-text': '#1F2937',
        '--dropdown-bg': '#FFFFFF',
        '--dropdown-text': '#1F2937',
      };

  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
};
