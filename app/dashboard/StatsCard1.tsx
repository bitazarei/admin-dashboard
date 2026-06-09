import { TrendingDown, TrendingUp } from "lucide-react";
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface StatsCard1Props {
  icon?: React.ReactNode;
  title?: string;
  value?: string;
  change?: number;
  changeLabel?: string;
  className?: string;
}

const StatsCard1 = (
  {
  icon = <User className="w-8 h-8 mr-2" />,
  title = "Total Users",
  value = "452",
  change = 20.1,
  changeLabel = "from last month",
  className,
}: StatsCard1Props) => {
  const isPositive = change >= 0;

  return (
    <Card className={cn("w-full h-full max-w-xs", className)}>
      <CardHeader className="pb-0">
        <div>
           {icon}
        </div>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className="mt-0 flex items-center gap-1 text-sm">
          {isPositive ? (
            <TrendingUp className="size-4 text-green-500" />
          ) : (
            <TrendingDown className="size-4 text-red-500" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span className="text-muted-foreground">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export { StatsCard1 };
