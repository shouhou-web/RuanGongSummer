package com.diamond.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.internet.MimeMessage;
import java.util.Random;

@Component
public class MailClient {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;
    @Value("欢迎加入金刚石文档！")
    private String verificationSubject;

    public int generateVerificationCode(){
        Random random = new Random();
        return random.nextInt(900000)+100000;
    }

    public void sendEmailVerificationCode(String to,int verificationCode) throws Exception{
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject(verificationSubject);
        String text = "您的验证码为：" + verificationCode;
        helper.setText(text);
        mailSender.send(mimeMessage);
    }

}
