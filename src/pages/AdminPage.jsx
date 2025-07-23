import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';

const AdminPage = () => {
  const [headerSettings, setHeaderSettings] = useState({
    header_logo_url: '',
    header_logo_alt: 'AccsMarket',
    navigation_menu: '[]',
    search_placeholder: 'Search for accounts',
    search_enabled: 'true'
  });
  
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load header settings on component mount
  useEffect(() => {
    loadHeaderSettings();
  }, []);

  const loadHeaderSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/header');
      const data = await response.json();
      
      if (data.success) {
        setHeaderSettings(data.data);
        // Parse navigation menu
        try {
          const parsedMenu = JSON.parse(data.data.navigation_menu || '[]');
          setMenuItems(parsedMenu);
        } catch (e) {
          console.error('Error parsing navigation menu:', e);
          setMenuItems([]);
        }
      } else {
        toast.error('Failed to load header settings');
      }
    } catch (error) {
      console.error('Error loading header settings:', error);
      toast.error('Error loading header settings');
    } finally {
      setLoading(false);
    }
  };

  const saveHeaderSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/header', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...headerSettings,
          navigation_menu: JSON.stringify(menuItems)
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Header settings saved successfully');
      } else {
        toast.error(data.message || 'Failed to save header settings');
      }
    } catch (error) {
      console.error('Error saving header settings:', error);
      toast.error('Error saving header settings');
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, { label: '', url: '', active: true }]);
  };

  const removeMenuItem = (index) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const updateMenuItem = (index, field, value) => {
    const updatedItems = [...menuItems];
    updatedItems[index][field] = value;
    setMenuItems(updatedItems);
  };

  const updateLogoSettings = async (logoUrl, logoAlt) => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/header/logo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logo_url: logoUrl,
          logo_alt: logoAlt
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setHeaderSettings(prev => ({
          ...prev,
          header_logo_url: logoUrl,
          header_logo_alt: logoAlt
        }));
        toast.success('Logo updated successfully');
      } else {
        toast.error(data.message || 'Failed to update logo');
      }
    } catch (error) {
      console.error('Error updating logo:', error);
      toast.error('Error updating logo');
    } finally {
      setLoading(false);
    }
  };

  const updateSearchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/header/search', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search_enabled: headerSettings.search_enabled === 'true',
          search_placeholder: headerSettings.search_placeholder
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Search settings updated successfully');
      } else {
        toast.error(data.message || 'Failed to update search settings');
      }
    } catch (error) {
      console.error('Error updating search settings:', error);
      toast.error('Error updating search settings');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !headerSettings.header_logo_url && headerSettings.header_logo_url !== '') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-2">Manage your website content and settings</p>
      </div>

      <Tabs defaultValue="header" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="header">Header Management</TabsTrigger>
          <TabsTrigger value="logo">Logo Settings</TabsTrigger>
          <TabsTrigger value="navigation">Navigation Menu</TabsTrigger>
          <TabsTrigger value="search">Search Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="header" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Header Overview</CardTitle>
              <CardDescription>
                Manage all header-related settings from this central location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logo-preview">Current Logo</Label>
                  <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                    {headerSettings.header_logo_url ? (
                      <img 
                        src={headerSettings.header_logo_url} 
                        alt={headerSettings.header_logo_alt}
                        className="max-h-16 object-contain"
                      />
                    ) : (
                      <div className="text-gray-500 text-sm">No logo uploaded</div>
                    )}
                  </div>
                </div>
                <div>
                  <Label>Navigation Menu Items</Label>
                  <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                    <div className="text-sm text-gray-600">
                      {menuItems.length} menu items configured
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button onClick={saveHeaderSettings} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save All Settings
                </Button>
                <Button variant="outline" onClick={loadHeaderSettings} disabled={loading}>
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo Management</CardTitle>
              <CardDescription>
                Upload and configure your website logo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="logo-url">Logo URL</Label>
                <Input
                  id="logo-url"
                  value={headerSettings.header_logo_url}
                  onChange={(e) => setHeaderSettings(prev => ({
                    ...prev,
                    header_logo_url: e.target.value
                  }))}
                  placeholder="https://example.com/logo.png"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="logo-alt">Logo Alt Text</Label>
                <Input
                  id="logo-alt"
                  value={headerSettings.header_logo_alt}
                  onChange={(e) => setHeaderSettings(prev => ({
                    ...prev,
                    header_logo_alt: e.target.value
                  }))}
                  placeholder="Your website name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Logo Preview</Label>
                <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                  {headerSettings.header_logo_url ? (
                    <img 
                      src={headerSettings.header_logo_url} 
                      alt={headerSettings.header_logo_alt}
                      className="max-h-24 object-contain"
                    />
                  ) : (
                    <div className="text-gray-500 text-sm">Enter a logo URL to see preview</div>
                  )}
                </div>
              </div>

              <Button 
                onClick={() => updateLogoSettings(headerSettings.header_logo_url, headerSettings.header_logo_alt)}
                disabled={loading}
              >
                <Upload className="w-4 h-4 mr-2" />
                Update Logo
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Menu</CardTitle>
              <CardDescription>
                Configure your website navigation menu items
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {menuItems.map((item, index) => (
                <div key={index} className="flex gap-4 items-end p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor={`menu-label-${index}`}>Label</Label>
                    <Input
                      id={`menu-label-${index}`}
                      value={item.label}
                      onChange={(e) => updateMenuItem(index, 'label', e.target.value)}
                      placeholder="Menu item label"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`menu-url-${index}`}>URL</Label>
                    <Input
                      id={`menu-url-${index}`}
                      value={item.url}
                      onChange={(e) => updateMenuItem(index, 'url', e.target.value)}
                      placeholder="/page-url"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={item.active}
                      onCheckedChange={(checked) => updateMenuItem(index, 'active', checked)}
                    />
                    <Label>Active</Label>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeMenuItem(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              <div className="flex gap-4">
                <Button onClick={addMenuItem} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Menu Item
                </Button>
                <Button onClick={saveHeaderSettings} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Navigation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Settings</CardTitle>
              <CardDescription>
                Configure search functionality and appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={headerSettings.search_enabled === 'true'}
                  onCheckedChange={(checked) => setHeaderSettings(prev => ({
                    ...prev,
                    search_enabled: checked.toString()
                  }))}
                />
                <Label>Enable Search</Label>
              </div>
              
              <div>
                <Label htmlFor="search-placeholder">Search Placeholder Text</Label>
                <Input
                  id="search-placeholder"
                  value={headerSettings.search_placeholder}
                  onChange={(e) => setHeaderSettings(prev => ({
                    ...prev,
                    search_placeholder: e.target.value
                  }))}
                  placeholder="Enter placeholder text"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Search Preview</Label>
                <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                  {headerSettings.search_enabled === 'true' ? (
                    <Input
                      placeholder={headerSettings.search_placeholder}
                      disabled
                      className="bg-white"
                    />
                  ) : (
                    <div className="text-gray-500 text-sm">Search is disabled</div>
                  )}
                </div>
              </div>

              <Button onClick={updateSearchSettings} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                Update Search Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;

