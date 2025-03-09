
import React, { useState } from 'react';
import FinanceCard from './FinanceCard';
import { LineChart, PieChart, Wallet, CreditCard, ArrowDown, ArrowUp, Calendar, Sliders } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartPieChart, Pie, Cell } from 'recharts';

const chartData = [
  { name: 'Jan', value: 12400 },
  { name: 'Feb', value: 13100 },
  { name: 'Mar', value: 12800 },
  { name: 'Apr', value: 13800 },
  { name: 'May', value: 14800 },
  { name: 'Jun', value: 15200 },
  { name: 'Jul', value: 16000 },
  { name: 'Aug', value: 17200 },
  { name: 'Sep', value: 18100 },
  { name: 'Oct', value: 19500 },
  { name: 'Nov', value: 20100 },
  { name: 'Dec', value: 21000 },
];

const expenseData = [
  { name: 'Housing', value: 1250, color: '#10b981' },
  { name: 'Food', value: 580, color: '#3b82f6' },
  { name: 'Transportation', value: 350, color: '#8b5cf6' },
  { name: 'Entertainment', value: 220, color: '#ec4899' },
  { name: 'Utilities', value: 180, color: '#f59e0b' },
  { name: 'Other', value: 420, color: '#6366f1' },
];

const DashboardComponent: React.FC = () => {
  const [period, setPeriod] = useState('yearly');
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 border border-border p-2 rounded-md shadow-md text-xs">
          <p className="font-medium">{`${payload[0].payload.name}: $${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Financial Dashboard</h1>
          <p className="text-muted-foreground">Track your finances and monitor your financial health.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue="december">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="december">December 2023</SelectItem>
              <SelectItem value="november">November 2023</SelectItem>
              <SelectItem value="october">October 2023</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Sliders className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FinanceCard
          title="Total Balance"
          value="$24,156.20"
          trend={{ value: 4.6, isPositive: true }}
          icon={<Wallet className="h-4 w-4" />}
          footer="Updated just now"
        />
        
        <FinanceCard
          title="Monthly Income"
          value="$8,350.50"
          trend={{ value: 2.1, isPositive: true }}
          icon={<ArrowDown className="h-4 w-4" />}
          footer="Vs. $8,180.25 last month"
        />
        
        <FinanceCard
          title="Monthly Expenses"
          value="$3,285.45"
          trend={{ value: 1.8, isPositive: false }}
          icon={<ArrowUp className="h-4 w-4" />}
          footer="Vs. $3,228.30 last month"
        />
        
        <FinanceCard
          title="Credit Score"
          value="742"
          trend={{ value: 3, isPositive: true }}
          icon={<CreditCard className="h-4 w-4" />}
          footer="Excellent • Top 15%"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-border rounded-lg bg-card p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h3 className="font-medium">Net Worth</h3>
              <p className="text-sm text-muted-foreground">Your assets minus liabilities over time</p>
            </div>
            
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <TabsList className="h-8">
                <TabsTrigger value="monthly" onClick={() => setPeriod('monthly')} className={period === 'monthly' ? 'active' : ''}>Monthly</TabsTrigger>
                <TabsTrigger value="yearly" onClick={() => setPeriod('yearly')} className={period === 'yearly' ? 'active' : ''}>Yearly</TabsTrigger>
              </TabsList>
              
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickLine={{ stroke: '#334155' }}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  tickFormatter={(value) => `$${value/1000}k`}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickLine={{ stroke: '#334155' }}
                  axisLine={{ stroke: '#334155' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#14b8a6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="border border-border rounded-lg bg-card p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-medium">Expense Breakdown</h3>
              <p className="text-sm text-muted-foreground">Where your money goes</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Sliders className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartPieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background/95 border border-border p-2 rounded-md shadow-md text-xs">
                          <p className="font-medium">{`${payload[0].name}: $${payload[0].value}`}</p>
                          <p className="text-muted-foreground">
                            {((payload[0].value / expenseData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}% of total
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RechartPieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            {expenseData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
