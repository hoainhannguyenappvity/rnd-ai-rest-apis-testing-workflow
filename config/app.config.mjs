/**
 * Configuration note:
 * Only `base_url`, `env` and `apiSpecPathTask` are intended to be edited.
 * All other fields are fixed paths/outputs and should NOT be modified
 * unless there is a specific change in project structure or requirements.
*/
export default {
    base_url: 'https://selidasitetestapi.360awareqa.com',
    env: {
        apiUrl: 'https://selidasitetestapi.360awareqa.com/idsrv/connect/token',
        username: 'thuytrangle2205@gmail.com',
        password: 'P@ssword220595'
    },
    apiSpecPathTask: './TASK156957.md', // path to api.md
    envMdPath: './env.md', // path to env.md
    authPath: './auth.mjs', // path to auth.mjs
    postmanCollectionOutput: 'postman/KMI.postman_collection.json', // path to postman_collection.json
    postmanEnvironmentOutput: 'postman/KMI.postman_environment.json', // path to postman_environment.json
};