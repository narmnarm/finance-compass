
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface FinanceCardProps {
  title: string;
  description?: string;
  value?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'outline';
}

const FinanceCard: React.FC<FinanceCardProps> = ({
  title,
  description,
  value,
  trend,
  icon,
  footer,
  isLoading = false,
  className,
  onClick,
  variant = 'default'
}) => {
  const variantClasses = {
    default: '',
    glass: 'glass-card border-white/10 hover:border-white/20',
    outline: 'bg-transparent border border-border'
  };
  
  return (
    <Card 
      className={cn(
        "transition-all duration-300", 
        onClick && "cursor-pointer hover:shadow-md hover:translate-y-[-2px]",
        variantClasses[variant],
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            {isLoading ? (
              <Skeleton className="h-5 w-24 mb-1" />
            ) : (
              <CardTitle className="text-base font-medium text-foreground/90">{title}</CardTitle>
            )}
            
            {description && !isLoading ? (
              <CardDescription className="text-xs mt-0.5">{description}</CardDescription>
            ) : isLoading ? (
              <Skeleton className="h-3 w-32 mt-1" />
            ) : null}
          </div>
          
          {icon && !isLoading ? (
            <div className="p-1.5 rounded-md bg-secondary text-foreground/70">{icon}</div>
          ) : isLoading ? (
            <Skeleton className="h-8 w-8 rounded-md" />
          ) : null}
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-2/3 my-2" />
        ) : (
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-semibold tracking-tight">{value}</div>
            {trend && (
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                trend.isPositive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
        )}
      </CardContent>
      
      {footer && (
        <CardFooter className="pt-0 text-xs text-muted-foreground">
          {isLoading ? <Skeleton className="h-3 w-full" /> : footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default FinanceCard;
