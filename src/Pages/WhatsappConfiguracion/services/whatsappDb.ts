import { request } from "@/utils/AxiosUtils";
import { SessionRow, SendMessageBody } from "../models/types";

export const apiEnsure = (user: string) =>
    request<SessionRow>("post", "/whatsapp/sessions/ensure", { user }, null, null, false);

export const apiStatus = (user: string) =>
    request<SessionRow>("get", "/whatsapp/sessions/status", null, { user }, null, false);

export const apiLogout = (user: string) =>
    request<any>("post", "/whatsapp/sessions/logout", { user }, null, null, false);

export const apiList = (verify?: boolean, active?: boolean) =>
    request<SessionRow[]>("get", "/whatsapp/sessions", null, { verify, active }, null, false);

export const apiSend = (body: SendMessageBody) =>
    request<any>("post", "/whatsapp/send", body, null, null, false);