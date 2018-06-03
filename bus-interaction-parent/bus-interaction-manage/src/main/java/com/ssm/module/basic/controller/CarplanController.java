package com.ssm.module.basic.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssm.module.basic.service.CarplanService;
import com.ssm.module.common.util.R;
import com.ssm.module.note.tool.NoteCarTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController()
@RequestMapping("/basic/carplan")
public class CarplanController {
    @Autowired
    private CarplanService carplanService;

    @RequestMapping("/list")
    public R getAll(@RequestParam Map<String, Object> params) {
        String currentPage = params.get("currentPage") == null ? "1" : params.get("currentPage").toString();
        String pageSize = params.get("pageSize") == null ? "5" : params.get("pageSize").toString();
        PageHelper.startPage(Integer.parseInt(currentPage), Integer.parseInt(pageSize));
        List<NoteCarTools> carplan = carplanService.getAll(params);
        PageInfo<NoteCarTools> pageInfo = new PageInfo<>(carplan);
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping("/listCarplan")
    public R getSelect(@RequestParam Map<String, Object> params) {
        String currentPage = params.get("currentPage") == null ? "1" : params.get("currentPage").toString();
        String pageSize = params.get("pageSize") == null ? "5" : params.get("pageSize").toString();
        PageHelper.startPage(Integer.parseInt(currentPage), Integer.parseInt(pageSize));
        List<NoteCarTools> carplan = carplanService.selectBySelective(params);
        PageInfo<NoteCarTools> pageInfo = new PageInfo<>(carplan);
        return R.ok().put("pageInfo", pageInfo);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody NoteCarTools noteCarTools) {
        noteCarTools.setStatus("10");
        carplanService.save(noteCarTools);
        return R.ok();
    }

    /**
     * 单一车辆信息
     */
    @RequestMapping("/selectOne")
    public R selectOne(@RequestParam Map<String, Object> params) {
        String nodeId = params.get("noteId").toString();
        int id = Integer.valueOf(nodeId).intValue();
        NoteCarTools carplan = carplanService.selectOne(id);
        System.out.println(carplan);
        return R.ok().put("carplan", carplan);
    }

    /**
     * 更新车辆
     */
    @RequestMapping("/update")
    public R update(@RequestBody NoteCarTools noteCarTools) {
        System.out.println(noteCarTools);
        carplanService.update(noteCarTools);
        return R.ok();
    }

    @RequestMapping("/delete")
    public R delete(@RequestBody int[] nodeIds) {

        carplanService.delete(nodeIds);
        return R.ok();
    }

    @RequestMapping("/updateAll")
    public R updateAll(@RequestBody int[] nodeIds) {

        carplanService.updateStatus(nodeIds);
        return R.ok();
    }


}
