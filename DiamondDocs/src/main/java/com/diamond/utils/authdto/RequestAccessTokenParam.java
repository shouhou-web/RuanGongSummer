package com.diamond.utils.authdto;

import lombok.Data;

@Data
public class RequestAccessTokenParam {
    String client_id;
    String client_secret;
    String code;
    String redirect_url;
    String state;
}
