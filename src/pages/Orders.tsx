import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, Trash2, ShoppingCart, Eye } from "lucide-react";
import { OrderForm } from "@/components/forms/OrderForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  shippingAddress: string;
}

// Mock data - in a real app, this would come from your backend
const mockOrders: Order[] = [
  {
    id: "1001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      { productId: "1", productName: "Premium Widget", quantity: 2, unitPrice: 299.99 },
      { productId: "2", productName: "Standard Tool", quantity: 1, unitPrice: 149.99 }
    ],
    total: 749.97,
    status: "processing",
    createdAt: "2024-01-16",
    shippingAddress: "123 Main St, City, State 12345",
  },
  {
    id: "1002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    items: [
      { productId: "3", productName: "Basic Package", quantity: 3, unitPrice: 79.99 }
    ],
    total: 239.97,
    status: "shipped",
    createdAt: "2024-01-15",
    shippingAddress: "456 Oak Ave, Town, State 54321",
  },
  {
    id: "1003",
    customerName: "Bob Johnson",
    customerEmail: "bob@example.com",
    items: [
      { productId: "1", productName: "Premium Widget", quantity: 1, unitPrice: 299.99 },
    ],
    total: 299.99,
    status: "delivered",
    createdAt: "2024-01-14",
    shippingAddress: "789 Pine Rd, Village, State 98765",
  },
];

const statusColors = {
  pending: "bg-warning text-warning-foreground",
  processing: "bg-primary text-primary-foreground",
  shipped: "bg-blue-500 text-white",
  delivered: "bg-success text-success-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateOrder = (orderData: Omit<Order, "id" | "createdAt" | "total">) => {
    const total = orderData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const newOrder: Order = {
      ...orderData,
      id: (1000 + orders.length + 1).toString(),
      total,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setOrders([newOrder, ...orders]);
    setIsDialogOpen(false);
  };

  const handleEditOrder = (orderData: Omit<Order, "id" | "createdAt" | "total">) => {
    if (!editingOrder) return;
    
    const total = orderData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const updatedOrders = orders.map(order =>
      order.id === editingOrder.id
        ? { ...order, ...orderData, total }
        : order
    );
    setOrders(updatedOrders);
    setEditingOrder(null);
    setIsDialogOpen(false);
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const openEditDialog = (order: Order) => {
    setEditingOrder(order);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingOrder(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-2">Manage customer orders</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="primary-gradient shadow-glow">
              <Plus className="mr-2 h-4 w-4" />
              Add Order
            </Button>
          </DialogTrigger>
          <DialogContent className="card-gradient max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {editingOrder ? "Edit Order" : "Create New Order"}
              </DialogTitle>
            </DialogHeader>
            <OrderForm
              order={editingOrder}
              onSubmit={editingOrder ? handleEditOrder : handleCreateOrder}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="card-gradient shadow-custom border-border mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="card-gradient shadow-custom border-border hover:shadow-lg transition-smooth">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <CardDescription>{order.customerName} • {order.customerEmail}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewingOrder(order)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(order)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteOrder(order.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Items</p>
                  <p className="font-medium">{order.items.length} products</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-medium text-lg">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{order.createdAt}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Shipping Address</p>
                <p className="text-sm">{order.shippingAddress}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!viewingOrder} onOpenChange={(open) => !open && setViewingOrder(null)}>
        <DialogContent className="card-gradient max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details #{viewingOrder?.id}</DialogTitle>
          </DialogHeader>
          {viewingOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Customer</Label>
                  <p>{viewingOrder.customerName}</p>
                  <p className="text-sm text-muted-foreground">{viewingOrder.customerEmail}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={statusColors[viewingOrder.status]}>
                    {viewingOrder.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Items</Label>
                <div className="mt-2 space-y-2">
                  {viewingOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.quantity * item.unitPrice).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold">${viewingOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Shipping Address</Label>
                <p className="mt-1">{viewingOrder.shippingAddress}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No orders found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first order"}
          </p>
        </div>
      )}
    </div>
  );
}