# TestInfo | Playwright
`TestInfo` contains information about currently running test. It is available to test functions, test.beforeEach(), test.afterEach(), test.beforeAll() and test.afterAll() hooks, and test-scoped fixtures. `TestInfo` provides utilities to control test execution: attach files, update test timeout, determine which test is currently running and whether it was retried, etc.

```
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }, testInfo) => {
  expect(testInfo.title).toBe('basic test');
  await page.screenshot(testInfo.outputPath('screenshot.png'));
});

```


* * *

Methods​
---------------------------------------------

### attach​

Added in: v1.10

testInfo.attach

Attach a value or a file from disk to the current test. Some reporters show test attachments. Either path or body must be specified, but not both.

For example, you can attach a screenshot to the test:

```
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }, testInfo) => {
  await page.goto('https://playwright.dev');
  const screenshot = await page.screenshot();
  await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
});

```


Or you can attach files returned by your APIs:

```
import { test, expect } from '@playwright/test';
import { download } from './my-custom-helpers';

test('basic test', async ({}, testInfo) => {
  const tmpPath = await download('a');
  await testInfo.attach('downloaded', { path: tmpPath });
});

```


note

testInfo.attach() automatically takes care of copying attached files to a location that is accessible to reporters. You can safely remove the attachment after awaiting the attach call.

**Usage**

```
await testInfo.attach(name);
await testInfo.attach(name, options);

```


**Arguments**

*   `name` string#
    
    Attachment name. The name will also be sanitized and used as the prefix of file name when saving to disk.
    
*   `options` Object _(optional)_
    
    *   `body` string | Buffer _(optional)_#
        
        Attachment body. Mutually exclusive with path.
        
    *   `contentType` string _(optional)_#
        
        Content type of this attachment to properly present in the report, for example `'application/json'` or `'image/png'`. If omitted, content type is inferred based on the path, or defaults to `text/plain` for string attachments and `application/octet-stream` for Buffer attachments.
        
    *   `path` string _(optional)_#
        
        Path on the filesystem to the attached file. Mutually exclusive with body.
        

**Returns**

*   Promise<void\>#

* * *

### fail()​")

Added in: v1.10

testInfo.fail()

Marks the currently running test as "should fail". Playwright Test runs this test and ensures that it is actually failing. This is useful for documentation purposes to acknowledge that some functionality is broken until it is fixed. This is similar to test.fail().

**Usage**

* * *

### fail(condition)​")

Added in: v1.10

testInfo.fail(condition)

Conditionally mark the currently running test as "should fail" with an optional description. This is similar to test.fail().

**Usage**

```
testInfo.fail(condition);
testInfo.fail(condition, description);

```


**Arguments**

*   `condition` boolean#
    
    Test is marked as "should fail" when the condition is `true`.
    
*   `description` string _(optional)_#
    
    Optional description that will be reflected in a test report.
    

* * *

### fixme()​")

Added in: v1.10

testInfo.fixme()

Mark a test as "fixme", with the intention to fix it. Test is immediately aborted. This is similar to test.fixme().

**Usage**

* * *

### fixme(condition)​")

Added in: v1.10

testInfo.fixme(condition)

Conditionally mark the currently running test as "fixme" with an optional description. This is similar to test.fixme().

**Usage**

```
testInfo.fixme(condition);
testInfo.fixme(condition, description);

```


**Arguments**

*   `condition` boolean#
    
    Test is marked as "fixme" when the condition is `true`.
    
*   `description` string _(optional)_#
    
    Optional description that will be reflected in a test report.
    

* * *

### outputPath​

Added in: v1.10

testInfo.outputPath

Returns a path inside the testInfo.outputDir where the test can safely put a temporary file. Guarantees that tests running in parallel will not interfere with each other.

```
import { test, expect } from '@playwright/test';
import fs from 'fs';

test('example test', async ({}, testInfo) => {
  const file = testInfo.outputPath('dir', 'temporary-file.txt');
  await fs.promises.writeFile(file, 'Put some data to the dir/temporary-file.txt', 'utf8');
});

```


> Note that `pathSegments` accepts path segments to the test output directory such as `testInfo.outputPath('relative', 'path', 'to', 'output')`. However, this path must stay within the testInfo.outputDir directory for each test (i.e. `test-results/a-test-title`), otherwise it will throw.

**Usage**

```
testInfo.outputPath(...pathSegments);

```


**Arguments**

*   `...pathSegments` Array<string\>#
    
    Path segments to append at the end of the resulting path.
    

**Returns**

*   string#

* * *

### setTimeout​

Added in: v1.10

testInfo.setTimeout

Changes the timeout for the currently running test. Zero means no timeout. Learn more about various timeouts.

Timeout is usually specified in the configuration file, but it could be useful to change the timeout in certain scenarios:

```
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  // Extend timeout for all tests running this hook by 30 seconds.
  testInfo.setTimeout(testInfo.timeout + 30000);
});

```


**Usage**

```
testInfo.setTimeout(timeout);

```


**Arguments**

*   `timeout` number#
    
    Timeout in milliseconds.
    

* * *

### skip()​")

Added in: v1.10

testInfo.skip()

Unconditionally skip the currently running test. Test is immediately aborted. This is similar to test.skip().

**Usage**

* * *

### skip(condition)​")

Added in: v1.10

testInfo.skip(condition)

Conditionally skips the currently running test with an optional description. This is similar to test.skip().

**Usage**

```
testInfo.skip(condition);
testInfo.skip(condition, description);

```


**Arguments**

*   `condition` boolean#
    
    A skip condition. Test is skipped when the condition is `true`.
    
*   `description` string _(optional)_#
    
    Optional description that will be reflected in a test report.
    

* * *

### slow()​")

Added in: v1.10

testInfo.slow()

Marks the currently running test as "slow", giving it triple the default timeout. This is similar to test.slow().

**Usage**

* * *

### slow(condition)​")

Added in: v1.10

testInfo.slow(condition)

Conditionally mark the currently running test as "slow" with an optional description, giving it triple the default timeout. This is similar to test.slow().

**Usage**

```
testInfo.slow(condition);
testInfo.slow(condition, description);

```


**Arguments**

*   `condition` boolean#
    
    Test is marked as "slow" when the condition is `true`.
    
*   `description` string _(optional)_#
    
    Optional description that will be reflected in a test report.
    

* * *

### snapshotPath​

Added in: v1.10

testInfo.snapshotPath

Returns a path to a snapshot file with the given `pathSegments`. Learn more about snapshots.

> Note that `pathSegments` accepts path segments to the snapshot file such as `testInfo.snapshotPath('relative', 'path', 'to', 'snapshot.png')`. However, this path must stay within the snapshots directory for each test file (i.e. `a.spec.js-snapshots`), otherwise it will throw.

**Usage**

```
testInfo.snapshotPath(...pathSegments);

```


**Arguments**

*   `...pathSegments` Array<string\>#
    
    The name of the snapshot or the path segments to define the snapshot file path. Snapshots with the same name in the same test file are expected to be the same.
    

**Returns**

*   string#

* * *

Properties​
------------------------------------------------------

### annotations​

Added in: v1.10

testInfo.annotations

The list of annotations applicable to the current test. Includes annotations from the test, annotations from all test.describe() groups the test belongs to and file-level annotations for the test file.

Learn more about test annotations.

**Usage**

**Type**

*   Array<Object\>
    *   `type` string
        
        Annotation type, for example `'skip'` or `'fail'`.
        
    *   `description` string _(optional)_
        
        Optional description.
        

* * *

### attachments​

Added in: v1.10

testInfo.attachments

The list of files or buffers attached to the current test. Some reporters show test attachments.

To add an attachment, use testInfo.attach() instead of directly pushing onto this array.

**Usage**

**Type**

*   Array<Object\>
    *   `name` string
        
        Attachment name.
        
    *   `contentType` string
        
        Content type of this attachment to properly present in the report, for example `'application/json'` or `'image/png'`.
        
    *   `path` string _(optional)_
        
        Optional path on the filesystem to the attached file.
        
    *   `body` Buffer _(optional)_
        
        Optional attachment body used instead of a file.
        

* * *

### column​

Added in: v1.10

testInfo.column

Column number where the currently running test is declared.

**Usage**

**Type**

*   number

* * *

### config​

Added in: v1.10

testInfo.config

Processed configuration from the configuration file.

**Usage**

**Type**

*   FullConfig

* * *

### duration​

Added in: v1.10

testInfo.duration

The number of milliseconds the test took to finish. Always zero before the test finishes, either successfully or not. Can be used in test.afterEach() hook.

**Usage**

**Type**

*   number

* * *

### error​

Added in: v1.10

testInfo.error

First error thrown during test execution, if any. This is equal to the first element in testInfo.errors.

**Usage**

**Type**

*   TestInfoError

* * *

### errors​

Added in: v1.10

testInfo.errors

Errors thrown during test execution, if any.

**Usage**

**Type**

*   Array<TestInfoError\>

* * *

### expectedStatus​

Added in: v1.10

testInfo.expectedStatus

Expected status for the currently running test. This is usually `'passed'`, except for a few cases:

*   `'skipped'` for skipped tests, e.g. with test.skip();
*   `'failed'` for tests marked as failed with test.fail().

Expected status is usually compared with the actual testInfo.status:

```
import { test, expect } from '@playwright/test';

test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`${testInfo.title} did not run as expected!`);
});

```


**Usage**

**Type**

*   "passed" | "failed" | "timedOut" | "skipped" | "interrupted"

* * *

### file​

Added in: v1.10

testInfo.file

Absolute path to a file where the currently running test is declared.

**Usage**

**Type**

*   string

* * *

### fn​

Added in: v1.10

testInfo.fn

Test function as passed to `test(title, testFunction)`.

**Usage**

**Type**

*   function

* * *

### line​

Added in: v1.10

testInfo.line

Line number where the currently running test is declared.

**Usage**

**Type**

*   number

* * *

### outputDir​

Added in: v1.10

testInfo.outputDir

Absolute path to the output directory for this specific test run. Each test run gets its own directory so they cannot conflict.

**Usage**

**Type**

*   string

* * *

### parallelIndex​

Added in: v1.10

testInfo.parallelIndex

The index of the worker between `0` and `workers - 1`. It is guaranteed that workers running at the same time have a different `parallelIndex`. When a worker is restarted, for example after a failure, the new worker process has the same `parallelIndex`.

Also available as `process.env.TEST_PARALLEL_INDEX`. Learn more about parallelism and sharding with Playwright Test.

**Usage**

**Type**

*   number

* * *

### project​

Added in: v1.10

testInfo.project

Processed project configuration from the configuration file.

**Usage**

**Type**

*   FullProject

* * *

### repeatEachIndex​

Added in: v1.10

testInfo.repeatEachIndex

Specifies a unique repeat index when running in "repeat each" mode. This mode is enabled by passing `--repeat-each` to the command line.

**Usage**

**Type**

*   number

* * *

### retry​

Added in: v1.10

testInfo.retry

Specifies the retry number when the test is retried after a failure. The first test run has testInfo.retry equal to zero, the first retry has it equal to one, and so on. Learn more about retries.

```
import { test, expect } from '@playwright/test';

test.beforeEach(async ({}, testInfo) => {
  // You can access testInfo.retry in any hook or fixture.
  if (testInfo.retry > 0)
    console.log(`Retrying!`);
});

test('my test', async ({ page }, testInfo) => {
  // Here we clear some server-side state when retrying.
  if (testInfo.retry)
    await cleanSomeCachesOnTheServer();
  // ...
});

```


**Usage**

**Type**

*   number

* * *

### snapshotDir​

Added in: v1.10

testInfo.snapshotDir

Absolute path to the snapshot output directory for this specific test. Each test suite gets its own directory so they cannot conflict.

This property does not account for the testProject.snapshotPathTemplate configuration.

**Usage**

**Type**

*   string

* * *

### snapshotSuffix​

Added in: v1.10

testInfo.snapshotSuffix

Suffix used to differentiate snapshots between multiple test configurations. For example, if snapshots depend on the platform, you can set `testInfo.snapshotSuffix` equal to `process.platform`. In this case `expect(value).toMatchSnapshot(snapshotName)` will use different snapshots depending on the platform. Learn more about snapshots.

**Usage**

**Type**

*   string

* * *

### status​

Added in: v1.10

testInfo.status

Actual status for the currently running test. Available after the test has finished in test.afterEach() hook and fixtures.

Status is usually compared with the testInfo.expectedStatus:

```
import { test, expect } from '@playwright/test';

test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`${testInfo.title} did not run as expected!`);
});

```


**Usage**

**Type**

*   "passed" | "failed" | "timedOut" | "skipped" | "interrupted"

* * *

### tags​

Added in: v1.43

testInfo.tags

Tags that apply to the test. Learn more about tags.

note

Any changes made to this list while the test is running will not be visible to test reporters.

**Usage**

**Type**

*   Array<string\>

* * *

### testId​

Added in: v1.32

testInfo.testId

Test id matching the test case id in the reporter API.

**Usage**

**Type**

*   string

* * *

### timeout​

Added in: v1.10

testInfo.timeout

Timeout in milliseconds for the currently running test. Zero means no timeout. Learn more about various timeouts.

Timeout is usually specified in the configuration file

```
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  // Extend timeout for all tests running this hook by 30 seconds.
  testInfo.setTimeout(testInfo.timeout + 30000);
});

```


**Usage**

**Type**

*   number

* * *

### title​

Added in: v1.10

testInfo.title

The title of the currently running test as passed to `test(title, testFunction)`.

**Usage**

**Type**

*   string

* * *

### titlePath​

Added in: v1.10

testInfo.titlePath

The full title path starting with the test file name.

**Usage**

**Type**

*   Array<string\>

* * *

### workerIndex​

Added in: v1.10

testInfo.workerIndex

The unique index of the worker process that is running the test. When a worker is restarted, for example after a failure, the new worker process gets a new unique `workerIndex`.

Also available as `process.env.TEST_WORKER_INDEX`. Learn more about parallelism and sharding with Playwright Test.

**Usage**

**Type**

*   number