require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Article = require('./models/Article');

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

const categoriesToSeed = [
  { id: '1', name: 'Hardware Issues', count: 24 },
  { id: '2', name: 'Software Problems', count: 38 },
  { id: '3', name: 'Network Issues', count: 19 },
  { id: '4', name: 'Security', count: 15 },
  { id: '5', name: 'Email & Communication', count: 12 },
  { id: '6', name: 'Account Management', count: 8 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Article.deleteMany({});
    console.log('Cleared existing data.');

    // Seed Users
    const createdUsers = [];
    for (const user of seedUsers) {
      const newUser = await User.create(user);
      createdUsers.push(newUser);
    }
    console.log('✅ Users seeded.');

    // Assign articles to the admin user
    const adminUser = createdUsers.find(u => u.role === 'admin') || createdUsers[0];

    // Seed Articles
    for (const cat of categoriesToSeed) {
      console.log(`Generating ${cat.count} articles for ${cat.name}...`);
      for (let i = 1; i <= cat.count; i++) {
        await Article.create({
          title: `${cat.name} Guide #${i}`,
          summary: `Summary of troubleshooting guide ${i} for ${cat.name}`,
          content: `# ${cat.name} Troubleshooting - Part ${i}\n\nThis is an automated support guide for dealing with ${cat.name.toLowerCase()}.\n\n## Troubleshooting Steps\n1. Identify the symptom\n2. Check connections\n3. Restart the service\n4. Contact IT Support if issue persists.`,
          categoryId: cat.id,
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
          tags: [cat.name.split(' ')[0].toLowerCase(), 'troubleshooting'],
          views: Math.floor(Math.random() * 1000),
          rating: (Math.random() * 2 + 3).toFixed(1),
          feedbackCount: Math.floor(Math.random() * 50),
          author: adminUser._id
        });
      }
    }
    console.log('✅ All articles seeded.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDB();
