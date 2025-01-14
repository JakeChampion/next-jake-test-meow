/* eslint-disable import/no-anonymous-default-export */ /**
 * Adds the x-robots-tag: noindex http header
 * The header is added only for non-production environments to prevent crawlers from scanning test/dev environments.
 */
export default async function(_request, context) {
    const netlifyEnv = Netlify.env.get('NETLIFY_ENVIRONMENT');
    if (netlifyEnv !== 'prod') {
      const response = await context.next();
      response.headers.set('x-robots-tag', 'noindex nofollow noimageindex');
      return response;
    }
    return;
  }
  // runs on every path
  export const config = {
    path: '/*'
  };