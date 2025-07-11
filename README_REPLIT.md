# 🚀 Flujo on Replit - API Key Import Guide

Welcome to **Flujo on Replit**! This guide will walk you through importing your API keys after deploying Flujo on Replit.

## 📋 Prerequisites

- Your Flujo Repl has finished building (you'll see "✅ Flujo ready" in the console)
- You have your API keys ready (OpenAI, Anthropic, etc.)

## 🔑 Step-by-Step API Key Import Process

### Step 1: Access Your Flujo Instance

Once your build is complete, open your Flujo instance:

```
https://<repl-name>.<owner>.repl.co
```

Replace:
- `<repl-name>` with your actual Repl name
- `<owner>` with your Replit username

**Example:** If your username is `john` and your repl is named `my-flujo`, the URL would be:
```
https://my-flujo.john.repl.co
```

![Access Flujo](https://github.com/user-attachments/assets/flujo-replit-step1.gif)
*Opening your Flujo instance on Replit*

### Step 2: Navigate to API Keys Settings

Once Flujo loads:

1. Click on the **Settings** icon in the left sidebar (⚙️)
2. Select **API Keys** from the settings menu

![Navigate to Settings](https://github.com/user-attachments/assets/f5acd60f-129d-4e0c-8bc1-b5410d3c8d1d)
*The API Keys management interface*

### Step 3: Import Keys from Environment

Flujo offers two methods to add your API keys:

#### Method 1: Auto-Import from Environment (Recommended)

1. Click the **"Add Key"** button
2. Select **"Import from Environment"**
3. Flujo will automatically detect environment variables from your Replit Secrets
4. Select the keys you want to import
5. Click **"Import Selected"**

![Import from Environment](https://github.com/user-attachments/assets/flujo-import-env-keys.gif)
*Auto-importing keys from Replit environment variables*

#### Method 2: Manual Entry

1. Click the **"Add Key"** button
2. Select **"Add Manually"**
3. Enter:
   - **Key Name**: A descriptive name (e.g., `OPENAI_API_KEY`)
   - **Key Value**: Your actual API key
4. Click **"Save"**

![Manual Key Entry](https://github.com/user-attachments/assets/flujo-manual-key-entry.gif)
*Manually adding an API key*

### Step 4: Save and Encrypt

After adding your keys:

1. Click the **"Save All"** button
2. Flujo will encrypt and store your keys locally
3. You'll see a confirmation message: "✅ Keys saved and encrypted"

![Save Keys](https://github.com/user-attachments/assets/flujo-save-keys.gif)
*Saving and encrypting your API keys*

## 🔒 Security Notes

- **Encryption**: All API keys are encrypted before storage
- **Local Storage**: Keys are stored locally in your browser
- **No Server Transmission**: Your keys never leave your device unencrypted
- **Replit Secrets**: If using Replit Secrets, they're only accessible to your Repl

## 💡 Pro Tips

### Using Replit Secrets

For better security, store your API keys in Replit Secrets:

1. In your Replit editor, click the 🔒 **Secrets** tab
2. Add your API keys there
3. Flujo will automatically detect them when you use "Import from Environment"

### Supported API Key Formats

Flujo recognizes these common API key patterns:
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GROQ_API_KEY`
- `GEMINI_API_KEY`
- `COHERE_API_KEY`
- Any custom key names you define

### Testing Your Keys

After importing:
1. Go to **Models** in the sidebar
2. Create a new model using your imported key
3. Send a test message to verify the connection

## 🎯 Next Steps

Once your API keys are imported:

1. **Configure Models**: Set up AI models using your API keys
2. **Install MCP Servers**: Add tools and capabilities
3. **Create Flows**: Build your AI workflows
4. **Start Chatting**: Interact with your configured models

## 🆘 Troubleshooting

### Keys Not Showing in Import

If your Replit Secrets aren't appearing:
- Ensure they're properly set in the Secrets tab
- Refresh the page and try again
- Check that the secrets are not empty

### Import Button Disabled

If "Import from Environment" is grayed out:
- Make sure you have at least one secret defined in Replit
- Try refreshing the page

### Keys Not Saving

If you get an error when saving:
- Check your browser's local storage isn't full
- Try clearing browser cache for the Replit domain
- Ensure cookies are enabled

## 📚 Additional Resources

- [Main Flujo Documentation](README.md)
- [Model Configuration Guide](docs/getting-started/README.md)
- [MCP Server Setup](docs/features/README.md)
- [Flujo Discord Community](https://discord.gg/KPyrjTSSat)

---

**Need Help?** Join our [Discord](https://discord.gg/KPyrjTSSat) or create a [GitHub Issue](https://github.com/mario-andreschak/FLUJO/issues)!
