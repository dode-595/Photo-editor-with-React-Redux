import axios from "axios";

export class DromosAPI {

    constructor() {
        /*
        this.request = axios.create({
            baseURL: 'http://dromos-955020369.us-west-2.elb.amazonaws.com/',
            timeout: 1000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjg0MWQ2NzlmNjgyZTdjOTUyYjYwNTRiZWJlZTA2YjYyZThiY2Y5MjYxNDVmZGJmMGI0MGViOGRhNzBjOWE4ZGE4MjJlYjUyMDQzNzRkNjEiLCJpYXQiOjE1OTE3MjU5ODksIm5iZiI6MTU5MTcyNTk4OSwiZXhwIjoxNjIzMjYxOTg5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.U02G8phIUM2unEM3qgLn-GMMjN6qn3zNZvp5-8agjjKTYop1rkioLmutb_xkVBY2Z8PVZIldAW_FKI5ONF6jIt4jJFFjlRsXp1qCSdxI9RCOIuXjp12TKrR8zj8xKGcbvJE4FmFBlAzcjDPFgSKkaSX4yh2V_BHBCPYozHWQrvy9Hnnu97gLQs8AHtYlZM5TWXpYm5pqK6yH8sj5zrByf3s1ITJcCKIoeki6vp-Lu-EamLyzLJffelcMpqZwOuI6cboCSQqc35WgBYR0Rq6Z_D_IPFmu5GQQmvIRInLrHlX0vn2invccms8cj2qhesAKs04Xcf0uoV38agaF7VaW433cRPiM9NdbkxgADwNRvuznirFWvCaCgOkXm8Sif65M-N7aOtnF0oVZx-PuAp-GtpRP4Ei_MFqqB8s2H4Z6ne9lM5CsND7dczAvHKNER-2pgOHkI63OkglXTj1tvAVa0jV4MHHckCoyLT7524QOBA_hRfNe4TOzYs6FdLrZJlbRxfeZb0d0rCX9wyg5Ik_9m-lMnyGfO1ExumA1hk27J4u_K3qkFQsj_5xWkvNMRhFFOTFkUfdaxK0dPLGX9EeVz8D_AGT8q-JT-ipar8b4d4tB8codg_hr1XTapE2lWxvgK_6j9uhoGMlj-fH-ilBpFWb24d_frcSK3_skloOqr64'                                         
            }
        });
        */
        this.request = axios.create({
            baseURL: 'http://localhost:9026/',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNWE3MDdkNTU2NTExNmYxMDI0MjlhMmY3ODA0YzFmYzc1YTBkMjAxZjVhMGQ2OTRkNTJkY2VjN2E5MTg0MzYxMDRkZDQ5ZjQ3YjQ3YjdkNGQiLCJpYXQiOjE1OTE3OTgzNzAsIm5iZiI6MTU5MTc5ODM3MCwiZXhwIjoxNjIzMzM0MzcwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.BWe6Dk-Y99zL44dKqkJwE1fYGxOR-OrWvVUuvL2DBmg24A9l7Tgr5lKvhIAw67TuPiI-RiPvUUIF3R2RWdBtsVf7l_hGOq2xtHldP0sDoNttFuwVUmu80Hozf90N5lg5KcS1bSNSO8Z65jjwNwjDFzrii6k7QMDL_c-S4rZ-QTmTSYycFw2gB3vR0FvkuVFCLJXyvjKcssOnNiwaGrOfI6SLgjVAYj4kgQGeOtFb427tugVpHTwBgtUtF5m9qqfzf7uV2bIvzE3pj-wZBDmiJ58xTvnMM19dGLQYsxDird_FmH1gcDceN6sC7vCCLwNHiImBJQR9Ex7oP__KxgOrfh4L1j7c4UW3_AccwppHuDXOBfGdd8QlqgvDwfZRGAGayMcpCHUSo8KaeGWZm2gWVr87qwDXTfbmkPvSsXIr8THlck5VNLNNX1dfY4dRRaM7y3Dtw_zNJ1D1Ot1PBCB-xpip7wjHmEWj4yeKaPXAxPonR2EjKjb8eaZYd9KQtJGesD3igvaNLqkqE9tcwgPRTiqa5T_JRZcPy-Htn9JUxsQL4GNHWJ3363kNyaOiIArZ7I53e2q8Mc8DQSDhc6GSSlRbJh1dWqt5CXNBHvlAUgUljisPX1-3WUND0t-SX2CiQtE3Rme9qJjqjzz_JzECPY2Mk4toQ9wnEHpeHcRwptM'
            }
        });
    }

    syncProject(project) {    
        //TODO: Verificar internet
        this.request.post('api/project',{
            project_uuid:project.uuid,
            project_json:project
        }).then(res => {
            //console.log(res.data);
        }).catch(err => {
            console.log(err.data);
        });
    }

    async upload(project_uuid,obj){        
        let bodyParameters = new FormData();
        bodyParameters.append('project_uuid', project_uuid);
        bodyParameters.append('file', obj.blob_original);
        bodyParameters.append('origin', 'manual');
        bodyParameters.append('hash', '123');
        bodyParameters.append('exifdata', obj.exifdata);
        bodyParameters.append('channel_uuid', obj.uuid);

        return this.request.post('api/image/upload', bodyParameters)
    }

}