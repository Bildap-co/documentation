---
description: This project uses PostgreSQL 14 as its database.
---

# Setup Postgres DB on Local

### Install PostgreSQL 14 / Adminer using Docker Compose

&#x20;To run it, you need to install PostgreSQL v14 on your local machine or run it through Docker Compose by running the following command:

```bash
npm run docker-compose
```

Everything you need is already configured under `docker-compose.yml`file and by running the command above you can easily start a PostgreSQL 14 and Adminer on your local machine.

## Installing PostgreSQL 14 on local machine

This guide provides step-by-step instructions for installing PostgreSQL 14 on Windows, macOS, and Linux.

### Prerequisites

Before starting the installation, ensure that:

* You have administrative privileges on your system.
* Your system meets the hardware requirements for PostgreSQL.
* You have access to an internet connection.

***

### Installing PostgreSQL 14 on Windows

1. **Download the Installer**
   * Visit the [official PostgreSQL website](https://www.postgresql.org/download/).
   * Click on **Windows** and download the installer for PostgreSQL 14.
2. **Run the Installer**
   * Double-click the downloaded `.exe` file to start the installation.
   * Follow the on-screen prompts:
     * Select components to install (default options are recommended).
     * Choose the installation directory.
     * Set a password for the `postgres` superuser.
     * Select the default port (5432).
     * Choose a locale for your database cluster.
3. **Complete the Installation**
   * After installation, the PostgreSQL service will start automatically.
   * Open **pgAdmin** (a graphical tool for managing PostgreSQL) to verify the installation.
4. **Verify the Installation**
   * Open the Command Prompt.
   * Run the command: `psql -U postgres`.
   * Enter the password you set during installation to connect to the database.

***

### Installing PostgreSQL 14 on macOS

#### Using Homebrew (Recommended)

1. **Install Homebrew (if not already installed)**
   *   Open the Terminal and run:

       ```bash
       /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
       ```
2. **Install PostgreSQL**
   *   Run the following command:

       ```bash
       brew install postgresql@14
       ```
3. **Start PostgreSQL**
   *   Start the PostgreSQL service:

       ```bash
       brew services start postgresql@14
       ```
4. **Verify the Installation**
   *   Run the `psql` command:

       ```bash
       psql postgres
       ```

#### Using the Installer

1. **Download the Installer**
   * Visit the [official PostgreSQL website](https://www.postgresql.org/download/).
   * Click on **macOS** and download the installer for PostgreSQL 14.
2. **Run the Installer**
   * Open the `.dmg` file and follow the installation wizard.
   * Set a password for the `postgres` user and configure other options.
3. **Verify the Installation**
   *   Open the Terminal and run:

       ```bash
       psql -U postgres
       ```

***

### Installing PostgreSQL 14 on Linux

#### Using Package Managers (Recommended)

**Debian/Ubuntu**

1. **Update Package Index**
   *   Open the Terminal and run:

       ```bash
       sudo apt update
       ```
2. **Install PostgreSQL**
   *   Run the following commands:

       ```bash
       sudo apt install -y wget gnupg
       wget -qO - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
       sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
       sudo apt update
       sudo apt install -y postgresql-14
       ```
3. **Start and Enable PostgreSQL**
   *   Run:

       ```bash
       sudo systemctl start postgresql
       sudo systemctl enable postgresql
       ```
4. **Verify the Installation**
   *   Switch to the `postgres` user and access `psql`:

       ```bash
       sudo -i -u postgres
       psql
       ```

**CentOS/Red Hat**

1. **Install PostgreSQL Repository**
   *   Run the following commands:

       ```bash
       sudo dnf install -y https://download.postgresql.org/pub/repos/yum/14/redhat/rhel-$(rpm -E %rhel)-x86_64/pgdg-redhat-repo-latest.noarch.rpm
       sudo dnf -qy module disable postgresql
       sudo dnf install -y postgresql14 postgresql14-server
       ```
2. **Initialize and Start PostgreSQL**
   *   Initialize the database:

       ```bash
       sudo /usr/pgsql-14/bin/postgresql-14-setup initdb
       ```
   *   Start and enable the service:

       ```bash
       sudo systemctl start postgresql-14
       sudo systemctl enable postgresql-14
       ```
3. **Verify the Installation**
   *   Access `psql`:

       ```bash
       sudo -i -u postgres
       psql
       ```

#### Building from Source

1. **Install Dependencies**
   *   For Debian-based systems:

       ```bash
       sudo apt update
       sudo apt install -y gcc make libreadline-dev zlib1g-dev flex bison
       ```
   *   For Red Hat-based systems:

       ```bash
       sudo dnf groupinstall "Development Tools"
       sudo dnf install -y readline-devel zlib-devel
       ```
2. **Download and Extract Source Code**
   * Visit the [PostgreSQL source page](https://www.postgresql.org/ftp/source/) and download version 14.
   *   Extract the tarball:

       ```bash
       tar -xvf postgresql-14.x.tar.gz
       cd postgresql-14.x
       ```
3. **Compile and Install**
   *   Run:

       ```bash
       ./configure
       make
       sudo make install
       ```
4. **Initialize the Database**
   *   Run:

       ```bash
       mkdir -p /usr/local/pgsql/data
       sudo chown $(whoami) /usr/local/pgsql/data
       initdb -D /usr/local/pgsql/data
       ```
5. **Start PostgreSQL**
   *   Run:

       ```bash
       pg_ctl -D /usr/local/pgsql/data -l logfile start
       ```
6. **Verify the Installation**
   *   Access `psql`:

       ```bash
       psql -U postgres
       ```

***

### Post-Installation Steps

* Secure your PostgreSQL installation by configuring user roles and permissions.
* Enable remote access if needed by editing `postgresql.conf` and `pg_hba.conf`.
* Regularly back up your databases.

For more details, visit the [official PostgreSQL documentation](https://www.postgresql.org/docs/14/).
