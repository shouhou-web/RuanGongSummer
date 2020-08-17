import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

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
export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
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
