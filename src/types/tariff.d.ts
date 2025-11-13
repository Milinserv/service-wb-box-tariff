export type WBBoxTariff = {
    boxSize?: string;
    coefficient?: number;
    price?: number;
    [key: string]: any;
};

export type WBTariffsResponse = {
    tariffs: WBBoxTariff[];
    [key: string]: any;
};
