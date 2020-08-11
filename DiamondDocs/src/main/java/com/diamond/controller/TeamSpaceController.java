package com.diamond.controller;

import com.diamond.dto.DocPreview;
import com.diamond.dto.MemberPreview;
import com.diamond.dto.TeamPreview;
import com.diamond.pojo.Team;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*",maxAge = 3600)
public class TeamSpaceController {

    @RequestMapping("/getMyTeam")
    public List<TeamPreview> getMyTeam(@RequestParam("userID") String userID){
        return null;
    }

    @RequestMapping("/getTeamMembers")
    public List<MemberPreview> getTeamMembers(@RequestParam("teamID") String teamID){
        return null;
    }

    @RequestMapping("/getTeamDocs")
    public List<DocPreview> getTeamDocs(@RequestParam("userID") String teamID){
        return null;
    }
}
