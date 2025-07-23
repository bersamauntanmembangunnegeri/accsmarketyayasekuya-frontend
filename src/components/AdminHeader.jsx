import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Trash2, Plus, RefreshCw, Save } from 'lucide-react';
import { toast } from 'sonner';

const AdminHeader = () => {
  const [headerData, setHeaderData] = useState({
    newsBar: {
      enabled: true,
      text: 'News, promotions, coupons, announcements are published on our news site - accsmarket.news',
      backgroundColor: '#22c55e',
      textColor: '#ffffff',
      newsUrl: 'accsmarket.news'
    },
    logo: {
      url: '',
      altText: 'AccsMarket',
      logoText: 'ACCS',
      logoSuffix: 'market.com'
    },
    navigation: [
      { id: 1, label: 'Home', url: '/', active: true },
      { id: 2, label: 'News', url: '/news', active: true },
      { id: 3, label: 'FAQ', url: '/faq', active: true },
      { id: 4, label: 'Terms of use', url: '/terms', active: true }
    ],
    search: {
      enabled: true,
      placeholder: 'Search for accounts',
      advancedSearchEnabled: true
    }
  });

  const [loading, setLoading] = useState(false);

  const fetchHeaderData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/header');
      const data = await response.json();
      
      if (data.success) {
        // Map backend data to frontend structure
        const backendData = data.data;
        
        const mappedData = {
          newsBar: {
            enabled: backendData.header_newsbar_enabled === 'true',
            text: backendData.header_newsbar_text || 'News, promotions, coupons, announcements are published on our news site - accsmarket.news',
            backgroundColor: backendData.header_newsbar_bg_color || '#22c55e',
            textColor: backendData.header_newsbar_text_color || '#ffffff',
            newsUrl: backendData.header_newsbar_url || 'accsmarket.news'
          },
          logo: {
            url: backendData.header_logo_url || '',
            altText: backendData.header_logo_alt || 'AccsMarket',
            logoText: backendData.header_logo_text || 'ACCS',
            logoSuffix: backendData.header_logo_suffix || 'market.com'
          },
          navigation: JSON.parse(backendData.navigation_menu || '[{"id": 1, "label": "Home", "url": "/", "active": true}, {"id": 2, "label": "News", "url": "/news", "active": true}, {"id": 3, "label": "FAQ", "url": "/faq", "active": true}, {"id": 4, "label": "Terms of use", "url": "/terms", "active": true}]'),
          search: {
            enabled: backendData.search_enabled === 'true',
            placeholder: backendData.search_placeholder || 'Search for accounts',
            advancedSearchEnabled: backendData.search_advanced_enabled === 'true'
          }
        };
        
        setHeaderData(mappedData);
        toast.success('Header settings loaded successfully');
      } else {
        toast.error('Failed to load header settings');
      }
    } catch (error) {
      console.error('Error fetching header data:', error);
      toast.error('Error loading header settings');
    } finally {
      setLoading(false);
    }
  };

  const saveHeaderData = async () => {
    setLoading(true);
    try {
      // Map frontend data to backend structure
      const backendData = {
        header_newsbar_enabled: headerData.newsBar.enabled.toString(),
        header_newsbar_text: headerData.newsBar.text,
        header_newsbar_bg_color: headerData.newsBar.backgroundColor,
        header_newsbar_text_color: headerData.newsBar.textColor,
        header_newsbar_url: headerData.newsBar.newsUrl,
        header_logo_url: headerData.logo.url,
        header_logo_alt: headerData.logo.altText,
        header_logo_text: headerData.logo.logoText,
        header_logo_suffix: headerData.logo.logoSuffix,
        navigation_menu: JSON.stringify(headerData.navigation),
        search_placeholder: headerData.search.placeholder,
        search_enabled: headerData.search.enabled.toString(),
        search_advanced_enabled: headerData.search.advancedSearchEnabled.toString()
      };
      
      const response = await fetch('/api/admin/header', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Header settings saved successfully!');
      } else {
        toast.error(data.message || 'Failed to save header settings');
      }
    } catch (error) {
      console.error('Error saving header data:', error);
      toast.error('Error saving header settings');
    } finally {
      setLoading(false);
    }
  };

  const addNavigationItem = () => {
    const newItem = {
      id: Date.now(),
      label: '',
      url: '',
      active: true
    };
    setHeaderData(prev => ({
      ...prev,
      navigation: [...prev.navigation, newItem]
    }));
  };

  const removeNavigationItem = (id) => {
    setHeaderData(prev => ({
      ...prev,
      navigation: prev.navigation.filter(item => item.id !== id)
    }));
  };

  const updateNavigationItem = (id, field, value) => {
    setHeaderData(prev => ({
      ...prev,
      navigation: prev.navigation.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  useEffect(() => {
    fetchHeaderData();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Header Management</CardTitle>
          <CardDescription>Manage header content and settings</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchHeaderData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={saveHeaderData} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            Save All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="newsbar" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="newsbar">News Bar</TabsTrigger>
            <TabsTrigger value="logo">Logo Settings</TabsTrigger>
            <TabsTrigger value="navigation">Navigation Menu</TabsTrigger>
            <TabsTrigger value="search">Search Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="newsbar" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">News Bar Settings</h3>
              <p className="text-sm text-gray-600 mb-4">Configure the top news bar appearance and content</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newsbar-enabled">Enable News Bar</Label>
                  <Switch
                    id="newsbar-enabled"
                    checked={headerData.newsBar.enabled}
                    onCheckedChange={(checked) => 
                      setHeaderData(prev => ({
                        ...prev,
                        newsBar: { ...prev.newsBar, enabled: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="news-url">News Site URL</Label>
                  <Input
                    id="news-url"
                    value={headerData.newsBar.newsUrl}
                    onChange={(e) => 
                      setHeaderData(prev => ({
                        ...prev,
                        newsBar: { ...prev.newsBar, newsUrl: e.target.value }
                      }))
                    }
                    placeholder="accsmarket.news"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newsbar-text">News Bar Text</Label>
                <Textarea
                  id="newsbar-text"
                  value={headerData.newsBar.text}
                  onChange={(e) => 
                    setHeaderData(prev => ({
                      ...prev,
                      newsBar: { ...prev.newsBar, text: e.target.value }
                    }))
                  }
                  placeholder="Enter news bar text..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newsbar-bg">Background Color</Label>
                  <Input
                    id="newsbar-bg"
                    type="color"
                    value={headerData.newsBar.backgroundColor}
                    onChange={(e) => 
                      setHeaderData(prev => ({
                        ...prev,
                        newsBar: { ...prev.newsBar, backgroundColor: e.target.value }
                      }))
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newsbar-text-color">Text Color</Label>
                  <Input
                    id="newsbar-text-color"
                    type="color"
                    value={headerData.newsBar.textColor}
                    onChange={(e) => 
                      setHeaderData(prev => ({
                        ...prev,
                        newsBar: { ...prev.newsBar, textColor: e.target.value }
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="logo" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Logo Settings</h3>
              <p className="text-sm text-gray-600 mb-4">Upload and configure your website logo</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logo-text">Logo Text</Label>
                  <Input
                    id="logo-text"
                    value={headerData.logo.logoText}
                    onChange={(e) => 
                      setHeaderData(prev => ({
                        ...prev,
                        logo: { ...prev.logo, logoText: e.target.value }
                      }))
                    }
                    placeholder="ACCS"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo-suffix">Logo Suffix</Label>
                  <Input
                    id="logo-suffix"
                    value={headerData.logo.logoSuffix}
                    onChange={(e) => 
                      setHeaderData(prev => ({
                        ...prev,
                        logo: { ...prev.logo, logoSuffix: e.target.value }
                      }))
                    }
                    placeholder="market.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-url">Logo URL</Label>
                <Input
                  id="logo-url"
                  value={headerData.logo.url}
                  onChange={(e) => 
                    setHeaderData(prev => ({
                      ...prev,
                      logo: { ...prev.logo, url: e.target.value }
                    }))
                  }
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-alt">Logo Alt Text</Label>
                <Input
                  id="logo-alt"
                  value={headerData.logo.altText}
                  onChange={(e) => 
                    setHeaderData(prev => ({
                      ...prev,
                      logo: { ...prev.logo, altText: e.target.value }
                    }))
                  }
                  placeholder="Your website name"
                />
              </div>

              <div className="space-y-2">
                <Label>Logo Preview</Label>
                <div className="p-4 border rounded-lg bg-gray-50">
                  {headerData.logo.url ? (
                    <img src={headerData.logo.url} alt={headerData.logo.altText} className="h-12" />
                  ) : (
                    <div className="flex items-center space-x-1">
                      <span className="bg-red-600 text-white px-2 py-1 rounded font-bold">
                        {headerData.logo.logoText}
                      </span>
                      <span className="text-gray-800 font-medium">
                        {headerData.logo.logoSuffix}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation Menu</h3>
              <p className="text-sm text-gray-600 mb-4">Configure your website navigation menu items</p>
              
              <div className="space-y-4">
                {headerData.navigation.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-end p-4 border rounded-lg">
                    <div className="col-span-4">
                      <Label>Label</Label>
                      <Input
                        value={item.label}
                        onChange={(e) => updateNavigationItem(item.id, 'label', e.target.value)}
                        placeholder="Menu item label"
                      />
                    </div>
                    
                    <div className="col-span-4">
                      <Label>URL</Label>
                      <Input
                        value={item.url}
                        onChange={(e) => updateNavigationItem(item.id, 'url', e.target.value)}
                        placeholder="/page-url"
                      />
                    </div>
                    
                    <div className="col-span-2 flex items-center space-x-2">
                      <Switch
                        checked={item.active}
                        onCheckedChange={(checked) => updateNavigationItem(item.id, 'active', checked)}
                      />
                      <Label className="text-sm">Active</Label>
                    </div>
                    
                    <div className="col-span-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeNavigationItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button onClick={addNavigationItem} variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Menu Item
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="search" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Search Settings</h3>
              <p className="text-sm text-gray-600 mb-4">Configure search functionality and appearance</p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={headerData.search.enabled}
                    onCheckedChange={(checked) => 
                      setHeaderData(prev => ({
                        ...prev,
                        search: { ...prev.search, enabled: checked }
                      }))
                    }
                  />
                  <Label>Enable Search</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="search-placeholder">Search Placeholder Text</Label>
                  <Input
                    id="search-placeholder"
                    value={headerData.search.placeholder}
                    onChange={(e) => 
                      setHeaderData(prev => ({
                        ...prev,
                        search: { ...prev.search, placeholder: e.target.value }
                      }))
                    }
                    placeholder="Enter placeholder text"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={headerData.search.advancedSearchEnabled}
                    onCheckedChange={(checked) => 
                      setHeaderData(prev => ({
                        ...prev,
                        search: { ...prev.search, advancedSearchEnabled: checked }
                      }))
                    }
                  />
                  <Label>Enable Advanced Search</Label>
                </div>

                <div className="space-y-2">
                  <Label>Search Preview</Label>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex space-x-2">
                      <Input
                        value={headerData.search.placeholder}
                        disabled
                        className="flex-1"
                      />
                      {headerData.search.advancedSearchEnabled && (
                        <Button disabled size="sm">
                          🔍 Advanced search
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminHeader;

