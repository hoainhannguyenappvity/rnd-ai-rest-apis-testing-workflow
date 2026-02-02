export default {
    command: "openapi2postmanv2",
    args: [
        "-s",
        "swagger/numbering/num-service.swagger.json",
        "-o",
        "eProduct.postman_collection.json",
    ],
};