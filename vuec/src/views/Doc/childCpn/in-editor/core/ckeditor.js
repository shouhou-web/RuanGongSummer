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
    id: "1",
    name: "Ella Harper",
    avatar: "https://randomuser.me/api/portraits/thumb/women/65.jpg"
  }
];

function getMyUsers() {
  // while(store.state.nowDocCol.length == 0);
  // console.log()
  // if (store.state.nowDocCol) return store.state.nowDocCol;
  // else return appData.users;
  // console.log(store.state.nowDocID);
  // // let users = [];
  return getCollaboratorInfo(store.state.nowDocID)
    .then(res => {
      console.log("test", res);
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}

function getUser() {
  console.log("当前操作者", store.state.user.userID);
  if (store.state.user.userID) return store.state.user.userID;
  else return "1";
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

    getMyUsers().then(res => {
      console.log(res);
      for (const user of res) {
        usersPlugin.addUser(user);
      }
      usersPlugin.defineMe(getUser());
    });

    // Set the adapter to the `TrackChanges#adapter` property.
    trackChangesPlugin.adapter = {
      getSuggestion: suggestionId => {
        // This function should query the database for data for a suggestion with a `suggestionId`.
        console.log("Get suggestion", suggestionId);
        return getSuggestion(suggestionId).then(res => {
          if (res) {
            console.log(res);
            var result_id = res.id;
            var result_type = res.type;
            var result_authorId = res.authorId;
            var result_createdAt = res.createdAt;
            var result_hasComments = res.hasComments;
            var result_data = res.data;
            console.log(
              result_id +
                " " +
                result_type +
                " " +
                result_authorId +
                " " +
                result_createdAt +
                " " +
                result_hasComments +
                " " +
                result_data
            );
            return new Promise(resolve => {
              resolve({
                id: result_id,
                type: result_type,
                authorId: result_authorId,
                createdAt: result_createdAt,
                hasComments: result_hasComments,
                data: result_data
              });
            });
          } else {
            console.log("failed");
          }
        });
      },

      addSuggestion: suggestionData => {
        // This function should save `suggestionData` in the database.
        console.log(suggestionData);
        suggestionData.createdAt = new Date();
        suggestionData.authorId = store.state.user.userID;
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
