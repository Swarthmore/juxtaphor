# Juxta Web Service API
Retrieved 2014-06-11 from https://github.com/performant-software/juxta-service/wiki/API-Documentation


## Workspaces

Workspaces are similar to directories on a filesystem; they store all data related to a collation. By default, there is one workspace named public. Others can be created with the POST described below. All requests to the service API may optionally include a workspace. If one is not present, the default public workspace will be used. Workspaces are placed in the first segment of the URL following juxta. Examples:

    http://127.0.0.1:8182/juxta/source : contains no workspace information. It will return all sources in the public workspace.
    http://127.0.0.1:8182/juxta/audrey/source : contains the workspace 'audrey'. It will return all sources in this workspace only.

* content types: application/json
* /workspace (GET) - gets a list of all workspaces.

JSON Format:
    
    [
       {"id":1,"name":"public","description":"Default public workspace"},          
       {"id":2,"name":"audrey","description":"Private workspace for user"}
    ]

* /workspace/{name} (GET) - Get the JSON describing a single workspace.

JSON Format:

    {"id":1,"name":"public","description":"Default public workspace"}

* /workspace (POST) - Create a new workspace.

JSON Format:

    {"name":"ws_name","description":"dw_description"}

* /workspace/{name} (DELETE) - Delete a workspace and all of its content.

**NOTE:** For simplicity, the remainder of this document describes the API without a workspace.

## Tasks

Several of the API calls detailed below are asynchronous. Each of these tasks will return a task identifier. Passed this identifier to the tasks API to perform status checks and cancel tasks.

* content types: application/json
* task/{taskId}/cancel (POST) - cancel the specified task
* task/{taskId} (GET) - returns a json object representing the status of the task

JSON Format:

    { 
       started: "07/04/2011 10:00:23",
       finished: "Date stamp |  NULL",
       note: "some sort of status message",
       status: "PENDING | PROCESSING | COMPLETE | CANCEL_REQUESTED | CANCELED | FAILED"
    }

## Sources

Sources are the raw materials of the system. They can be added, edited and deleted. When a source is edited, all witnesses prepared from it will be regenerated. When a source is deleted, all derived witnesses will also be deleted.

* content types: application/json, multipart/form
* /source POST  - returns a json array of source IDs created

If json is posted to this URL, the expected format is:
    
    [ 
       {name: 'name', type: 'raw|url', contentType: 'txt|xml', data: 'data'}
    ]
    For type: raw, data contains the raw content (xml or plain text) for the source.
    for type: url, data contains a url that will be spidered for content to make a source.

If the post is a muitipart/form, it is required to have three parts:

    sourceName: 'name.xml',
    contentType: 'text/xml'.
    sourceFile: a file to uploaded as source

* /source/{id} (PUT) - Used to update the content of an existing source. Payload is multipart/form with the following parts: sourceFile, sourceName and parallelSegmented. The first two are self explanatory. The parallelSegmented is a flag that tells the service that this source is encoded with TEI Parallel Segmentation. When set, all witnesses will be re-extracted from the source. Source updates are asynchronous. The associated task ID is returned as a plain text string from this call.
* /source/{id}?range=0,100 (GET) - Range is optional, and controls how much of the source is returned. The response is either the plain text content of the source or a JSON object, depending upon the url extension or accepts setting of the request.

JSON Format:

    {
       name: 'src_name',
       type: 'xml|txt',
       content: 'src_content'
    }

* /source/{id} (DELETE) - Remove the specified source from the system.

## XSLT files

XSLT files are used to prepare a source from an XML witness. Each XSLT file is associated with one witness. Updating the XSLT content will regenerate the associated witness. TEI Parallel Segmented sources are an exception: one XSLT file is used for all witnesses extracted from the parallel segmentation. Editing it will regenerate all witnesses. 
 
* content types: application/json text/xml
* /xslt (GET) - returns a json list of XSLT files

Response Format:
    
    [ 
       {"name":"Lenore. by G. A. Burger-transform","id":307,"workspaceId":2}
    ]
    
* /xslt (POST) - Create an XSLT file. Response is the ID of the newly created XSLT resource.

JSON Format:

    { 
      name: "template_name", 
      xslt: "xslt_code", 
    }
    

* /xslt/{id} (PUT) - Update the XSLT code for a specific resource. **IMPORTANT:** For XSLT files associated with TEI Parallel segmented sources, be sure to set the 'tei_ps' flag to true. It will cause all witnesses to be extracted from the source using the new settings. Failing to do so will yield unexpected results. 

JSON Format:

    { xslt: "xslt_code", tei_ps: 'true|false' }

* /xslt/{id} (GET, DELETE )

## Prepare Witness from Source

* content type: application/json
* /transform (POST) - Prepare a new witness by applying an XSLT transformation to a source. Returns the ID of the newly prepared witness.

Code:

    { source: 101, xslt: 221, finalName: 'foo' }
    NOTES: 
    finalName is optional; if omitted, the name will default to the name of the source
    document minus the extension
        
    xslt is optional. It is not used for text sources. If omitted and source is xml, an 
    existing default profile will be used. If none can be found, all tags will be accepted
    and no newlines will be added.

## Witness

Witnesses are the final documents to be collated. They have been prepared from raw sources and cannot be edited, only renamed, deleted and re-transformed.

* content types: text/plain, application/xml
* /witness (GET) - Get a list of witnesses.

JSON Format:

    [
      {
        "name": "Lenore. by G. A. Burger",
        "xsltId": 307,
        "sourceId": 296,
        "created": "06/28/2012 09:38:23",
        "id": 515,
        "workspaceId": 2
      },
      {
        "name": "namespace2",
        "xsltId": 306,
        "sourceId": 243,
        "created": "06/27/2012 13:31:46",
        "updated": "06/28/2012 17:03:09",
        "id": 514,
        "workspaceId": 2
      }
    ]   

* /witness/{id}?range=100,200 (GET) - Range is optional. Returns the plain text content of a witness.
* /witness/{id} - (DELETE) - Delete a witness from the system.
* /witness/{id} (PUT) - Used to rename a witness.

JSON Format:

    { name: 'new_name'}

* /witness/{id}/copy_settings (POST) - copy the preparation settings from one witness to another. The XSLT from the source witness will be copied to the destination. The destination witness will be re-prepared from the source using the new settings.

JSON Format:

    { from: 'src_witness_id', to: 'dest_witness_id'}

## Comparison Sets 

A comparison set is a collection of witnesses that will be collated.

* content type: application/json
* /set (POST) - Create a new comparison set and return its ID

JSON format:

    {
      name: 'damozel',
      witnesses: [ 120, 125, 342 ],
    }

* /set (GET) - Get a list of all available comparison sets. 

JSON Format:

    [
      {
        "name": "damozel",
        "status": "COLLATED",
        "created": "06/27/2012 11:43:22",
        "updated": "06/27/2012 11:45:42",
        "id": 98,
        "workspaceId": 2
      }
    ]

* /set/{id} (DELETE) delete a comparison set. Note that witnesses included in this set will NOT be deleted.
* /set/{id} (GET) - Get details of a specific set 

JSON Format:

    {
      "name": "test",
      "status": "COLLATED",
      "created": "Jun 27, 2012 11:43:22 AM",
      "updated": "Jun 27, 2012 11:45:42 AM",
      "id": 98,
      "workspaceId": 2,
      "witnesses": [
        {
            "name": "witness_1",
            "xsltId": 305,
            "sourceId": 162,
            "created": "Jun 27, 2012 11:43:13 AM",
            "fragmentRange": {
                "start": 0,
                "end": 0
            },
            "id": 513,
            "workspaceId": 2
        },
        {
            "name": "witness_s",
            "xsltId": 304,
            "sourceId": 162,
            "created": "Jun 27, 2012 11:43:09 AM",
            "fragmentRange": {
                "start": 0,
                "end": 0
            },
            "id": 512,
            "workspaceId": 2
        }
      ]
    }

* /set/{id} (PUT) - Update status and/or rename a comparison set.
    
JSON Format:
    { "name": "newName", "status": "newStatus" }
       where newStatus can be: NOT_COLLATED, COLLATED, ERROR

* /set/{id}/add (POST) - Add witnesses to a comparions set.

JSON Format:

    [wit_id_1, wit_id_2]

* /set/{id}/delete (POST) - Delete the specified witnesses from a set.

JSON Format:

    [wit_id_1, wit_id_2]

## Comparison Set Annotations

Use this API to create, update, view and delete user annotations on existing alignments.

* content types: application/json
* /set/{id}/annotation (GET) Get a list of annotations on the set.

JSON Format:
 
      Optional query params
        base=id: only return annotations on alignments where the witness specified by this ID is base
        range=x,x: Only return annotations made on the base within the range specified

      [
        {
          "id": 7,
          "groupId": 7,
          "setId": 87,
          "baseId": 289,
          "baseRange": {
              "start": 10,
              "end": 13
           },
          "notes": [
             {
                "id": 174,
                "witnessId": 289,
                "witnessName": "Roses_original",
                "text": "fixed text",
                "isGroup": true
             }
          ],
        }, ...
      ]

* /set/{id}/annotation (DELETE) Delete annotations on a set. With no query parameters specified, all annotations will be removed from the set. 
Optional query parameters:
base=id : Only delete annotation that have this witness as base
range=x,y : (Must be used with base) Only delete annotations on the base that fall within the range specified.
witness : (Must be used with base and range) Only delete an annotation specific to this witness

* /set/{id}/annotation (POST) Create or update an annotation on the set.

JSON Format:

    {
      "baseId": "289",
      "baseRange": {
        "start": "26",
        "end": "30"
      },
      "witnessId": "287",
      "note": "sample",
      "isGroup": false
    }


## Exist

Use this API to determine if a named resource exists in a workspace, and get its ID.

* content types: application/json
* /{type}/exist?name={name} (GET) Check if resource exists. Acceptable types: source, witness, set.

JSON Format:

      { "exists": true, "id": 123 }
      { "exists": false }

## Resource info

Use this API to get basic information about a resource when all you have is its id. **NOTE**: This call is different from all others. It does not accept a workspace as part of the URL.

* content types: application/json
* /{type}/{id}/info (GET) get the brief info for the resource. Acceptable types: source, witness, set.

JSON Format:

      {
        "id": 37,
        "workspace": "public",
        "name": "Frank",
        "dateCreated": "Jul 16, 2012",
        "dateModified": "Jul 16, 2012"
      }

## Usage reports

Use this API to track usage of a specific resource. It will return a JSON array containing all of the other resources that are related to the target. As an example, a usage report on a source would include all witnesses that were prepared from it as well as all comparison sets that contain these witnesses. 

* content types: application/json
* /{type}/{id}/usage (GET) get the usage report for a specific instance of a resource type. Acceptable types are SOURCE, WITNESS, SET.

JSON Format:

    Example of a source usage request
    [
      {
        "type": "WITNESS",
        "id": "512",
        "name": "witness1"
      },
      {
        "type": "WITNESS",
        "id": "513",
        "name": "witness2"
      },
      {
        "type": "COMPARISON_SET",
        "id": "98",
        "name": "example set"
      }
    ]

## Search

This API is used to locate exact matches within all documents in a given workspace. If no workspace is specified, the search will be constrained to public resources.

* content types: application/json
* /search?q={search terms} (GET) - retrieves a set of hits grouped by resource type.

JSON Format:

    {
      "sourceHits": [
          {
            "id": "7",
            "hits": [
                {
                    "startOffset": 0,
                    "endOffset": 4
                }
            ]
          }
      ],
      "witnessHits": [
        {
            "id": "8",
            "hits": [
                {
                    "startOffset": 0,
                    "endOffset": 4
                }
            ]
        }
      ]
    }
## Import Comparison Set

This API is used to a comparison set including all sources, witnesses and XSLT from a single source. The source can either be a Juxta Desktop .JXT file or an XML file encoded with TEI Parallel Segmentation.

* /import (POST) - Begin the import process and return the ID of the set that will contain the results. This call accepts two types of post; TEI Parallel Segmented imports use application/json and .JXT imports use multipart/form  

JSON Format:

    { setName: 'newSetName', teiSourceId: 11 }
    where teiSourceId is the ID of an existing source encoded with TEI Parallel Segmentation.

Multipart/form Format:

    This type of request requires two parts:
       jxtFile - contains the file to be imported.
       setName - the name for the new set.

The response to an import post is a JSON object containing the task ID and the new set ID. 

JSON Response Format:

    { 'setId': 'newSetId', 'taskId': 'import_task_id'}
    NOTE: pass the taskId to the task API to check the status/cancel the import task.

## Tokenizer

Before a set can be collated, all witnesses must be tokenized. Use this API to do so.

* /set/{setId}/tokenize (POST) - Begin the asynchronous tokenization process. Response is a plain text string containing the tokenizer task id. Use this id to check the status/cancel the tokenization task.

## Collator

The final step in the collation pipeline. Once a set has been successfully tokenized, call this API to perform the collation. Once complete, visualizations are available.

* content type: application/json
* /set/{setId}/collator  (POST/GET) - Create/retrieve the collation settings for a set.

JSON Format:

    {
      "id": 135,
      "filterWhitespace": true,
      "filterPunctuation": true,
      "filterCase": true,
      "hyphenationFilter": "INCLUDE_ALL"
    }
    where hyphenationFilter can be: 
       INCLUDE_ALL - All hyphenation will be included in the collation
       FILTER_LINEBREAK - Hyphenation followed by a linefeed will be ignored 
       FILTER_ALL - All hyphenation will be ignored

* /set/{setId}/collate (POST) - Begin the asynchronous collation process. Response is a plain text string containing the collation task id. Use this id to check the status/cancel the collation task.

## Comparison Set Visualizations

* content types: text/html
* /set/{setId}/view?mode=heatmap&base=3 (GET)
* /set/{setId}/view?mode=sidebyside&docs=1,3 (GET)

Only available after the set has been tokenized and collated.

**IMPORTANT** - Retrieval of visualizations **may** be asynchronous. If the visualization data is not available at the time of the request, the response will be 'RENDERING {task_id}'. Use this task id with the task API to determine when the visualization is ready to be viewed. Once the status is COMPLETE, request the visualization data again. This time the full visualization will be returned.

## Diff Fragment

This API is used to retrieve an HTML encoded fragment of text that highlights differences between the base and other witnesses.

* content types: application/json
* /set/{id}/diff/fragment?base={baseId}&range={to}:{from} - Get the diff fragment data using the specified base and covering the specified range.

JSON Response:

    [{
        "range": {
            "start": 19,
            "end": 29
        },
        "witnessName": "welcome2",
        "typeSymbol": "&#9650;&nbsp;",
        "fragment": " to Juxta! / <span class='change'>In getting</span> started, you should..."
    }]
    Each witness that has a difference relative to the base will have an entry in the array.

## QNames

This API is used to get a list of all the available qualified names. 

* content types: application/json
* /qnames

JSON Response:

    [
      {
        "namespace": "http://juxtasoftware.org/ns",
        "localName": "token"
      },
      {
        "namespace": "http://juxtasoftware.org/ns",
        "localName": "transposition"
      }
    ]


## QName Filter

A QName Filter is a named collection of annotation qualified names. It is used to filter the large volume of data that may be returned by the annotation requests that follow.

* content types: application/json
* /filter (POST) - Create a new filter and return its ID.

JSON Format: 

    { 
      name: "tokens", 
      qnames: 
      [ 
        {namespace: "http://juxtasoftware.org/ns", localName: "token"}  
      ] 
    }

* /filter/{id} (GET, PUT, DELETE)

## Annotations

An annotation is any named markup on a text. It consists of a qualified name and a range.

* content types: application/json, text/html 
* /set/{id}/witness/{id}/annotation?filter=juxta&range=100,200&content=yes (GET)

Code:

    filter is optional. If issues, only annotations in the qname filter will be returned
    content=yes is optional. If issued, the text of the annotation will be returned.
    range=100,200 is optional. If omitted the annotations over the entire witness will be returned.
    [
      {"id":1, "name": {"namespace": "http://juxtasoftware.org/ns", "localName": "token"}, "range": {"start": 4,"end": 10}},
      {"id":2, "name": {"namespace": "http://juxtasoftware.org/ns", "localName": "token"}, "range": {"start": 10,"end": 15}}
    ]


* /set/{id}/witness/{id}/annotation (POST) - Create annotations for all objects in the json array. Response is a count of annotations created.

Code:

    [
      {"name":{"namespace":"http://juxtasoftware.org/ns","localName":"del"},"range":{"start":4,"end":10}}
    ]

* /set{id}/witness/{id}/annotation/{id}&content=yes (GET)

Code:

    param content is optional. If issued, the text of the annotation will be returned

* /set/{id}/witness/{id}/annotation/{id} (DELETE)

## Alignments

An alignment is a set of two related annotations.

* content type: application/json
* /set/{id}/alignment (POST) - Create alignments for all objects in the json array. Response is a count of alignments created.

JSON Format:

     [
        {
            "name": {
                "namespace": "http://juxtasoftware.org/ns",
                "localName": "change"
            },
            "editDistance": "5",
            "annotations": [
                100,
                102
            ]
        },
        {
            "name": {
                "namespace": "http://juxtasoftware.org/ns",
                "localName": "change"
            },
            "editDistance": "1",
            "annotations": [
                110,
                112
            ]
        }
    ]
    
     Where annotations is a list of exactly 2 existing annotation IDs
     NOTE: editDistance is optional. In cases like a transposition / add / del, there is
               no edit distance and it can be left out
     
Alternate JSON Format (contains annotations inline):

    [
      {
        "name": {
            "namespace": "http://juxtasoftware.org/ns",
            "localName": "change"
        },
        "editDistance": "5",
        "annotations": [
            {
                "witnessId": 1,
                "name": {
                    "namespace": "http://juxtasoftware.org/ns",
                    "localName": "token"
                },
                "range": {
                    "start": 0,
                    "end": 10
                }
            },
            {
                "witnessId": 2,
                "name": {
                    "namespace": "http://juxtasoftware.org/ns",
                    "localName": "token"
                },
                "range": {
                    "start": 4,
                    "end": 10
                }
            }
        ]
      }
    ]

* /set/{id}/alignment/{id} (GET)
* /set/{id}/alignment?range=0,500 (GET)

Code:

    [
        {
            "id": 7,
            "name": {
                "id": 5,
                "namespace": "http://juxtasoftware.org/ns",
                "localName": "alignment"
            },
            "editDistance": 6,
            "annotations": [
                {
                    "annotationId": 11895,
                    "witnessId": 121,
                    "range": {
                        "start": 0,
                        "end": 4
                    }
                },
                {
                    "annotationId": 11898,
                    "witnessId": 120,
                    "range": {
                        "start": 0,
                        "end": 5
                    }
                }
            ]
        },
        ...
    ]

## TEI Parallel Segmentation Export

Use this API to export a set in TEI Parallel Segmentation. Note that this export will only contain the main witness text and differences between other witnesses. Other data, such as notes, page breaks and line numbers will not be included.

* /set/{id}/export?mode=teips&base=101&sync - Get the parallel segmentation output. 

The base param is require. It tells the system which witness to use as the base text when generating the XML output.
The sync param is optional. When included, the call will be synchronous; it will block while the data is generated and return XML as the result. When it is not excluded, there are two possible results from this call. If the export has previously been generated, the XML will be returned immediately.

If not, the return will be 'EXPORTING {taskid}". Parse out the taskId and use the previously described Task API to track the status of the export. When complete, make another request to /export to get the XML.

## Edition Starter

Use this API to generate a skeletal edition from a comparison set. Output can be in HTML or DOCX.

* /set/{id}/edition (POST) - Begin the process of creating an edition based on the settings in the JSON payload. The response to this POST is a JSON object containing information needed to track the progress of the edition creation, as well as a token used to retrieve the completed document.

JSON Request Format:

     { 
         title: title,
         lineFrequency: 5,
         numberBlankLines: true | false,
         witnesses: [
            { id: id, include: true|false, base: true|false, siglum: name }, ...
         ]
     }

JSON Response Format:

     {
       "status": "RENDERING",
       "taskId": "id",
       "token": "token"
     } 

     The taskID is used to track rendering progress. When complete, the token is used to get the edition.

* /set/{id}/edition (GET) Get the edition. Two query parameters are required:
token=t : The edition token returned by the POST.
format=html|docx : The format in which to return the edition.
 