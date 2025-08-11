import React from 'react'
import { Music, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { BudgetItem } from './budget-item'

export const BudgetCard = () => {
  return (
    <Card className="bg-[#2f2f2f] text-white shadow-lg w-full max-w-md mx-auto">
      <div className="flex justify-between items-center bg-[#3f3f3f] px-4 py-2 rounded-t-md">
        <span>Jul 22, 2025</span>
        <span className="text-sm">
          income: 60,000ks &nbsp; expense: 2,0000ks
        </span>
      </div>
      <CardContent className="p-0 divide-y divide-gray-700">
        <BudgetItem />
        <BudgetItem />

        <div className="text-sm text-gray-400 px-4 py-2">
          17.39% of your monthly income was spent.
        </div>
      </CardContent>
    </Card>
  )
}
