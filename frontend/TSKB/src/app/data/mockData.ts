// Mock data for the Technical Support Knowledge Base System

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  articleCount: number;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  categoryId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  rating: number;
  feedbackCount: number;
  attachments?: string[];
}

export interface Feedback {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  helpful: boolean;
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@techsupport.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '4',
    name: 'Mike Wilson',
    email: 'mike.w@company.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-01-05',
  },
  {
    id: '5',
    name: 'Emily Davis',
    email: 'emily.d@company.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-12-20',
  },
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Hardware Issues',
    description: 'Computer hardware troubleshooting and repairs',
    icon: 'Cpu',
    articleCount: 24,
  },
  {
    id: '2',
    name: 'Software Problems',
    description: 'Software installation, updates, and errors',
    icon: 'Code',
    articleCount: 38,
  },
  {
    id: '3',
    name: 'Network Issues',
    description: 'Network connectivity and configuration',
    icon: 'Network',
    articleCount: 19,
  },
  {
    id: '4',
    name: 'Security',
    description: 'Security policies and antivirus solutions',
    icon: 'Shield',
    articleCount: 15,
  },
  {
    id: '5',
    name: 'Email & Communication',
    description: 'Email client setup and troubleshooting',
    icon: 'Mail',
    articleCount: 12,
  },
  {
    id: '6',
    name: 'Account Management',
    description: 'User accounts and password resets',
    icon: 'User',
    articleCount: 8,
  },
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'How to Fix Computer Won\'t Turn On',
    summary: 'Step-by-step guide to diagnose and fix power issues',
    content: `# Computer Won't Turn On - Troubleshooting Guide

## Problem Description
Your computer does not power on when you press the power button.

## Solution Steps

### Step 1: Check Power Connection
- Ensure the power cable is securely connected to both the computer and wall outlet
- Try a different power outlet to rule out outlet issues
- Check if the power strip is turned on (if using one)

### Step 2: Check Power Supply
- Look for LED lights on the motherboard
- Listen for fan noise when pressing the power button
- If using a laptop, try removing and reinserting the battery

### Step 3: Reset the System
- Unplug the computer
- Hold the power button for 30 seconds
- Reconnect power and try again

### Step 4: Check Internal Components
- Ensure RAM modules are properly seated
- Check all internal cable connections
- Remove and reseat graphics card if applicable

## Prevention Tips
- Use a surge protector
- Keep the system clean from dust
- Ensure proper ventilation

## When to Escalate
If none of these steps work, the issue may require hardware replacement. Contact IT support for further assistance.`,
    categoryId: '1',
    severity: 'high',
    tags: ['power', 'hardware', 'boot'],
    authorId: '1',
    authorName: 'Admin User',
    createdAt: '2026-01-15',
    updatedAt: '2026-02-08',
    views: 1245,
    rating: 4.5,
    feedbackCount: 32,
    attachments: ['power-supply-diagram.pdf', 'motherboard-guide.pdf'],
  },
  {
    id: '2',
    title: 'Windows 11 Update Error 0x80070002',
    summary: 'Resolve Windows Update error code 0x80070002',
    content: `# Windows Update Error 0x80070002

## Error Description
Windows Update fails with error code 0x80070002 - files required by Windows Update are missing or corrupted.

## Solution

### Method 1: Run Windows Update Troubleshooter
1. Open Settings > System > Troubleshoot
2. Select "Windows Update" troubleshooter
3. Click "Run" and follow the prompts
4. Restart your computer

### Method 2: Clear Windows Update Cache
1. Stop Windows Update service:
   - Open Services (services.msc)
   - Find "Windows Update"
   - Right-click and select "Stop"

2. Delete cache files:
   - Navigate to C:\\Windows\\SoftwareDistribution
   - Delete all contents

3. Restart Windows Update service

### Method 3: System File Checker
Run these commands in Command Prompt (Admin):
\`\`\`
sfc /scannow
DISM /Online /Cleanup-Image /RestoreHealth
\`\`\`

## Additional Tips
- Ensure sufficient disk space (at least 20GB free)
- Temporarily disable antivirus software
- Check internet connection stability

## Expected Results
After following these steps, Windows Update should function normally. Update may take 30-60 minutes depending on size.`,
    categoryId: '2',
    severity: 'medium',
    tags: ['windows', 'update', 'error'],
    authorId: '1',
    authorName: 'Admin User',
    createdAt: '2026-01-20',
    updatedAt: '2026-02-05',
    views: 892,
    rating: 4.7,
    feedbackCount: 28,
  },
  {
    id: '3',
    title: 'Unable to Connect to WiFi Network',
    summary: 'Troubleshoot WiFi connectivity issues on Windows',
    content: `# WiFi Connection Problems

## Symptoms
- WiFi network not showing up in available networks
- Cannot connect to WiFi network
- Connected but no internet access

## Quick Fixes

### Solution 1: Restart Network Adapter
1. Right-click network icon in system tray
2. Open Network & Internet settings
3. Click "Advanced network settings"
4. Find your WiFi adapter and click "Disable"
5. Wait 10 seconds, then click "Enable"

### Solution 2: Forget and Reconnect
1. Go to Settings > Network & Internet > WiFi
2. Click "Manage known networks"
3. Select your network and click "Forget"
4. Reconnect and enter password again

### Solution 3: Reset Network Settings
Run in Command Prompt (Admin):
\`\`\`
netsh winsock reset
netsh int ip reset
ipconfig /release
ipconfig /renew
ipconfig /flushdns
\`\`\`
Restart your computer after running these commands.

### Solution 4: Update WiFi Driver
1. Open Device Manager
2. Expand "Network adapters"
3. Right-click WiFi adapter
4. Select "Update driver"
5. Choose "Search automatically for drivers"

## Router Issues
If multiple devices cannot connect:
- Restart your router (unplug for 30 seconds)
- Check if router firmware needs updating
- Verify WiFi password hasn't changed

## Contact Support If:
- Problem persists after all steps
- Other devices connect successfully
- Physical damage to WiFi adapter suspected`,
    categoryId: '3',
    severity: 'medium',
    tags: ['wifi', 'network', 'connectivity'],
    authorId: '1',
    authorName: 'Admin User',
    createdAt: '2026-01-25',
    updatedAt: '2026-02-10',
    views: 1567,
    rating: 4.8,
    feedbackCount: 45,
  },
  {
    id: '4',
    title: 'Password Reset Procedure',
    summary: 'How to reset your account password',
    content: `# Account Password Reset Guide

## Self-Service Password Reset

### Prerequisites
- Valid employee email address
- Access to registered mobile phone or alternate email

### Steps

1. **Navigate to Login Page**
   - Go to portal.company.com
   - Click "Forgot Password?"

2. **Verify Identity**
   - Enter your employee email address
   - Click "Send Verification Code"
   - Check your email or phone for 6-digit code

3. **Enter Verification Code**
   - Input the code received
   - Code expires in 10 minutes

4. **Create New Password**
   Requirements:
   - Minimum 12 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character (@, #, $, etc.)
   - Cannot be same as last 5 passwords

5. **Confirm Password**
   - Re-enter new password
   - Click "Reset Password"

## Password Best Practices
- Use a unique password for work accounts
- Consider using a password manager
- Never share your password
- Change password immediately if compromised

## Locked Account
If your account is locked after multiple failed attempts:
- Wait 30 minutes for automatic unlock
- OR contact IT Support for immediate unlock

## Need Help?
Contact IT Support:
- Phone: ext. 5555
- Email: itsupport@company.com
- Available: Mon-Fri, 8 AM - 6 PM`,
    categoryId: '6',
    severity: 'low',
    tags: ['password', 'account', 'access'],
    authorId: '1',
    authorName: 'Admin User',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-01',
    views: 2341,
    rating: 4.9,
    feedbackCount: 67,
  },
  {
    id: '5',
    title: 'Email Not Sending in Outlook',
    summary: 'Fix common Outlook email sending issues',
    content: `# Outlook Email Sending Problems

## Common Causes
- Outbox stuck with pending emails
- SMTP server configuration issues
- Large attachments exceeding size limits
- Network connectivity problems

## Solutions

### Check Outbox
1. Open Outlook
2. Click on "Outbox" folder
3. If emails are stuck, try:
   - Click Send/Receive All Folders
   - Delete and recreate the email
   - Remove large attachments

### Verify Account Settings
1. File > Account Settings > Account Settings
2. Select your email account
3. Click "Change"
4. Click "More Settings" > "Outgoing Server" tab
5. Ensure "My outgoing server (SMTP) requires authentication" is checked

### Check Offline Mode
- Look for "Working Offline" at bottom of Outlook
- If showing offline, click to reconnect
- Or go to Send/Receive tab > Work Offline to toggle

### Large Attachments
- Maximum attachment size: 25 MB
- For larger files, use file sharing service
- Compress files before attaching

### Test Email Settings
1. Go to File > Account Settings
2. Select account and click "Test Account Settings"
3. Review results for errors

### Clear Outlook Cache
1. Close Outlook completely
2. Press Windows + R
3. Type: outlook.exe /cleanviews
4. Press Enter

## Prevention
- Regularly clear Sent Items folder
- Keep Outlook updated
- Don't attach excessively large files
- Archive old emails periodically

## Still Not Working?
Contact IT Support with:
- Screenshots of error messages
- Size of email and attachments
- When the problem started`,
    categoryId: '5',
    severity: 'medium',
    tags: ['outlook', 'email', 'smtp'],
    authorId: '1',
    authorName: 'Admin User',
    createdAt: '2026-02-03',
    updatedAt: '2026-02-09',
    views: 734,
    rating: 4.6,
    feedbackCount: 19,
  },
  {
    id: '6',
    title: 'Antivirus Installation and Setup',
    summary: 'Complete guide to installing company antivirus software',
    content: `# Company Antivirus Installation Guide

## Required Software
All company devices must have approved antivirus installed: **SecureGuard Enterprise**

## Download & Installation

### Step 1: Download
1. Go to portal.company.com/downloads
2. Log in with your credentials
3. Navigate to "Security Software"
4. Download SecureGuard Enterprise (latest version)

### Step 2: Pre-Installation
- Close all applications
- Uninstall any existing antivirus software
- Restart computer if prompted

### Step 3: Installation
1. Run downloaded installer (SecureGuardSetup.exe)
2. Accept license agreement
3. Select "Complete Installation"
4. Enter company license key: XXXXX-XXXXX-XXXXX
5. Click "Install"
6. Wait for installation (approximately 5 minutes)

### Step 4: Configuration
1. Launch SecureGuard after installation
2. Click "Company Policy Setup"
3. Enter your employee ID
4. Allow automatic policy configuration
5. Restart computer when prompted

## Verification
After restart, verify:
- SecureGuard icon appears in system tray
- Real-time protection is ON (green shield)
- Last update: within 24 hours
- Firewall is enabled

## Scheduled Scans
Default schedule:
- Quick scan: Daily at 10 AM
- Full scan: Weekly on Sunday at 2 AM

## What to Do If...

### Installation Fails
1. Check internet connection
2. Verify sufficient disk space (minimum 2GB)
3. Run installer as Administrator
4. Contact IT Support if issue persists

### License Key Invalid
- Verify you copied the entire key
- Check for extra spaces
- Ensure you're using company-issued key
- Contact IT for new key if needed

### Conflicts with Other Software
SecureGuard may need exceptions for:
- Development tools
- Database servers
- Virtual machines

Contact IT Support to configure exceptions.

## Support
IT Security Team
- Email: security@company.com
- Phone: ext. 5500
- Emergency: 24/7 security hotline`,
    categoryId: '4',
    severity: 'critical',
    tags: ['antivirus', 'security', 'installation'],
    authorId: '1',
    authorName: 'Admin User',
    createdAt: '2026-02-05',
    updatedAt: '2026-02-08',
    views: 456,
    rating: 4.4,
    feedbackCount: 12,
  },
  {
    id: '7',
    title: 'Blue Screen of Death (BSOD) Troubleshooting',
    summary: 'Diagnose and fix Windows BSOD errors',
    content: `# Blue Screen of Death (BSOD) Solutions

## What is BSOD?
A Blue Screen of Death is a critical system error that forces Windows to shut down to prevent damage.

## Common Error Codes
- SYSTEM_THREAD_EXCEPTION_NOT_HANDLED
- PAGE_FAULT_IN_NONPAGED_AREA
- IRQL_NOT_LESS_OR_EQUAL
- DRIVER_IRQL_NOT_LESS_OR_EQUAL
- CRITICAL_PROCESS_DIED

## Immediate Actions

### 1. Note the Error Code
- Write down the STOP code (e.g., 0x0000007E)
- Note any file names mentioned
- Take a photo if possible

### 2. Safe Mode Boot
1. Restart and press F8 repeatedly
2. Select "Safe Mode with Networking"
3. If Windows loads, problem is likely a driver or software

### 3. Check Recent Changes
- Did you install new software?
- Did you install new hardware?
- Did Windows update recently?

## Solutions

### Update Drivers
1. Open Device Manager
2. Look for devices with yellow exclamation marks
3. Right-click and select "Update driver"
4. Focus on: graphics, network, and chipset drivers

### Run Memory Diagnostic
1. Type "Windows Memory Diagnostic" in search
2. Select "Restart now and check for problems"
3. Wait for scan to complete (may take 20 minutes)
4. Review results after restart

### Check Disk Errors
Run in Command Prompt (Admin):
\`\`\`
chkdsk C: /f /r
\`\`\`
This will schedule a disk check on next restart.

### System File Checker
\`\`\`
sfc /scannow
DISM /Online /Cleanup-Image /RestoreHealth
\`\`\`

### Check for Overheating
- Ensure fans are working
- Clean dust from vents
- Monitor CPU temperature using HWMonitor

### Uninstall Recent Updates
1. Settings > Windows Update > Update history
2. Uninstall updates installed before BSOD started
3. Restart and test stability

### System Restore
1. Type "Create a restore point" in search
2. Click "System Restore"
3. Select a date before BSODs started
4. Follow wizard to restore

## Hardware Issues

### RAM Problems
- Reseat RAM modules
- Test one module at a time
- Run MemTest86 for thorough testing

### Hard Drive Failure
Signs of failing drive:
- Clicking or grinding noises
- Slow performance
- Multiple BSOD errors
- SMART errors in Event Viewer

**Action:** Backup data immediately and replace drive

### Overclocking
If you've overclocked:
- Reset BIOS to default settings
- Remove overclock on CPU/GPU/RAM

## When to Contact Support
- BSODs occur multiple times daily
- Error persists after all troubleshooting
- Hardware replacement needed
- Data recovery required

## Information to Provide
- Complete STOP code
- Minidump files (C:\\Windows\\Minidump)
- Recent software/hardware changes
- Frequency of BSODs`,
    categoryId: '1',
    severity: 'critical',
    tags: ['bsod', 'crash', 'windows'],
    authorId: '1',
    authorName: 'Admin User',
    createdAt: '2026-02-07',
    updatedAt: '2026-02-11',
    views: 987,
    rating: 4.7,
    feedbackCount: 34,
  },
  {
    id: '8',
    title: 'VPN Connection Setup',
    summary: 'Configure and troubleshoot company VPN access',
    content: `# Company VPN Setup Guide

## What is VPN?
Virtual Private Network allows secure remote access to company resources.

## Requirements
- Company laptop or approved device
- Active employee account
- VPN client software
- Stable internet connection

## Installation

### Step 1: Download VPN Client
1. Visit portal.company.com/vpn
2. Download "CompanyVPN Client"
3. Save to Downloads folder

### Step 2: Install Client
1. Run CompanyVPN_Setup.exe
2. Accept license agreement
3. Keep default installation location
4. Complete installation
5. Restart if prompted

### Step 3: Configuration
1. Launch CompanyVPN
2. Click "Add Connection"
3. Enter connection details:
   - **Name:** Company HQ
   - **Server:** vpn.company.com
   - **Port:** 443
   - **Protocol:** IKEv2
4. Click "Save"

## Connecting to VPN

1. Open CompanyVPN application
2. Select "Company HQ"
3. Click "Connect"
4. Enter credentials:
   - Username: your employee email
   - Password: your account password
5. If prompted, approve MFA notification on phone
6. Wait for connection (green indicator)

## Verification
Once connected, verify:
- VPN icon shows "Connected"
- Can access internal resources
- IP address shows company range

## Troubleshooting

### Cannot Connect
**Check Internet Connection**
- Ensure you have working internet
- Try accessing external websites

**Verify Credentials**
- Confirm username and password
- Check if account is locked
- Reset password if needed

**Firewall Issues**
- Disable firewall temporarily to test
- Add VPN client to firewall exceptions
- Port 443 must be open

### Slow VPN Speed
- Close unnecessary applications
- Disconnect other devices on network
- Try different VPN server (if available)
- Check local internet speed

### Frequent Disconnections
- Update VPN client to latest version
- Change power settings to High Performance
- Disable WiFi power saving mode
- Use wired connection if possible

### MFA Issues
- Ensure phone has signal/data
- Check authenticator app is working
- Request backup codes from IT

## Best Practices
- Always connect to VPN when working remotely
- Disconnect when not accessing company resources
- Don't share VPN credentials
- Report connection issues immediately
- Keep VPN client updated

## Split Tunneling
By default, all internet traffic goes through VPN. To access local resources:
1. Open VPN settings
2. Enable "Split Tunneling"
3. Add local network ranges

**Note:** This may be disabled by company policy.

## Remote Desktop via VPN
Once connected to VPN:
1. Open Remote Desktop Connection
2. Enter: computername.company.local
3. Enter credentials
4. Access your work computer remotely

## Support
VPN Support Team
- Email: vpn-support@company.com
- Phone: ext. 5600
- Available: 24/7

## Common Error Codes
- **Error 691:** Wrong username/password
- **Error 807:** Network interrupted
- **Error 809:** Port blocked by firewall
- **Error 789:** Wrong encryption level`,
    categoryId: '3',
    severity: 'high',
    tags: ['vpn', 'network', 'remote'],
    authorId: '1',
    authorName: 'Admin User',
    createdAt: '2026-02-09',
    updatedAt: '2026-02-10',
    views: 623,
    rating: 4.5,
    feedbackCount: 21,
  },
];

export const mockFeedback: Feedback[] = [
  {
    id: '1',
    articleId: '1',
    userId: '4',
    userName: 'Mike Wilson',
    rating: 5,
    comment: 'This guide helped me fix my computer! The step-by-step instructions were very clear.',
    helpful: true,
    createdAt: '2026-02-09',
  },
  {
    id: '2',
    articleId: '1',
    userId: '5',
    userName: 'Emily Davis',
    rating: 4,
    comment: 'Good guide, but I wish there were more pictures showing the internal components.',
    helpful: true,
    createdAt: '2026-02-10',
  },
  {
    id: '3',
    articleId: '3',
    userId: '4',
    userName: 'Mike Wilson',
    rating: 5,
    comment: 'Fixed my WiFi issue in 5 minutes! Forgetting and reconnecting to the network worked.',
    helpful: true,
    createdAt: '2026-02-11',
  },
  {
    id: '4',
    articleId: '4',
    userId: '5',
    userName: 'Emily Davis',
    rating: 5,
    comment: 'Very straightforward password reset process. Thank you!',
    helpful: true,
    createdAt: '2026-02-11',
  },
];

export const mockAnalytics = {
  totalArticles: 124,
  totalViews: 15678,
  totalUsers: 342,
  avgRating: 4.6,
  topSearchedIssues: [
    { issue: 'Password Reset', count: 234 },
    { issue: 'WiFi Connection', count: 198 },
    { issue: 'Email Problems', count: 167 },
    { issue: 'VPN Setup', count: 145 },
    { issue: 'Software Installation', count: 123 },
  ],
  categoryDistribution: [
    { name: 'Software', value: 38 },
    { name: 'Hardware', value: 24 },
    { name: 'Network', value: 19 },
    { name: 'Security', value: 15 },
    { name: 'Email', value: 12 },
    { name: 'Account', value: 8 },
  ],
  monthlyViews: [
    { month: 'Aug', views: 1234 },
    { month: 'Sep', views: 1456 },
    { month: 'Oct', views: 1678 },
    { month: 'Nov', views: 1890 },
    { month: 'Dec', views: 2123 },
    { month: 'Jan', views: 2345 },
    { month: 'Feb', views: 2567 },
  ],
  userActivity: [
    { date: '2026-02-05', searches: 45, views: 123 },
    { date: '2026-02-06', searches: 52, views: 145 },
    { date: '2026-02-07', searches: 38, views: 98 },
    { date: '2026-02-08', searches: 61, views: 167 },
    { date: '2026-02-09', searches: 49, views: 134 },
    { date: '2026-02-10', searches: 55, views: 152 },
    { date: '2026-02-11', searches: 58, views: 159 },
  ],
};
