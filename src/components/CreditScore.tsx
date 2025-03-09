
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { ArrowUp, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CreditScoreProps {
  score: number;
  previousScore?: number;
  maxScore?: number;
}

const CreditScore: React.FC<CreditScoreProps> = ({ 
  score, 
  previousScore, 
  maxScore = 850 
}) => {
  // Calculate score percentage
  const percentage = (score / maxScore) * 100;
  
  // Determine score rating
  const getRating = (score: number) => {
    if (score >= 800) return { text: 'Excellent', color: 'text-green-400' };
    if (score >= 740) return { text: 'Very Good', color: 'text-green-400' };
    if (score >= 670) return { text: 'Good', color: 'text-chart-yellow' };
    if (score >= 580) return { text: 'Fair', color: 'text-chart-yellow' };
    return { text: 'Poor', color: 'text-chart-red' };
  };
  
  const rating = getRating(score);
  
  // Calculate change if previous score is provided
  const change = previousScore ? score - previousScore : 0;
  
  // Generate background gradient class based on score
  const getProgressColor = (score: number) => {
    if (score >= 740) return 'bg-gradient-to-r from-green-500 to-green-400';
    if (score >= 670) return 'bg-gradient-to-r from-yellow-500 to-green-400';
    if (score >= 580) return 'bg-gradient-to-r from-orange-500 to-yellow-400';
    return 'bg-gradient-to-r from-red-500 to-orange-400';
  };
  
  const progressColor = getProgressColor(score);
  
  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">Your Credit Score</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1 hover:bg-secondary rounded-full">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs max-w-xs">
                Your credit score is calculated based on payment history, amounts owed, 
                length of credit history, new credit, and credit mix.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex items-baseline mb-1">
          <span className="text-5xl font-bold tracking-tighter">{score}</span>
          <span className="text-sm text-muted-foreground ml-1">/{maxScore}</span>
        </div>
        <span className={`text-sm font-medium ${rating.color}`}>{rating.text}</span>
        
        {previousScore && (
          <div className="flex items-center mt-2 text-xs">
            <span className="text-muted-foreground mr-1">From previous:</span>
            <div className={`flex items-center ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? (
                <>
                  <ArrowUp className="h-3 w-3 mr-0.5" />
                  <span>+{change} pts</span>
                </>
              ) : (
                <>
                  <ArrowUp className="h-3 w-3 mr-0.5 rotate-180" />
                  <span>{change} pts</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <Progress 
          value={percentage} 
          className="h-2 bg-secondary"
          indicatorClassName={progressColor}
        />
        
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>Poor</span>
          <span>Fair</span>
          <span>Good</span>
          <span>Very Good</span>
          <span>Excellent</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium mb-2">Score Factors</h4>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs">Payment History</span>
            <span className="text-xs font-medium text-green-400">Excellent</span>
          </div>
          <Progress value={95} className="h-1.5 bg-secondary" indicatorClassName="bg-green-400" />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs">Credit Utilization</span>
            <span className="text-xs font-medium text-chart-yellow">Good</span>
          </div>
          <Progress value={70} className="h-1.5 bg-secondary" indicatorClassName="bg-chart-yellow" />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs">Credit Age</span>
            <span className="text-xs font-medium text-chart-yellow">Fair</span>
          </div>
          <Progress value={60} className="h-1.5 bg-secondary" indicatorClassName="bg-chart-yellow" />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs">Account Mix</span>
            <span className="text-xs font-medium text-green-400">Very Good</span>
          </div>
          <Progress value={85} className="h-1.5 bg-secondary" indicatorClassName="bg-green-400" />
        </div>
      </div>
    </div>
  );
};

export default CreditScore;
