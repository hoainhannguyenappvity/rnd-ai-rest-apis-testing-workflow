/**
 * Configuration note:
 * Only `base_url` and `swaggerOpenApi` are intended to be edited.
 * All other fields are fixed paths/outputs and should NOT be modified
 * unless there is a specific change in project structure or requirements.
*/
export default {
    base_url: {
        ups: 'https://appservices-debug.appvity.com',
        numbering: 'http://numservice-qa.appvity.com',
    },
    swaggerOpenApi: {
        ups: 'swagger/ups/swagger-output.json', // path swagger Open AI
        numbering: 'swagger/numbering/num-service.swagger.json', // path swagger Open AI
    },
    envMd: './env.md', // path to env.md
    swaggerOutput: './swagger', // folder output
    apiSpec: './swagger/api-test-specs.md', // path to api-test-specs.md
    apiSpecOutput: 'api-test-specs.md', // output file api-test-specs markdown
    postmanCollectionOutput: 'postman/eProduct.postman_collection.json', // path to postman_collection.json
    postmanEnvironmentOutput: 'postman/eProduct.postman_environment.json', // path to postman_environment.json
};