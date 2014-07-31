# Visualizing Translations Documentation#

##Overview##
This README aims to help future collaborators navigate through our codebase.
We will try to clear up potentially confusing parts as well as explain the
structure.

This project provides a custom user interface to the Juxta API.
The site allows users to upload and compare different translations.
One can take a poem in Russian, for example, and upload various English
translations to the site. Afterward, these "Sources" can be converted into
"Witnesses"-- texts that can be compared with one another through the API.
The ultimate goal is called "Collation" where we take Witnesses and
group them into sets that can be visualized.


##Project Structure##
Backbone.js is the framework that underlies the project. The bulk of the code
written is contained within the dev/\_/components/js/ directory. Inside,
there are many files that implement the logic of the site. These files
are compiled via Grunt into a single file called "Akhmatoviz.js" within the \_/js/ directory.

###init.js and main.js###
In init.js, we provide a couple of utility functions and initialize an
object "AV" for namespacing.

Main.js contains the code that runs last. We initialize the Router--which 
initializes all the other variables-- and start Backbone history.

###router.js###
This file contains all the initializations. The router acts as a central
hub of sorts. Code here cascades into the other files.

###Buttons and routes###
We use both standard buttons as well as buttons that link to routes.
All the delete buttons we use are regular buttons. The upload and transform
button are also regular buttons. They trigger events when clicked. We have
event listeners in different parts of the code to respond appropriately--
that's what the "listenTo"s are doing.

Other buttons, such as the viewSource button and the Visualize button link
to routes. The logic for what happens when they are clicked lies mostly in
the router.js file.

###Presentation Mode###
If one wants to link directly to a collection presentation, one can click
on the Visualize to open up a Modal. In the modal, there's a share button
on the bottom left. This button links to a page with just the visualization.

The implementation is as follows:
-Inside index.html, there's code for the modal. Inside is a share button. There is also an iframe with id "visualization".
-In visualizationView.js, we retrieve the correct path and put it into the share button
-the path is a route of another page-- present.html
-present.html is a separate page. It has its own backbone router within visualRouter.js. It also has an iframe that gets rendered. 

###Workspaces###

Workspaces allow for people to have different places to upload their sources
and make their visualizations from. The implementation of Workspaces takes
place in a few different files: workspaceCollection.js, 
workspaceDropdownView.js, and workspaceEditView.js. init.js is also involved
. Once a workspace is chosen, it will be remembered through a cookie. 
WorkspaceEditView contains most of the internal logic for the workspaces.
 

###Style###
Our project uses Bootstrap as the basis for style. When we want to change the look of
specific elements, we will change main.scss within the \_/components/sass/ folder.

The theme we use is called "Superhero": bootswatch.com/superhero/


##Nuances and Explanations##

One potentially confusing part of the code is the `_.bind' method, if one is
unfamilar with monads. Don't be scared about its use though, it's not so
complicated. It takes two arguments: a function, and a context. It sets the
function up so that it will run within that context. This is really useful,
because most of the time, anonymous functions run in this weird contextless
environment, which makes `this` work improperly. If you pass `this` in
as the second parameter to `_.bind`, any reference to `this` in the
function will point to the external `this'.

Example:
```js
foo = Backbone.View.extend({
    //...
    _.bind(function() {
        this.render()
        // Here, `this' refers to the `foo' object
    }, this);

    function() {
        this.render
        // Here, `this' refers to nothing at all.
        // This makes JavaScript angry.
    }
})
```

You would use `_.bind()` to avoid ugly `var that = this;` state passing.
Consult [the docs](http://underscorejs.org/#bind) if you have further questions.


We use the "navigate" method of the Router in order to take the route back 
to the index.

The sourceView object in router.js explicitly takes in a collection in 
addition to a model. This is so that we can fetch the collection after
an upload, showing a refreshed view.

The HTML uses a lot of templating. We've put all the templates on the 
bottom half of the page. A lot of the design of the page can be changed
within the templates. Column width in the views, for example, is determined
by bootstrap classes.




