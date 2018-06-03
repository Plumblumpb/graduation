package com.ssm.module.basic.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssm.module.basic.service.CombinedlistService;
import com.ssm.module.basic.service.LoadcarService;
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
@RequestMapping("/basic/loadcar")
public class LoadcarController {
    @Autowired
    private LoadcarService loadcarService;

    @RequestMapping("/list")
    public R getAll(@RequestParam Map<String, Object> params) {
        String currentPage = params.get("currentPage") == null ? "1" : params.get("currentPage").toString();
        String pageSize = params.get("pageSize") == null ? "20" : params.get("pageSize").toString();
        PageHelper.startPage(Integer.parseInt(currentPage), Integer.parseInt(pageSize));
        List<NoteCarTools> loadcar = loadcarService.getAll(params);
        PageInfo<NoteCarTools> pageInfo = new PageInfo<>(loadcar);
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping("/listloadcar")
    public R getSelect(@RequestParam Map<String, Object> params) {
        String currentPage = params.get("currentPage") == null ? "1" : params.get("currentPage").toString();
        String pageSize = params.get("pageSize") == null ? "5" : params.get("pageSize").toString();
        PageHelper.startPage(Integer.parseInt(currentPage), Integer.parseInt(pageSize));
        List<NoteCarTools> carplan = loadcarService.selectBySelective(params);
        PageInfo<NoteCarTools> pageInfo = new PageInfo<>(carplan);
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping("/delete")
    public R delete(@RequestBody int[] nodeIds) {

        loadcarService.delete(nodeIds);
        return R.ok();
    }

    @RequestMapping("/updateAll")
    public R updateAll(@RequestBody int[] nodeIds) {

        loadcarService.updateStatus(nodeIds);
        return R.ok();
    }

    @RequestMapping("/updateReturn")
    public R updateReturn(@RequestBody NoteCarTools noteCarTools) {

        loadcarService.returnStatus(noteCarTools);
        return R.ok();

    }


    /**
     * 单一车辆信息
     */
    @RequestMapping("/selectOne")
    public R selectOne(@RequestParam Map<String, Object> params) {
        String nodeId = params.get("noteId").toString();
        int id = Integer.valueOf(nodeId).intValue();
        NoteCarTools carplan = loadcarService.selectOne(id);
        System.out.println(carplan);
        return R.ok().put("carplan", carplan);
    }

    @RequestMapping("/insertOntime")
    public R insertCompany(@RequestBody NoteCarTools noteCarTools) {

        loadcarService.insertOntime(noteCarTools);
        return R.ok();

    }
}
