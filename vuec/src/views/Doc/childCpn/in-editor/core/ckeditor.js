import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import EditorWatchdog from "@ckeditor/ckeditor5-watchdog/src/editorwatchdog";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";

import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";

import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";

import Link from "@ckeditor/ckeditor5-link/src/link";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline";

import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor";

import Code from "@ckeditor/ckeditor5-basic-styles/src/code";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";

import List from "@ckeditor/ckeditor5-list/src/list";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";

import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";

import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";

import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";

import TrackChanges from "@ckeditor/ckeditor5-track-changes/src/trackchanges";

import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";

export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  SimpleUploadAdapter,
  TrackChanges,

  Essentials,
  Autoformat,
  PasteFromOffice,

  Paragraph,
  Heading,

  Bold,
  Italic,
  Underline,
  Strikethrough,

  Link,
  BlockQuote,
  HorizontalLine,

  FontColor,
  FontBackgroundColor,

  Code,
  CodeBlock,

  List,
  Alignment,

  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageResize,

  Table,
  TableToolbar,

  Indent,
  MediaEmbed
];

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "link",
      "blockQuote",
      "horizontalLine",
      "|",
      "fontcolor",
      "fontbackgroundcolor",
      "|",
      "code",
      "codeblock",
      "|",
      "bulletedList",
      "numberedList",
      "alignment",
      "|",
      "imageUpload",
      "insertTable",
      "|",
      "TrackChanges"
      // 'indent',
      // 'outdent',
      // 'mediaEmbed'
    ]
  },
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1"
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2"
      },
      {
        model: "heading3",
        view: "h3",
        title: "Heading 3",
        class: "ck-heading_heading3"
      },
      {
        model: "heading4",
        view: "h4",
        title: "Heading 4",
        class: "ck-heading_heading4"
      }
    ]
  },
  image: {
    toolbar: [
      "imageTextAlternative",
      "|",
      "imageStyle:alignLeft",
      "imageStyle:full",
      "imageStyle:alignRight"
    ],
    styles: ["full", "alignLeft", "alignRight"]
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
  },
  licenseKey: "BTwoN2FJuJIiGvx7Ro5jkvqKKgoTNDnl1CVyzZd8RxlOrhwXD2U5FW4=",
  TrackChanges: {
    sidebar: {
      container: document.querySelector("#sidebar")
    },
    toolbar: {
      items: ["bold", "italic", "|", "trackChanges"]
    }
  },
  language: "en"
};

// const appData = {};

// // Users data.
// appData.users = [
//   {
//     id: "user-1",
//     name: "Joe Doe",
//     // Note that the avatar is optional.
//     avatar: "https://randomuser.me/api/portraits/thumb/men/26.jpg"
//   },
//   {
//     id: "user-2",
//     name: "Ella Harper",
//     avatar: "https://randomuser.me/api/portraits/thumb/women/65.jpg"
//   }
// ];

// // The ID of the current user.
// appData.userId = "user-1";

// // Comment threads data.
// appData.suggestions = [
//   {
//     id: "suggestion-1",
//     type: "insertion",
//     authorId: "user-2",
//     createdAt: new Date(2019, 1, 13, 11, 20, 48)
//   },
//   {
//     id: "suggestion-2",
//     type: "deletion",
//     authorId: "user-1",
//     createdAt: new Date(2019, 1, 14, 12, 7, 20)
//   },
//   {
//     id: "suggestion-3",
//     type: "insertion",
//     authorId: "user-1",
//     createdAt: new Date(2019, 1, 14, 12, 7, 20)
//   },
//   {
//     id: "suggestion-4",
//     type: "deletion",
//     authorId: "user-1",
//     createdAt: new Date(2019, 1, 15, 8, 44, 1)
//   },
//   {
//     id: "suggestion-5",
//     type: "formatInline:886cqig6g8rf",
//     authorId: "user-2",
//     createdAt: new Date(2019, 2, 8, 10, 2, 7),
//     data: {
//       commandName: "bold",
//       commandParams: [{ forceValue: true }]
//     }
//   },
//   {
//     id: "suggestion-6",
//     type: "formatBlock:698dn3otqzd6",
//     authorId: "user-2",
//     createdAt: new Date(2019, 2, 8, 10, 2, 10),
//     data: {
//       commandName: "heading",
//       commandParams: [{ value: "heading2" }],
//       formatGroupId: "blockName",
//       multipleBlocks: false
//     }
//   },
//   {
//     id: "e3157f571d4a7b5d21a8876aec1a60b1c",
//     type: "formatBlock:mergeTableCells",
//     authorId: "user-1",
//     createdAt: new Date(2019, 2, 8, 10, 2, 10),
//     data: {
//       commandName: "mergeTableCells",
//       commandParams: [],
//       formatGroupId: "mergeTableCells",
//       multipleBlocks: false
//     }
//   },
//   {
//     id: "ecbdfcf1052e0c6e6c756b095765560c8",
//     type: "deletion:tableColumn",
//     authorId: "user-1",
//     createdAt: new Date(2019, 1, 15, 8, 44, 1)
//   }
// ];

// // Comment threads data.
// appData.commentThreads = [
//   {
//     threadId: "suggestion-1",
//     comments: [
//       {
//         commentId: "comment-1",
//         authorId: "user-1",
//         content: "<p>Are you sure it will fit here?</p>",
//         createdAt: new Date("09/20/2018 14:21:53")
//       },
//       {
//         commentId: "comment-2",
//         authorId: "user-2",
//         content: "<p>I think so...</p>",
//         createdAt: new Date("09/21/2018 08:17:01")
//       }
//     ]
//   }
// ];

// appData.initialData = `<h2>
// 				Bilingual Personality Disorder
// 			</h2>
// 			<figure class="image image-style-side">
// 				<img src="https://c.cksource.com/a/1/img/docs/sample-image-bilingual-personality-disorder.jpg">
// 				<figcaption>
// 					One language, one person.
// 				</figcaption>
// 			</figure>
// 			<p>
// 				This may be the first time you hear about this made-up disorder but it
// 				<suggestion id="suggestion-1:user-2" suggestion-type="insertion" type="start"></suggestion>actually<suggestion id="suggestion-1:user-2" suggestion-type="insertion" type="end"></suggestion>
// 				isn’t so far from the truth. Even the studies that were conducted almost half a century show
// 				that <strong>the language you speak has more effects on you than you realize</strong>.
// 			</p>
// 			<p>
// 				One of the very first experiments conducted on this topic dates back to 1964.
// 				<a href="https://www.researchgate.net/publication/9440038_Language_and_TAT_content_in_bilinguals">In the experiment</a>
// 				designed by linguist Ervin-Tripp who is an
// 				<suggestion id="suggestion-2:user-1" suggestion-type="deletion" type="start"></suggestion>
// 				authority<suggestion id="suggestion-2:user-1" suggestion-type="deletion" type="end">
// 				</suggestion>
// 				<suggestion id="suggestion-3:user-1" suggestion-type="insertion" type="start"></suggestion>
// 				expert<suggestion id="suggestion-3:user-1" suggestion-type="insertion" type="end"></suggestion>
// 				in psycholinguistic and sociolinguistic studies, adults who are bilingual
// 				in English in French were showed series of pictures and were asked to create 3-minute stories.
// 				In the end participants emphasized
// 				drastically different dynamics for stories in English and French.
// 			</p>
// 			<p>
// 				Another ground-breaking experiment which included bilingual Japanese women married to American men
// 				<suggestion id="suggestion-4:user-1" suggestion-type="deletion" type="start"></suggestion>in San
// 				Francisco <suggestion id="suggestion-4:user-1" suggestion-type="deletion" type="end">
// 				</suggestion>were
// 				asked to complete sentences. The goal of the experiment was to investigate whether or not human
// 				feelings and thoughts
// 				are expressed differently in <strong>different language mindsets</strong>.
// 			</p>
// 			<suggestion id="suggestion-6:user-2" suggestion-type="formatBlock:698dn3otqzd6" type="start"></suggestion>
// 			<p>
// 				Here is a sample from the the experiment:
// 				<suggestion id="suggestion-6:user-2" suggestion-type="formatBlock:698dn3otqzd6" type="end"></suggestion>
// 			</p>
// 			<table>
// 				<thead>
// 					<tr>
// 						<th>&nbsp;</th>
// 						<th data-suggestion-start="deletion:tableColumn:ecbdfcf1052e0c6e6c756b095765560c8:user-1:afb3c" data-suggestion-end="deletion:tableColumn:ecbdfcf1052e0c6e6c756b095765560c8:user-1:afb3c">English</th>
// 						<th>Japanese</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					<tr>
// 						<td>Real friends should</td>
// 						<td
// 							data-suggestion-start="deletion:tableColumn:ecbdfcf1052e0c6e6c756b095765560c8:user-1:ad447,formatBlock:mergeTableCells:e3157f571d4a7b5d21a8876aec1a60b1c:user-1:c048f"
// 							data-suggestion-end="deletion:tableColumn:ecbdfcf1052e0c6e6c756b095765560c8:user-1:ad447,formatBlock:mergeTableCells:e3157f571d4a7b5d21a8876aec1a60b1c:user-1:c048f"
// 						>
// 							Be very frank
// 						</td>
// 						<td>Help each other</td>
// 					</tr>
// 					<tr>
// 						<td>I will <suggestion-start name="formatInline:886cqig6g8rf:suggestion-5:user-2"></suggestion-start>probably<suggestion-end name="formatInline:886cqig6g8rf:suggestion-5:user-2"></suggestion-end> become</td>
// 						<td
// 							data-suggestion-start="deletion:tableColumn:ecbdfcf1052e0c6e6c756b095765560c8:user-1:4e1f8,formatBlock:mergeTableCells:e3157f571d4a7b5d21a8876aec1a60b1c:user-1:c7778"
// 							data-suggestion-end="deletion:tableColumn:ecbdfcf1052e0c6e6c756b095765560c8:user-1:4e1f8,formatBlock:mergeTableCells:e3157f571d4a7b5d21a8876aec1a60b1c:user-1:c7778"
// 						>
// 							A teacher
// 						</td>
// 						<td>A housewife</td>
// 					</tr>
// 					<tr>
// 						<td>When there is a conflict with family</td>
// 						<td data-suggestion-start="deletion:tableColumn:ecbdfcf1052e0c6e6c756b095765560c8:user-1:fff44" data-suggestion-end="deletion:tableColumn:ecbdfcf1052e0c6e6c756b095765560c8:user-1:fff44">I do what I want</td>
// 						<td>It's a time of great unhappiness</td>
// 					</tr>
// 				</tbody>
// 			</table>
// 			<p>
// 				More recent <a href="https://books.google.pl/books?id=1LMhWGHGkRUC">studies</a> show, the
// 				language a person speaks affects
// 				their cognition, behavior, emotions and hence <strong>their personality</strong>.
// 				This shouldn’t come as a surprise
// 				<a href="https://en.wikipedia.org/wiki/Lateralization_of_brain_function">since we already know</a>
// 				that different regions of the brain become more active depending on the person’s activity at hand.
// 				The structure, information and especially <strong>the culture</strong> of languages varies
// 				substantially and the language a person speaks is an essential element of daily life.
// 			</p>`;

// class TrackChangesIntegration {
//   constructor(editor) {
//     this.editor = editor;
//   }

//   init() {
//     const usersPlugin = this.editor.plugins.get("Users");
//     const trackChangesPlugin = this.editor.plugins.get("TrackChanges");
//     const commentsRepositoryPlugin = this.editor.plugins.get(
//       "CommentsRepository"
//     );

//     // Load the users data.
//     for (const user of appData.users) {
//       usersPlugin.addUser(user);
//     }

//     // Set the current user.
//     usersPlugin.defineMe(appData.userId);

//     // Load the comment threads data.
//     for (const commentThread of appData.commentThreads) {
//       commentThread.isFromAdapter = true;

//       commentsRepositoryPlugin.addCommentThread(commentThread);
//     }

//     // Load the suggestions data.
//     for (const suggestion of appData.suggestions) {
//       trackChangesPlugin.addSuggestion(suggestion);
//     }
//   }
// }

// const watchdog = new EditorWatchdog();

// window.watchdog = watchdog;

// watchdog.setCreator((el, config) => {
//   return ClassicEditor.create(el, config).then(editor => {
//     // Make the track changes mode the "default" state by turning it on just after the editor initializes.
//     editor.execute("trackChanges");

//     // After the editor is initialized, add an action to be performed after a button is clicked.
//     const trackChanges = editor.plugins.get("TrackChanges");
//     const commentsRepository = editor.plugins.get("CommentsRepository");

//     // Get the data on demand.
//     editor.ui.view.listenTo(
//       document.querySelector(".get-data"),
//       "click",
//       (_, evt) => {
//         const editorData = editor.data.get();
//         const suggestionsData = trackChanges.getSuggestions();
//         const commentThreadsData = commentsRepository.getCommentThreads({
//           skipNotAttached: true,
//           skipEmpty: true
//         });

//         console.log("Editor data:");
//         console.log(editorData);
//         console.log("Suggestions data:");
//         console.log(suggestionsData);
//         console.log("Comment threads data:");
//         console.log(commentThreadsData);

//         evt.preventDefault();
//       }
//     );

//     // Switch between inline, narrow sidebar and wide sidebar according to the window size.
//     const annotations = editor.plugins.get("Annotations");
//     const sidebarElement = document.querySelector(".sidebar");

//     function refreshDisplayMode() {
//       if (window.innerWidth < 1070) {
//         sidebarElement.classList.remove("narrow");
//         sidebarElement.classList.add("hidden");
//         annotations.switchTo("inline");
//       } else if (window.innerWidth < 1300) {
//         sidebarElement.classList.remove("hidden");
//         sidebarElement.classList.add("narrow");
//         annotations.switchTo("narrowSidebar");
//       } else {
//         sidebarElement.classList.remove("hidden", "narrow");
//         annotations.switchTo("wideSidebar");
//       }
//     }

//     // Prevent closing the tab when any action is pending.
//     editor.ui.view.listenTo(window, "beforeunload", (evt, domEvt) => {
//       if (editor.plugins.get("PendingActions").hasAny) {
//         domEvt.preventDefault();
//         domEvt.returnValue = true;
//       }
//     });

//     editor.ui.view.listenTo(window, "resize", refreshDisplayMode);
//     refreshDisplayMode();

//     return editor;
//   });
// });

// watchdog.setDestructor(editor => editor.destroy());

// watchdog.create(document.querySelector("#editor"), {
//   extraPlugins: [TrackChangesIntegration]
// });
