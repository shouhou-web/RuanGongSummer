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

import { uploadImage } from "@/network/doc";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";

import {
  getCollaboratorInfo,
  addSuggestion,
  getSuggestion,
  updateSuggestion
} from "network/doc";

import store from "@/store/index";

export default class ClassicEditor extends ClassicEditorBase {}
const appData = {};

// Users data.
appData.users = [
  {
    id: "user-1",
    name: "Joe Doe",
    // Note that the avatar is optional.
    avatar: "https://randomuser.me/api/portraits/thumb/men/26.jpg"
  },
  {
    id: "DAE7FC3E",
    name: "Ella Harper",
    avatar: "https://randomuser.me/api/portraits/thumb/women/65.jpg"
  }
];

function getMyUsers() {
  return store.state.docCol;
  // console.log(store.state.nowDocID);
  // // let users = [];
  // return getCollaboratorInfo(store.state.nowDocID)
  //   .then(res => {
  //     console.log("test", res);
  //     return res;
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
}

function getUser() {
  console.log("当前操作者", store.state.user.userID);
  return store.state.user.userID;
}
// The ID of the current user.
// appData.userId = 'usewr-1'

class TrackChangesIntegration {
  constructor(editor) {
    this.editor = editor;
  }

  init() {
    const usersPlugin = this.editor.plugins.get("Users");
    const trackChangesPlugin = this.editor.plugins.get("TrackChanges");
    const commentsRepositoryPlugin = this.editor.plugins.get(
      "CommentsRepository"
    );

    // Load the users data.
    let myUsers = getMyUsers();
    console.log(myUsers);
    // for (let i = 0; i < myUsers.length; i++) {
    //   console.log(myUsers[i])
    //   usersPlugin.addUser(myUsers[i]);
    // }
    for (const user of myUsers) {
      usersPlugin.addUser(user);
    }

    // Set the current user.
    // usersPlugin.defineMe('user-1');
    usersPlugin.defineMe(getUser());

    // Set the adapter to the `TrackChanges#adapter` property.
    trackChangesPlugin.adapter = {
      getSuggestion: suggestionId => {
        // This function should query the database for data for a suggestion with a `suggestionId`.
        console.log("Get suggestion", suggestionId);
        var temp = getSuggestion(suggestionId).then(res => {
          if (res) {
            // console.log(res);
            console.log("success");
            return res;
          } else {
            console.log("failed");
          }
        });
        console.log(temp);
        return new Promise(resolve => {
          resolve(temp);
        });
        return new Promise(resolve => {
          // switch (
          //   suggestionId
          // case "suggestion-1":
          //   resolve({
          //     id: "suggestion-1",
          //     type: "insertion",
          //     authorId: "user-2",
          //     createdAt: new Date(2019, 1, 13, 11, 20, 48),
          //     hasComments: true
          //   });
          //   break;
          // case "suggestion-2":
          //   resolve({
          //     id: "suggestion-2",
          //     type: "deletion",
          //     authorId: "user-1",
          //     createdAt: new Date(2019, 1, 14, 12, 7, 20),
          //     hasComments: false
          //   });
          //   break;
          // case "suggestion-3":
          //   resolve({
          //     id: "suggestion-3",
          //     type: "insertion",
          //     authorId: "user-1",
          //     createdAt: new Date(2019, 1, 14, 12, 7, 20),
          //     hasComments: false
          //   });
          //   break;
          // case "suggestion-4":
          //   resolve({
          //     id: "suggestion-4",
          //     type: "deletion",
          //     authorId: "user-1",
          //     createdAt: new Date(2019, 1, 15, 8, 44, 1),
          //     hasComments: true
          //   });
          //   break;
          // case "suggestion-5":
          //   resolve({
          //     id: "suggestion-5",
          //     type: "formatInline:886cqig6g8rf",
          //     authorId: "user-2",
          //     hasComments: false,
          //     createdAt: new Date(2019, 2, 8, 10, 2, 7),
          //     data: {
          //       commandName: "bold",
          //       commandParams: [{ forceValue: true }]
          //     }
          //   });
          //   break;
          // case "suggestion-6":
          //   resolve({
          //     id: "suggestion-6",
          //     type: "formatBlock:698dn3otqzd6",
          //     authorId: "user-2",
          //     hasComments: false,
          //     createdAt: new Date(2019, 2, 8, 10, 2, 10),
          //     data: {
          //       commandName: "heading",
          //       commandParams: [{ value: "heading2" }],
          //       formatGroupId: "blockName",
          //       multipleBlocks: false
          //     }
          //   });
          //   break;
          // case "e3157f571d4a7b5d21a8876aec1a60b1c":
          //   resolve({
          //     id: "e3157f571d4a7b5d21a8876aec1a60b1c",
          //     type: "formatBlock:mergeTableCells",
          //     authorId: "user-1",
          //     hasComments: false,
          //     createdAt: new Date(2019, 2, 8, 10, 2, 10),
          //     data: {
          //       commandName: "mergeTableCells",
          //       commandParams: [],
          //       formatGroupId: "mergeTableCells",
          //       multipleBlocks: false
          //     }
          //   });
          //   break;
          // case "ecbdfcf1052e0c6e6c756b095765560c8":
          //   resolve({
          //     id: "ecbdfcf1052e0c6e6c756b095765560c8",
          //     type: "deletion:tableColumn",
          //     authorId: "user-1",
          //     hasComments: false,
          //     createdAt: new Date(2019, 2, 8, 10, 2, 10)
          //   });
          // ) {
          // }
        });
      },

      addSuggestion: suggestionData => {
        // This function should save `suggestionData` in the database.
        console.log("Suggestion added", suggestionData);
        console.log(suggestionData.id);
        addSuggestion(suggestionData.id, suggestionData).then(res => {
          if (res === 0) {
            console.log("success");
            console.log(suggestionData);
          } else {
            console.log("failed");
          }
        });

        return Promise.resolve({
          createdAt: new Date() // Should be set server-side.
        });
      },

      updateSuggestion: (id, suggestionData) => {
        // This function should update `suggestionData` in the database.
        console.log("Suggestion updated", id, suggestionData);

        return Promise.resolve();
      }
    };

    // Track changes uses comments to allow discussing about the suggestions.
    // The comments adapter has to be defined as well.
    commentsRepositoryPlugin.adapter = {
      getCommentThread: ({ threadId }) => {
        // This function should query the database for data for the comment thread with a `commentThreadId`.
        console.log("Get comment thread", threadId);
        return new Promise(resolve => {
          switch (threadId) {
            case "suggestion-1":
              resolve({
                threadId: "suggestion-1",
                comments: [
                  {
                    commentId: "comment-1",
                    content: "Sounds good.",
                    authorId: "user-1",
                    createdAt: new Date(2019, 1, 13, 11, 32, 57)
                  }
                ]
              });
              break;
            case "suggestion-4":
              resolve({
                threadId: "suggestion-4",
                comments: [
                  {
                    commentId: "comment-2",
                    content: "I think it's not relevant.",
                    authorId: "user-2",
                    createdAt: new Date(2019, 1, 15, 9, 3, 1)
                  },
                  {
                    commentId: "comment-3",
                    content: "You are right. Thanks.",
                    authorId: "user-1",
                    createdAt: new Date(2019, 1, 15, 9, 28, 1)
                  }
                ]
              });
              break;
            default:
              resolve();
          }
        });
      },
      addComment: data => {
        // This function should save `data` in the database.
        console.log("Comment added", data);
        return Promise.resolve({
          createdAt: new Date() // Should be set server-side.
        });
      },
      updateComment: data => {
        // This function should save `data` in the database.
        console.log("Comment updated", data);
        return Promise.resolve();
      },
      removeComment: data => {
        // This function should remove the comment of a given `data` from the database.
        console.log("Comment removed", data);
        return Promise.resolve();
      },
      removeCommentThread: data => {
        // This function should remove the comment of a given `data` from the database.
        console.log("Comment thread removed", data);
        return Promise.resolve();
      }
    };
  }
}

ClassicEditor.builtinPlugins = [
  SimpleUploadAdapter,
  TrackChanges,
  TrackChangesIntegration,

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
