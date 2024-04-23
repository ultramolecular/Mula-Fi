export const apiURl = "https://mulafi-api-2eeed5637396.herokuapp.com/"
export interface InvestmentScreenParams {
    level: string;
    goals: string;
    portfolioSize: string;
    monthlyContribution: string;
    advice: string | undefined;
    mutualFunds: number | undefined;
    individualStocks: number | undefined;
    interestRate: number | undefined;
    shortTermCD: number | undefined;
    longTermCD: number | undefined;
    shortTermBonds: number | undefined;
    longTermBonds: number | undefined;
  }