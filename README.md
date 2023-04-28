# Webscoket Bidding
Realtime Chat Socket Template
## Getting started
- **Clone This Repository Using HTTPS** 
```bash
git clone https://github.com/firmanJS/socket-template.git
cd existing_repo
```
### Run Application
running application three methods manually, using docker or via Makefile
* Manually :

```bash
# Copy enviroment variables from .env.sample to .env
cp .env.sample .env

# Copy Makefile for simple command
cp Makefile.sample Makefile

# Install package via npm or yarn
npm install

# Run application via npm or yarn
npm run dev
```

* Via Docker :

```bash
# Copy enviroment variables from .env.sample to .env
cp .env.sample .env

# Build application
docker-compose -f docker-compose-dev.yml up --build --remove-orphans --force-recreate

# Stop aplication
CTRL+C 
# then 
docker-compose -f docker-compose-dev.yml down
# After build you can run command with this
docker-compose -f docker-compose-dev.yml up 
# Or you can hide log with command
docker-compose -f docker-compose-dev.yml up -d

```

* Via Make :

```bash
# Copy enviroment variables from .env.sample to .env
cp .env.sample .env

# Build application
change compose-file value with your environtment
make docker-build

# Stop aplication
CTRL+C 
# then 
make docker-down

# After build you can run command with this
make docker-start
```
