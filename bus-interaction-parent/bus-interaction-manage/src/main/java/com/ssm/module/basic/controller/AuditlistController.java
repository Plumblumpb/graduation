package com.ssm.module.basic.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssm.module.basic.service.ArrangecarService;
import com.ssm.module.basic.service.AuditlistService;
import com.ssm.module.common.util.R;
import com.ssm.module.note.tool.NoteCarTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController()
@RequestMapping("/basic/audit")
public class AuditlistController {
    @Autowired
    private AuditlistService auditlistService;

    @RequestMapping("/list")
    public R getAll(@RequestParam Map<String, Object> params) {
        String currentPage = params.get("currentPage") == null ? "1" : params.get("currentPage").toString();
        String pageSize = params.get("pageSize") == null ? "50" : params.get("pageSize").toString();
        PageHelper.startPage(Integer.parseInt(currentPage), Integer.parseInt(pageSize));
        List<NoteCarTools> auditlist = auditlistService.getAll(params);
        PageInfo<NoteCarTools> pageInfo = new PageInfo<>(auditlist);
        return R.ok().put("pageInfo", pageInfo);
    }


    @RequestMapping("/listaudit")
    public R getSelect(@RequestParam Map<String, Object> params) {
        String currentPage = params.get("currentPage") == null ? "1" : params.get("currentPage").toString();
        String pageSize = params.get("pageSize") == null ? "5" : params.get("pageSize").toString();
        PageHelper.startPage(Integer.parseInt(currentPage), Integer.parseInt(pageSize));
        List<NoteCarTools> carplan = auditlistService.selectBySelective(params);
        PageInfo<NoteCarTools> pageInfo = new PageInfo<>(carplan);
        return R.ok().put("pageInfo", pageInfo);
    }


    @RequestMapping("/delete")
    public R delete(@RequestBody int[] nodeIds) {

        auditlistService.delete(nodeIds);
        return R.ok();
    }

    @RequestMapping("/updateAll")
    public R updateAll(@RequestBody int[] nodeIds) {

        auditlistService.updateStatus(nodeIds);
        return R.ok();
    }

    @RequestMapping("/updateReturn")
    public R updateReturn(@RequestParam Map<String, Object> params) {


        auditlistService.returnStatus(params);
        return R.ok();

    }

}
