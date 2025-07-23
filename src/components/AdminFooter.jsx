import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, RefreshCw, Globe, Mail, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const AdminFooter = () => {
  const [footerSettings, setFooterSettings] = useState({
    company_name: 'ACCS market.com',
    company_description: 'Buy or Sell Social Media Accounts (PVA & Cheap). Your trusted marketplace for social media accounts.',
    logo_text: 'ACCS',
    logo_suffix: 'market.com',
    social_link_1: '#',
    social_link_1_icon: 'Globe',
    social_link_2: '#',
    social_link_2_icon: 'Mail',
    social_link_3: '#',
    social_link_3_icon: 'MessageCircle',
    quick_links: '[]',
    support_links: '[]',
    contact_email: 'support@accsmarket.com',
    contact_website: 'accsmarket.news',
    support_text: '24/7 Support Available',
    security_text: 'Secure Transactions',
    copyright_text: '© 2024 AccsMarket.com. All rights reserved.',
    payment_methods: '[]',
    background_color: 'bg-gray-800',
    text_color: 'text-white'
  });
  
  const [quickLinks, setQuickLinks] = useState([]);
  const [supportLinks, setSupportLinks] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFooterSettings();
  }, []);

  const loadFooterSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/footer');
      const data = await response.json();
      
      if (data.success) {
        setFooterSettings(data.data);
        
        // Parse JSON strings
        try {
          setQuickLinks(JSON.parse(data.data.quick_links || '[]'));
          setSupportLinks(JSON.parse(data.data.support_links || '[]'));
          setPaymentMethods(JSON.parse(data.data.payment_methods || '[]'));
        } catch (e) {
          console.error('Error parsing JSON:', e);
          setQuickLinks([]);
          setSupportLinks([]);
          setPaymentMethods([]);
        }
      } else {
        toast.error('Failed to load footer settings');
      }
    } catch (error) {
      console.error('Error loading footer settings:', error);
      toast.error('Error loading footer settings');
    } finally {
      setLoading(false);
    }
  };

  const saveFooterSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/footer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...footerSettings,
          quick_links: quickLinks,
          support_links: supportLinks,
          payment_methods: paymentMethods
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Footer settings saved successfully');
      } else {
        toast.error(data.message || 'Failed to save footer settings');
      }
    } catch (error) {
      console.error('Error saving footer settings:', error);
      toast.error('Error saving footer settings');
    } finally {
      setLoading(false);
    }
  };

  const addQuickLink = () => {
    setQuickLinks([...quickLinks, { label: '', url: '' }]);
  };

  const removeQuickLink = (index) => {
    setQuickLinks(quickLinks.filter((_, i) => i !== index));
  };

  const updateQuickLink = (index, field, value) => {
    const updatedLinks = [...quickLinks];
    updatedLinks[index][field] = value;
    setQuickLinks(updatedLinks);
  };

  const addSupportLink = () => {
    setSupportLinks([...supportLinks, { label: '', url: '' }]);
  };

  const removeSupportLink = (index) => {
    setSupportLinks(supportLinks.filter((_, i) => i !== index));
  };

  const updateSupportLink = (index, field, value) => {
    const updatedLinks = [...supportLinks];
    updatedLinks[index][field] = value;
    setSupportLinks(updatedLinks);
  };

  const addPaymentMethod = () => {
    setPaymentMethods([...paymentMethods, '']);
  };

  const removePaymentMethod = (index) => {
    setPaymentMethods(paymentMethods.filter((_, i) => i !== index));
  };

  const updatePaymentMethod = (index, value) => {
    const updatedMethods = [...paymentMethods];
    updatedMethods[index] = value;
    setPaymentMethods(updatedMethods);
  };

  const getIconComponent = (iconName) => {
    const icons = {
      Globe: Globe,
      Mail: Mail,
      MessageCircle: MessageCircle
    };
    const Icon = icons[iconName] || Globe;
    return <Icon className="w-4 h-4" />;
  };

  if (loading && !footerSettings.company_name) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading footer settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Footer Management</h2>
          <p className="text-gray-600 mt-1">Manage footer content and settings</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadFooterSettings} variant="outline" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={saveFooterSettings} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            Save All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="links">Quick Links</TabsTrigger>
          <TabsTrigger value="support">Support Links</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="bottom">Footer Bottom</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Manage company logo, name, and description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logo-text">Logo Text</Label>
                  <Input
                    id="logo-text"
                    value={footerSettings.logo_text}
                    onChange={(e) => setFooterSettings(prev => ({
                      ...prev,
                      logo_text: e.target.value
                    }))}
                    placeholder="ACCS"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="logo-suffix">Logo Suffix</Label>
                  <Input
                    id="logo-suffix"
                    value={footerSettings.logo_suffix}
                    onChange={(e) => setFooterSettings(prev => ({
                      ...prev,
                      logo_suffix: e.target.value
                    }))}
                    placeholder="market.com"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={footerSettings.company_name}
                  onChange={(e) => setFooterSettings(prev => ({
                    ...prev,
                    company_name: e.target.value
                  }))}
                  placeholder="ACCS market.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="company-description">Company Description</Label>
                <Textarea
                  id="company-description"
                  value={footerSettings.company_description}
                  onChange={(e) => setFooterSettings(prev => ({
                    ...prev,
                    company_description: e.target.value
                  }))}
                  placeholder="Your company description"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label>Social Media Links</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getIconComponent(footerSettings[`social_link_${num}_icon`])}
                        <Label>Social Link {num}</Label>
                      </div>
                      <Input
                        value={footerSettings[`social_link_${num}`]}
                        onChange={(e) => setFooterSettings(prev => ({
                          ...prev,
                          [`social_link_${num}`]: e.target.value
                        }))}
                        placeholder="https://..."
                      />
                      <select
                        value={footerSettings[`social_link_${num}_icon`]}
                        onChange={(e) => setFooterSettings(prev => ({
                          ...prev,
                          [`social_link_${num}_icon`]: e.target.value
                        }))}
                        className="w-full p-2 border rounded"
                      >
                        <option value="Globe">Globe</option>
                        <option value="Mail">Mail</option>
                        <option value="MessageCircle">Message Circle</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>
                Manage quick navigation links in footer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickLinks.map((link, index) => (
                <div key={index} className="flex gap-4 items-end p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor={`quick-label-${index}`}>Label</Label>
                    <Input
                      id={`quick-label-${index}`}
                      value={link.label}
                      onChange={(e) => updateQuickLink(index, 'label', e.target.value)}
                      placeholder="Link label"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`quick-url-${index}`}>URL</Label>
                    <Input
                      id={`quick-url-${index}`}
                      value={link.url}
                      onChange={(e) => updateQuickLink(index, 'url', e.target.value)}
                      placeholder="/page-url"
                      className="mt-1"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeQuickLink(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              <Button onClick={addQuickLink} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Quick Link
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Support Links</CardTitle>
              <CardDescription>
                Manage support and help links in footer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {supportLinks.map((link, index) => (
                <div key={index} className="flex gap-4 items-end p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor={`support-label-${index}`}>Label</Label>
                    <Input
                      id={`support-label-${index}`}
                      value={link.label}
                      onChange={(e) => updateSupportLink(index, 'label', e.target.value)}
                      placeholder="Link label"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`support-url-${index}`}>URL</Label>
                    <Input
                      id={`support-url-${index}`}
                      value={link.url}
                      onChange={(e) => updateSupportLink(index, 'url', e.target.value)}
                      placeholder="/page-url"
                      className="mt-1"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSupportLink(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              <Button onClick={addSupportLink} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Support Link
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Manage contact details displayed in footer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    value={footerSettings.contact_email}
                    onChange={(e) => setFooterSettings(prev => ({
                      ...prev,
                      contact_email: e.target.value
                    }))}
                    placeholder="support@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-website">Website</Label>
                  <Input
                    id="contact-website"
                    value={footerSettings.contact_website}
                    onChange={(e) => setFooterSettings(prev => ({
                      ...prev,
                      contact_website: e.target.value
                    }))}
                    placeholder="example.com"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="support-text">Support Text</Label>
                  <Input
                    id="support-text"
                    value={footerSettings.support_text}
                    onChange={(e) => setFooterSettings(prev => ({
                      ...prev,
                      support_text: e.target.value
                    }))}
                    placeholder="24/7 Support Available"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="security-text">Security Text</Label>
                  <Input
                    id="security-text"
                    value={footerSettings.security_text}
                    onChange={(e) => setFooterSettings(prev => ({
                      ...prev,
                      security_text: e.target.value
                    }))}
                    placeholder="Secure Transactions"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bottom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Footer Bottom</CardTitle>
              <CardDescription>
                Manage copyright and payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="copyright-text">Copyright Text</Label>
                <Input
                  id="copyright-text"
                  value={footerSettings.copyright_text}
                  onChange={(e) => setFooterSettings(prev => ({
                    ...prev,
                    copyright_text: e.target.value
                  }))}
                  placeholder="© 2024 Company. All rights reserved."
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Payment Methods</Label>
                <div className="space-y-2 mt-2">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <Input
                        value={method}
                        onChange={(e) => updatePaymentMethod(index, e.target.value)}
                        placeholder="Payment method name"
                        className="flex-1"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removePaymentMethod(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button onClick={addPaymentMethod} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
                
                <div className="mt-4">
                  <Label>Preview:</Label>
                  <div className="flex space-x-2 mt-2">
                    {paymentMethods.map((method, index) => (
                      <Badge key={index} variant="secondary">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminFooter;

