export default async function (_, context) {
    const response = await context.next();
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    return response;
}
// applies to any request path
export const config = {
    path: '/*'
};