package com.diamond.controller;

import com.diamond.pojo.DocUser;
import com.diamond.service.UserInfoService;
import com.diamond.utils.MailClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*",maxAge = 3600)
public class UserInfoController {

    @Autowired
    private MailClient mailClient;
    @Autowired
    private UserInfoService userInfoService;

    @RequestMapping("/emailVerification")
    public int emailVerification(@RequestParam("emailAddress") String emailAddress){
        try {
            int verificationCode = mailClient.generateVerificationCode();
            mailClient.sendEmailVerificationCode(emailAddress, verificationCode);
            return verificationCode;
        }
        catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("/signUp")
    public int signUp(@RequestParam("name") String name, @RequestParam("emailAddress") String emailAddress,
                      @RequestParam("password") String password, @RequestParam("password2") String password2){
        try {
            return userInfoService.signUp(name,emailAddress,password,password2);
        }
        catch (Exception e){
            e.printStackTrace();
            return 5;
        }
    }

    @RequestMapping("/login")
    public DocUser login(@RequestParam("name") String name, @RequestParam("password") String password){
        try {
            return userInfoService.login(name,password);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("/resetPwd")
    public int resetPwd(@RequestParam("emailAddress") String emailAddress, @RequestParam("password") String password,
                        @RequestParam("password2") String password2) {
        try {
            return userInfoService.resetPwd(emailAddress, password, password2);
        }
        catch (Exception e){
            e.printStackTrace();
            return 5;
        }
    }

}
