import adapter from '@sveltejs/adapter-netlify';

export default {
  kit: {
    adapter: adapter(),
        csrf: {
      checkOrigin: false,
    }
  }
};
