# Visualizing Translations Documentation#

##Overview##
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


##Nuances##



