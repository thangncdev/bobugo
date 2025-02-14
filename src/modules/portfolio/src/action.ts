class PortfolioActions {
    public readonly GET_PORTFOLIOS = 'GET_PORTFOLIOS';
    public readonly ADD_PORTFOLIO = 'ADD_PORTFOLIO';
    public readonly EDIT_PORTFOLIO = 'EDIT_PORTFOLIO';
    public readonly DELETE_PORTFOLIO = 'DELETE_PORTFOLIO';
    public readonly SEND_MAIL_SUPPORT_PORTFOLIO = 'SEND_MAIL_SUPPORT_PORTFOLIO';
}

export declare namespace portfolioActionTypes {
    type getPortfoliosActionType = TypedAction<typeof portfolioActions.GET_PORTFOLIOS, portfolio.GetPortfoliosActionPayload>;
    type addPortfolioActionType = TypedAction<typeof portfolioActions.ADD_PORTFOLIO, portfolio.AddPortfolioRequest>;
    type editPortfolioActionType = TypedAction<typeof portfolioActions.EDIT_PORTFOLIO, portfolio.EditPortfolioRequest>;
    type deletePortfolioActionType = TypedAction<typeof portfolioActions.DELETE_PORTFOLIO, number[]>;
    type sendMailSupportPortfolioActionType = TypedActionEmpty<typeof portfolioActions.SEND_MAIL_SUPPORT_PORTFOLIO>;
}

class PortfolioActionCreators {
    public getPortfolios = (payload: portfolio.GetPortfoliosActionPayload): portfolioActionTypes.getPortfoliosActionType => ({ type: portfolioActions.GET_PORTFOLIOS, payload });
    public addPortfolio = (payload: portfolio.AddPortfolioRequest): portfolioActionTypes.addPortfolioActionType => ({ type: portfolioActions.ADD_PORTFOLIO, payload });
    public editPortfolio = (payload: portfolio.EditPortfolioRequest): portfolioActionTypes.editPortfolioActionType => ({ type: portfolioActions.EDIT_PORTFOLIO, payload });
    public deletePortfolio = (payload: number[]): portfolioActionTypes.deletePortfolioActionType => ({ type: portfolioActions.DELETE_PORTFOLIO, payload });
    public sendMailSupportPortfolio = (): portfolioActionTypes.sendMailSupportPortfolioActionType => ({ type: portfolioActions.SEND_MAIL_SUPPORT_PORTFOLIO });
}

export const portfolioActions = new PortfolioActions();
export const portfolioActionCreators = new PortfolioActionCreators();
