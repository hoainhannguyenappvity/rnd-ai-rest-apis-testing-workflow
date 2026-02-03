// "npx openapi2postmanv2 -s swagger/numbering/num-service.swagger.json -o ./postman/eProduct.postman_collection.json"
import config from "./app.config.mjs";

export const openapi2ups = {
    command: "openapi2postmanv2",
    args: [
        '-s',
        `${config.swaggerOpenApi.ups}`,
        '-o',
        `${config.postmanCollectionOutput}`,
    ],
};

export const openapi2numbering = {
    command: "openapi2postmanv2",
    args: [
        '-s',
        `${config.swaggerOpenApi.numbering}`,
        '-o',
        `${config.postmanCollectionOutput}`,
    ],
};