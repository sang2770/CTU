export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Sensor) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Sensor;
    label: string;
    numeric: boolean;
}

export interface Sensor {
    sensorDescription: string,
    sensorId: number,
    sensorName: string
    action?: string;
}