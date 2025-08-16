import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: "24",
    description: "Active inventory items",
    icon: Package,
    trend: "+12%",
    color: "primary-gradient",
  },
  {
    title: "Total Orders",
    value: "156",
    description: "Orders this month",
    icon: ShoppingCart,
    trend: "+18%",
    color: "success-gradient",
  },
  {
    title: "Revenue",
    value: "$12,450",
    description: "Monthly revenue",
    icon: TrendingUp,
    trend: "+25%",
    color: "primary-gradient",
  },
  {
    title: "Active Customers",
    value: "89",
    description: "Unique customers",
    icon: Users,
    trend: "+8%",
    color: "success-gradient",
  },
];

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your BloomTrade management system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="card-gradient shadow-custom border-border animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-success font-medium">{stat.trend}</span> {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-gradient shadow-custom border-border">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div>
                    <p className="font-medium">Order #{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">Customer {i + 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(Math.random() * 1000 + 100).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient shadow-custom border-border">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Premium Widget", "Standard Tool", "Basic Package", "Deluxe Kit", "Essential Set"].map((product, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div>
                    <p className="font-medium">{product}</p>
                    <p className="text-sm text-muted-foreground">{20 - i * 2} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(Math.random() * 200 + 50).toFixed(2)}</p>
                    <p className="text-xs text-success">In Stock</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}