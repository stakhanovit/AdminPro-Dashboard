import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: "up" | "down";
  };
  icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  iconColor = "bg-primary" 
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={cn("w-8 h-8 rounded-md flex items-center justify-center", iconColor)}>
              <Icon className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-muted-foreground truncate">
                {title}
              </dt>
              <dd className="text-2xl font-semibold text-foreground">
                {value}
              </dd>
            </dl>
          </div>
          {change && (
            <div className="flex-shrink-0">
              <span className={cn(
                "inline-flex items-center text-sm",
                change.trend === "up" 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-red-600 dark:text-red-400"
              )}>
                <svg 
                  className={cn(
                    "w-3 h-3 mr-1",
                    change.trend === "up" ? "rotate-0" : "rotate-180"
                  )} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
                {change.value}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
