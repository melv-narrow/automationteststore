# Logger | Playwright
Playwright generates a lot of logs and they are accessible via the pluggable logger sink.

```
const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await chromium.launch({
    logger: {
      isEnabled: (name, severity) => name === 'api',
      log: (name, severity, message, args) => console.log(`${name} ${message}`)
    }
  });
  // ...
})();

```


* * *

Methods​
---------------------------------------------

### isEnabled​

Added before v1.9

logger.isEnabled

Determines whether sink is interested in the logger with the given name and severity.

**Usage**

```
logger.isEnabled(name, severity);

```


**Arguments**

*   `name` string#
    
    logger name
    
*   `severity` "verbose" | "info" | "warning" | "error"#
    

**Returns**

*   boolean#

* * *

### log​

Added before v1.9

logger.log

**Usage**

```
logger.log(name, severity, message, args, hints);

```


**Arguments**

*   `name` string#
    
    logger name
    
*   `severity` "verbose" | "info" | "warning" | "error"#
    
*   `message` string | Error#
    
    log message format
    
*   `args` Array<Object\>#
    
    message arguments
    
*   `hints` Object#
    
    *   `color` string _(optional)_
        
        Optional preferred logger color.
        
    
    optional formatting hints