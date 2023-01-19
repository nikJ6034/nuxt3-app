import { Menu } from "~~/types/menu";

export const useCurrentMenu = ()=> useState<Menu>('currentMenu', ()=> ({} as Menu));

export const useAdminMenu = ()=> useState<Menu[]>('adminMenu', ()=> [] as Menu[]);

export const useAccessToken = ()=> useState<string>('accessToken', ()=> '');