package com.diamond.service;

import com.diamond.mapper.MemberMapper;
import com.diamond.mapper.TeamMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamSpaceService {

    @Autowired
    private TeamMapper teamMapper;
    @Autowired
    private MemberMapper memberMapper;



}
