---
sidebar_position: 3
---

# Configuration

## Node.js Installation Guide

### Windows

1. **Using NodeSource Installer**:

   - Download the Node.js **v20.11.1** installer for Windows from the [official site](https://nodejs.org/).
   - Run the installer and follow the setup wizard.
   - During installation, ensure the box to add to PATH is checked.
   - Once installed, verify by opening PowerShell and running:

     ```
     node -v
     npm -v
     ```

2. Using NVM:

   **Download and Install NVM for Windows**:

   - Navigate to the [NVM for Windows releases page](https://github.com/coreybutler/nvm-windows/releases).
   - Download the latest `.zip` file or `.exe` installer.
   - Run the installer and follow the instructions.

### MacOS

1. **Using Homebrew**:

```bash
# Install Homebrew if you haven't already
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node@20.11.1

# Add Node.js to your PATH
echo 'export PATH="/usr/local/opt/node@20.11.1/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

2. **Using NVM**:

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Load NVM
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js v20.11.1
nvm install 20.11.1
nvm use 20.11.1
```

### Linux

1. **Using Package Manager**:

```bash
# Update package index
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Using NVM**:

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Load NVM
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js v20.11.1
nvm install 20.11.1
nvm use 20.11.1
```

By following these steps, you will have the required Node.js version installed on your macOS or Linux machine, ensuring a smooth setup and development experience.

## Configure .env

There are two ways to configure `.env` file:

- [**Use installation Wizard**](wizard.md)

  If you prefer GUI, We develop a GUI website to walk you through the configuration in an easy way and place the proper config on you `.env`file.

- [Manually config `.env`file](.env/)

  If you are more code savy, you can also configure the `.env`file manually and setup the parameters to your need.
