
import React from 'react';
import { BarChart3, LineChart, PiggyBank, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/card';
import CreditScore from '@/components/CreditScore';
import FinanceCard from '@/components/FinanceCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FinanceCard 
            title="Total Balance"
            value="$24,156.20"
            change={+15.3}
            icon={<LineChart className="h-4 w-4" />}
          />
          <FinanceCard 
            title="Monthly Spending"
            value="$3,100.45"
            change={-4.2}
            icon={<BarChart3 className="h-4 w-4" />}
          />
        </div>
        
        <Card className="p-6 bg-card/50 border-border/30">
          <Tabs defaultValue="savings">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Financial Goals</h3>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="savings">Savings</TabsTrigger>
                <TabsTrigger value="debt">Debt</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="savings" className="mt-0">
              <div className="space-y-4">
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <PiggyBank className="h-4 w-4 text-albert-400" />
                      <span className="font-medium">Emergency Fund</span>
                    </div>
                    <span className="text-sm">$10,000 goal</span>
                  </div>
                  <div className="h-2 bg-muted/30 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-albert-500 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">$8,000 saved</span>
                    <span className="text-albert-400">80%</span>
                  </div>
                </div>
                
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-accent" />
                      <span className="font-medium">New Car</span>
                    </div>
                    <span className="text-sm">$35,000 goal</span>
                  </div>
                  <div className="h-2 bg-muted/30 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-accent rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">$15,750 saved</span>
                    <span className="text-accent">45%</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="debt" className="mt-0">
              <div className="space-y-4">
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-albert-400" />
                      <span className="font-medium">Student Loan</span>
                    </div>
                    <span className="text-sm">$18,500 total</span>
                  </div>
                  <div className="h-2 bg-muted/30 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-albert-500 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">$12,580 paid</span>
                    <span className="text-albert-400">68%</span>
                  </div>
                </div>
                
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-accent" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                    <span className="text-sm">$3,200 total</span>
                  </div>
                  <div className="h-2 bg-muted/30 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-accent rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">$1,120 paid</span>
                    <span className="text-accent">35%</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      <div className="md:col-span-1">
        <CreditScore 
          score={742} 
          change={+12}
          lastUpdated="Aug 15, 2023"
        />
      </div>
    </div>
  );
};

export default Dashboard;
