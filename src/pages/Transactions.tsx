
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, ArrowRight, PieChart, Calendar, DollarSign } from 'lucide-react';
import Chat from '@/components/Chat';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
}

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2023-06-15',
      amount: 120.50,
      description: 'Grocery Shopping',
      category: 'Food'
    },
    {
      id: '2',
      date: '2023-06-12',
      amount: 45.00,
      description: 'Gas Station',
      category: 'Transportation'
    },
    {
      id: '3',
      date: '2023-06-10',
      amount: 9.99,
      description: 'Streaming Subscription',
      category: 'Entertainment'
    }
  ]);
  
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    description: '',
    category: 'Food'
  });
  
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  
  const addTransaction = () => {
    if (newTransaction.description.trim() === '' || newTransaction.amount <= 0) return;
    
    setTransactions([
      ...transactions,
      {
        ...newTransaction,
        id: Date.now().toString()
      }
    ]);
    
    setNewTransaction({
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      description: '',
      category: newTransaction.category
    });
    
    setHasAnalyzed(false);
  };
  
  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter(tx => tx.id !== id));
    setHasAnalyzed(false);
  };
  
  const calculateTotal = () => {
    return transactions.reduce((sum, tx) => sum + tx.amount, 0);
  };
  
  const getCategoryTotal = (category: string) => {
    return transactions
      .filter(tx => tx.category === category)
      .reduce((sum, tx) => sum + tx.amount, 0);
  };
  
  const getCategories = () => {
    return Array.from(new Set(transactions.map(tx => tx.category)));
  };
  
  const analyzeTxs = () => {
    setHasAnalyzed(true);
  };
  
  const generatePrompt = () => {
    if (transactions.length === 0) return '';
    
    const categoryBreakdown = getCategories()
      .map(cat => `${cat}: $${getCategoryTotal(cat).toFixed(2)}`)
      .join(', ');
    
    return `I've recorded the following transactions with a total spending of $${calculateTotal().toFixed(2)}. 
Category breakdown: ${categoryBreakdown}.
 
Can you analyze my spending patterns and suggest any areas where I could save money or improve my financial habits?`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Transaction Analysis</h1>
        <p className="text-muted-foreground mb-8">
          Track your spending and get personalized insights to optimize your budget.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6 bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Add Transaction</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tx-date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="tx-date"
                        type="date"
                        value={newTransaction.date}
                        onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="tx-amount">Amount ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="tx-amount"
                        type="number"
                        value={newTransaction.amount || ''}
                        onChange={(e) => setNewTransaction({...newTransaction, amount: parseFloat(e.target.value) || 0})}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="tx-description">Description</Label>
                  <Input
                    id="tx-description"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    placeholder="What did you spend on?"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tx-category">Category</Label>
                  <Select
                    value={newTransaction.category}
                    onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}
                  >
                    <SelectTrigger id="tx-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Shopping">Shopping</SelectItem>
                      <SelectItem value="Housing">Housing</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={addTransaction} 
                  className="w-full bg-albert-600 hover:bg-albert-700 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Transaction
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Transaction History</h2>
                <div className="text-sm font-medium">
                  Total: ${calculateTotal().toFixed(2)}
                </div>
              </div>
              
              {transactions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No transactions yet. Add some to get started!
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-md bg-secondary/50 border border-border/50">
                      <div className="flex-1">
                        <div className="font-medium">{tx.description}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(tx.date).toLocaleDateString()}
                          <span className="mx-2">•</span>
                          {tx.category}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="font-medium">${tx.amount.toFixed(2)}</div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeTransaction(tx.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {transactions.length > 0 && !hasAnalyzed && (
                <Button 
                  onClick={analyzeTxs} 
                  className="w-full mt-4 bg-albert-600 hover:bg-albert-700 text-white"
                >
                  <PieChart className="mr-2 h-4 w-4" /> Analyze Spending
                </Button>
              )}
            </Card>
          </div>
          
          <div className="h-[800px] lg:h-auto">
            <Chat 
              initialPrompt={hasAnalyzed ? generatePrompt() : ''}
              initialSystemMessage="I'm your Financial Transactions Assistant. I can help you analyze your spending patterns and provide tips to improve your financial habits."
              className="h-full"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionsPage;
