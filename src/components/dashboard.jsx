"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, ArrowDownIcon, PlusIcon, SendIcon, MoreHorizontalIcon, TrendingUp } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, CartesianGrid, YAxis, Tooltip } from "recharts"

// Mocked data for demonstration purposes
const balanceData = {
  total: 5250000.00,
  percentage: 8.5,
  investment: 750000.00,
  investmentPercentage: 6.3,
  energySaved: 1250000,
  energySavedPercentage: 12.7,
}

const accountsData = [
  { name: "Solar Panel Fund", amount: 3500000.00, percentage: 7.5 },
  { name: "Energy Storage", amount: 1250000.00, percentage: 5.8 },
  { name: "R&D Reserve", amount: 500000.00, percentage: 3.2 },
]

const recentActivity = [
  { type: "Investment", name: "SolarTech Inc.", amount: 250000.00, status: "Success", method: "Bank Transfer" },
  { type: "Dividend", name: "EcoEnergy Ltd.", amount: 15000.00, status: "Pending", method: "ACH" },
]

const chartData = [
  { month: "January", investment: 500000, energySaved: 950000 },
  { month: "February", investment: 600000, energySaved: 1050000 },
  { month: "March", investment: 550000, energySaved: 1100000 },
  { month: "April", investment: 750000, energySaved: 1250000 },
  { month: "May", investment: 700000, energySaved: 1200000 },
  { month: "June", investment: 800000, energySaved: 1350000 },
]

export default function Dashboard() {
  return (
    <div className="p-4 space-y-4 bg-gray-100 min-h-screen">
      <Card className="bg-green-700 text-white">
        <CardContent className="flex justify-between items-center p-6">
          <div>
            <p className="text-sm">Total Investment</p>
            <h2 className="text-3xl font-bold">€{balanceData.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            <p className="text-sm text-green-300">+{balanceData.percentage}%</p>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="secondary" className="bg-green-600 hover:bg-green-500">
              <PlusIcon className="mr-1 h-4 w-4" /> Invest
            </Button>
            <Button size="sm" variant="secondary" className="bg-green-600 hover:bg-green-500">
              <SendIcon className="mr-1 h-4 w-4" /> Transfer
            </Button>
            <Button size="sm" variant="secondary" className="bg-green-600 hover:bg-green-500">
              Report
            </Button>
            <Button size="sm" variant="secondary" className="bg-green-600 hover:bg-green-500">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment and Energy Savings</CardTitle>
          <CardDescription>
            Showing total investment and energy saved for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis 
                  tickFormatter={(value) => `€${value / 1000}k`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    `€${value.toLocaleString()}`, 
                    name === 'investment' ? 'Investment' : 'Energy Saved (kWh)'
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="energySaved"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="investment"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm text-gray-500">Investment</p>
              <p className="text-xl font-bold">€{balanceData.investment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="text-sm text-green-500">+{balanceData.investmentPercentage}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Energy Saved (kWh)</p>
              <p className="text-xl font-bold">{balanceData.energySaved.toLocaleString('en-US')}</p>
              <p className="text-sm text-green-500">+{balanceData.energySavedPercentage}%</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Investment trending up by 8.5% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accountsData.map((account, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-sm">{account.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">€{account.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="text-sm text-green-500">+{account.percentage}%</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500">
                <th>Type</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <tr key={index}>
                  <td>
                    {activity.type === "Investment" ? (
                      <ArrowUpIcon className="text-green-500" />
                    ) : (
                      <ArrowDownIcon className="text-blue-500" />
                    )}
                    {activity.type}
                  </td>
                  <td>{activity.name}</td>
                  <td>€{Math.abs(activity.amount).toFixed(2)}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activity.status === "Success" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                  <td>{activity.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}