import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IntegrationStatusCard } from "@/components/IntegrationStatusCard";
import { AlertCard } from "@/components/AlertCard";
import { StatsCard } from "@/components/StatsCard";
import { 
  AlertTriangle, 
  FileText, 
  Activity, 
  CheckCircle2,
  Settings,
  RefreshCw,
  Filter
} from "lucide-react";

const Index = () => {
  const integrations = [
    { name: "Linear", status: 'connected' as const, lastSync: "2 min ago", itemCount: 23 },
    { name: "Monday.com", status: 'connected' as const, lastSync: "5 min ago", itemCount: 18 },
    { name: "Slack", status: 'warning' as const, lastSync: "1 hour ago", itemCount: 12 },
    { name: "Google Calendar", status: 'pending' as const, lastSync: "Never", itemCount: 0 },
    { name: "HubSpot", status: 'error' as const, lastSync: "2 days ago", itemCount: 5 }
  ];

  const alerts = [
    {
      title: "New Budget Feature Release",
      description: "Major budget calculator update requires Help Center documentation",
      priority: 'high' as const,
      type: 'feature' as const,
      affectedDocs: [
        "Budget Planning Guide",
        "Financial Forecasting Tutorial",
        "Getting Started with LivePlan",
        "Advanced Features Overview"
      ],
      source: "Linear #LP-2847",
      date: "Today"
    },
    {
      title: "Dashboard UI Changes",
      description: "Navigation redesign may affect existing screenshots",
      priority: 'medium' as const,
      type: 'update' as const,
      affectedDocs: [
        "Dashboard Overview",
        "User Interface Guide",
        "Quick Start Tutorial"
      ],
      source: "Linear #LP-2891",
      date: "Yesterday"
    },
    {
      title: "Export Bug Fix",
      description: "PDF export functionality updated",
      priority: 'low' as const,
      type: 'bug' as const,
      affectedDocs: [
        "Exporting Your Business Plan",
        "Sharing and Collaboration"
      ],
      source: "Monday Board",
      date: "2 days ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documentation Radar</h1>
            <p className="text-muted-foreground">Early warning system for Help Center updates</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            title="Active Alerts"
            value={alerts.length}
            description="Requiring attention"
            icon={AlertTriangle}
            trend={{ value: 12, isPositive: false }}
          />
          <StatsCard
            title="Docs at Risk"
            value="14"
            description="May need updates"
            icon={FileText}
          />
          <StatsCard
            title="Integrations"
            value={`${integrations.filter(i => i.status === 'connected').length}/${integrations.length}`}
            description="Connected services"
            icon={Activity}
          />
          <StatsCard
            title="Last 30 Days"
            value="87%"
            description="Accuracy rate"
            icon={CheckCircle2}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Integration Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Integration Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {integrations.map((integration, index) => (
                <IntegrationStatusCard key={index} {...integration} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {alerts.map((alert, index) => (
                <AlertCard key={index} {...alert} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "10:30 AM", action: "New feature detected in Linear", source: "LP-2847", status: "needs-review" },
                { time: "9:45 AM", action: "Documentation updated", source: "Help Center", status: "completed" },
                { time: "9:15 AM", action: "Slack mention detected", source: "#help-center", status: "monitoring" },
                { time: "8:30 AM", action: "Monday board updated", source: "Help Center Tasks", status: "in-progress" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.source}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <div className={`text-xs px-2 py-0.5 rounded-full ${
                      activity.status === 'completed' ? 'bg-success/10 text-success' :
                      activity.status === 'needs-review' ? 'bg-warning/10 text-warning' :
                      activity.status === 'in-progress' ? 'bg-primary/10 text-primary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {activity.status.replace('-', ' ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;