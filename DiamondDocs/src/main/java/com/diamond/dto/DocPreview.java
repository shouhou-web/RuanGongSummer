package com.diamond.dto;

import lombok.Data;

/*
 * 文档类的简略信息
 * 用于在获取各种文档列表时预览文档信息
 */
@Data
public class DocPreview {
    String docID;
    String docTitle;
}
