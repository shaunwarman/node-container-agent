node-container-agent
-----
A simple node agent to listen to docker engine events

### Install
```
npm install -S node-container-agent
```

### Usage
#### Arguments
##### `socketPath`
Path to docker control socket (Default: `/var/run/docker.sock`)
- `--socketPath=<path_to_docker_socket>`

##### `dockerVersion`
Docker client version (Default: `v1.26`)
- `--dockerVersion=<path_to_docker_socket>`

##### `logPath`
Path to written log (Default: `./log.txt`)
- `--logPath=<path_to_docker_socket>`

#### Command-line
```
./node_modules/node-container-agent/bin/nca.js --<argument>=<value>
```

#### Docker
_TBD_

#### Output
_TBD_

#### TODO
_TBD_
