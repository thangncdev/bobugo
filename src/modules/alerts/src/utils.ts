import { navigate } from 'modules/navigation/src/utils';

export const goToAddPriceAlerts = (isTokenRoute: boolean) => navigate('AddPriceAlerts', { isTokenRoute });

export const goToAddTokenAlert = (
    unit: string,
    name: string,
    price_ada: string,
    price_usd: string,
) => navigate('AddTokenAlert', { unit, name, price_ada, price_usd });

export const goToAddNftAlert = (
    policy: string,
    name: string,
    logo: string,
    price_ada: string,
) => navigate('AddNftAlert', { policy, name, logo, price_ada });

export const goToEditTokenAlert = (item: alerts.Item) => navigate('EditTokenAlert', { item });

export const goToEditNftAlert = (item: alerts.Item) => navigate('EditNftAlert', { item });

