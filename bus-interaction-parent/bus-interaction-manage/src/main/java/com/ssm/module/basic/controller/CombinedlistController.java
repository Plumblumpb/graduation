package com.ssm.module.basic.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssm.module.basic.service.AuditlistService;
import com.ssm.module.basic.service.CarplanService;
import com.ssm.module.basic.service.CombinedlistService;
import com.ssm.module.common.util.R;
import com.ssm.module.note.tool.NoteCarTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController()
@RequestMapping("/basic/combine")
public class CombinedlistController {
    @Autowired
    private CombinedlistService combinedlistService;

    @Autowired
    private CarplanService carplanService;

    @RequestMapping("/list")
    public R getAll(@RequestParam Map<String, Object> params) {
        String currentPage = params.get("currentPage") == null ? "1" : params.get("currentPage").toString();
        String pageSize = params.get("pageSize") == null ? "5" : params.get("pageSize").toString();
        PageHelper.startPage(Integer.parseInt(currentPage), Integer.parseInt(pageSize));
        List<NoteCarTools> combinedlist = combinedlistService.getAll(params);
        PageInfo<NoteCarTools> pageInfo = new PageInfo<>(combinedlist);
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping("/listcombine")
    public R getSelect(@RequestParam Map<String, Object> params) {
        String currentPage = params.get("currentPage") == null ? "1" : params.get("currentPage").toString();
        String pageSize = params.get("pageSize") == null ? "5" : params.get("pageSize").toString();
        PageHelper.startPage(Integer.parseInt(currentPage), Integer.parseInt(pageSize));
        List<NoteCarTools> carplan = combinedlistService.selectBySelective(params);
        PageInfo<NoteCarTools> pageInfo = new PageInfo<>(carplan);
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping("/delete")
    public R delete(@RequestBody int[] nodeIds) {

        combinedlistService.delete(nodeIds);
        return R.ok();
    }

    @RequestMapping("/updateAll")
    public R updateAll(@RequestBody int[] nodeIds) {

        combinedlistService.updateStatus(nodeIds);
        return R.ok();
    }

    @RequestMapping("/updateAllNote")
    public R updateAllNote(@RequestParam Map<String, Object> params) {
        NoteCarTools noteCarTools = new NoteCarTools();
        String noteid = params.get("noteid").toString();
        String carNumber = params.get("carNumber").toString();
        String transportPlan = params.get("transportPlan").toString();
        String noteidTwo = params.get("noteidTwo").toString();
        noteCarTools.setNoteid(Integer.parseInt(noteid));
        noteCarTools.setCarNumber(Integer.parseInt(carNumber));
        noteCarTools.setTransportPlan(Integer.parseInt(transportPlan));

        carplanService.update(noteCarTools);
        carplanService.delete(Integer.parseInt(noteidTwo));
        return R.ok();
    }

}
