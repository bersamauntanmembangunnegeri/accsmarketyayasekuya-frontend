import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    per_page: 10
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders?page=${page}&per_page=10`);
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.data);
        setPagination(data.pagination);
      } else {
        toast.error('Failed to load orders');
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle },
      processing: { color: 'bg-blue-100 text-blue-800', icon: RefreshCw }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
          <p className="text-gray-600 mt-1">Manage and track customer orders</p>
        </div>
        <Button onClick={() => loadOrders(pagination.page)} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Total {pagination.total} orders found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-2">Loading orders...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No orders found
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">{formatDate(order.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(order.status)}
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Customer:</span>
                      <p className="text-gray-900">{order.customer_email}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Product:</span>
                      <p className="text-gray-900 truncate" title={order.product_name}>
                        {order.product_name.length > 50 
                          ? order.product_name.substring(0, 50) + '...' 
                          : order.product_name}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Quantity:</span>
                      <p className="text-gray-900">{order.quantity} items</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Total:</span>
                      <p className="text-gray-900 font-semibold">{formatCurrency(order.total_price)}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Vendor:</span>
                      <p className="text-gray-900">{order.vendor_name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Payment Method:</span>
                      <p className="text-gray-900">{order.payment_method}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Unit Price:</span>
                      <p className="text-gray-900">{formatCurrency(order.unit_price)}</p>
                    </div>
                  </div>

                  {order.coupon_code && (
                    <div className="mt-2">
                      <span className="font-medium text-gray-700">Coupon:</span>
                      <Badge variant="outline" className="ml-2">{order.coupon_code}</Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadOrders(pagination.page - 1)}
                disabled={pagination.page === 1 || loading}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadOrders(pagination.page + 1)}
                disabled={pagination.page === pagination.pages || loading}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;

