import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, Calendar, ExternalLink } from "lucide-react";

interface AlertCardProps {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: 'feature' | 'bug' | 'update' | 'new';
  affectedDocs: string[];
  source: string;
  date: string;
}

const priorityConfig = {
  high: {
    variant: 'destructive' as const,
    bgColor: 'bg-destructive/5 border-destructive/20',
    icon: AlertTriangle,
    iconColor: 'text-destructive'
  },
  medium: {
    variant: 'secondary' as const,
    bgColor: 'bg-warning/5 border-warning/20',
    icon: AlertTriangle,
    iconColor: 'text-warning'
  },
  low: {
    variant: 'outline' as const,
    bgColor: 'bg-muted/20 border-border',
    icon: FileText,
    iconColor: 'text-muted-foreground'
  }
};

export function AlertCard({ title, description, priority, type, affectedDocs, source, date }: AlertCardProps) {
  const config = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <Card className={`transition-all hover:shadow-md ${config.bgColor}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${config.iconColor}`} />
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <Badge variant={config.variant} className="text-xs">
            {priority.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
            <span>•</span>
            <span>{source}</span>
          </div>
          
          <div>
            <p className="text-xs font-medium text-foreground mb-1">
              Affected Documentation ({affectedDocs.length})
            </p>
            <div className="space-y-1">
              {affectedDocs.slice(0, 3).map((doc, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <a 
                    href={`https://help.liveplan.com/hc/en-us/articles/${doc.toLowerCase().replace(/ /g, '-')}`}
                    className="text-muted-foreground hover:text-foreground transition-colors truncate flex-1 cursor-pointer"
                    title={doc}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {doc}
                  </a>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 ml-2"
                    onClick={() => window.open(`https://help.liveplan.com/hc/en-us/articles/${doc.toLowerCase().replace(/ /g, '-')}`, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {affectedDocs.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  +{affectedDocs.length - 3} more
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}