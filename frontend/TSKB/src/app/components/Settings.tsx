import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Mail,
  Globe,
  Save
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export const Settings: React.FC = () => {
  const { currentUser } = useAuth();
  const { theme, setTheme } = useTheme();

  if (currentUser?.role !== 'admin') {
    return (
      <div className="p-8 text-center">
        <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-foreground">Access Denied</h2>
        <p className="text-muted-foreground mt-2">Only administrators can access system settings.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">System Settings</h2>
        <p className="text-muted-foreground mt-1">Configure system preferences and options</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input 
                id="siteName" 
                defaultValue="TechSupport KB" 
                placeholder="Enter site name"
              />
            </div>
            <div>
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input 
                id="siteUrl" 
                defaultValue="https://kb.company.com" 
                placeholder="Enter site URL"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Site Description</Label>
            <Input 
              id="description" 
              defaultValue="Technical Support Knowledge Base System" 
              placeholder="Enter site description"
            />
          </div>

          <div>
            <Label htmlFor="language">Default Language</Label>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select defaultValue="utc">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">Eastern Time (EST)</SelectItem>
                <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                <SelectItem value="cst">Central Time (CST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input 
                id="smtpHost" 
                placeholder="smtp.gmail.com" 
              />
            </div>
            <div>
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input 
                id="smtpPort" 
                type="number"
                placeholder="587" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="smtpUser">SMTP Username</Label>
              <Input 
                id="smtpUser" 
                placeholder="your-email@company.com" 
              />
            </div>
            <div>
              <Label htmlFor="smtpPassword">SMTP Password</Label>
              <Input 
                id="smtpPassword" 
                type="password"
                placeholder="Enter password" 
              />
            </div>
          </div>

          <div>
            <Label htmlFor="fromEmail">From Email Address</Label>
            <Input 
              id="fromEmail" 
              placeholder="support@company.com" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email updates for new feedback</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New Article Alerts</Label>
              <p className="text-sm text-muted-foreground">Notify users when new articles are published</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">Send weekly analytics reports to admins</p>
            </div>
            <Switch />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Low Rating Alerts</Label>
              <p className="text-sm text-muted-foreground">Alert when articles receive low ratings</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
            </div>
            <Switch />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Session Timeout</Label>
              <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          
          <div>
            <Label htmlFor="sessionDuration">Session Duration (minutes)</Label>
            <Input 
              id="sessionDuration" 
              type="number"
              defaultValue="30"
              className="mt-2"
            />
          </div>
          
          <Separator />
          
          <div>
            <Label htmlFor="passwordPolicy">Password Minimum Length</Label>
            <Input 
              id="passwordPolicy" 
              type="number"
              defaultValue="12"
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">Temporarily disable site access</p>
            </div>
            <Switch />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Article Versioning</Label>
              <p className="text-sm text-muted-foreground">Keep history of article changes</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-Backup</Label>
              <p className="text-sm text-muted-foreground">Daily automatic database backup</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          
          <div>
            <Label htmlFor="maxFileSize">Max Upload Size (MB)</Label>
            <Input 
              id="maxFileSize" 
              type="number"
              defaultValue="10"
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={(v: any) => setTheme(v)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">Auto (System)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="articlesPerPage">Articles Per Page</Label>
            <Select defaultValue="10">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Article Views</Label>
              <p className="text-sm text-muted-foreground">Display view count on articles</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

