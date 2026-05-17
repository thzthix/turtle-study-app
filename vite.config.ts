import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function resolveBasePath() {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];

  if (process.env.GITHUB_ACTIONS === 'true' && repositoryName) {
    return `/${repositoryName}/`;
  }

  return '/';
}

export default defineConfig({
  base: resolveBasePath(),
  plugins: [react()],
});
