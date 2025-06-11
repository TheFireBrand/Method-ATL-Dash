"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TradeInputPanelProps {
  onSubmitTrade?: (tradeData: any) => void
}

export function TradeInputPanel({ onSubmitTrade }: TradeInputPanelProps) {
  const [orderType, setOrderType] = useState("market")
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [symbol, setSymbol] = useState("BTC/USDT")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = () => {
    const tradeData = {
      symbol,
      side,
      orderType,
      amount: Number.parseFloat(amount),
      price: orderType === "limit" ? Number.parseFloat(price) : undefined,
      timestamp: new Date().toISOString(),
    }

    onSubmitTrade?.(tradeData)
    console.log("Trade submitted:", tradeData)
  }

  const marketPrice = 43250.5
  const change24h = 2.34

  return (
    <div className="bg-[#252526] border border-[#3c3c3c] text-[#cccccc]">
      {/* Header - VS Code tab style */}
      <div className="bg-[#2d2d30] border-b border-[#3c3c3c] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-[#007acc]" />
            <span className="font-medium text-sm">Trade Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-2 py-1 bg-[#1e1e1e] border border-[#3c3c3c] text-xs font-mono">{symbol}</div>
            <div className="text-right">
              <div className="text-sm font-mono text-[#cccccc]">${marketPrice.toLocaleString()}</div>
              <div
                className={`text-xs flex items-center gap-1 font-mono ${change24h >= 0 ? "text-[#4ec9b0]" : "text-[#f44747]"}`}
              >
                {change24h >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(change24h)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Symbol Selection */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-[#cccccc] uppercase tracking-wide">Symbol</Label>
          <Select value={symbol} onValueChange={setSymbol}>
            <SelectTrigger className="bg-[#1e1e1e] border-[#3c3c3c] text-[#cccccc] font-mono h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#252526] border-[#3c3c3c]">
              <SelectItem value="BTC/USDT" className="text-[#cccccc] font-mono">
                BTC/USDT
              </SelectItem>
              <SelectItem value="ETH/USDT" className="text-[#cccccc] font-mono">
                ETH/USDT
              </SelectItem>
              <SelectItem value="BNB/USDT" className="text-[#cccccc] font-mono">
                BNB/USDT
              </SelectItem>
              <SelectItem value="ADA/USDT" className="text-[#cccccc] font-mono">
                ADA/USDT
              </SelectItem>
              <SelectItem value="SOL/USDT" className="text-[#cccccc] font-mono">
                SOL/USDT
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buy/Sell Tabs - VS Code style */}
        <div className="space-y-3">
          <div className="flex border-b border-[#3c3c3c]">
            <button
              onClick={() => setSide("buy")}
              className={`flex-1 px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                side === "buy"
                  ? "border-[#4ec9b0] text-[#4ec9b0] bg-[#1e1e1e]"
                  : "border-transparent text-[#858585] hover:text-[#cccccc]"
              }`}
            >
              BUY
            </button>
            <button
              onClick={() => setSide("sell")}
              className={`flex-1 px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                side === "sell"
                  ? "border-[#f44747] text-[#f44747] bg-[#1e1e1e]"
                  : "border-transparent text-[#858585] hover:text-[#cccccc]"
              }`}
            >
              SELL
            </button>
          </div>

          <div className="space-y-4">
            {/* Order Type */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[#cccccc] uppercase tracking-wide">Order Type</Label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger className="bg-[#1e1e1e] border-[#3c3c3c] text-[#cccccc] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#252526] border-[#3c3c3c]">
                  <SelectItem value="market" className="text-[#cccccc]">
                    Market
                  </SelectItem>
                  <SelectItem value="limit" className="text-[#cccccc]">
                    Limit
                  </SelectItem>
                  <SelectItem value="stop" className="text-[#cccccc]">
                    Stop
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Input (only for limit orders) */}
            {orderType === "limit" && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-[#cccccc] uppercase tracking-wide">Price (USDT)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-[#1e1e1e] border-[#3c3c3c] text-[#cccccc] font-mono text-right h-8 focus:border-[#007acc]"
                />
              </div>
            )}

            {/* Amount Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-medium text-[#cccccc] uppercase tracking-wide">
                  Amount ({symbol.split("/")[0]})
                </Label>
                <span className="text-xs text-[#858585] font-mono">Balance: 0.000000</span>
              </div>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-[#1e1e1e] border-[#3c3c3c] text-[#cccccc] font-mono text-right h-8 focus:border-[#007acc]"
              />

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-1">
                {["25%", "50%", "75%", "100%"].map((percentage) => (
                  <button
                    key={percentage}
                    className="px-2 py-1 text-xs font-mono bg-[#1e1e1e] border border-[#3c3c3c] text-[#858585] hover:text-[#cccccc] hover:border-[#007acc] transition-colors"
                    onClick={() => {
                      const mockBalance = 1.5
                      const percent = Number.parseInt(percentage) / 100
                      setAmount((mockBalance * percent).toFixed(6))
                    }}
                  >
                    {percentage}
                  </button>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[#cccccc] uppercase tracking-wide">Total (USDT)</Label>
              <div className="p-2 bg-[#1e1e1e] border border-[#3c3c3c] text-right font-mono text-[#cccccc] h-8 flex items-center justify-end">
                {amount && (orderType === "market" ? marketPrice : price)
                  ? (
                      Number.parseFloat(amount || "0") *
                      (orderType === "market" ? marketPrice : Number.parseFloat(price || "0"))
                    ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : "0.00"}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!amount || (orderType === "limit" && !price)}
              className={`w-full py-2 px-4 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                side === "buy"
                  ? "bg-[#4ec9b0] hover:bg-[#4ec9b0]/80 text-[#1e1e1e]"
                  : "bg-[#f44747] hover:bg-[#f44747]/80 text-white"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <DollarSign className="h-4 w-4" />
                {side === "buy" ? "BUY" : "SELL"} {symbol.split("/")[0]}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#007acc] px-4 py-1 text-xs font-mono text-white flex items-center justify-between">
        <span>Ready</span>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  )
}
