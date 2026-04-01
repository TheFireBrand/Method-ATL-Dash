"use client"

import { TradeInputPanel } from "./components/trade-input-panel"

export default function TradeDashboard() {
  const handleTradeSubmit = (tradeData: any) => {
    console.log("Submitting trade to API:", tradeData)
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#cccccc] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 border-b border-[#3c3c3c] pb-4">
          <h1 className="text-2xl font-semibold text-[#cccccc]"></h1>
          <p className="text-[#858585] text-sm"></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Trade Input Panel */}
          <div className="lg:col-span-1">
            <TradeInputPanel onSubmitTrade={handleTradeSubmit} />
          </div>

          {/* Placeholder for other dashboard components */}
          <div className="lg:col-span-3 space-y-4">
            <div className="h-96 bg-[#252526] border border-[#3c3c3c] flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium text-[#cccccc]">Chart Area</h3>
                <p className="text-sm text-[#858585]">Price charts and technical analysis</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-64 bg-[#252526] border border-[#3c3c3c] flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-[#cccccc]">Order Book</h3>
                  <p className="text-sm text-[#858585]">Live buy/sell orders</p>
                </div>
              </div>

              <div className="h-64 bg-[#252526] border border-[#3c3c3c] flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-[#cccccc]">Recent Trades</h3>
                  <p className="text-sm text-[#858585]">Trade history and activity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
