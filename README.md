# web-php-gae-simple

PHP GAE Sample Application

# Developer Workspace
[![Contribute](http://beta.codenvy.com/factory/resources/codenvy-contribute.svg)](http://beta.codenvy.com/f?id=89s1tecyzrjhyd2i)

# Stack to use

FROM [codenvy/php:gae](https://hub.docker.com/r/codenvy/php/)

# How to run

| #       | Description           | Command  |
| :------------- |:-------------| :-----|
| 1      | Run | `cd ${GAE} && ./dev_appserver.py 2>&1 --php_executable_path=/usr/bin/php5-cgi --skip_sdk_update_check true --host=0.0.0.0 --admin_host=0.0.0.0 ${current.project.path}` |