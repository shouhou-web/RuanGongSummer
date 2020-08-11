package com.diamond.utils;

import com.squareup.okhttp.*;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class HttpHelper {
    public String Get(String url)
    {
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(url)
                .build();
        try
        {
            Response response = client.newCall(request).execute();
            return response.body().string();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String Post(String url,String json)
    {
        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.parse("application/json; charset=utf-8");
        RequestBody body = RequestBody.create(mediaType, json);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        try
        {
            Response response = client.newCall(request).execute();
            return response.body().string();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        return null;
    }
}
