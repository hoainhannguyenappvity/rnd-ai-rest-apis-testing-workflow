// "npx openapi2postmanv2 -s swagger/numbering/num-service.swagger.json -o ./postman/eProduct.postman_collection.json"
import config from "./app.config.mjs";

export default {
    command: "openapi2postmanv2",
    args: [
        '-s',
        `${config.swaggerOpenApi}`,
        '-o',
        `${config.postmanCollectionOutput}`,
    ],
};