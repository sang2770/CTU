import { ChipProps } from "@mui/material";

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type NavItemTypeObject = { children?: NavItemType[]; items?: NavItemType[]; type?: string };

export type NavItemType = {
    id?: string;
    icon?: React.ReactNode
    target?: boolean;
    external?: string;
    url?: string | undefined;
    type?: string;
    title?: string;
    color?: 'primary' | 'secondary' | 'default' | undefined;
    caption?: React.ReactNode | string;
    breadcrumbs?: boolean;
    disabled?: boolean;
    chip?: ChipProps;
    children?:NavItemType[],
    code?:string,
    requiredPermission?:boolean
};
export interface NavItemProps {
    item: NavItemType;
    level: number;
}
