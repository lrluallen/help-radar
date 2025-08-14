import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react";

interface IntegrationStatusCardProps {
  name: string;
  status: 'connected' | 'warning' | 'error' | 'pending';
  lastSync?: string;
  itemCount?: number;
}

const statusConfig = {
  connected: {
    icon: CheckCircle,
    variant: 'default' as const,
    bgColor: 'bg-success/5',
    textColor: 'text-success'
  },
  warning: {
    icon: AlertCircle,
    variant: 'secondary' as const,
    bgColor: 'bg-warning/5',
    textColor: 'text-warning'
  },
  error: {
    icon: XCircle,
    variant: 'destructive' as const,
    bgColor: 'bg-destructive/5',
    textColor: 'text-destructive'
  },
  pending: {
    icon: Clock,
    variant: 'outline' as const,
    bgColor: 'bg-muted/50',
    textColor: 'text-muted-foreground'
  }
};

export function IntegrationStatusCard({ name, status, lastSync, itemCount }: IntegrationStatusCardProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card className={`transition-all hover:shadow-md ${config.bgColor}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{name}</CardTitle>
          <Icon className={`h-4 w-4 ${config.textColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Badge variant={config.variant} className="text-xs">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          {lastSync && (
            <p className="text-xs text-muted-foreground">
              Last sync: {lastSync}
            </p>
          )}
          {itemCount !== undefined && (
            <p className="text-xs text-muted-foreground">
              {itemCount} items tracked
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}