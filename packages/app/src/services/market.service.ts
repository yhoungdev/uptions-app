import { uptionsRequest } from "./api.service"

export class MarketService {

   async fetchMarketData() {
        const response = uptionsRequest.GET("")
        return response
    } 



}