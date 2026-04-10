export interface AssetCategory {
    id: string,
    attributes: {
        name: string,
        asset_types: {
            data: AssetType[]
        },
        store_budgets: {
            data: any[]
        }
    }
}

export interface AssetType {
    id: string,
    attributes: {
        name: string,
        asset_type_code: string,
        asset_sizes: {
            data: any[],
        }
    }
}
