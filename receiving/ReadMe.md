# TCinGC MOE 2018

## 2018-07-07

The app structure is complete and uploaded to Ameeshi's github today.

The structure consists of the following of the basic working pages,

* requistioning.html
* receiving.html
* distribution.html
* inventory.html

The folder "css" contains the project's css files.

* bootstrap.min.css ... 
* bootstrap.min.css.map ... files that seem to be needed by the above
* req-form.css ... file created by Ameeshi that we are using to format the project pages.

the folder "js" contains the project's javascript files, which are loaded by the pages as appropriate.

* backend_simulator.js ... Simulates the backend. Will be replaced by AJAX calls to the backend.
* frontend_functions_[dist,inv,rcv,rq].js ... These are the page specific javascripts that will provide the front end functionality.
* frontend_main.js ... This probably should be included in the front_end_functions_[].js. No need to have it as a separate file.
* jquery.min.ms ... jquery library. We want to avoid using jquery so this may not be necessary.

**NOTE: Because the javascripts need to be laoded, we need to 'run' these pages on a webserver. If we want to run them locally on the browser, eg., 'file://xxx', we need to manually copy all these javascripts into the script section of the page header.**

### requisitioning.html

* The module that will be used by Bonnie to enter, edit, and print requistions
* The page is working as expected. Provides the basic functionality.
* A placeholder page, requisitioning\_rq\_print.html, will be the rq print form if Ameeshi will use html and css. If the form will be pdf, then ...

To be done

* Edwel to connect the page to the backend and try it out
* Ameeshi to develop the print form
* Ameeshi to look into improving the "look and feel"
* Ameeshi to review code and suggest improvements/additions

### receiving.html

* The module that will be used by Saburo to record received items.
* The page is working as expected. Provides the basic functionality.

To be done

* Edwel to connect the page to the backend and try it out
* Ameeshi to look into improving the "look and feel"
* Ameeshi to review code and suggest improvements/additions

### distribution.html

* The module that will be used by Saburo for item distribution
* Just a placeholder now. The module has not been started.

To be done

* Edwel to develop the functionality specs
* Then Ameeshi to code the functionality

### inventory.html

* The module that will be used by Adeline to track assets.
* Just a placeholder now. The module has not been started.

To be done

* _all. later, after distribution is done._