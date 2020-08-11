package com.diamond.controller;

import com.alibaba.fastjson.JSON;
import com.diamond.pojo.DocUser;
import com.diamond.utils.HttpHelper;
import com.diamond.utils.authdto.RequestAccessTokenParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private HttpHelper httpHelper;
    String client_id = "9a23a83f614e0bcd437d";
    String client_secret = "fd71c17f3c23abaf684e1f114520c2801aadf7b9";

    @RequestMapping("/githubcallback")
    public String loginByGitHub(@RequestParam("code") String code){
        RequestAccessTokenParam param = new RequestAccessTokenParam();
        param.setClient_id(client_id);
        param.setClient_secret(client_secret);
        param.setCode(code);
        param.setRedirect_url("http://localhost:8080/home");
        param.setState("test");

        String url = "https://github.com/login/oauth/access_token";
        String json = JSON.toJSONString(param);
        String result = httpHelper.Post(url,json);

        String[] strs = result.split("&");
        String access_token = strs[0].split("=")[1];

        String url_user = "https://api.github.com/user?access_token=" + access_token;
        String userInfo = httpHelper.Get(url_user);
        return userInfo;
    }
}
