export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataStation) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof DataStation;
    label: string;
    numeric: boolean;
}
type TransformedItem ={
    key: any;
    value: any;
    unit:any;
  }
export interface DataStation {
    id: number,
    code:any,
    name: any,
    address:any,
    camera?:string,
    sensors?: any,
    date: string,
    action?: string;
}
// export type ValueSensor={
//     nhiet_do: number,
//     do_man: number,
//     do_pH: number,
//     muc_nuoc: number,
//     DO: number
// }