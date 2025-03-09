import { baseUrl } from "./Constant";

export const Endpoint = {
    Register: { url: `${baseUrl}/api/auth/register` },
    Login: { url: `${baseUrl}/api/auth/login` },
    Dashboard: {url: `${baseUrl}/api/member/dashboard` },
    create: {url: `${baseUrl}/api/member/create` },
    get: {url: `${baseUrl}/api/member/getdata` }
};
