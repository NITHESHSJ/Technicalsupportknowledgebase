require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Article = require('./models/Article');
const Category = require('./models/Category');

const seedUsers = [
  {
    name: 'Nithesh Admin',
    email: 'nithesh.ec23@bitsathy.ac.in',
    password: 'admin123',
    role: 'admin',
    status: 'active'
  },
  {
    name: 'Mike Wilson',
    email: 'mike.w@company.com',
    password: 'user123',
    role: 'user',
    status: 'active'
  }
];

const mockArticlesData = [
  {
    title: 'How to Fix Computer Won\'t Turn On',
    summary: 'Step-by-step guide to diagnose and fix power issues',
    content: `# Computer Won't Turn On - Troubleshooting Guide\n\n## Problem Description\nYour computer does not power on when you press the power button.\n\n## Solution Steps\n\n### Step 1: Check Power Connection\n- Ensure the power cable is securely connected to both the computer and wall outlet\n- Try a different power outlet to rule out outlet issues\n- Check if the power strip is turned on (if using one)\n\n### Step 2: Check Power Supply\n- Look for LED lights on the motherboard\n- Listen for fan noise when pressing the power button\n- If using a laptop, try removing and reinserting the battery\n\n### Step 3: Reset the System\n- Unplug the computer\n- Hold the power button for 30 seconds\n- Reconnect power and try again\n\n### Step 4: Check Internal Components\n- Ensure RAM modules are properly seated\n- Check all internal cable connections\n- Remove and reseat graphics card if applicable\n\n## Prevention Tips\n- Use a surge protector\n- Keep the system clean from dust\n- Ensure proper ventilation\n\n## When to Escalate\nIf none of these steps work, the issue may require hardware replacement. Contact IT support for further assistance.`,
    categoryId: '1',
    severity: 'high',
    tags: ['power', 'hardware', 'boot'],
    views: 1245,
    rating: 4.5,
    feedbackCount: 32
  },
  {
    title: 'Windows 11 Update Error 0x80070002',
    summary: 'Resolve Windows Update error code 0x80070002',
    content: `# Windows Update Error 0x80070002\n\n## Error Description\nWindows Update fails with error code 0x80070002 - files required by Windows Update are missing or corrupted.\n\n## Solution\n\n### Method 1: Run Windows Update Troubleshooter\n1. Open Settings > System > Troubleshoot\n2. Select "Windows Update" troubleshooter\n3. Click "Run" and follow the prompts\n4. Restart your computer\n\n### Method 2: Clear Windows Update Cache\n1. Stop Windows Update service:\n   - Open Services (services.msc)\n   - Find "Windows Update"\n   - Right-click and select "Stop"\n\n2. Delete cache files:\n   - Navigate to C:\\Windows\\SoftwareDistribution\n   - Delete all contents\n\n3. Restart Windows Update service\n\n### Method 3: System File Checker\nRun these commands in Command Prompt (Admin):\n\`\`\`\nsfc /scannow\nDISM /Online /Cleanup-Image /RestoreHealth\n\`\`\`\n\n## Additional Tips\n- Ensure sufficient disk space (at least 20GB free)\n- Temporarily disable antivirus software\n- Check internet connection stability\n\n## Expected Results\nAfter following these steps, Windows Update should function normally. Update may take 30-60 minutes depending on size.`,
    categoryId: '2',
    severity: 'medium',
    tags: ['windows', 'update', 'error'],
    views: 892,
    rating: 4.7,
    feedbackCount: 28
  },
  {
    title: 'Unable to Connect to WiFi Network',
    summary: 'Troubleshoot WiFi connectivity issues on Windows',
    content: `# WiFi Connection Problems\n\n## Symptoms\n- WiFi network not showing up in available networks\n- Cannot connect to WiFi network\n- Connected but no internet access\n\n## Quick Fixes\n\n### Solution 1: Restart Network Adapter\n1. Right-click network icon in system tray\n2. Open Network & Internet settings\n3. Click "Advanced network settings"\n4. Find your WiFi adapter and click "Disable"\n5. Wait 10 seconds, then click "Enable"\n\n### Solution 2: Forget and Reconnect\n1. Go to Settings > Network & Internet > WiFi\n2. Click "Manage known networks"\n3. Select your network and click "Forget"\n4. Reconnect and enter password again\n\n### Solution 3: Reset Network Settings\nRun in Command Prompt (Admin):\n\`\`\`\nnetsh winsock reset\nnetsh int ip reset\nipconfig /release\nipconfig /renew\nipconfig /flushdns\n\`\`\`\nRestart your computer after running these commands.\n\n### Solution 4: Update WiFi Driver\n1. Open Device Manager\n2. Expand "Network adapters"\n3. Right-click WiFi adapter\n4. Select "Update driver"\n5. Choose "Search automatically for drivers"\n\n## Router Issues\nIf multiple devices cannot connect:\n- Restart your router (unplug for 30 seconds)\n- Check if router firmware needs updating\n- Verify WiFi password hasn't changed\n\n## Contact Support If:\n- Problem persists after all steps\n- Other devices connect successfully\n- Physical damage to WiFi adapter suspected`,
    categoryId: '3',
    severity: 'medium',
    tags: ['wifi', 'network', 'connectivity'],
    views: 1567,
    rating: 4.8,
    feedbackCount: 45
  },
  {
    title: 'Password Reset Procedure',
    summary: 'How to reset your account password',
    content: `# Account Password Reset Guide\n\n## Self-Service Password Reset\n\n### Prerequisites\n- Valid employee email address\n- Access to registered mobile phone or alternate email\n\n### Steps\n\n1. **Navigate to Login Page**\n   - Go to portal.company.com\n   - Click "Forgot Password?"\n\n2. **Verify Identity**\n   - Enter your employee email address\n   - Click "Send Verification Code"\n   - Check your email or phone for 6-digit code\n\n3. **Enter Verification Code**\n   - Input the code received\n   - Code expires in 10 minutes\n\n4. **Create New Password**\n   Requirements:\n   - Minimum 12 characters\n   - At least one uppercase letter\n   - At least one lowercase letter\n   - At least one number\n   - At least one special character (@, #, $, etc.)\n   - Cannot be same as last 5 passwords\n\n5. **Confirm Password**\n   - Re-enter new password\n   - Click "Reset Password"\n\n## Password Best Practices\n- Use a unique password for work accounts\n- Consider using a password manager\n- Never share your password\n- Change password immediately if compromised\n\n## Locked Account\nIf your account is locked after multiple failed attempts:\n- Wait 30 minutes for automatic unlock\n- OR contact IT Support for immediate unlock\n\n## Need Help?\nContact IT Support:\n- Phone: ext. 5555\n- Email: itsupport@company.com\n- Available: Mon-Fri, 8 AM - 6 PM`,
    categoryId: '6',
    severity: 'low',
    tags: ['password', 'account', 'access'],
    views: 2341,
    rating: 4.9,
    feedbackCount: 67
  }
];

const seedCategoryData = [
  {
    name: 'Hardware Issues',
    description: 'Computer hardware troubleshooting and repairs',
    icon: 'Cpu'
  },
  {
    name: 'Software Problems',
    description: 'Software installation, updates, and errors',
    icon: 'Code'
  },
  {
    name: 'Network Issues',
    description: 'Network connectivity and configuration',
    icon: 'Network'
  },
  {
    name: 'Security',
    description: 'Security policies and antivirus solutions',
    icon: 'Shield'
  },
  {
    name: 'Email & Communication',
    description: 'Email client setup and troubleshooting',
    icon: 'Mail'
  },
  {
    name: 'Account Management',
    description: 'User accounts and password resets',
    icon: 'User'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Article.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing data.');

    // Seed Users
    const createdUsers = [];
    for (const user of seedUsers) {
      const newUser = await User.create(user);
      createdUsers.push(newUser);
    }
    console.log('✅ Users seeded.');

    // Seed Categories first
    const createdCategories = [];
    for (const catData of seedCategoryData) {
      const newCategory = await Category.create(catData);
      createdCategories.push(newCategory);
    }
    console.log(`✅ ${createdCategories.length} Categories seeded.`);

    // Assign articles to the admin user
    const adminUser = createdUsers.find(u => u.role === 'admin') || createdUsers[0];

    // Seed Articles for each category
    const categoryMap = {};
    createdCategories.forEach((cat, idx) => {
      categoryMap[seedCategoryData[idx].name] = cat._id;
    });

    // Add detailed articles for each category
    const articlesByCategory = {
      'Hardware Issues': [
        {
          title: 'How to Fix Computer Won\'t Turn On',
          summary: 'Step-by-step guide to diagnose and fix power issues',
          content: `# Computer Won't Turn On - Troubleshooting Guide\n\n## Problem Description\nYour computer does not power on when you press the power button.\n\n## Solution Steps\n\n### Step 1: Check Power Connection\n- Ensure the power cable is securely connected to both the computer and wall outlet\n- Try a different power outlet to rule out outlet issues\n- Check if the power strip is turned on (if using one)\n\n### Step 2: Check Power Supply\n- Look for LED lights on the motherboard\n- Listen for fan noise when pressing the power button\n- If using a laptop, try removing and reinserting the battery\n\n### Step 3: Reset the System\n- Unplug the computer\n- Hold the power button for 30 seconds\n- Reconnect power and try again\n\n### Step 4: Check Internal Components\n- Ensure RAM modules are properly seated\n- Check all internal cable connections\n- Remove and reseat graphics card if applicable\n\n## Prevention Tips\n- Use a surge protector\n- Keep the system clean from dust\n- Ensure proper ventilation\n\n## When to Escalate\nIf none of these steps work, the issue may require hardware replacement. Contact IT support for further assistance.`,
          severity: 'high',
          tags: ['power', 'hardware', 'boot'],
          views: 1245,
          rating: 4.5,
          feedbackCount: 32
        },
        {
          title: 'Monitor Not Displaying Video Signal',
          summary: 'Troubleshoot when monitor shows no signal from computer',
          content: `# Monitor No Signal Troubleshooting\n\n## Common Causes\n- Loose video cable connections\n- Monitor powered off or set to wrong input\n- Graphics card failure\n- RAM not properly seated\n\n## Step-by-Step Solutions\n\n### Step 1: Check Physical Connections\n- Verify monitor is powered on\n- Check video cable (HDMI, DisplayPort, or VGA) is firmly connected at both ends\n- Try a different video cable if available\n- Ensure monitor input selector matches cable type\n\n### Step 2: Restart Computer\n- Press power button to shut down\n- Disconnect power for 30 seconds\n- Reconnect power and restart\n\n### Step 3: Check RAM\n- Power off computer\n- Open case (if desktop)\n- Remove RAM modules\n- Reseat RAM firmly until it clicks\n- Power on and test\n\n### Step 4: Try Different Port\n- Plug video cable into different port on graphics card\n- If using integrated graphics, plug into motherboard port instead\n\n## When to Contact IT\n- Multiple displays have same issue\n- Consistent problem after trying all steps\n- Graphics card is visibly damaged`,
          severity: 'medium',
          tags: ['monitor', 'display', 'hardware'],
          views: 987,
          rating: 4.6,
          feedbackCount: 28
        },
        {
          title: 'Printer Connection Issues',
          summary: 'Fix common printer connectivity problems',
          content: `# Printer Troubleshooting Guide\n\n## Printer Not Found on Network\n\n### WiFi Printers\n1. Check printer power and WiFi indicator\n2. Verify printer connected to same WiFi network\n3. Restart printer (power off 30 seconds)\n4. Check network distance (move closer if far)\n\n### USB Printers\n1. Try different USB port\n2. Update printer driver from manufacturer website\n3. Check if USB cable is damaged\n4. Uninstall and reinstall printer driver\n\n## Paper Jam Errors\n1. Turn off printer\n2. Open all access panels\n3. Gently remove any stuck paper\n4. Remove toner cartridge and check for paper fragments\n5. Close all panels and restart\n\n## Print Quality Issues\n- Cleaning print heads\n- Replacing toner/ink cartridges\n- Adjusting paper weight settings\n\n## Slow Printing\n- Reduce print quality\n- Check network speed (WiFi printers)\n- Reduce color intensity\n- Clear printer queue\n\n## Driver Installation\n1. Go to manufacturer website\n2. Download latest driver for your model\n3. Run installer with administrator privileges\n4. Restart computer\n5. Add printer in Windows Settings`,
          severity: 'medium',
          tags: ['printer', 'hardware', 'peripheral'],
          views: 654,
          rating: 4.4,
          feedbackCount: 19
        }
      ],
      'Software Problems': [
        {
          title: 'Windows 11 Update Error 0x80070002',
          summary: 'Resolve Windows Update error code 0x80070002',
          content: `# Windows Update Error 0x80070002\n\n## Error Description\nWindows Update fails with error code 0x80070002 - files required by Windows Update are missing or corrupted.\n\n## Solution\n\n### Method 1: Run Windows Update Troubleshooter\n1. Open Settings > System > Troubleshoot\n2. Select "Windows Update" troubleshooter\n3. Click "Run" and follow the prompts\n4. Restart your computer\n\n### Method 2: Clear Windows Update Cache\n1. Stop Windows Update service:\n   - Open Services (services.msc)\n   - Find "Windows Update"\n   - Right-click and select "Stop"\n\n2. Delete cache files:\n   - Navigate to C:\\Windows\\SoftwareDistribution\n   - Delete all contents\n\n3. Restart Windows Update service\n\n### Method 3: System File Checker\nRun these commands in Command Prompt (Admin):\n\`\`\`\nsfc /scannow\nDISM /Online /Cleanup-Image /RestoreHealth\n\`\`\`\n\n## Additional Tips\n- Ensure sufficient disk space (at least 20GB free)\n- Temporarily disable antivirus software\n- Check internet connection stability\n\n## Expected Results\nAfter following these steps, Windows Update should function normally.`,
          severity: 'medium',
          tags: ['windows', 'update', 'error'],
          views: 892,
          rating: 4.7,
          feedbackCount: 28
        },
        {
          title: 'Application Crashes on Startup',
          summary: 'Fix applications that crash when starting',
          content: `# Application Crash Troubleshooting\n\n## Quick Fixes\n\n### 1. Restart Application\n- Close application completely\n- Wait 30 seconds\n- Reopen application\n\n### 2. Clear Application Cache\nLocation varies by application:\n- Usually in AppData\\Local folder\n- Look for Temp or Cache subfolder\n- Delete contents (not the folder itself)\n\n### 3. Reinstall Application\n- Uninstall from Settings > Apps\n- Restart computer\n- Download fresh installer from official website\n- Install with administrator privileges\n\n## Advanced Solutions\n\n### Update Application\n- Check Help > Check for Updates menu\n- Visit developer website for latest version\n- Download and install latest version\n\n### Compatibility Mode\n1. Right-click application shortcut\n2. Select Properties\n3. Click Compatibility tab\n4. Try running in compatibility mode for older Windows version\n5. Apply and click OK`,
          severity: 'high',
          tags: ['software', 'crash', 'troubleshooting'],
          views: 1124,
          rating: 4.5,
          feedbackCount: 35
        },
        {
          title: 'How to Uninstall Programs Completely',
          summary: 'Complete guide to removing software from your computer',
          content: `# Complete Software Uninstallation Guide\n\n## Standard Uninstall Method\n\n### Windows 11/10\n1. Click Start menu\n2. Go to Settings\n3. Select Apps > Installed apps\n4. Find the application\n5. Click the three dots menu\n6. Select Uninstall\n7. Follow prompts\n8. Restart computer when prompted\n\n## Remove Leftover Files\n\n### AppData Folder\n1. Press Windows + R\n2. Type: %appdata%\n3. Press Enter\n4. Find application folder and delete\n5. Repeat for Local and LocalLow folders\n\n### Program Files\n1. Open File Explorer\n2. Navigate to C:\\Program Files\n3. Find application folder\n4. Right-click and delete\n5. Repeat for Program Files (x86) if exists`,
          severity: 'low',
          tags: ['software', 'uninstall', 'removal'],
          views: 756,
          rating: 4.3,
          feedbackCount: 22
        }
      ],
      'Network Issues': [
        {
          title: 'Unable to Connect to WiFi Network',
          summary: 'Troubleshoot WiFi connectivity issues',
          content: `# WiFi Connection Problems\n\n## Symptoms\n- WiFi network not showing up in available networks\n- Cannot connect to WiFi network\n- Connected but no internet access\n\n## Quick Fixes\n\n### Solution 1: Restart Network Adapter\n1. Right-click network icon in system tray\n2. Open Network & Internet settings\n3. Click "Advanced network settings"\n4. Find your WiFi adapter and click "Disable"\n5. Wait 10 seconds, then click "Enable"\n\n### Solution 2: Forget and Reconnect\n1. Go to Settings > Network & Internet > WiFi\n2. Click "Manage known networks"\n3. Select your network and click "Forget"\n4. Reconnect and enter password again`,
          severity: 'medium',
          tags: ['wifi', 'network', 'connectivity'],
          views: 1567,
          rating: 4.8,
          feedbackCount: 45
        },
        {
          title: 'Slow Internet Connection',
          summary: 'Diagnose and fix slow network speeds',
          content: `# Internet Speed Troubleshooting\n\n## Check Actual Speed\n1. Go to speedtest.net\n2. Run test to see current speed\n3. Compare to your plan speed\n\n## Possible Causes\n\n### WiFi Issues\n- Move closer to router\n- Reduce interference (microwave, cordless phones)\n- Change WiFi channel in router settings\n- Update router firmware\n\n### Network Congestion\n- Check if others are using heavy bandwidth\n- Schedule large downloads for off-peak hours\n- Limit streaming services`,
          severity: 'low',
          tags: ['internet', 'speed', 'network'],
          views: 834,
          rating: 4.6,
          feedbackCount: 21
        },
        {
          title: 'Unable to Access Company Intranet',
          summary: 'Fix intranet connectivity problems',
          content: `# Company Intranet Access Issues\n\n## Prerequisites\n- Connected to company network (WiFi or Ethernet)\n- VPN connected (if working remotely)\n- Valid credentials\n\n## Troubleshooting Steps\n\n### Step 1: Verify Network Connection\n- Check if you can access other websites\n- If no internet, resolve general connectivity first\n- Verify you're on company WiFi\n\n### Step 2: Check VPN Connection\n- Ensure VPN is connected\n- Reconnect VPN: disconnect and reconnect\n- Check VPN certificate expiration`,
          severity: 'high',
          tags: ['intranet', 'network', 'vpn'],
          views: 445,
          rating: 4.7,
          feedbackCount: 18
        }
      ],
      'Security': [
        {
          title: 'Enable Windows Defender Firewall',
          summary: 'How to enable and configure Windows Defender Firewall',
          content: `# Windows Defender Firewall Setup\n\n## Check Firewall Status\n1. Search for "Windows Defender Firewall" in Start menu\n2. Click to open\n3. Verify status is "On" for Domain, Private, and Public networks\n\n## Enable Firewall\nIf disabled:\n1. Open Windows Defender Firewall\n2. Click "Turn Windows Defender Firewall on or off"\n3. For each network type:\n   - Check "Turn on Windows Defender Firewall"\n   - Click OK`,
          severity: 'high',
          tags: ['firewall', 'security', 'protection'],
          views: 623,
          rating: 4.8,
          feedbackCount: 26
        },
        {
          title: 'Recognize and Avoid Phishing Emails',
          summary: 'How to identify and protect yourself from phishing attacks',
          content: `# Phishing Email Detection Guide\n\n## What is Phishing?\nFraudulent emails designed to steal personal information or login credentials by posing as legitimate organizations.\n\n## Red Flags to Watch For\n\n### Suspicious Sender\n- Email address doesn't match company domain\n- Generic greetings like "Dear Customer" instead of your name\n- Unusual domain spelling\n\n### Urgent or Threatening Language\n- "Verify your account immediately"\n- "Your account will be closed"\n- "Confirm identity or lose access"`,
          severity: 'critical',
          tags: ['phishing', 'security', 'email'],
          views: 892,
          rating: 4.9,
          feedbackCount: 52
        },
        {
          title: 'Setup Two-Factor Authentication',
          summary: 'Enhance account security with two-factor authentication',
          content: `# Two-Factor Authentication (2FA) Setup\n\n## What is 2FA?\nAdditional security layer requiring two verification methods:\n1. Your password\n2. Something only you have (phone, authenticator app)\n\n## Enable 2FA on Company Account\n\n### Step 1: Access Security Settings\n1. Log into your account\n2. Go to Account Settings\n3. Find Security or Authentication section`,
          severity: 'high',
          tags: ['2fa', 'security', 'authentication'],
          views: 567,
          rating: 4.7,
          feedbackCount: 31
        }
      ],
      'Email & Communication': [
        {
          title: 'Setup Outlook for First Time',
          summary: 'Step-by-step guide to configure Outlook email client',
          content: `# Outlook Email Setup Guide\n\n## Installation\n1. Download Outlook from office.com or use Office 365 installer\n2. Run installer with admin privileges\n3. Follow installation wizard\n4. Restart computer if prompted\n\n## Configure Email Account\n\n### Automatic Setup (Recommended)\n1. Open Outlook\n2. Go to File > Add Account\n3. Enter company email address\n4. Click Connect\n5. Enter password`,
          severity: 'low',
          tags: ['outlook', 'email', 'setup'],
          views: 1203,
          rating: 4.6,
          feedbackCount: 38
        },
        {
          title: 'Outlook Email Not Syncing',
          summary: 'Fix Outlook synchronization problems',
          content: `# Outlook Email Sync Issues\n\n## Quick Troubleshooting\n\n### Step 1: Force Sync\n1. Click Send/Receive tab\n2. Click "Send/Receive All Folders"\n3. Wait for sync to complete\n\n### Step 2: Check Account Status\n1. Go to File > Info\n2. Look for error messages\n3. Note any red X or warning symbols`,
          severity: 'high',
          tags: ['outlook', 'email', 'sync'],
          views: 934,
          rating: 4.5,
          feedbackCount: 29
        }
      ],
      'Account Management': [
        {
          title: 'Password Reset Procedure',
          summary: 'How to reset your account password safely',
          content: `# Account Password Reset Guide\n\n## Self-Service Password Reset\n\n### Prerequisites\n- Valid employee email address\n- Access to registered mobile phone or alternate email\n\n### Steps\n\n1. **Navigate to Login Page**\n   - Go to portal.company.com\n   - Click "Forgot Password?"\n\n2. **Verify Identity**\n   - Enter your employee email address\n   - Click "Send Verification Code"\n   - Check your email or phone for 6-digit code`,
          severity: 'low',
          tags: ['password', 'account', 'access'],
          views: 2341,
          rating: 4.9,
          feedbackCount: 67
        },
        {
          title: 'Update Your Profile Information',
          summary: 'How to change name, phone, and contact details',
          content: `# Profile Update Guide\n\n## Accessing Profile Settings\n\n### Web Portal\n1. Log into company portal\n2. Click profile icon (usually top right)\n3. Select "Edit Profile"\n4. Make changes\n5. Click "Save"`,
          severity: 'low',
          tags: ['profile', 'account', 'information'],
          views: 876,
          rating: 4.4,
          feedbackCount: 24
        },
        {
          title: 'Account Lockout Resolution',
          summary: 'Resolve account lockouts and regain access',
          content: `# Account Lockout Troubleshooting\n\n## What Causes Lockout?\n- Multiple failed login attempts (usually 5+)\n- Expired password\n- Account manually locked by admin\n- Security suspension`,
          severity: 'high',
          tags: ['account', 'lockout', 'access'],
          views: 567,
          rating: 4.6,
          feedbackCount: 19
        }
      ]
    };

    // Create articles for each category
    let totalArticlesCreated = 0;
    for (const [categoryName, articles] of Object.entries(articlesByCategory)) {
      const categoryId = categoryMap[categoryName];
      console.log(`Creating ${articles.length} articles for ${categoryName}...`);
      
      for (const articleData of articles) {
        await Article.create({
          ...articleData,
          categoryId: categoryId,
          author: adminUser._id
        });
        totalArticlesCreated++;
      }
    }
    
    console.log(`✅ ${totalArticlesCreated} Articles seeded.`);
    console.log('✅ Database seeding completed successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDB();
