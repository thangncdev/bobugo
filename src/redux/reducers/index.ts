import markets from 'modules/markets/src/reducer';
import masterdata from 'modules/masterdata/src/reducer';
import user from 'modules/user/src/reducer';

const GLOBAL_STATE = {
    markets,
    masterdata,
    user,
};

export default GLOBAL_STATE;
