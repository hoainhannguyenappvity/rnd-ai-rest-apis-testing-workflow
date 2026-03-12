
/**
 * Configuration note:
 * Only `base_url`, `env` and `apiSpecPathTask` are intended to be edited.
 * All other fields are fixed paths/outputs and should NOT be modified
 * unless there is a specific change in project structure or requirements.
*/
export default {
    // base_url: 'https://selidasitetestapi.360awareqa.com',
    // env: {
    //     apiUrl: 'https://selidasitetestapi.360awareqa.com/idsrv/connect/token',
    //     username: 'thuytrangle2205@gmail.com',
    //     password: 'P@ssword220595'
    // },
    // apiSpecPathTask: './TASK156957.md', // path to api.md
    // envMdPath: './env.md', // path to env.md
    // authPath: './auth.mjs', // path to auth.mjs
    // postmanCollectionOutput: 'postman/KMI.postman_collection.json', // path to postman_collection.json
    // postmanEnvironmentOutput: 'postman/KMI.postman_environment.json', // path to postman_environment.json

    kmi_product: {
        '360aware': {
            base_url: 'https://360aware.360awareqa.com',
            access_token_api: 'https://360aware.360awareqa.com/idsrv/connect/token',
            roles: {
                workspace_admin: {
                    username: 'workspaceadmin@gmail.com',
                    password: 'P@ssword220595'
                },
                site_admin: {
                    username: 'siteadmin@gmail.com',
                    password: 'P@ssword2205'
                },
                site_viewer: {
                    username: 'siteviewer@gmail.com',
                    password: 'P@ssword2205'
                },
                site_custom_role: {
                    username: 'subsitecustomrole@gmail.com',
                    password: 'P@ssword2205'
                },
                team_admin: {
                    username: 'teamadmin@gmail.com',
                    password: 'P@ssword2205'
                },
                team_viewer: {
                    username: 'teamviewer@gmail.com',
                    password: 'P@ssword2205'
                },
                team_custom_role: {
                    username: 'teamcustomrole@gmail.com',
                    password: 'P@ssword2205'
                },
                project_owner: {
                    username: 'projectowner@gmail.com',
                    password: 'P@ssword2205'
                },
                project_editor: {
                    username: 'projecteditor@gmail.com',
                    password: 'P@ssword2205'
                },
                project_viewer: {
                    username: 'projectviewer@gmail.com',
                    password: 'P@ssword2205'
                },
                project_custom_role: {
                    username: 'projectcustomrole@gmail.com',
                    password: 'P@ssword2205'
                }
            }
        },
        '360portal': {
            base_url: 'https://portal.360awareqa.com',
            access_token_api: 'https://portal.360awareqa.com/idsrv/connect/token',
            roles: {
                system_admin: {
                    username: 'systemadmin@gmail.com',
                    password: 'P@ssword2205'
                },
                system_viewer: {
                    username: 'systemviewer@gmail.com',
                    password: 'P@ssword2205'
                }
            }
        },
        '360logistics': {
            base_url: 'https://onelogistics.360awareqa.com',
            access_token_api: 'https://onelogistics.360awareqa.com/idsrv/connect/token',
            roles: {
                workspace_admin: {
                    username: 'workspaceadmin@gmail.com',
                    password: 'P@ssword2205'
                },
                logistics: {
                    username: 'logistics@gmail.com',
                    password: 'P@ssword2205'
                },
                security: {
                    username: 'security@gmail.com',
                    password: 'P@ssword2205'
                },
                approver: {
                    username: 'approver@gmail.com',
                    password: 'P@ssword2205'
                },
                travel_coordinator: {
                    username: 'travel_coordinator@gmail.com',
                    password: 'P@ssword2205'
                },
                dispatcher: {
                    username: 'dispatcher@gmail.com',
                    password: 'P@ssword2205'
                },
                traveler: {
                    username: 'traveler@gmail.com',
                    password: 'P@ssword2205'
                },
                check_in_agent: {
                    username: 'check_in_agent@gmail.com',
                    password: 'P@ssword2205'
                },
                aviation_coordinator: {
                    username: 'aviation_coordinator@gmail.com',
                    password: 'P@ssword2205'
                },
                freight_coordinator: {
                    username: 'freight_coordinator@gmail.com',
                    password: 'P@ssword2205'
                },
                camp_reception: {
                    username: 'camp_reception@gmail.com',
                    password: 'P@ssword2205'
                },
                meet_and_greet: {
                    username: 'meet_greet@gmail.com',
                    password: 'P@ssword2205'
                }
            }
        }
    },
    selectedProductKey: '360aware',
    selectedRoleKey: 'workspace_admin',
    base_url: 'https://360aware.360awareqa.com',
    env: {
        apiUrl: 'https://360aware.360awareqa.com/idsrv/connect/token',
        username: 'workspaceadmin@gmail.com',
        password: 'P@ssword220595'
    },
    apiSpecPathTask: './TASK156957.md', // path to api.md
    envMdPath: './env.md', // path to env.md
    authPath: './auth.mjs', // path to auth.mjs
    postmanCollectionOutput: 'postman/KMI.postman_collection.json', // path to postman_collection.json
    postmanEnvironmentOutput: 'postman/KMI.postman_environment.json', // path to postman_environment.json
};
