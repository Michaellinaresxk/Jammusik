import { computed } from 'vue';
import { useRoute } from 'vue-router';

export function useLoginLink() {
  const route = useRoute();

  const routeMappings: any = {
    '/login': { text: 'Register', path: '/register' },
    '/register': { text: 'Login', path: '/login' },
    '/': { text: 'Login', path: '/login' },
  };

  const linkText = computed(() => {
    return routeMappings[route.path]?.text || 'Login';
  });

  const linkPath = computed(() => {
    return routeMappings[route.path]?.path || '/register';
  });

  return {
    linkText,
    linkPath
  };
}
